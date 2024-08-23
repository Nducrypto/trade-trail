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
import {useAuthentication} from '../../controller/user';
import {useUser} from '../../hook/useUser';
import {useCart} from '../../hook/useCart';

const Navbar = ({color, chat}: {color?: boolean; chat?: boolean}) => {
  useAuthentication();
  const navigation = useNavigation<NavigationProps>();
  const {COLORS} = themes;
  const {updatePreviousRoute} = useGlobalState();
  const {currentUser, isUserLoading} = useUser();
  const {items} = useCart();
  const hasNewNotification = currentUser.friends.length > 0;
  const cartItems = Object.values(items);
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
      {chat ? (
        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.chat)}
          style={{flexDirection: 'row', position: 'relative'}}>
          <Ionicons
            name="chatbubble-ellipses-sharp"
            size={wp('5.5%')}
            color={color ? COLORS.WHITE : COLORS.BLACK}
          />
          {hasNewMessage && <View style={navbarStyles.indicator} />}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.notifications)}
          style={navbarStyles.button}>
          <Ionicons
            name="notifications"
            size={wp('5.5%')}
            color={color ? COLORS.WHITE : COLORS.BLACK}
          />
          {hasNewNotification && <View style={navbarStyles.indicator} />}
        </TouchableOpacity>
      )}

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
