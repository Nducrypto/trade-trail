import {StackNavigationProp} from '@react-navigation/stack';
import {ProductInterface} from '../hook/useProducts';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  HomeStack: undefined;
  ProfileStack: undefined;
  SettingsStack: undefined;
  AddProduct: undefined;
  ProductList: undefined;
  Fashion: undefined;
  Beauty: undefined;
  ProductDetail: ProductInterface;
  ChatScreen: {profileId: string; profileName: string};
  ChatList: undefined;
  Cart: undefined;
  Order: undefined;
  Albums: {creatorId: string};
  Profile: {profileId: string};
  Settings: undefined;
  Notifications: undefined;
  SearchResult: {type: string; category: string};
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
export type DynamicNavigationProps = {
  navigate: <K extends keyof RootStackParamList>(
    screen: K,
    params?: RootStackParamList[K],
  ) => void;
};
