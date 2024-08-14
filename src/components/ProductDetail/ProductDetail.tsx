import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hp, wp} from '../../config/appConfig';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CustomButton} from '../index';
import {ProductInterface} from '../../hook/useProducts';
import {screenNames} from '../../screen';
import {productDetailStyles} from './productDetailStyles';
import {NavigationProps} from '../..//screen';
import themes from '../../config/themes';
import {Avatar} from '@rneui/themed';
import {useUser} from '../../hook/useUser';

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigation = useNavigation<NavigationProps>();
  const {params} = useRoute();
  const product = params as ProductInterface;
  const {currentUser} = useUser();
  const cartItems = [{productId: '123'}];
  const savedForLaterItems = [{productId: '123'}];
  function handleAddToCart() {
    if (isItemInCart()) {
      Alert.alert('Item already in cart');
      return;
    }

    const quantity = 1;
    let totalPrice = product?.price * quantity;
    const data = {
      ...product,
      quantity: quantity,
      totalPrice: totalPrice,

      date: new Date().toString(),
      selectedSize,
    };
  }

  function isItemInCart() {
    const foundItem =
      cartItems.find(data => data.productId === product?.productId) ||
      savedForLaterItems.find(data => data.productId === product?.productId);

    return !!foundItem;
  }

  const sizeArray = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (product) {
      const imageCount = product?.image?.length || 1;
      const intervalTime = 3500;

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
        {product?.image.length > 0 ? (
          <ImageBackground
            testID="carousel-image"
            source={{uri: product?.image[currentIndex]}}
            style={productDetailStyles.profileContainer}
            imageStyle={productDetailStyles.profileImage}>
            <View style={productDetailStyles.carouselCon}>
              {Array.from({length: product?.image.length}).map(
                (number, index) => (
                  <TouchableOpacity
                    onPress={() => setCurrentIndex(index)}
                    key={index}
                    style={{
                      ...productDetailStyles.carousel,
                      borderRadius: 60,
                      ...(currentIndex === index && {
                        backgroundColor: 'white',
                        width: wp('4%'),
                      }),
                    }}
                  />
                ),
              )}
            </View>
          </ImageBackground>
        ) : (
          <Text>No images available</Text>
        )}
      </View>
      <View style={productDetailStyles.optionsCon}>
        <View style={productDetailStyles.options}>
          <View style={{width: '98%'}}>
            <Ionicons
              name="chatbubble-ellipses"
              color={themes.COLORS.BUTTON_COLOR}
              size={wp('12%')}
              style={productDetailStyles.icon}
              onPress={() => navigation.navigate(screenNames.chat)}
              testID="chat-icon-button"
            />
          </View>
          <Text style={productDetailStyles.nikeText} numberOfLines={2}>
            {product?.title?.slice(0, 20)}
          </Text>

          <View style={productDetailStyles.imgAndTextCon}>
            <View style={productDetailStyles.imgCon}>
              <Avatar
                size={hp('6.3%')}
                rounded
                source={{
                  uri: currentUser ? currentUser.photos[0] : '',
                }}
                icon={{name: 'user', type: 'font-awesome'}}
                containerStyle={{backgroundColor: 'gray'}}
              />

              <View>
                <Text style={productDetailStyles.sharedText}>
                  Ndubuisi Agbo
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
            </View>

            <View>
              <Text style={productDetailStyles.price}>
                ${Intl.NumberFormat().format(product?.price)}
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
  );
};

export default ProductDetail;
