import {Platform, StyleSheet} from 'react-native';
import themes from '../../config/themes';

export const productCardStyles = StyleSheet.create({
  card: {
    backgroundColor: themes.COLORS.WHITE,
    justifyContent: 'center',

    ...Platform.select({
      ios: {
        ...themes.SHADOW.LIGHT,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
