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
import {useGlobalState} from '../../hook/useGlobal';

const Fashion = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('POPULAR');
  const navigation = useNavigation<NavigationProps>();
  const {uniqueCategory} = useProducts();
  const {updateUtilityTitle} = useGlobalState();
  const category = 'Fashion';
  const fashionArray = uniqueCategory[category] ?? [];

  const handleNavigation = (type: string) => {
    updateUtilityTitle(type);
    navigation.navigate(screenNames.searchResult, {type, category});
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
        testID="flatlist"
        initialNumToRender={5}
        data={filteredBySelectedType}
        renderItem={({item}) => (
          <View style={fashionStyles.item}>
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
                  style={fashionStyles.button}>
                  <Text style={fashionStyles.text} numberOfLines={1}>
                    {item.type}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </ProductCard>
          </View>
        )}
        keyExtractor={item => item.productId}
        contentContainerStyle={fashionStyles.itemCon}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Fashion;
