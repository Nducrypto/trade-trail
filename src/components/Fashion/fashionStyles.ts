import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {hp} from '../..//config/appConfig';

export const fashionStyles = StyleSheet.create({
  container: {
    paddingBottom: hp('9%'),
  },
  itemCon: {
    gap: 20,
    paddingVertical: hp('3%'),
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  item: {
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
