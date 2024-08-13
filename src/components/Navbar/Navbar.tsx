import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';
import {screenNames, NavigationProps, RootStackParamList} from '../../screen';
import {navbarStyles} from './navbarStyles';
import themes from '../../config/themes';
import {wp} from '../../config/appConfig';
import {useGlobalState} from '../../hook/useGlobal';

const Navbar = ({color}: {color?: boolean}) => {
  const navigation = useNavigation<NavigationProps>();
  const {COLORS} = themes;
  const {updatePreviousRoute} = useGlobalState();

  const isUserLoading = false;
  const currentUser = {email: 'test@gmail.com,', role: 'Admin'};
  const cartItems = [{email: 'test@gmail.com,', role: 'Admin'}];
  const validRouteNames: (keyof RootStackParamList)[] = [
    screenNames.productDetail,
    screenNames.cart,
    screenNames.productList,
  ];

  useEffect(() => {
    if (!currentUser?.email && !isUserLoading) {
      const unsubscribe = navigation.addListener('state', event => {
        const currentState = event.data.state;

        const getCurrentScreen = event.data.state.routes[currentState.index];

        if (getCurrentScreen) {
          const screenName = getCurrentScreen.name;

          if (validRouteNames.includes(screenName)) {
            updatePreviousRoute(screenName);
          }
        }
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [navigation, currentUser, isUserLoading]);

  const hasNewMessage = true;
  const cartHasItems = cartItems.length > 0;

  return (
    <View style={navbarStyles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(screenNames.chat)}
        style={navbarStyles.button}>
        <Ionicons
          name="notifications"
          size={wp('5.5%')}
          color={color ? COLORS.WHITE : COLORS.BLACK}
        />
        {hasNewMessage && <View style={navbarStyles.indicator} />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(screenNames.cart)}
        style={navbarStyles.button}>
        <MaterialIcons
          name="shopping-basket"
          size={wp('5.5%')}
          color={color ? COLORS.WHITE : COLORS.BLACK}
        />
        {cartHasItems && <View style={navbarStyles.indicator} />}
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
