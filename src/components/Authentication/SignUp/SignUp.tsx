import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as firebase from '../../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {USERS} from '@env';
import {styles} from '../authStyles';
import {CustomButton} from '../../';
import {AuthInput, circles} from '../AuthInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DynamicNavigationProps} from '../../../screen';
import themes from '../../../config/themes';
import {signInWithGithub, signInWithGoogle} from '../../../utils/firebaseUtils';
import {hp, wp} from '../../../config/appConfig';
import {CheckBox} from '@rneui/themed';
import {useGlobalState} from '../../../hook/useGlobal';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isPolicyAgreed, setIsPolicyAgreed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<DynamicNavigationProps>();
  const {navigate} = navigation;

  const {previousRoute} = useGlobalState();
  const usersRoute = USERS;

  const handleSignupWithEmail = async () => {
    if (!isPolicyAgreed) {
      return;
    }
    setLoading(true);

    try {
      const users = firebase.collection(firebase.firestore, usersRoute);
      const getDocs = firebase.getDocs(users);
      const nameExist = (await getDocs).docs.find(
        user => user.data().userName === userName,
      );

      if (nameExist) {
        setLoading(false);
        return Alert.alert('Username already in use');
      }
      const credential = await firebase.createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password,
      );
      if (!credential) {
        setLoading(false);
        return Alert.alert('User creation failed');
      }

      const userData = {
        userId: credential.user.uid,
        email: credential.user.email,
        role: 'Subscriber',
        joined: new Date().toString(),
        bio: '',
        userName,
        phoneNumber: '',
        age: null,
        friends: [],
        photos: [],
        comments: [],
        city: '',
        country: '',
      };

      await firebase.addDoc(users, userData);

      navigation.navigate(previousRoute);
      setLoading(false);
    } catch (error) {
      if (error instanceof firebase.FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email already in use');
        }
      }
      setLoading(false);
    }
  };

  function handleSignInWithGoogle() {
    signInWithGoogle({navigate, route: previousRoute, setLoading});
  }
  function handleSignInWithGithub() {
    signInWithGithub({navigate, route: previousRoute, setLoading});
  }

  const passwordStrength = !password.length
    ? ''
    : password.length > 5
    ? 'Strong'
    : 'Weak';

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
      <View style={styles.cardCon}>
        <View style={styles.card}>
          <View style={styles.headerAndIconCont}>
            <Text style={styles.header}>Sign up with</Text>
            <View style={styles.iconsCon}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={handleSignInWithGithub}>
                <AntDesign
                  name="github"
                  color={themes.COLORS.BLACK}
                  size={themes.SIZES.SMALL}
                  testID="githu-login-btn"
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
                  testID="google-login-btn"
                />
                <Text style={styles.iconBtnText}>Google</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.optionText}>or sign up the classic way</Text>

          <View style={styles.sharedCon}>
            <AuthInput
              iconName="graduation-cap"
              placeholder="Name"
              value={userName}
              onChangeText={value => setUserName(value)}
              testID="username-text-field"
            />
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

            <View style={styles.passStrengthCon}>
              <Text
                style={{
                  ...styles.passStrengthlabel,
                  color: themes.COLORS.BLACK,
                  fontWeight: '200',
                }}
                onPress={() => {}}>
                password strength:{' '}
              </Text>
              <Text
                style={{
                  color: password.length > 5 ? 'green' : 'red',
                  fontWeight: '700',
                }}>
                {passwordStrength}
              </Text>
            </View>

            <View style={styles.checkBoxCon}>
              <CheckBox
                checked={isPolicyAgreed}
                checkedColor={themes.COLORS.BUTTON_COLOR}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                onPress={() => setIsPolicyAgreed(!isPolicyAgreed)}
                testID="check-box"
              />
              <Text style={styles.privacyPolicy}>
                I agree with the{' '}
                <Text
                  style={{
                    ...styles.privacyPolicy,
                    color: themes.COLORS.BUTTON_COLOR,
                  }}>
                  Privacy Policy
                </Text>
              </Text>
            </View>

            <View style={styles.authBtnCon}>
              <CustomButton
                title={
                  loading ? (
                    <ActivityIndicator
                      color={themes.COLORS.WHITE}
                      testID="activity-indicator"
                    />
                  ) : (
                    'CREATE ACCOUNT'
                  )
                }
                width={wp('50%')}
                onPress={() => handleSignupWithEmail()}
                testID="sign-up-button"
                marginTop={hp('4%')}
                disabled={
                  !email ||
                  !password ||
                  !userName ||
                  !isPolicyAgreed ||
                  password.length < 6
                }
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
