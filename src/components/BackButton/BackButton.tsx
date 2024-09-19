import {TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themes from '../../config/themes';
import {wp} from '../../config/appConfig';

interface Props {
  testID: string;
  white?: boolean;
}
const BackButton = ({testID, white}: Props) => {
  const navigation = useNavigation();
  const isIos = Platform.OS === 'ios';
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.9}
      style={{marginLeft: wp('3.2%')}}>
      <Ionicons
        name={isIos ? 'chevron-back-outline' : 'arrow-back'}
        size={isIos ? wp('9%') : wp('5.1%')}
        color={white ? themes.COLORS.WHITE : themes.COLORS.BLACK}
        testID={`${testID}-Back-btn`}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
