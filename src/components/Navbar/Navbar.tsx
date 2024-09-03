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
import {useChat} from '../../hook/useChat';
import {countUnreadMessages} from '../../controller/chats';
import {Badge} from '@rneui/base';

interface Props {
  color?: boolean;
  chat?: boolean;
}
const Navbar = ({color, chat}: Props) => {
  useAuthentication();
  const navigation = useNavigation<NavigationProps>();
  const {COLORS} = themes;
  const {updatePreviousRoute} = useGlobalState();
  const {currentUser, isUserLoading} = useUser();
  const {userId, email, friends} = currentUser;
  const {items} = useCart();
  const {allChats} = useChat();

  const cartItems = Object.values(items);
  const validRouteNames: (keyof RootStackParamList)[] = [
    screenNames.productDetail,
    screenNames.cart,
    screenNames.productList,
    screenNames.profile,
  ];

  useEffect(() => {
    if (!email && !isUserLoading) {
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
  }, [navigation, email, isUserLoading]);

  const unviewedNotifications = friends.filter(
    item => item.status === 'unViewed',
  );
  const notificationLength = unviewedNotifications.length;
  const newMessageLength = countUnreadMessages(userId, allChats);
  const cartLength = cartItems.length;

  return (
    <View style={navbarStyles.container}>
      {chat ? (
        <TouchableOpacity
          testID="chat-icon-btn"
          onPress={() => navigation.navigate(screenNames.chatList)}
          style={{...navbarStyles.button, width: wp('7%')}}>
          <Ionicons
            name="chatbubble-ellipses-sharp"
            size={wp('5.5%')}
            color={color ? COLORS.WHITE : COLORS.BLACK}
          />
          {newMessageLength > 0 && (
            <Badge
              badgeStyle={navbarStyles.indicator}
              value={newMessageLength}
            />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          testID="notification-icon-btn"
          onPress={() => navigation.navigate(screenNames.notifications)}
          style={{...navbarStyles.button, width: wp('7%')}}>
          <Ionicons
            name="notifications"
            size={wp('5.5%')}
            color={color ? COLORS.WHITE : COLORS.BLACK}
          />
          {notificationLength > 0 && (
            <Badge
              badgeStyle={navbarStyles.indicator}
              value={notificationLength}
            />
          )}
        </TouchableOpacity>
      )}

      <TouchableOpacity
        testID="cart-icon-btn"
        onPress={() => navigation.navigate(screenNames.cart)}
        style={navbarStyles.button}>
        <MaterialIcons
          name="shopping-basket"
          size={wp('5.5%')}
          color={color ? COLORS.WHITE : COLORS.BLACK}
        />

        {cartLength > 0 && (
          <Badge badgeStyle={navbarStyles.indicator} value={cartLength} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
