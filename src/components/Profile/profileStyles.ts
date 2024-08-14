import {StyleSheet} from 'react-native';
import {hp, wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionOne: {
    height: hp('50%'),
    backgroundColor: 'indigo',
  },
  sectionTwo: {
    height: hp('50%'),
    backgroundColor: themes.COLORS.WHITE,
  },
  card: {
    ...themes.SHADOW.LIGHT,
    position: 'absolute',
    marginTop: hp('-30%'),
    left: wp('3%'),
    right: wp('3%'),
    backgroundColor: themes.COLORS.WHITE,
    borderRadius: 6,
    zIndex: 2,
    padding: 16,
    height: hp('100%'),
  },
  image: {
    height: hp('13%'),
    width: wp('23%'),
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: hp('-9%'),
  },
  buttonCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp('7%'),
    marginTop: hp('2%'),
  },
  button: {
    backgroundColor: themes.COLORS.PURPLE,
    padding: wp('2%'),
    borderRadius: 6,
  },
  buttonText: {
    color: themes.COLORS.WHITE,
    fontWeight: '700',
    fontSize: themes.FONT_SIZES.SMALL,
  },
  labelSection: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp('0.5%'),
  },
  value: {
    textAlign: 'center',
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '700',
  },
  label: {
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.SMALL,
  },
  name: {
    textAlign: 'center',
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: 'bold',
  },
  locationCon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  location: {
    color: 'gray',
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '500',
    marginTop: hp('0.9%'),
  },
  bio: {
    marginTop: 15,
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '300',
    paddingHorizontal: wp('3%'),
    textAlign: 'center',
  },
  showMoreBtn: {
    alignSelf: 'center',
    marginTop: 5,
  },
  showMoreText: {
    color: themes.COLORS.BUTTON_COLOR,
    fontSize: themes.FONT_SIZES.MEDIUM,
  },

  albumLabel: {
    marginTop: 10,
    color: themes.COLORS.BLACK,
    fontWeight: '700',
  },
  viewBtnCon: {
    alignSelf: 'flex-end',
  },
  viewAllBtnText: {
    color: themes.COLORS.BUTTON_COLOR,
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '300',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    width: wp('26%'),
    height: hp('13%'),
    marginRight: wp('4%'),
  },

  albumsCon: {
    marginTop: 5,
    paddingBottom: 20,
  },

  emptyText: {
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '500',
    textAlign: 'center',
    margin: hp('10%'),
  },
});
