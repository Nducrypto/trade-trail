import {StyleSheet} from 'react-native';
import {hp} from '../../../src/config/appConfig';
import themes from '../../config/themes';

export const customButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: themes.COLORS.BUTTON_COLOR,
    padding: hp('1.5'),
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '700',
    color: themes.COLORS.WHITE,
  },
});
