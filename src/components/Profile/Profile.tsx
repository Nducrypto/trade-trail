import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useProducts} from '../../hook/useProducts';
import {profileStyles} from './profileStyles';
import themes from '../../config/themes';
import {
  DynamicNavigationProps,
  RootStackParamList,
  screenNames,
} from '../../screen';
import {fetchAllUsers, updateFriendsList} from '../../controller/user';
import {initialState, useUser} from '../../hook/useUser';
import {Avatar} from '@rneui/themed';
import {hp} from '../../config/appConfig';
import {useGlobalState} from '../../hook/useGlobal';

const Profile = () => {
  fetchAllUsers();
  const {params} = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const profileId = params.profileId;
  const navigation = useNavigation<DynamicNavigationProps>();
  const {allArticles} = useProducts();
  const {allUsers, currentUser, isUserLoading, setUserLoading} = useUser();
  const {toastSuccess: showToastSuccess, toastError} = useGlobalState();
  const {userId: currentUserId, userName: currentUserName} = currentUser;
  const viewedUser = allUsers[profileId] ?? initialState;
  const isFollowingUser = !!viewedUser.friends.find(
    friend => friend.userId === currentUserId,
  );

  const userAlbums = allArticles.filter(
    article => article.creatorId === profileId,
  );

  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    if (screenName === screenNames.albums) {
      navigation.navigate(screenNames.albums, {
        creatorId: profileId,
      });
      return;
    }
    navigation.navigate(screenName);
  };

  const handleConnectionToggle = async () => {
    if (!currentUserId) {
      return Alert.alert('Sign in to continue');
    }

    const userData = {
      userId: currentUserId,
      userName: currentUserName,
      status: 'unViewed',
      date: new Date().toString(),
    };

    try {
      const action = isFollowingUser ? 'Disconnected' : 'Connected';
      await updateFriendsList(userData, viewedUser.docId, setUserLoading);
      showToastSuccess(`Successfully ${action} ${viewedUser.userName}`);
    } catch (error) {
      toastError('Error managing connection');
    }
  };

  const formatNumber = (number: number | undefined) => {
    if (number === undefined) return '0';
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return number.toString();
    }
  };

  const isViewingOwnProfile = currentUser && currentUser.userId === profileId;

  const profileImageUri =
    'https://plus.unsplash.com/premium_photo-1724076827133-593437b8f16a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8';

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.headerSection}></View>
      <View style={profileStyles.profileDetailsSection}>
        <View style={profileStyles.profileCard}>
          <Avatar
            size={hp('11%')}
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            containerStyle={profileStyles.avatar}
            source={{uri: viewedUser.profilePic}}
          />
          {!isViewingOwnProfile && (
            <View style={profileStyles.actionButtonContainer}>
              <TouchableOpacity
                style={profileStyles.actionButton}
                activeOpacity={0.6}
                disabled={isUserLoading}
                onPress={handleConnectionToggle}>
                <Text style={profileStyles.actionButtonText}>
                  {isFollowingUser ? 'Disconnect' : 'Connect'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToScreen(screenNames.chat)}
                activeOpacity={0.6}
                style={[
                  profileStyles.actionButton,
                  {backgroundColor: themes.COLORS.BUTTON_COLOR},
                ]}>
                <Text style={profileStyles.actionButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={profileStyles.statsSection}>
            <View>
              <Text style={profileStyles.statsValue}>
                {formatNumber(viewedUser.friends?.length)}
              </Text>
              <Text style={profileStyles.statsLabel}>Friends</Text>
            </View>
            <View>
              <Text style={profileStyles.statsValue}>
                {formatNumber(userAlbums?.length)}
              </Text>
              <Text style={profileStyles.statsLabel}>Photos</Text>
            </View>
            <View>
              <Text style={profileStyles.statsValue}>
                {formatNumber(viewedUser?.comments?.length)}
              </Text>
              <Text style={profileStyles.statsLabel}>Comments</Text>
            </View>
          </View>

          <Text style={profileStyles.profileName} numberOfLines={1}>
            {viewedUser?.userName}
            {viewedUser?.age && `, ${viewedUser.age}`}
          </Text>
          <View style={profileStyles.locationContainer}>
            <Text style={profileStyles.locationText} numberOfLines={1}>
              {viewedUser?.city}{' '}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                profileStyles.locationText,
                {textTransform: 'uppercase'},
              ]}>
              {viewedUser?.country}
            </Text>
          </View>
          <Text style={profileStyles.bioText} numberOfLines={2}>
            {viewedUser?.bio}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={profileStyles.showMoreBtn}>
            <Text style={profileStyles.showMoreBtnText}>Show more</Text>
          </TouchableOpacity>
          <Text style={profileStyles.albumsLabel}>Albums</Text>

          <TouchableOpacity
            style={profileStyles.viewAllBtnContainer}
            onPress={() => navigateToScreen(screenNames.albums)}>
            <Text style={profileStyles.viewAllBtnText}>View all</Text>
          </TouchableOpacity>
          <FlatList
            data={userAlbums}
            renderItem={({item, index}) => (
              <TouchableWithoutFeedback key={`viewed-${index}`}>
                <Image
                  source={{uri: item.image[0]}}
                  resizeMode="cover"
                  style={profileStyles.thumbnail}
                  testID={`index${index}`}
                />
              </TouchableWithoutFeedback>
            )}
            scrollEnabled={userAlbums.length > 6}
            numColumns={3}
            key={`flatlist-${3}`}
            contentContainerStyle={profileStyles.albumListContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={profileStyles.emptyListText}>
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
