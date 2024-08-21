import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {hp, wp} from '../../config/appConfig';

export const orderStyles = StyleSheet.create({
  noOrderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('9%'),
  },
  orderList: {
    padding: 5,
  },
  title: {
    color: themes.COLORS.WHITE,
  },
  noOrderHeader: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '600',
    color: themes.COLORS.BLACK,
  },
  orderCard: {
    backgroundColor: themes.COLORS.WHITE,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  orderHeader: {
    marginBottom: 10,
    backgroundColor: themes.COLORS.BUTTON_COLOR,
    padding: 10,
    borderRadius: 10,
  },
  orderHeaderText: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '600',
    color: themes.COLORS.WHITE,
  },
  orderDetails: {
    flexDirection: 'column',
  },
  subtotal: {
    fontWeight: 'bold',
    color: themes.COLORS.WHITE,
    fontSize: wp('4.5%'),
  },
  itemsList: {
    borderTopWidth: 1,
    borderColor: '#DDD',
    paddingTop: 10,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
    width: wp('90%'),
  },
  itemText: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: 'bold',
    color: themes.COLORS.BLACK,
  },
  sharedText: {
    color: themes.COLORS.BLACK,
  },
  itemPrice: {
    fontSize: themes.FONT_SIZES.MEDIUM,
    color: themes.COLORS.GRADIENT_START,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
