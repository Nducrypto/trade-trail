import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../config/appConfig';
import themes from '../../..//config/themes';

export const customDrawerStyles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: themes.COLORS.WHITE,
  },
  header: {
    padding: 10,
    height: hp('12%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: hp('5%'),
    alignItems: 'center',
  },
  nameCon: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: wp('6.4%'),
    fontWeight: '500',
    color: themes.COLORS.BUTTON_COLOR,
  },
  image: {
    height: hp('5%'),
    width: wp('7%'),
  },
  icon: {marginLeft: 10},
  menu: {
    paddingHorizontal: wp('2.5%'),
    marginTop: hp('1%'),
  },
  menuItem: {
    borderRadius: 9,
  },
});
