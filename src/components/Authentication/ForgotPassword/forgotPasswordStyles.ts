import {StyleSheet} from 'react-native';
import themes from '../../../config/themes';
import {hp} from '../../../config/appConfig';

export const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.COLORS.DARKGREEN,
  },
  text: {
    textAlign: 'center',
    color: themes.COLORS.BLACK,
    marginTop: hp('3%'),
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '700',
  },
  remPasswordButt: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: hp('3%'),
  },
  remPasswordText: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
  },
  link: {
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.MEDIUM,
  },
});
