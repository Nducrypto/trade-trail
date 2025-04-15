import {StyleSheet} from 'react-native';
import themes from '../../../config/themes';
import {hp, wp} from '../../../config/appConfig';

export const selectStyles = StyleSheet.create({
  qty: {
    width: wp('24%'),
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1,
    height: hp('3.9%'),
    justifyContent: 'center',
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -16,
    width: wp('24%'),
  },
  dropDownTextStyle: {
    paddingLeft: 16,
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.BLACK,
  },
  valueCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  value: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.WHITE,
  },
});
