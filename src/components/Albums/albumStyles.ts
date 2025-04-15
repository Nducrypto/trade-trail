import {StyleSheet} from 'react-native';
import {hp, wp} from '../../config/appConfig';

export const albumStyles = StyleSheet.create({
  container: {
    paddingBottom: hp('9%'),
    gap: hp('4%'),
  },
  itemCon: {
    gap: 20,
    paddingVertical: hp('3%'),
  },
  imageCon: {
    marginTop: hp('4%'),
    width: wp('92%'),
    height: hp('29%'),
  },
  image: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
  },
});
