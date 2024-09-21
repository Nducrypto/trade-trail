import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {notificationStyles} from './notificationStyles';
import {useUser} from '../../hook/useUser';
import {Avatar} from '@rneui/themed';
import {hp, wp} from '../../config/appConfig';
import moment from 'moment';
import {ProductCard} from '../';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screenNames} from '../../screen';
import {markFollowersAsViewed, useAuthentication} from '../../controller/user';
const Notification = () => {
  useAuthentication();
  const {currentUser} = useUser();

  const navigation = useNavigation<NavigationProps>();
  const navigateToProfile = (userId: string) => {
    navigation.navigate(screenNames.profile, {
      profileId: userId,
    });
  };
  const followersNotifications = currentUser.friends;

  const hasUnviewedNotifications = !!followersNotifications.find(
    item => item.status === 'unViewed',
  );

  useEffect(() => {
    if (hasUnviewedNotifications) {
      markFollowersAsViewed(currentUser.docId);
    }
  }, [hasUnviewedNotifications]);

  const length = followersNotifications.length;
  if (!currentUser?.userId) {
    return (
      <View style={notificationStyles.signInCon}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <TouchableOpacity
          testID="sign-in-btn"
          activeOpacity={0.7}
          onPress={() => navigation.navigate(screenNames.signIn)}>
          <Text style={notificationStyles.signInText}>Sign in to continue</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <FlatList
      testID="notification-flatlist"
      accessibilityLabel="flatlist"
      scrollEnabled={length > 8}
      data={followersNotifications}
      renderItem={({item, index}) => (
        <ProductCard
          minHeight={hp('8%')}
          maxWidth={wp('95%')}
          paddingLeft={0}
          key={index}>
          <TouchableOpacity
            testID={`follower-${index + 1}`}
            activeOpacity={0.8}
            style={notificationStyles.item}
            onPress={() => navigateToProfile(item.userId)}>
            <View style={notificationStyles.imgAndNameCon}>
              <Avatar
                size={hp('5%')}
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                containerStyle={{backgroundColor: 'gray'}}
              />
              <View>
                <View style={notificationStyles.imgAndNameCon}>
                  <Text style={notificationStyles.name} numberOfLines={1}>
                    {item.userName}
                  </Text>
                  <Text style={notificationStyles.label}>followed you</Text>
                </View>

                <Text style={notificationStyles.sharedText}>
                  {moment(new Date(item.date).toISOString()).format(
                    'ddd h:mm A',
                  )}
                </Text>
              </View>
            </View>
            <View>
              <Text style={notificationStyles.period}>
                {moment(new Date(item.date).toISOString()).fromNow(true)}
              </Text>
            </View>
          </TouchableOpacity>
        </ProductCard>
      )}
      contentContainerStyle={notificationStyles.itemcon}
      ListEmptyComponent={
        <Text style={notificationStyles.noNotificationLabel}>
          No notification at the moment
        </Text>
      }
      ListHeaderComponent={
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      }
    />
  );
};

export default Notification;
