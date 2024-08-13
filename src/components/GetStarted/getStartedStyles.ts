import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {hp} from '../../config/appConfig';

export const getStartedStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: themes.COLORS.GRADIENT_START,
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: themes.COLORS.WHITE,
    opacity: 0.2,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: themes.FONT_SIZES.LARGEST,
    fontWeight: 'bold',
    color: themes.COLORS.WHITE,
    marginTop: hp('30%'),
    textAlign: 'center',
  },
  desc: {
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: '500',
    color: themes.COLORS.WHITE,
    marginTop: hp('4%'),
  },
  button: {
    top: hp('13%'),
  },
});
