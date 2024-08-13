/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-safe-area-context';
import 'react-native-reanimated';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StatusBar, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {screenNames} from './screen';
import {CustomDrawerContent} from './components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {wp} from './config/appConfig';

const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <View
      style={{
        marginTop: 200,
        flex: 1,
      }}>
      <Text>Hello</Text>
    </View>
  );
}
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: 'white',
              width: wp('70%'),
            },
          }}
          initialRouteName={screenNames.homeStack}>
          <Drawer.Screen
            options={{
              headerShown: false,
            }}
            name={screenNames.homeStack}
            component={HomeStack}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
