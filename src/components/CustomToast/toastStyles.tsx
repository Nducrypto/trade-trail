import {hp, wp} from '../../config/appConfig';
import themes from '../../config/themes';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  successCon: {
    height: hp('9%'),
    width: wp('95%'),
    padding: 10,
    borderRadius: 5,
    backgroundColor: themes.COLORS.SUCCESS,
  },
  errorCon: {
    height: hp('9%'),
    width: wp('95%'),
    padding: 10,
    borderRadius: 5,
    backgroundColor: themes.COLORS.ERROR,
  },
  text: {
    color: themes.COLORS.WHITE,
    fontSize: themes.FONT_SIZES.SMALL,
  },
  sucText: {
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.SMALL,
  },
});
