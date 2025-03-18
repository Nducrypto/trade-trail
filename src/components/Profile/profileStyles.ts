import {StyleSheet} from 'react-native';
import {hp, wp} from '../../config/appConfig';
import themes from '../../config/themes';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    height: hp('50%'),
    backgroundColor: 'indigo',
  },
  profileDetailsSection: {
    height: hp('50%'),
    backgroundColor: themes.COLORS.WHITE,
  },
  profileCard: {
    ...themes.SHADOW.LIGHT,
    position: 'absolute',
    marginTop: hp('-30%'),
    left: wp('3%'),
    right: wp('3%'),
    backgroundColor: themes.COLORS.WHITE,
    borderRadius: 6,
    zIndex: 2,
    padding: 16,
    height: hp('100%'),
  },
  avatar: {
    alignSelf: 'center',
    marginTop: hp('-7%'),
    backgroundColor: 'gray',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp('7%'),
    marginTop: hp('2%'),
  },
  actionButton: {
    backgroundColor: themes.COLORS.PURPLE,
    width: wp('23%'),
    height: hp('3.5%'),
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: themes.COLORS.WHITE,
    fontWeight: '700',
    fontSize: themes.FONT_SIZES.SMALL,
  },
  statsSection: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp('0.5%'),
  },
  statsValue: {
    textAlign: 'center',
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '700',
  },
  statsLabel: {
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.SMALL,
  },
  profileName: {
    textAlign: 'center',
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.LARGE,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  locationText: {
    color: 'gray',
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '500',
    marginTop: hp('0.9%'),
  },
  bioText: {
    marginTop: 15,
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.MEDIUM,
    fontWeight: '300',
    paddingHorizontal: wp('3%'),
    textAlign: 'center',
    height: hp('6%'),
  },
  showMoreBtn: {
    alignSelf: 'center',
    marginTop: 5,
  },
  showMoreBtnText: {
    color: themes.COLORS.BUTTON_COLOR,
    fontSize: themes.FONT_SIZES.MEDIUM,
  },

  albumsLabel: {
    marginTop: 10,
    color: themes.COLORS.BLACK,
    fontWeight: '600',
    fontSize: themes.FONT_SIZES.MEDIUM,
  },
  viewAllBtnContainer: {
    alignSelf: 'flex-end',
  },
  viewAllBtnText: {
    color: themes.COLORS.BUTTON_COLOR,
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '300',
  },
  thumbnail: {
    borderRadius: 4,
    marginVertical: 4,
    width: wp('26%'),
    height: hp('13%'),
    marginRight: wp('4%'),
  },

  albumListContainer: {
    marginTop: 5,
    paddingBottom: 20,
  },

  emptyListText: {
    color: themes.COLORS.BLACK,
    fontSize: themes.FONT_SIZES.SMALL,
    fontWeight: '500',
    textAlign: 'center',
    margin: hp('10%'),
  },
});
