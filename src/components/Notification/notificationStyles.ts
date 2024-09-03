import {StyleSheet} from 'react-native';
import {hp, wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const notificationStyles = StyleSheet.create({
  itemcon: {
    alignItems: 'center',
    gap: hp('2%'),
    marginTop: hp('3%'),
    paddingBottom: hp('8%'),
  },
  signInCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: themes.COLORS.BLACK,
    fontWeight: '700',
    fontSize: themes.FONT_SIZES.MEDIUM,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imgAndNameCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.5%'),
    width: wp('30%'),
  },
  name: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '800',
    color: themes.COLORS.BLACK,
  },
  label: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
  },

  sharedText: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.BLACK,
    top: hp('0.5%'),
  },
  period: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.BLACK,
    top: hp('3%'),
  },
  noNotificationLabel: {
    fontSize: themes.FONT_SIZES.LARGE,
    color: themes.COLORS.BLACK,
    fontWeight: '500',
    marginTop: hp('30%'),
  },
});
