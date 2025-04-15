import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {styles} from './toastStyles';
import {useGlobalState} from '../../hook/useGlobal';

function CustomToast() {
  const {text2, type, closeToast, isVisible} = useGlobalState();

  useEffect(() => {
    if (isVisible) {
      showToast();
      setTimeout(() => {
        exitToast();
      }, 3000);
    }
  }, [isVisible]);

  const showToast = () => {
    Toast.show({
      type: 'tomatoToast',
      text1: type,
      text2: `👋 ${text2}`,
    });
  };
  const exitToast = () => {
    closeToast();
  };
  const toastConfig = {
    tomatoToast: ({text1, text2}: {text1: string; text2: string}) => {
      const isSuccess = text1 === 'success';

      return (
        <View style={isSuccess ? styles.successCon : styles.errorCon}>
          <Text style={isSuccess ? styles.sucText : styles.text}>{text1}</Text>
          <Text style={isSuccess ? styles.sucText : styles.text}>{text2}</Text>
        </View>
      );
    },
  };

  if (!isVisible) {
    return null;
  } else {
    return <Toast config={toastConfig as ToastConfig} />;
  }
}

export default CustomToast;
