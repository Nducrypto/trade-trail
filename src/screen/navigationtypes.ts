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
  Chat: undefined;
  Cart: undefined;
  Albums: {creatorId: string};
  Profile: {profileId: string};
  Settings: undefined;
  Notifications: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
export type DynamicNavigationProps = {
  navigate: <K extends keyof RootStackParamList>(
    screen: K,
    params?: RootStackParamList[K],
  ) => void;
};
