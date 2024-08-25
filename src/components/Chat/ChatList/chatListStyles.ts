import {StyleSheet} from 'react-native';
import themes from '../../../config/themes';
import {hp, wp} from '../../../config/appConfig';

export const chatListStyles = StyleSheet.create({
  container: {
    paddingBottom: hp('6%'),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  avatarAndNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: wp('2%'),
  },
  avatar: {
    backgroundColor: 'gray',
  },
  senderName: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
    fontWeight: '700',
  },
  lastMessage: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
    fontWeight: '300',
    marginTop: hp('0.2%'),
  },
  valueContainer: {
    backgroundColor: themes.COLORS.BUTTON_COLOR,
    height: hp('2.5%'),
    width: wp('5%'),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  value: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.WHITE,
  },
  date: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
    fontWeight: '300',
    marginTop: hp('1%'),
  },
});
