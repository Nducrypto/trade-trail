import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {CustomButton} from '../';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStartedStorageKey, hp, wp} from '../../config/appConfig';
import {useGetStarted} from '../../hook/useGetStarted';
import {getStartedStyles} from './getStartedStyles';

const GetStarted = () => {
  const {updateHasVisitedBefore} = useGetStarted();
  const handleGetStarted = async () => {
    try {
      updateHasVisitedBefore(false);
      AsyncStorage.setItem(
        getStartedStorageKey,
        JSON.stringify('This user has visied'),
      );
    } catch (error) {
      throw new Error('failed to update get Started');
    }
  };
  const circles = [
    {top: 10, left: -40, size: 100, radius: 50},
    {top: 20, left: wp('90%'), size: 140, radius: 70},
    {top: 250, left: 30, size: 130, radius: 65},
    {
      top: hp('54%'),
      left: wp('86%'),
      size: 130,
      radius: 65,
    },
    {top: hp('83%'), left: 60, size: 110, radius: 60},
  ];
  return (
    <View style={getStartedStyles.background}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      {circles.map((circle, index) => (
        <View
          key={index}
          style={[
            getStartedStyles.circle,
            {
              top: circle.top,
              left: circle.left,
              width: circle.size,
              height: circle.size,

              borderRadius: circle.radius,
            },
          ]}
        />
      ))}
      <Text style={getStartedStyles.text}> Urban article</Text>
      <View style={getStartedStyles.container}>
        <Text style={getStartedStyles.desc}>
          Your ultimate shopping destination
        </Text>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <View style={getStartedStyles.button}>
          <CustomButton
            title="Get Started"
            width={wp('90%')}
            onPress={() => handleGetStarted()}
            testID="get-started-button"
          />
        </View>
      </View>
    </View>
  );
};

export default GetStarted;
