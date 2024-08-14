import {StyleSheet} from 'react-native';
import themes from '../../config/themes';
import {hp, wp} from '../../config/appConfig';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: 'lightgrey',
    height: hp('7.4%'),
    borderRadius: 1,
    borderWidth: 2,
    paddingLeft: wp('2%'),
    backgroundColor: themes.COLORS.WHITE,
  },

  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: themes.COLORS.BLACK,
    height: hp('6.4%'),
    width: wp('90%'),
  },

  signupContainer: {
    flex: 1,
    width: themes.SIZES.FULLWIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.COLORS.GRADIENT_START,
  },
  cardCon: {marginTop: 40},
  card: {
    ...themes.SHADOW.LIGHT,
    backgroundColor: '#F2F7FD',
    borderRadius: 6,
    paddingBottom: 20,
    width: wp('93%'),
    height: 'auto',
  },

  headerAndIconCont: {
    backgroundColor: 'white',
    paddingBottom: hp('4%'),
  },
  header: {
    textAlign: 'center',
    color: themes.COLORS.BLACK,
    fontWeight: '300',
    fontSize: themes.FONT_SIZES.MEDIUM,
    marginTop: 10,
  },

  iconsCon: {
    flexDirection: 'row',
    gap: wp('9%'),
    justifyContent: 'center',
    marginTop: hp('2.3%'),
  },
  iconBtn: {
    ...themes.SHADOW.LIGHT,
    backgroundColor: themes.COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('30%'),
    justifyContent: 'center',
    gap: wp('3%'),
    padding: 6,
  },
  iconBtnText: {
    color: themes.COLORS.BUTTON_COLOR,
    fontWeight: 'bold',
    fontSize: themes.FONT_SIZES.MEDIUM,
  },
  forgPass: {
    color: themes.COLORS.BUTTON_COLOR,
    marginTop: hp('2%'),
    fontWeight: '400',
    marginLeft: wp('3%'),
  },

  optionText: {
    textAlign: 'center',
    color: themes.COLORS.BLACK,
    fontWeight: '200',
    fontSize: themes.FONT_SIZES.MEDIUM,
    marginTop: hp('3%'),
    paddingHorizontal: wp('10%'),
  },
  checkBoxCon: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  privacyPolicy: {
    fontSize: themes.FONT_SIZES.SMALL,
    color: themes.COLORS.BLACK,
  },
  sharedCon: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  sharedText: {
    color: themes.COLORS.BLACK,
    marginTop: hp('2%'),
    marginLeft: wp('3%'),
  },

  circle: {
    position: 'absolute',
    borderRadius: 50,
  },

  authBtnCon: {alignItems: 'center'},
});
