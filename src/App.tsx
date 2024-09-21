import 'react-native-gesture-handler';
import 'react-native-safe-area-context';
import 'react-native-reanimated';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StatusBar, LogBox, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {screenNames} from './screen';
import {CustomDrawerContent, HomeStack, CustomToast} from './components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {wp} from './config/appConfig';
import themes from './config/themes';
LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: themes.COLORS.WHITE,
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
      <CustomToast />
    </SafeAreaProvider>
  );
}

export default App;
