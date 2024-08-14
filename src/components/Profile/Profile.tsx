import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useProducts} from '../../hook/useProducts';
import {profileStyles} from './profileStyles';
import themes from '../../config/themes';
import {
  DynamicNavigationProps,
  RootStackParamList,
  screenNames,
} from '../../screen';

const Profile = () => {
  const {params} = useRoute();
  const searchedCreatorId = '12345';

  const navigation = useNavigation<DynamicNavigationProps>();
  const {allArticles, isProductLoading} = useProducts();
  const allUsers = [
    {
      picture: '',
      email: 'test@gmail.com',
      userId: '12345',
      friends: ['user1', 'user2', 'user3'],
      age: 20,
      userName: 'James King',

      photos: [1, 2, 3, 4, 5],
      comments: [{email: 'user@hmai.com'}],
      city: 'Portharcourt',
      country: 'ngn',
      bio: 'An artist of considerable range, Ndubuisi name taken by Taraba...',
    },
    {
      picture: '',
      email: 'ndu@gmail.com',
      userId: '123',
      friends: ['user1', 'user2', 'user3'],
      age: null,
      userName: 'John Doe',

      photos: [1, 2, 3, 4, 5],
      comments: [{email: 'user@hmai.com'}],
      city: 'Portharcourt',
      country: 'ngn',
      bio: 'An artist of considerable range, Ndubuisi name taken by Taraba...',
    },
  ];
  const currentUser = {
    picture: '',
    email: 'test@gmail.com',
    userId: '12345',
    age: 20,
    userName: 'Ndubuisi Agbo',
    friends: ['user1', 'user2', 'user3'],
    photos: [1, 2, 3, 4, 5],
    comments: [{email: 'user@hmai.com'}],
    city: 'Portharcourt',
    country: 'ngn',
    bio: 'An artist of considerable range, Ndubuisi name taken by Taraba...',
  };
  const profileDetails = allUsers.find(
    user => user.userId === searchedCreatorId,
  );

  const userAlbums = allArticles.filter(
    article => article.creatorId === searchedCreatorId,
  );
  const handleNavigation = (name: keyof RootStackParamList) => {
    if (name === screenNames.albums) {
      navigation.navigate(screenNames.albums, {
        creatorId: searchedCreatorId,
      });
      return;
    }
    navigation.navigate(name);
  };
  const handleConnect = () => {};

  const formatLargeNumber = (number: number | undefined) => {
    if (number === undefined) return '0';
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return number.toString();
    }
  };
  const numColumns = 3;
  const image =
    'https://plus.unsplash.com/premium_photo-1720823182783-3b9fb27e40d9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8';
  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.sectionOne}></View>
      <View style={profileStyles.sectionTwo}>
        <View style={profileStyles.card}>
          <Image style={profileStyles.image} source={{uri: image}} />
          {currentUser.userId !== searchedCreatorId && (
            <View style={profileStyles.buttonCon}>
              <TouchableOpacity
                style={profileStyles.button}
                activeOpacity={0.6}
                onPress={handleConnect}>
                <Text style={profileStyles.buttonText}>Connect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigation(screenNames.chat)}
                activeOpacity={0.6}
                style={[
                  profileStyles.button,
                  {backgroundColor: themes.COLORS.BUTTON_COLOR},
                ]}>
                <Text style={profileStyles.buttonText}>Message</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={profileStyles.labelSection}>
            <View>
              <Text style={profileStyles.value}>
                {formatLargeNumber(profileDetails?.friends.length)}
              </Text>
              <Text style={profileStyles.label}>Friends</Text>
            </View>
            <View>
              <Text style={profileStyles.value}>
                {formatLargeNumber(profileDetails?.photos.length)}
              </Text>
              <Text style={profileStyles.label}>Photos</Text>
            </View>
            <View>
              <Text style={profileStyles.value}>
                {' '}
                {formatLargeNumber(profileDetails?.comments.length)}
              </Text>
              <Text style={profileStyles.label}>comments</Text>
            </View>
          </View>

          <Text style={profileStyles.name} numberOfLines={1}>
            {profileDetails?.userName}, {profileDetails?.age ?? ''}
          </Text>
          <View style={profileStyles.locationCon}>
            <Text style={profileStyles.location} numberOfLines={1}>
              {profileDetails?.city ?? ''},{' '}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                profileStyles.location,
                {
                  textTransform: 'uppercase',
                },
              ]}>
              {profileDetails?.country ?? ''}
            </Text>
          </View>
          <Text style={profileStyles.bio} numberOfLines={2}>
            {profileDetails?.bio}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={profileStyles.showMoreBtn}>
            <Text style={profileStyles.showMoreText}>Show more</Text>
          </TouchableOpacity>
          <Text style={profileStyles.albumLabel}>Albums</Text>

          <TouchableOpacity
            style={profileStyles.viewBtnCon}
            onPress={() => handleNavigation(screenNames.albums)}>
            <Text style={profileStyles.viewAllBtnText}>View all</Text>
          </TouchableOpacity>
          <FlatList
            data={userAlbums}
            renderItem={({item, index}) => (
              <TouchableWithoutFeedback key={`viewed-${index}`}>
                <Image
                  source={{uri: item.image[0]}}
                  resizeMode="cover"
                  style={profileStyles.thumb}
                  testID={`index${index}`}
                />
              </TouchableWithoutFeedback>
            )}
            scrollEnabled={userAlbums.length > 6}
            numColumns={numColumns}
            key={`flatlist-${numColumns}`}
            contentContainerStyle={profileStyles.albumsCon}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={profileStyles.emptyText}>
                There are currently no items in this album
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
