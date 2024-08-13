import {View} from 'react-native';
import React from 'react';
import {productCardStyles} from './productCardStyles';

interface Props {
  children: React.ReactNode;
  maxWidth: number;
  minHeight: number;
  paddingLeft?: number;
}
const ProductCard = ({children, maxWidth, minHeight, paddingLeft}: Props) => {
  return (
    <View style={{...productCardStyles.card, maxWidth, minHeight, paddingLeft}}>
      {children}
    </View>
  );
};

export default ProductCard;
