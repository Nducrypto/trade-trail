import {StyleSheet} from 'react-native';
import {hp} from '../../config/appConfig';
import themes from '../../config/themes';

export const searchResultStyles = StyleSheet.create({
  itemCon: {
    paddingBottom: hp('5%'),
  },
  item: {
    alignItems: 'center',
  },
  emptyCon: {
    marginTop: hp('30%'),
  },
  emptyTextDesc: {
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: '700',
  },
});
