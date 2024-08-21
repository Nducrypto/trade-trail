import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../config/appConfig';
import themes from '../../../config/themes';

export const productStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 27,
  },
  product: {
    borderWidth: 0,
  },
  productTitle: {
    fontWeight: 'bold',
    paddingBottom: 6,
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.BLACK,
  },
  viewArticle: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.GRADIENT_START,
    fontWeight: '500',
  },
  productDescription: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    elevation: 1,
    flex: 1,
  },
  image: {
    borderRadius: 3,
    height: hp('17%'),
    width: 'auto',
  },
  horizontalImage: {
    height: hp('17.5%'),
    width: wp('42%'),
  },
  fullImage: {
    height: hp('25%'),
    width: 'auto',
  },
});
