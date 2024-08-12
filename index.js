/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLEWEBCLIENTID, GOOGLEIOSCLIENTID} from '@env';
Feather.loadFont();
Entypo.loadFont();
EvilIcons.loadFont();
Ionicons.loadFont();
Fontisto.loadFont();
FontAwesome.loadFont();
AntDesign.loadFont();
MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();

GoogleSignin.configure({
  webClientId: GOOGLEWEBCLIENTID,
  iosClientId: GOOGLEIOSCLIENTID,
}),
  AppRegistry.registerComponent(appName, () => App);
