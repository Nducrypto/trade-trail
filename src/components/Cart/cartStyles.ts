import {StyleSheet} from 'react-native';
import {hp, wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const cartStyles = StyleSheet.create({
  emptyCartCon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyCartText: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.BLACK,
    fontWeight: '600',
    padding: 12,
  },
  subTotalCont: {
    flexDirection: 'row',
  },
  subTotalLabel: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '500',
    color: themes.COLORS.BLACK,
  },
  subTotalValue: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.ERROR,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: 20,
  },
  viewSavedItemCon: {
    width: wp('50%'),
    alignSelf: 'center',
    marginTop: hp('1%'),
    alignItems: 'center',
  },
  viewSavedItemtext: {
    color: themes.COLORS.BUTTON_COLOR,
    fontWeight: 'bold',
    fontSize: themes.FONT_SIZES.MEDIUM,
  },
  itemCon: {
    alignItems: 'center',
    gap: hp('5%'),
    marginTop: hp('4%'),
  },
  imgAndTextCon: {
    flexDirection: 'row',
    width: wp('62%'),
    gap: 10,
  },
  productTitle: {
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: 'bold',
    color: 'black',
  },
  productDescription: {
    paddingTop: 5,
    height: hp('11.5%'),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inStockCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('55%'),
  },
  price: {
    color: themes.COLORS.GRADIENT_START,
    fontSize: themes.FONT_SIZES.SMALL,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    height: hp('14.5%'),
    width: wp('38%'),
  },

  groupedButCon: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    marginBottom: hp('1.5%'),
    justifyContent: 'space-around',
  },
  optionsButton: {
    width: wp('32%'),
    height: hp('3.9%'),
    color: themes.COLORS.BLACK,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  optionsText: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.WHITE,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.6,
  },
  footerCon: {
    marginBottom: hp('10%'),
  },
  payButCon: {
    alignItems: 'center',
  },
});
