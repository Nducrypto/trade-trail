import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import {hp, wp} from '../../config/appConfig';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CustomButton} from '../index';
import {RootStackParamList, screenNames} from '../../screen';
import {productDetailStyles} from './productDetailStyles';
import {NavigationProps} from '../..//screen';
import themes from '../../config/themes';
import {Avatar} from '@rneui/themed';
import {useCart} from '../../hook/useCart';
import {useGlobalState} from '../../hook/useGlobal';
import {useUser} from '../../hook/useUser';
import {fetchAllUsers} from '../../controller/user';

const ProductDetail = () => {
  fetchAllUsers();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigation = useNavigation<NavigationProps>();
  const {params} = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const product = params;
  const {savedForLaterItems, items, storeItemToCart} = useCart();
  const {allUsers} = useUser();
  const cartItems = Object.values(items);
  const toast = useGlobalState();
  const creatorName = allUsers[product?.creatorId]?.userName ?? '';

  const handleAddToCart = () => {
    if (isItemInCart()) {
      Alert.alert('Item already in cart');
      return;
    }

    const quantity = 1;
    let totalPrice = product?.price * quantity;
    const item = {
      ...product,
      quantity: quantity,
      totalPrice: totalPrice,

      date: new Date().toString(),
      selectedSize,
    };
    try {
      storeItemToCart(item);
      toast.toastSuccess('Product added successfully');
    } catch (error) {
      toast.toastError('Failed to add product to cart');
    }
  };

  function isItemInCart() {
    const foundItem =
      cartItems.find(data => data.productId === product?.productId) ||
      savedForLaterItems.find(data => data.productId === product?.productId);

    return !!foundItem;
  }
  const proceedToSellerProfile = () => {
    navigation.navigate(screenNames.profile, {
      profileId: product.creatorId,
    });
  };
  const sizeArray = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (product) {
      const imageCount = product?.image?.length || 1;
      const intervalTime = 6500;

      function run() {
        setCurrentIndex(prev => (prev + 1) % imageCount);
      }

      const startTimer = () => {
        timeoutId = setTimeout(() => {
          run();
          startTimer();
        }, intervalTime);
      };

      startTimer();
    }
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [product]);

  return (
    <View style={productDetailStyles.profile}>
      <View>
        <Image
          testID="carousel-image"
          source={{uri: product?.image[currentIndex]}}
          style={productDetailStyles.profileImage}
        />
      </View>
      <View style={productDetailStyles.optionsCon}>
        <View style={productDetailStyles.options}>
          <Text style={productDetailStyles.nikeText} numberOfLines={2}>
            {product?.title}
          </Text>

          <View style={productDetailStyles.imgAndTextCon}>
            <TouchableOpacity
              onPress={proceedToSellerProfile}
              style={productDetailStyles.imgCon}
              activeOpacity={0.8}>
              <Avatar
                size={hp('6.3%')}
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                containerStyle={{backgroundColor: 'gray'}}
              />

              <View>
                <Text style={productDetailStyles.sharedText}>
                  {creatorName}
                </Text>
                <Text
                  style={{
                    ...productDetailStyles.sharedText,
                    fontWeight: '400',
                    color: 'gray',
                  }}>
                  Seller
                </Text>
              </View>
            </TouchableOpacity>

            <View>
              <Text style={productDetailStyles.price}>
                ₦ {Intl.NumberFormat().format(product?.price)}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Text
              style={{
                ...productDetailStyles.sharedText,
                fontSize: wp('4%'),
                marginTop: hp('2%'),
              }}>
              Size
            </Text>
            <View style={productDetailStyles.sizeCon}>
              {sizeArray.map(size => (
                <TouchableOpacity
                  key={size}
                  style={{
                    ...productDetailStyles.sizeCell,
                    ...(selectedSize === size && {
                      backgroundColor: '#E7E7E7',
                    }),
                  }}
                  onPress={() => setSelectedSize(size)}>
                  <Text
                    style={{
                      ...productDetailStyles.sharedText,
                      fontSize: themes.FONT_SIZES.MEDIUM,
                      ...(selectedSize === size && {
                        color: themes.COLORS.BUTTON_COLOR,
                      }),
                    }}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={productDetailStyles.btnCon}>
            <CustomButton
              title="Add to cart"
              testID="add-to-cart-"
              marginTop={hp('6%')}
              width={wp('88')}
              onPress={() => handleAddToCart()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
