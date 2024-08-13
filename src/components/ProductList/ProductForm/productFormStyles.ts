import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../config/appConfig';
import themes from '../../../config/themes';

export const addProductStyles = StyleSheet.create({
  label: {
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.MEDIUM,
  },
  input: {
    borderWidth: 1,
    borderColor: themes.COLORS.MUTED,
    borderRadius: 5,
    padding: 10,
    marginBottom: hp('4%'),
    height: hp('7%'),
    color: themes.COLORS.BLACK,
  },
  btnCon: {
    alignItems: 'center',
  },
  itemCon: {marginHorizontal: 20, gap: 20},
  item: {width: wp('35%')},
});
