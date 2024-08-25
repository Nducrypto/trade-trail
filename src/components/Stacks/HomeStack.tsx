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
        headerRight: () => <Navbar />,
      },
    },
    {
      name: screenNames.productForm,
      component: ProductForm,
      options: {
        title: 'Add Product',
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
        headerRight: () => <Navbar color />,
      },
    },
    {
      name: screenNames.profile,
      component: Profile,
      options: {
        headerRight: () => <Navbar color />,
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
      },
    },
    {
      name: screenNames.beauty,
      component: Beauty,
      options: {
        headerRight: () => <Navbar />,
      },
    },
    {
      name: screenNames.order,
      component: Order,
      options: {
        headerRight: () => <Navbar />,
      },
    },
    {
      name: screenNames.cart,
      component: Cart,
    },
    {
      name: screenNames.notifications,
      component: Notification,
      options: {
        headerRight: () => <Navbar chat />,
      },
    },
    {
      name: screenNames.chatList,
      component: ChatList,
    },
    {
      name: screenNames.chatScreen,
      component: ChatScreen,
      options: {
        title: utilityTitle,
      },
    },
    {
      name: screenNames.signIn,
      component: SignIn,
      options: {
        title: '',
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
