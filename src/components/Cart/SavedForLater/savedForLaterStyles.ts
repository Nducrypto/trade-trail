import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../config/appConfig';
import themes from '../../../config/themes';

export const savedForLaterStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 30,
    width: themes.SIZES.FULLWIDTH,
  },
  modalView: {
    marginTop: 50,
    width: wp('100%'),
  },
  itemCon: {
    borderRadius: 20,
    paddingTop: 15,
    elevation: 5,
    marginTop: 10,
    paddingBottom: 50,
    backgroundColor: '#F8F8FF',
    height: themes.SIZES.FULLHEIGHT,
    alignItems: 'center',
  },
  item: {marginVertical: 20},
  closeBtnCon: {
    gap: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: 0,
    width: themes.SIZES.FULLWIDTH,
    paddingVertical: 10,
  },
  label: {
    textAlign: 'center',
    fontSize: themes.FONT_SIZES.LARGE,
    marginBottom: 10,
    color: themes.COLORS.BLACK,
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    marginTop: hp('2%'),
  },
  button: {
    backgroundColor: 'red',
    padding: 7,
    alignItems: 'center',
    width: wp('35%'),
    borderRadius: 3,
  },
});
