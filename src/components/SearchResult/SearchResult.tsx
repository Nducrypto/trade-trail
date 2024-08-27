import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {searchResultStyles} from './searchResultStyles';
import {useProducts} from '../../hook/useProducts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../screen';
import {Product} from '../';

const SearchResult = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'SearchResult'>>();
  const {category, type} = params;

  const {uniqueCategory} = useProducts();
  const filteredByType =
    uniqueCategory[category].filter(article => article.type === type) || [];

  return (
    <FlatList
      scrollEnabled={filteredByType.length > 2}
      data={filteredByType}
      renderItem={({item}) => (
        <View style={searchResultStyles.item}>
          <Product product={item} full style={{top: 10}} />
        </View>
      )}
      keyExtractor={item => item.productId}
      contentContainerStyle={searchResultStyles.itemCon}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={searchResultStyles.emptyCon}>
          <Text style={searchResultStyles.emptyTextDesc}>No item found</Text>
        </View>
      }
    />
  );
};

export default SearchResult;
