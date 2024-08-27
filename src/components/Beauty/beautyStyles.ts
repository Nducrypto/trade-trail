import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {hp} from '../..//config/appConfig';

export const beautyStyles = StyleSheet.create({
  container: {
    paddingBottom: hp('9%'),
  },
  itemCon: {
    gap: 20,
    paddingVertical: hp('3%'),
  },
  item: {
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
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
