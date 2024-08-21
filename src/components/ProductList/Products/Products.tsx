import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themes from '../../../config/themes';
import {ProductInterface, useProducts} from '../../../hook/useProducts';
import {Product, ProductCard} from '../../index';
import {NavigationProps, screenNames} from '../../../screen';
import {productsStyles} from './productsStyles';
import {wp} from '../../../config/appConfig';
import {useAuthentication} from '../../../controller/user';

const Products = () => {
  useAuthentication();
  //   fetchAllProducts();
  const [searchType, setSearchType] = useState<string>('');
  const [filteredArticlesArray, setfilteredArticlesArray] = useState<
    ProductInterface[]
  >([]);
  const {allArticles, isProductLoading} = useProducts();
  const navigation = useNavigation<NavigationProps>();

  const handleSearch = () => {
    const filtered = allArticles.filter(item =>
      item.type.toLowerCase().includes(searchType.toLowerCase()),
    );
    setfilteredArticlesArray(filtered);
  };
  useEffect(() => {
    if (!searchType) {
      setfilteredArticlesArray(allArticles);
    }
  }, [searchType, filteredArticlesArray, allArticles]);

  const renderSearchInput = () => {
    return (
      <View style={productsStyles.inputCon}>
        <TextInput
          style={productsStyles.input}
          placeholderTextColor="grey"
          testID="input"
          placeholder="What are you looking for?"
          onChangeText={value => setSearchType(value)}
        />
        <FontAwesome
          size={themes.SIZES.SMALL}
          color={themes.COLORS.MUTED}
          name="search-plus"
          disabled={!searchType}
          onPress={handleSearch}
        />
      </View>
    );
  };

  const renderTabs = () => {
    return (
      <View style={productsStyles.tabs}>
        <TouchableOpacity
          style={[productsStyles.tab, productsStyles.divider]}
          onPress={() => navigation.navigate(screenNames.beauty)}>
          <View style={productsStyles.tabContent}>
            <Entypo
              size={themes.SIZES.MEDIUM}
              color={themes.COLORS.MUTED}
              name="grid"
              style={productsStyles.icon}
            />

            <Text style={productsStyles.tabTitle}>Beauty</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={productsStyles.tab}
          onPress={() => navigation.navigate(screenNames.fashion)}>
          <View style={{flexDirection: 'row'}}>
            <Entypo
              size={themes.SIZES.SMALL}
              name="shopping-bag"
              style={productsStyles.icon}
            />
            <Text style={productsStyles.tabTitle}>Fashion</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderProducts = () => {
    const firstRow = filteredArticlesArray.slice(0, 1);
    const secondRow = filteredArticlesArray.slice(1, 3);
    const thirdRow = filteredArticlesArray.slice(3, 4);
    const fourthRow = filteredArticlesArray.slice(4, 5);
    const otherRow = filteredArticlesArray.slice(5, allArticles.length - 2);
    const lastRow = filteredArticlesArray.slice(allArticles.length - 2);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={productsStyles.products}>
        {firstRow.map((product, index) => (
          <Product product={product} horizontal key={index} style={{top: 7}} />
        ))}
        <View style={productsStyles.rowItemCon}>
          {secondRow.map((product, index) => (
            <Product product={product} style={{top: 10}} key={index} />
          ))}
        </View>

        {thirdRow.map((product, index) => (
          <Product product={product} horizontal key={index} style={{top: 7}} />
        ))}

        {fourthRow.map((product, index) => (
          <Product
            product={product}
            full={true}
            key={index}
            style={{top: 10}}
          />
        ))}
        {otherRow.map((product, index) => (
          <Product product={product} horizontal key={index} style={{top: 7}} />
        ))}
        {lastRow.map((product, index) => (
          <Product product={product} full key={index} style={{top: 10}} />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={productsStyles.home}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />

      <ProductCard minHeight={100} maxWidth={wp('100%')}>
        {renderSearchInput()}

        {renderTabs()}
      </ProductCard>
      {isProductLoading ? (
        <ActivityIndicator
          color="gray"
          size="small"
          style={productsStyles.emptyText}
        />
      ) : !isProductLoading && filteredArticlesArray.length < 1 ? (
        <Text style={productsStyles.emptyText}>Empty</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderProducts()}
        </ScrollView>
      )}
    </View>
  );
};

export default Products;
