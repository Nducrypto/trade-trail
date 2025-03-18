import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {styles} from '../authStyles';
import themes from '../../../config/themes';

interface InputWithIconProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  testID: string;
}

const AuthInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  testID,
}: InputWithIconProps) => {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(prev => !prev);
  }

  return (
    <View style={styles.inputContainer}>
      {iconName === 'password' ? (
        <TouchableWithoutFeedback onPress={() => togglePasswordVisibility()}>
          <FontAwesome
            name={showPassword ? 'unlock-alt' : 'lock'}
            size={themes.SIZES.MEDIUM}
            color={themes.COLORS.BLACK}
          />
        </TouchableWithoutFeedback>
      ) : (
        <FontAwesome
          name={iconName}
          size={themes.SIZES.SMALL}
          color={themes.COLORS.BLACK}
        />
      )}

      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="grey"
        onChangeText={onChangeText}
        secureTextEntry={
          placeholder === 'Password' || placeholder === 'Confirm Password'
            ? !showPassword
            : false
        }
        testID={testID}
        accessibilityLabel={placeholder}
      />
    </View>
  );
};

const circles = [
  {top: 90, left: -40, size: 100, radius: 50},
  {top: 20, left: themes.SIZES.FULLWIDTH / 1.24, size: 140, radius: 70},
  {top: 200, left: 30, size: 100, radius: 50},
  {
    top: themes.SIZES.FULLHEIGHT / 1.7,
    left: themes.SIZES.FULLWIDTH / 1.24,
    size: 100,
    radius: 50,
  },
  {top: themes.SIZES.FULLHEIGHT / 1.2, left: 60, size: 90, radius: 50},
];
export {AuthInput, circles};
