import React, {useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {cartStyles} from './cartStyles.ts';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import Select from './SelectButton/Select';
import {CustomButton, ProductCard} from '../';
import {useUser} from '../../hook/useUser';
import {GlobalStateProps, useGlobalState} from '../../hook/useGlobal';
import {PAYSTACK_TEST_PUBLIC_KEY} from '@env';
import {hp, wp} from '../../config/appConfig.ts';
import {NavigationProps, screenNames} from '../../screen';
import SavedForLater from './SavedForLater/SavedForLater.tsx';
import {useAuthentication} from '../../controller/user.ts';
import {CartItem, CartState, useCart} from '../../hook/useCart.ts';
import themes from '../../config/themes.ts';
import {createOrder} from '../../controller/order.ts';
import {useOrder} from '../../hook/useOrder.ts';

export type Data = {
  email: string;
  userId: string;
  userName: string;
  items: CartItem[];
  subTotal: number;
  status: string;
  date: string;
};

const Cart = () => {
  useAuthentication();
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [isSaveForLaterVisible, setIsSaveForLaterVisible] =
    useState<boolean>(false);
  const paystackKey = PAYSTACK_TEST_PUBLIC_KEY;
  const paystackWebViewRef = useRef<paystackProps.PayStackRef | any>();
  const navigation = useNavigation<NavigationProps>();
  const {currentUser} = useUser();
  const {email, userId, userName} = currentUser;
  const cart = useCart() as CartState;
  const cartItems = Object.values(cart.items);

  const globalState = useGlobalState() as GlobalStateProps;
  const orderState = useOrder();

  const handleQuantityChange = async (
    index: string,
    value: number,
    item: CartItem,
  ) => {
    const {productId} = item;
    setQuantity(prev => ({...prev, [productId]: value}));
    cart.updateItemQuantity(item, value);
  };

  const handleSaveForLater = async (product: CartItem) => {
    const quantity = 1;
    let totalPrice = product?.price * quantity;
    const item = {
      ...product,
      quantity,
      totalPrice: totalPrice,
      date: new Date().toString(),
      selectedSize: 'M',
    };
    try {
      cart.deleteItemInCart(item.productId);
      cart.updateSavedForLater(item);
      globalState.toastSuccess('Product saved successfully');
    } catch (error) {
      globalState.toastError('Failed to save product for later');
    }
  };
  async function handlePaymentSuccess(reference: Partial<{}>) {
    const data: Data = {
      email: email,
      userId: userId,
      userName: userName,
      items: cartItems,
      subTotal: cart.subTotal,
      status: 'Pending',
      date: new Date().toString(),
    };
    createOrder({
      orderData: data,
      orderState,
      globalState,
      cartState: cart,
    });
    navigation.navigate(screenNames.productList);
  }

  function handlePaystackCloseAction() {
    Alert.alert(
      'Transaction Failed',
      'Unfortunately, we were unable to complete your transaction at this time. Please try again later or contact support if the issue persists. We apologize for any inconvenience this may have caused.',
      [{text: 'OK', style: 'default'}],
    );
  }

  const handleRemoveItem = async (productId: string) => {
    try {
      cart.deleteItemInCart(productId);
      globalState.toastSuccess('Product was removed from cart');
    } catch (error) {
      globalState.toastError('failed to removeProduct from cart');
    }
  };

  const length = cartItems.length;

  function CheckoutButton() {
    return (
      <View style={cartStyles.payButCon}>
        <Paystack
          paystackKey={paystackKey}
          billingEmail={email}
          amount={cart.subTotal}
          currency="NGN"
          onCancel={handlePaystackCloseAction}
          onSuccess={res => handlePaymentSuccess(res)}
          ref={paystackWebViewRef}
          activityIndicatorColor={themes.COLORS.SUCCESS}
        />
        <CustomButton
          title={email ? 'PROCEED TO CHECKOUT' : 'SIGN IN TO CONTINUE'}
          width={wp('90%')}
          marginTop={hp('1%')}
          testID="payment-btn"
          onPress={() =>
            email
              ? paystackWebViewRef?.current?.startTransaction()
              : navigation.navigate(screenNames.signIn)
          }
        />
      </View>
    );
  }

  return (
    <FlatList
      data={cartItems}
      renderItem={({item, index}) => (
        <ProductCard
          minHeight={130}
          maxWidth={wp('94%')}
          paddingLeft={4}
          key={index}>
          <View>
            <View style={cartStyles.imgAndTextCon}>
              <View style={cartStyles.imageContainer}>
                <Image source={{uri: item.image[0]}} style={cartStyles.image} />
              </View>
              <View>
                <View style={cartStyles.productDescription}>
                  <Text style={cartStyles.productTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View style={cartStyles.inStockCon}>
                    <Text style={cartStyles.price}>
                      ${Intl.NumberFormat().format(item.price)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={cartStyles.groupedButCon}>
              <Select
                defaultIndex={0}
                options={['1', '2', '3', '4', '5']}
                id={item.productId}
                onSelect={(index, value) =>
                  handleQuantityChange(index, value, item)
                }
                value={quantity}
                testID={`select${index}`}
              />
              <TouchableOpacity
                testID={`delete-item${index}`}
                onPress={() => handleRemoveItem(item.productId)}
                style={{...cartStyles.optionsButton, width: wp('27%')}}>
                <Text style={cartStyles.optionsText}>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={`save-item${index}`}
                onPress={() => handleSaveForLater(item)}
                style={cartStyles.optionsButton}>
                <Text style={cartStyles.optionsText}> SAVE FOR LATER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ProductCard>
      )}
      scrollEnabled={length >= 3}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={cartStyles.itemCon}
      ListHeaderComponent={
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      }
      ListFooterComponent={
        <View>
          {length > 0 && (
            <View>
              <View style={cartStyles.subTotalCont}>
                <Text style={cartStyles.subTotalLabel}>
                  Cart Subtotal ({length}):
                </Text>
                <Text style={cartStyles.subTotalValue}>
                  ₦ {Intl.NumberFormat().format(cart.subTotal)}
                </Text>
              </View>
              <CheckoutButton />
              {cart.savedForLaterItems.length > 0 && (
                <TouchableOpacity
                  style={cartStyles.viewSavedItemCon}
                  onPress={() => setIsSaveForLaterVisible(true)}>
                  <Text style={cartStyles.viewSavedItemtext}>
                    View saved items
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <SavedForLater
            modalStatus={isSaveForLaterVisible}
            setModalStatus={setIsSaveForLaterVisible}
          />
        </View>
      }
      ListEmptyComponent={
        <View style={cartStyles.emptyCartCon}>
          {cart.savedForLaterItems.length < 1 ? (
            <Text style={cartStyles.emptyCartText}>
              You have no item in your cart
            </Text>
          ) : (
            <View style={cartStyles.emptyCartCon}>
              <Text style={cartStyles.emptyCartText}>
                There are no items in your cart right now. However, you can
                check out the items you’ve saved for later below.
              </Text>
              <CustomButton
                title="VIEW"
                width={wp('50%')}
                marginTop={15}
                testID="saved-for-later-modal-opener"
                onPress={() => setIsSaveForLaterVisible(true)}
              />
              <SavedForLater
                modalStatus={isSaveForLaterVisible}
                setModalStatus={setIsSaveForLaterVisible}
              />
            </View>
          )}
        </View>
      }
      ListFooterComponentStyle={cartStyles.footerCon}
    />
  );
};

export default Cart;
