import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {notificationStyles} from './notificationStyles';
import {useUser} from '../../hook/useUser';
import {Avatar} from '@rneui/themed';
import {hp, wp} from '../../config/appConfig';
import moment from 'moment';
import {ProductCard} from '../';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screenNames} from '../../screen';
const Notification = () => {
  const {currentUser} = useUser();
  const navigation = useNavigation<NavigationProps>();
  const proceedToProfile = (userId: string) => {
    navigation.navigate(screenNames.profile, {
      profileId: userId,
    });
  };
  const array = currentUser.friends;

  return (
    <FlatList
      scrollEnabled={array.length > 8}
      data={array}
      renderItem={({item, index}) => (
        <ProductCard
          minHeight={hp('8%')}
          maxWidth={wp('95%')}
          paddingLeft={0}
          key={index}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={notificationStyles.item}
            onPress={() => proceedToProfile(item.userId)}>
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
    />
  );
};

export default Notification;
