import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  MenuToggleIcon,
  Navbar,
  GetStarted,
  Products,
  ProductForm,
  ProductDetail,
} from '../index';
import {useGetStarted} from '../../hook/useGetStarted';
import {screenNames} from '../../screen';

const Tab = createStackNavigator();

const HomeStack = () => {
  const {hasUserVisitedBefore} = useGetStarted();
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
