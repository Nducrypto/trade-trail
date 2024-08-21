import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {beautyStyles} from './beautyStyles';
import {ProductInterface, useProducts} from '../../hook/useProducts';
import {CustomTitle, ProductCard} from '../';
import {hp, wp} from '../../config/appConfig';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screenNames} from '../../screen';

const Beauty = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('POPULAR');
  const navigation = useNavigation<NavigationProps>();
  const {allArticles, uniqueCategory} = useProducts();

  const handleNavigation = (product: string) => {};

  const beautyArray = uniqueCategory['Beauty'] ?? [];
  const getUnigueSubCategory = () => {
    const uniqueSubCategory: Set<string> = new Set(['POPULAR']);
    const uniqueType: Set<string> = new Set();
    const uniqueTypeArray = [];
    for (const item of allArticles) {
      if (!uniqueSubCategory.has(item.subCategory)) {
        uniqueSubCategory.add(item.subCategory);
      }
      if (!uniqueType.has(item.type)) {
        uniqueType.add(item.type);
        uniqueTypeArray.push(item);
      }
    }
    const titleArray = Array.from(uniqueSubCategory);
    const filtered = filtereBySelectedTitle(uniqueTypeArray);
    return {filtered, titleArray};
  };
  const filtereBySelectedTitle = (array: ProductInterface[]) => {
    const isPopular = selectedTitle === 'POPULAR';
    const filtered = isPopular
      ? array
      : array.filter(item => item.subCategory === selectedTitle);
    return filtered;
  };

  const {filtered, titleArray} = getUnigueSubCategory();

  return (
    <View style={beautyStyles.container}>
      <CustomTitle
        array={titleArray}
        selectedTitle={selectedTitle}
        handleSelect={setSelectedTitle}
      />
      <FlatList
        data={filtered}
        renderItem={({item}) => (
          <ProductCard minHeight={hp('27%')} maxWidth={wp('94%')}>
            <ImageBackground
              source={{uri: item.image[0]}}
              style={beautyStyles.background}
              resizeMode="cover">
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleNavigation(item.type)}
                style={beautyStyles.item}>
                <Text style={beautyStyles.text} numberOfLines={1}>
                  {item.type}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </ProductCard>
        )}
        keyExtractor={item => item.productId}
        contentContainerStyle={beautyStyles.itemCon}
      />
    </View>
  );
};

export default Beauty;
