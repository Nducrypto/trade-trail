import {StackNavigationProp} from '@react-navigation/stack';
// import { ProductInterface } from '../hook/useProduct';

export type RootStackParamList = {
  Sign_In: undefined;
  Sign_Up: undefined;
  Forgot_Password: undefined;
  Home_Stack: undefined;
  Profile_Stack: undefined;
  Settings_Stack: undefined;
  Add_Product: undefined;
  Product_List: undefined;
  Fashion: undefined;
  Beauty: undefined;
  Search: {type?: string; category: string};
  Product_Detail: undefined;
  // ProductDetail: ProductInterface;
  Chat: undefined;
  Cart: undefined;
  Profile: undefined;
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
