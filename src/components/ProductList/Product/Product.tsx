import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, TouchableWithoutFeedback, View, Text} from 'react-native';
import {ProductCard} from '../../index';
import {wp} from '../../../config/appConfig';
import {NavigationProps, screenNames} from '../../../screen';
import {useGlobalState} from '../../../hook/useGlobal';
import {ProductInterface} from '../../../hook/useProducts';
import {productStyles} from './productStyles';

interface Props {
  product: ProductInterface;
  horizontal?: boolean;
  full?: boolean;
  style?: Record<string, number>;
}
const Product = ({product, horizontal, full, style}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const {} = useGlobalState();
  const proceedToProductDetail = () => {
    navigation.navigate(screenNames.productDetail, {
      ...product,
    });
  };

  const imageStyles = [
    full
      ? productStyles.fullImage
      : horizontal
      ? productStyles.horizontalImage
      : productStyles.image,
  ];

  return (
    <View style={productStyles.container}>
      <ProductCard minHeight={120} maxWidth={wp('100%')} paddingLeft={0}>
        <View
          style={[
            productStyles.product,
            {
              flexDirection: horizontal ? 'row' : 'column',
            },
          ]}>
          <TouchableWithoutFeedback
            onPress={proceedToProductDetail}
            testID="proceed-to-product-detail-button">
            <View style={productStyles.imageContainer}>
              <Image source={{uri: product?.image[0]}} style={imageStyles} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={proceedToProductDetail}>
            <View style={productStyles.productDescription}>
              <Text
                style={{
                  ...productStyles.productTitle,
                  ...(style && {
                    marginTop: style.top,
                  }),
                }}
                numberOfLines={2}>
                {product?.title}
              </Text>
              <Text
                style={{
                  ...productStyles.price,
                  fontWeight: '500',
                  ...(style && {
                    marginBottom: style.top,
                    marginTop: style.top,
                  }),
                }}>
                ${Intl.NumberFormat().format(Number(product?.price))}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ProductCard>
    </View>
  );
};

export default Product;
