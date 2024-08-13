import {hp, wp} from './appConfig';

export default {
  COLORS: {
    PRIMARY: '#1FAB13',
    SECONDARY: '#DCDCDC',
    ACCENT: '#06402b',
    ERROR: '#FF0000',
    SUCCESS: '#00FF00',
    WHITE: '#ffffff',
    BLACK: '#28231D',
    DARKGREEN: '#06402b',
    BUTTON_COLOR: '#7b00ff',
    MUTED: '#979797',
    GRADIENT_START: '#4B0082',
    INDIGO: '#4B0082',
    ORANGE: '#FF4500',
    BLUE: '#3944BC',
    GRAY: '#808080',
    PURPLE: '#A32CC4',
  },
  SIZES: {
    BLOCK_SHADOW_RADIUS: 2,
    FULLHEIGHT: hp('100%'),
    FULLWIDTH: wp('100%'),
    SMALL: wp('4.8%'),
    MEDIUM: wp('7%'),
    HEADER_HEIGHT: 60,
    FOOTER_HEIGHT: 50,
  },

  FONT_SIZES: {
    SMALL: wp('3.4%'),
    MEDIUM: wp('4.3%'),
    LARGE: wp('5%'),
    EXTRA_LARGE: wp('7.5%'),
    LARGEST: wp('9%'),
  },
  FONT_WEIGHTS: {
    REGULAR: '400',
    BOLD: '700',
    EXTRA_BOLD: '800',
  },
  SPACING: {
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
    EXTRA_LARGE: 32,
  },
  BORDER: {
    THIN: 1,
    MEDIUM: 2,
    THICK: 4,
    RADIUS_SMALL: 4,
    RADIUS_MEDIUM: 8,
    RADIUS_LARGE: 16,
  },
  SHADOW: {
    LIGHT: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    MEDIUM: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    HEAVY: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.5,
      shadowRadius: 12,
    },
  },
};
