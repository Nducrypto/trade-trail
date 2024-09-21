import {FlatList, Image, StatusBar, View} from 'react-native';
import React from 'react';
import {albumStyles} from './albumStyles';
import {useProducts} from '../../hook/useProducts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../screen';

const Albums = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'Albums'>>();
  const searchedCreator = params.creatorId;
  const {allArticles} = useProducts();
  const filterByCreatorId = allArticles.filter(
    article => article.creatorId === searchedCreator,
  );

  return (
    <FlatList
      data={filterByCreatorId}
      renderItem={({item}) => (
        <View style={albumStyles.item}>
          {item.image.map((img, index) => (
            <View key={index} style={albumStyles.imageCon}>
              <Image
                source={{uri: img}}
                style={albumStyles.image}
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
      )}
      keyExtractor={item => item.productId}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      testID="albums-flatlist"
      ListHeaderComponent={
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      }
    />
  );
};

export default Albums;
