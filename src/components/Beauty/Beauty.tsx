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
import {useGlobalState} from '../../hook/useGlobal';

const Beauty = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('POPULAR');
  const navigation = useNavigation<NavigationProps>();
  const {uniqueCategory} = useProducts();
  const {updateUtilityTitle} = useGlobalState();
  const category = 'Beauty';
  const beautyArray = uniqueCategory[category] ?? [];

  const handleNavigation = (type: string) => {
    updateUtilityTitle(type);
    navigation.navigate(screenNames.searchResult, {type, category});
  };

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
        initialNumToRender={5}
        data={filteredBySelectedType}
        renderItem={({item}) => (
          <View style={beautyStyles.item}>
            <ProductCard minHeight={hp('27%')} maxWidth={wp('94%')}>
              <ImageBackground
                source={{uri: item.image[0]}}
                style={beautyStyles.background}
                resizeMode="cover">
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => handleNavigation(item.type)}
                  style={beautyStyles.button}>
                  <Text style={beautyStyles.text} numberOfLines={1}>
                    {item.type}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </ProductCard>
          </View>
        )}
        keyExtractor={item => item.productId}
        contentContainerStyle={beautyStyles.itemCon}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Beauty;
