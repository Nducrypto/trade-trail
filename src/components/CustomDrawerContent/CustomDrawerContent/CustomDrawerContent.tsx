import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  ListRenderItem,
  Image,
} from 'react-native';
import {
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {auth, signOut} from '../../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themes from '../../../config/themes';
import {getStartedStorageKey} from '../../../config/appConfig';
import {screenNames} from '../../../screen';
import {customDrawerStyles} from './customDrawerStyles';
import {useGetStarted} from '../../../hook/useGetStarted';
import {useUser} from '../../../hook/useUser';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [selectedLabel, setSelectedLabel] = useState<string>('Home');
  const {updateHasVisitedBefore} = useGetStarted();
  const {currentUser} = useUser();

  function handleNavigation(screenName: string) {
    if (screenName === 'Logout') {
      handleSignOut();
      return;
    }
    if (screenName === screenNames.profile) {
      props.navigation.navigate(screenName, {
        profileId: currentUser?.userId,
      });
      return;
    }
    props.navigation.navigate(screenName);
    setSelectedLabel('Home');
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem(getStartedStorageKey);
      updateHasVisitedBefore(false);
      setSelectedLabel('Home');
      props.navigation.navigate(screenNames.homeStack);
    } catch (error) {
      throw Error('Error login out');
    }
  };

  const isSelectedLabel = (label: string): boolean => {
    const isSelected = label === selectedLabel;
    return isSelected;
  };
  type ItemProps = {
    label: string;
    name: string;
    screen: string;
    Icon: any;
    // Icon: Partial<{}>;
    color: string;
  };

  const screens = [
    {
      label: 'Home',
      name: 'home',
      screen: screenNames.homeStack,
      Icon: Feather,
      color: 'grey',
    },

    {
      label: 'Article',
      name: 'users',
      screen: screenNames.homeStack,
      Icon: Feather,
      color: 'blue',
    },
    ...(currentUser && currentUser.email
      ? [
          {
            label: 'Profile',
            name: 'user',
            screen: screenNames.profile,
            Icon: EvilIcons,
            color: 'purple',
          },
          {
            label: 'Account',
            name: 'cog',
            screen: screenNames.settingsStack,
            Icon: Entypo,
            color: 'indigo',
          },
        ]
      : []),
  ];

  const authScreens = [
    ...(currentUser && currentUser.email
      ? [
          {
            label: 'Log Out',
            screen: 'Logout',
            color: themes.COLORS.ORANGE,
            Icon: AntDesign,
            name: 'logout',
          },
        ]
      : [
          {
            label: screenNames.signIn,
            screen: screenNames.signIn,
            color: 'gray',
            Icon: MaterialCommunityIcons,
            name: 'import',
          },
          {
            label: screenNames.signUp,
            screen: screenNames.signUp,
            color: themes.COLORS.BUTTON_COLOR,
            Icon: Feather,
            name: 'user-plus',
          },
        ]),
  ];

  const renderItem: ListRenderItem<ItemProps> = ({item}) => {
    const selectedLabel = isSelectedLabel(item.label);
    return (
      <View
        style={[
          customDrawerStyles.menuItem,
          {
            ...(selectedLabel && {
              backgroundColor: themes.COLORS.BUTTON_COLOR,
            }),
          },
        ]}>
        <DrawerItem
          icon={() => (
            <item.Icon
              name={item.name}
              size={themes.SIZES.SMALL}
              color={
                isSelectedLabel(item.label) ? themes.COLORS.WHITE : item.color
              }
            />
          )}
          label={item.label}
          onPress={() => {
            handleNavigation(item.screen);
          }}
          labelStyle={{
            fontSize: themes.FONT_SIZES.MEDIUM,
            color: selectedLabel ? themes.COLORS.WHITE : themes.COLORS.BLACK,
          }}
          testID={`${item.label}`}
        />
      </View>
    );
  };
  return (
    <View style={customDrawerStyles.drawerContent}>
      <View style={customDrawerStyles.header}>
        <View style={customDrawerStyles.nameCon}>
          <Image
            source={{
              uri: 'https://img.freepik.com/premium-vector/vector-design-macadamia-icon-style_822882-368932.jpg?size=626&ext=jpg&ga=GA1.1.1687862885.1720530140&semt=ais_hybrid',
            }}
            style={customDrawerStyles.image}
          />
          <Text style={customDrawerStyles.name}>mabench</Text>
        </View>
        {Platform.OS !== 'ios' && (
          <TouchableOpacity>
            <Entypo
              size={themes.SIZES.MEDIUM}
              color={themes.COLORS.BLACK}
              name="menu"
              onPress={() => props.navigation.closeDrawer()}
              style={customDrawerStyles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        scrollEnabled={screens.length > 5}
        data={screens}
        contentContainerStyle={customDrawerStyles.menu}
        renderItem={renderItem}
        keyExtractor={item => item.label}
      />

      <FlatList
        scrollEnabled={false}
        data={authScreens}
        contentContainerStyle={customDrawerStyles.menu}
        renderItem={renderItem}
        keyExtractor={item => item.label}
      />
    </View>
  );
};

export default CustomDrawerContent;
