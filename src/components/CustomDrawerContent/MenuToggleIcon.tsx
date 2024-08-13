import React from 'react';
import {View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {NavigationProps} from '../..//screen';
import themes from '../../config/themes';
import {customDrawerStyles} from './CustomDrawerContent/customDrawerStyles';

const MenuToggleIcon = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View>
      <Entypo
        size={themes.SIZES.MEDIUM}
        color={themes.COLORS.BLACK}
        name="menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={customDrawerStyles.icon}
      />
    </View>
  );
};

export default MenuToggleIcon;
