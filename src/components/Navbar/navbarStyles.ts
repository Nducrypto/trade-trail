import {StyleSheet} from 'react-native';
import {hp, wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const navbarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 20,
    gap: wp('5%'),
  },
  button: {
    flexDirection: 'row',
    position: 'relative',
  },
  indicator: {
    height: hp('1%'),
    width: wp('2%'),
    backgroundColor: themes.COLORS.ORANGE,
    borderRadius: 50,
    left: wp('-2%'),
  },
});
