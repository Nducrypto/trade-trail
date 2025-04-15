import {StyleSheet} from 'react-native';
import {wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const navbarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: wp('5%'),
    width: wp('23%'),
  },
  button: {
    flexDirection: 'row',
    position: 'relative',
  },
  indicator: {
    top: -10,
    backgroundColor: themes.COLORS.BUTTON_COLOR,
    position: 'absolute',
  },
  badgeText: {
    color: themes.COLORS.WHITE,
  },
});
