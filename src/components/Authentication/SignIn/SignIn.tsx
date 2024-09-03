import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as firebase from '../../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {AuthInput, circles} from '../AuthInput';
import CustomButton from '../../CustomButton/CustomButton';
import {styles} from '../authStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {signInWithGoogle} from '../../../utils/firebaseUtils';
import {hp, wp} from '../../../config/appConfig';
import {DynamicNavigationProps, screenNames} from '../../../screen';
import themes from '../../../config/themes';
import {useUser} from '../../../hook/useUser';
import {useGlobalState} from '../../../hook/useGlobal';

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {currentUser, isUserLoading} = useUser();
  const {previousRoute, utilityProfileId} = useGlobalState();
  const navigation = useNavigation<DynamicNavigationProps>();
  const {navigate} = navigation;
  const handleLoginWithEmail = async () => {
    setLoading(true);
    try {
      const userCredential = await firebase.signInWithEmailAndPassword(
        firebase.auth,
        email,
        password,
      );

      if (userCredential) {
        if (utilityProfileId === screenNames.profile) {
          navigation.navigate(previousRoute, {
            profileId: utilityProfileId,
          });
          setLoading(false);
          return;
        }
        navigation.navigate(previousRoute);
      }
      setLoading(false);
    } catch (error) {
      if (error instanceof firebase.FirebaseError) {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert('User not found');
        } else {
          Alert.alert('An error occurred');
        }
      }
      setLoading(false);
    }
  };
  function handleSignInWithGoogle() {
    signInWithGoogle({navigate, previousRoute, setLoading});
  }

  useEffect(() => {
    if (currentUser && currentUser?.email && !isUserLoading) {
      navigation.navigate(screenNames.homeStack);
    }
  }, [currentUser, isUserLoading, navigation]);

  return (
    <View style={styles.signupContainer}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      {circles.map((circle, index) => (
        <View
          key={index}
          style={[
            styles.circle,
            {
              top: circle.top,
              left: circle.left,
              width: circle.size,
              height: circle.size,
              backgroundColor: 'white',
              opacity: 0.2,
              borderRadius: circle.radius,
            },
          ]}
        />
      ))}
      <View style={styles.card}>
        <View style={styles.headerAndIconCont}>
          <Text style={styles.header}>Sign in with</Text>
          <View style={styles.iconsCon}>
            <TouchableOpacity style={styles.iconBtn}>
              <AntDesign
                name="github"
                color={themes.COLORS.BLACK}
                size={themes.SIZES.SMALL}
                testID="githu-login-icon"
              />
              <Text style={styles.iconBtnText}>Github</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={handleSignInWithGoogle}>
              <AntDesign
                name="google"
                color={themes.COLORS.BLACK}
                size={themes.SIZES.SMALL}
                testID="google-login-icon"
              />
              <Text style={styles.iconBtnText}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.optionText}>or sign in the classic way</Text>

        <View style={styles.sharedCon}>
          <AuthInput
            iconName="envelope"
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
            testID="email-text-field"
          />
          <AuthInput
            iconName="password"
            placeholder="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            testID="password-text-field"
          />

          <View>
            <Text style={styles.forgPass} onPress={() => {}}>
              Forgot your password ?
            </Text>
          </View>
          <View>
            <Text
              style={styles.sharedText}
              onPress={() => navigation.navigate(screenNames.signUp)}>
              Don't have an Account? Sign Up
            </Text>
          </View>

          <View style={styles.authBtnCon}>
            <CustomButton
              title={
                loading ? (
                  <ActivityIndicator
                    color="#ffffff"
                    testID="activity-indicator"
                  />
                ) : (
                  'SIGN IN'
                )
              }
              width={wp('50%')}
              onPress={() => handleLoginWithEmail()}
              testID="sign-in-button"
              marginTop={hp('5%')}
              disabled={!email || !password}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
