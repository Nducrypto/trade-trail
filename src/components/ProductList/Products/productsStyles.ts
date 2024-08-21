import {StyleSheet} from 'react-native';
import themes from '../../../config/themes';
import {hp, wp} from '../../../config/appConfig';

export const productsStyles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    width: wp('100%'),
    paddingBottom: 10,
  },
  inputCon: {
    height: hp('7%'),
    width: wp('95.4%'),
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgray',
    marginBottom: 10,
    marginTop: hp('2%'),
  },
  input: {
    height: hp('7%'),
    width: wp('88'),
    paddingLeft: 10,
    color: themes.COLORS.BLACK,
  },

  tabs: {
    height: hp('5%'),
    marginBottom: 9,
    elevation: 4,
    flexDirection: 'row',
    gap: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  tab: {
    backgroundColor: 'transparent',
    width: wp('35.4%'),
    height: hp('2.6%'),
    elevation: 0,
    flexDirection: 'row',
  },
  tabContent: {
    flexDirection: 'row',
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300',
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: themes.COLORS.MUTED,
  },
  icon: {
    paddingRight: 8,
    color: themes.COLORS.BLACK,
  },
  products: {
    width: wp('95%'),
    paddingVertical: 16,
  },
  rowItemCon: {
    flexDirection: 'row',
    gap: 10,
  },
  emptyText: {
    fontSize: themes.FONT_SIZES.LARGE,
    marginTop: hp('20%'),
    color: themes.COLORS.BLACK,
  },
});
