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
  const {
    toastSuccess: showToastSuccess,
    toastError,
    updateUtilityTitle,
    updatePreviousRoute,
    updateUtilityyProfileId,
    utilityProfileId,
  } = useGlobalState();
  const profileId = params?.profileId ?? utilityProfileId;

  const navigation = useNavigation<DynamicNavigationProps>();
  const {allArticles} = useProducts();
  const {allUsers, currentUser, isUserLoading, setUserLoading} = useUser();
  const {userId: currentUserId, userName: currentUserName} = currentUser;
  const viewedUser = allUsers[profileId] ?? initialState;
  const isFollowingUser = !!viewedUser.friends.find(
    friend => friend.userId === currentUserId,
  );

  const userAlbums = allArticles.filter(
    article => article.creatorId === profileId,
  );

  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    switch (screenName) {
      case screenNames.albums:
        goToAlbums();
        return;
      case screenNames.chatScreen:
        goToChatScreen();
        return;
      case screenNames.signIn:
        goToSignIn();
        return;

      default:
        navigation.navigate(screenName);
        return;
    }
  };
  const goToAlbums = () => {
    updateUtilityTitle(viewedUser.userName);
    navigation.navigate(screenNames.albums, {
      creatorId: profileId,
    });
  };
  const goToChatScreen = () => {
    navigation.navigate(screenNames.chatScreen, {
      profileId: viewedUser.userId,
      profileName: viewedUser.userName,
    });
  };
  const goToSignIn = () => {
    updatePreviousRoute(screenNames.profile);
    updateUtilityyProfileId(profileId);
    navigation.navigate(screenNames.signIn);
  };

  const handleAlert = () => {
    Alert.alert(
      'Sign in to continue',
      '',
      [
        {
          text: 'OK',
          onPress: () => {
            navigateToScreen(screenNames.signIn);
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };
  const handleConnectionToggle = async () => {
    if (!currentUserId) {
      return handleAlert();
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
                onPress={() => navigateToScreen(screenNames.chatScreen)}
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
            data={userAlbums.slice(0, 6)}
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
