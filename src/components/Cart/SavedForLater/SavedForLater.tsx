import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {wp} from '../../../config/appConfig';
import {cartStyles} from '../cartStyles';
import {ProductCard} from '../../';
import {savedForLaterStyles} from './savedForLaterStyles';
import themes from '../../../config/themes';
import {useCart, CartItem} from '../../../hook/useCart';

interface Props {
  modalStatus: boolean;
  setModalStatus: (value: boolean) => void;
}
const SavedForLater = ({modalStatus, setModalStatus}: Props) => {
  const {manageSavedItem, savedForLaterItems} = useCart();

  function handleCloseModal() {
    setModalStatus(false);
  }

  const restoreItemToCart = (product: CartItem) => {
    const quantity = 1;
    let totalPrice = product?.price * quantity;
    const item = {
      ...product,
      quantity,
      totalPrice: totalPrice,

      date: new Date().toString(),
      selectedSize: 'M',
    };

    manageSavedItem(item, 'add');
  };

  function deleteProduct(product: CartItem) {
    const quantity = 1;
    let totalPrice = product?.price * quantity;
    const data = {
      ...product,
      quantity,
      totalPrice: totalPrice,
      date: new Date().toString(),
      selectedSize: 'M',
    };
    manageSavedItem(data, 'delete');
  }

  const itemCount = savedForLaterItems.length;
  const itemLabel = itemCount < 2 ? 'item' : 'items';

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalStatus}
        onRequestClose={handleCloseModal}>
        <View style={savedForLaterStyles.centeredView}>
          <View style={savedForLaterStyles.modalView}>
            <TouchableOpacity
              testID="close-btn"
              style={{
                ...savedForLaterStyles.button,
                alignSelf: 'center',
                backgroundColor: themes.COLORS.BUTTON_COLOR,
              }}
              onPress={handleCloseModal}>
              <Text
                style={[
                  cartStyles.optionsText,
                  {color: themes.COLORS.WHITE, fontWeight: '700'},
                ]}>
                CLOSE
              </Text>
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={savedForLaterStyles.itemCon}
              showsVerticalScrollIndicator={false}
              scrollEnabled={savedForLaterItems.length >= 3}>
              <Text style={savedForLaterStyles.label}>
                You have {itemCount} {itemLabel} saved
              </Text>
              {savedForLaterItems.map((item, index) => (
                <View key={index} style={savedForLaterStyles.item}>
                  <ProductCard
                    minHeight={130}
                    maxWidth={wp('94%')}
                    paddingLeft={4}>
                    <View>
                      <View style={cartStyles.imgAndTextCon}>
                        <View style={cartStyles.imageContainer}>
                          <Image
                            source={{uri: item.image[0]}}
                            style={cartStyles.image}
                          />
                        </View>
                        <View>
                          <View>
                            <View style={cartStyles.productDescription}>
                              <Text
                                style={cartStyles.productTitle}
                                numberOfLines={2}>
                                {item.title}
                              </Text>
                              <View style={cartStyles.inStockCon}>
                                <Text style={cartStyles.price}>
                                  ₦ {Intl.NumberFormat().format(item.price)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={savedForLaterStyles.btnCon}>
                        <TouchableOpacity
                          testID={`delete-item${index}`}
                          style={savedForLaterStyles.button}
                          onPress={() => deleteProduct(item)}>
                          <Text
                            style={[
                              cartStyles.optionsText,
                              {color: themes.COLORS.WHITE, fontWeight: '700'},
                            ]}>
                            {' '}
                            DELETE
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          testID={`return-item${index}`}
                          style={{
                            ...savedForLaterStyles.button,
                            backgroundColor: themes.COLORS.BUTTON_COLOR,
                          }}
                          onPress={() => restoreItemToCart(item)}>
                          <Text
                            style={[
                              cartStyles.optionsText,
                              {color: 'white', fontWeight: '700'},
                            ]}>
                            {' '}
                            MOVE TO CART
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ProductCard>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SavedForLater;
