import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {beautyStyles} from './beautyStyles';
import {useProducts} from '../../hook/useProducts';
import {CustomTitle, ProductCard} from '../';
import {hp, wp} from '../../config/appConfig';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screenNames} from '../../screen';
import {getUniqueSubCategory} from '../../controller/product';

const Beauty = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('POPULAR');
  const navigation = useNavigation<NavigationProps>();
  const {uniqueCategory} = useProducts();

  const handleNavigation = (type: string) => {
    navigation.navigate(screenNames.searchResult, {type});
  };

  const beautyArray = uniqueCategory['Beauty'] ?? [];

  const {filteredBySelectedType, titleArray} = getUniqueSubCategory(
    beautyArray,
    selectedTitle,
  );

  return (
    <View style={beautyStyles.container}>
      <CustomTitle
        array={titleArray}
        selectedTitle={selectedTitle}
        handleSelect={setSelectedTitle}
      />
      <FlatList
        data={filteredBySelectedType}
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
