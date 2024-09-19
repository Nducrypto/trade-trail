import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  MenuToggleIcon,
  Navbar,
  GetStarted,
  Products,
  ProductForm,
  ProductDetail,
  Profile,
  SignIn,
  SignUp,
  Fashion,
  Beauty,
  Cart,
  Order,
  Notification,
  ChatList,
  ChatScreen,
  SearchResult,
  Albums,
  BackButton,
  ForgotPassword,
} from '../index';
import {useGetStarted} from '../../hook/useGetStarted';
import {screenNames} from '../../screen';
import themes from '../../config/themes';
import {useGlobalState} from '../../hook/useGlobal';

const Tab = createStackNavigator();

const HomeStack = () => {
  const {hasUserVisitedBefore} = useGetStarted();
  const {utilityTitle} = useGlobalState();
  const defaultScreenOptions = {
    headerBackTitleVisible: false,
    headerTintColor: 'black',
  };

  const routes = [
    {
      name: screenNames.productList,
      component: Products,
      options: {
        title: 'Home',
        headerLeft: () => <MenuToggleIcon />,
        headerRight: () => <Navbar testID="productsScreen" />,
      },
    },
    {
      name: screenNames.productForm,
      component: ProductForm,
      options: {
        title: 'Add Product',
        headerLeft: () => <BackButton testID="productForm" />,
      },
    },
    {
      name: screenNames.productDetail,
      component: ProductDetail,
      options: {
        headerTitle: '',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerRight: () => <Navbar color testID="productDetailScreen" />,
        headerLeft: () => <BackButton testID="productDetail" />,
      },
    },
    {
      name: screenNames.profile,
      component: Profile,
      options: {
        headerRight: () => <Navbar color />,
        headerLeft: () => <BackButton testID="profile" white />,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'indigo',
        },
        headerTintColor: themes.COLORS.WHITE,
      },
    },
    {
      name: screenNames.fashion,
      component: Fashion,
      options: {
        headerRight: () => <Navbar />,
        headerLeft: () => <BackButton testID="fashion" />,
      },
    },
    {
      name: screenNames.beauty,
      component: Beauty,
      options: {
        headerRight: () => <Navbar />,
        headerLeft: () => <BackButton testID="beauty" />,
      },
    },
    {
      name: screenNames.searchResult,
      component: SearchResult,
      options: {
        title: utilityTitle,
        headerLeft: () => <BackButton testID="searchResult" />,
      },
    },
    {
      name: screenNames.order,
      component: Order,
      options: {
        headerRight: () => <Navbar />,
        headerLeft: () => <BackButton testID="order" />,
      },
    },
    {
      name: screenNames.cart,
      component: Cart,
      options: {
        headerLeft: () => <BackButton testID="cart" />,
      },
    },
    {
      name: screenNames.notifications,
      component: Notification,
      options: {
        headerRight: () => <Navbar chat testID="notificationScreen" />,
        headerLeft: () => <BackButton testID="notification" />,
      },
    },
    {
      name: screenNames.chatList,
      component: ChatList,
      options: {
        headerLeft: () => <BackButton testID="chatList" />,
      },
    },
    {
      name: screenNames.albums,
      component: Albums,
      options: {
        title: utilityTitle,
        headerLeft: () => <BackButton testID="albums" />,
      },
    },
    {
      name: screenNames.chatScreen,
      component: ChatScreen,
      options: {
        title: utilityTitle,
        headerLeft: () => <BackButton testID="chatScreen" />,
      },
    },
    {
      name: screenNames.signIn,
      component: SignIn,
      options: {
        title: '',
        headerLeft: () => <BackButton testID="signIn" white />,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
      },
    },
    {
      name: screenNames.forgotPassword,
      component: ForgotPassword,
      options: {
        title: '',
        headerLeft: () => <BackButton testID="forgotPassword" white />,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
      },
    },
    {
      name: screenNames.signUp,
      component: SignUp,
      options: {
        headerLeft: () => <BackButton testID="signUp" white />,
        title: '',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
      },
    },
  ];

  return (
    <Tab.Navigator screenOptions={defaultScreenOptions}>
      {hasUserVisitedBefore ? (
        routes.map(route => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))
      ) : (
        <Tab.Screen
          name="GetStarted"
          component={GetStarted}
          options={{headerShown: false}}
        />
      )}
    </Tab.Navigator>
  );
};

export default HomeStack;
