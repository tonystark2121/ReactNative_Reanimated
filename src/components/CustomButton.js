/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';
import {scale} from 'react-native-size-matters';
import {ActivityIndicator} from 'react-native-paper';

const CustomButton = ({
  secondary = true,
  width = '90%',
  title,
  onPress = () => {},
  props,
  marginTop = Sizes.hp('2%'),
  customStyle,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      {...props}
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled
          ? '#D0D0E2'
          : secondary
          ? Colors.SECONDRY
          : Colors.PRIMARY,
        height: 50,
        width: Sizes.wp(width),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.hp('2%'),
        marginTop: marginTop,

        ...customStyle,
      }}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={{color: '#fff', fontSize: scale(19), letterSpacing: 1}}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
