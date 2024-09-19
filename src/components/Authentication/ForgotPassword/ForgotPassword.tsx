import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {AuthInput, circles} from '../AuthInput';
import {styles} from '../authStyles';
import CustomButton from '../../CustomButton/CustomButton.tsx';
import {wp} from '../../../config/appConfig.ts';
import {useGlobalState} from '../../../hook/useGlobal.ts';
import * as firebase from '../../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screenNames} from '../../../screen';
import {forgotPasswordStyles} from './forgotPasswordStyles.ts';

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const {toastSuccess, toastError} = useGlobalState();
  const navigation = useNavigation<NavigationProps>();

  async function handleSend() {
    if (!email) {
      return;
    }
    setLoading(true);
    try {
      await firebase.sendPasswordResetEmail(firebase.auth, email);
      toastSuccess('Password reset mail sent. check your inbox');
      setLoading(false);
    } catch (error) {
      toastError(
        'Oops! An error occured, check your network connection and try again',
      );
      setLoading(false);
    }
    setEmail('');
  }
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
        <Text style={forgotPasswordStyles.text}>
          Input your email to reset password
        </Text>
        <View style={styles.sharedCon}>
          <AuthInput
            iconName="envelope"
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
            testID="email-text-field"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate(screenNames.signIn)}
            style={forgotPasswordStyles.remPasswordButt}>
            <Text style={forgotPasswordStyles.remPasswordText}>
              Remember password ?
            </Text>
            <Text style={forgotPasswordStyles.link}>Login</Text>
          </TouchableOpacity>

          <CustomButton
            title={
              loading ? (
                <ActivityIndicator
                  color="#ffffff"
                  testID="activity-indicator"
                />
              ) : (
                'SUBMIT'
              )
            }
            width={wp('85%')}
            onPress={handleSend}
            testID="forgot-password-btn"
            marginTop={40}
            disabled={!email}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
