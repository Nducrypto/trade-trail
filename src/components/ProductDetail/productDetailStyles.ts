import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {wp, hp} from '../../config/appConfig';

export const productDetailStyles = StyleSheet.create({
  profile: {
    flex: 1,
    width: wp('100%'),
  },

  profileImage: {
    width: wp('100%'),
    height: hp('50%'),
    alignSelf: 'center',
  },

  optionsCon: {
    width: wp('100%'),
    alignItems: 'center',
    height: hp('50%'),
  },
  options: {
    position: 'relative',
    padding: 15,
    top: -30,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: 'white',
    shadowColor: themes.COLORS.BLACK,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    width: wp('100%'),
    height: hp('100%'),
  },

  nikeText: {
    marginBottom: 8,
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: '500',
    color: themes.COLORS.BLACK,
  },
  imgAndTextCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  imgCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
  },
  avatar: {
    height: hp('7'),
    width: wp('12'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('50%'),
  },
  price: {
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: '700',
    color: themes.COLORS.GRADIENT_START,
    top: -13,
  },
  sharedText: {
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '700',
    color: themes.COLORS.BLACK,
  },
  seller: {
    marginRight: 10,
    color: themes.COLORS.WHITE,
    fontSize: themes.FONT_SIZES.MEDIUM,
  },

  sizeCon: {
    flexDirection: 'row',
    width: wp('87%'),
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 20,
    alignSelf: 'center',
  },
  sizeCell: {
    width: wp('28.8%'),
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    borderRightWidth: 1,
    borderRightColor: 'lightgray',
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCon: {alignItems: 'center'},
});
