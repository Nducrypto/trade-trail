import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {fashionStyles} from './fashionStyles';
import {useProducts} from '../../hook/useProducts';
import {CustomTitle, ProductCard} from '../';
import {hp, wp} from '../../config/appConfig';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screenNames} from '../../screen';
import {getUniqueSubCategory} from '../../controller/product';

const Fashion = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('POPULAR');
  const navigation = useNavigation<NavigationProps>();
  const {uniqueCategory} = useProducts();
  const fashionArray = uniqueCategory['Fashion'] ?? [];
  const handleNavigation = (type: string) => {
    navigation.navigate(screenNames.searchResult, {type});
  };

  const {filteredBySelectedType, titleArray} = getUniqueSubCategory(
    fashionArray,
    selectedTitle,
  );

  return (
    <View style={fashionStyles.container}>
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
              source={{
                uri: item.image[0],
              }}
              style={fashionStyles.background}
              resizeMode="cover">
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleNavigation(item.type)}
                style={fashionStyles.item}>
                <Text style={fashionStyles.text} numberOfLines={1}>
                  {item.type}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </ProductCard>
        )}
        keyExtractor={item => item.productId}
        contentContainerStyle={fashionStyles.itemCon}
      />
    </View>
  );
};

export default Fashion;
