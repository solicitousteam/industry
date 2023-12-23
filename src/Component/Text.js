import React from 'react';
import { TextInput, View, StyleSheet, Image, Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import Icon from 'react-native-vector-icons/FontAwesome5';

//TextInput COMPONENT
export const CustomText = (props) => {
  // console.log(props, "================fontSize");
  // console.log(props.fontSize, "================fontSize");
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode ? props.ellipsizeMode : null}
      numberOfLines={props.numberOfLines ? props.numberOfLines : null}
      style={[
        styles.regular,
        props.light && styles.light,
        props.bold && styles.bold,
        props.boldItalic && styles.boldItalic,
        props.extraBold && styles.extraBold,
        props.extraBoldItalic && styles.extraBoldItalic,
        props.lightItalic && styles.lightItalic,
        props.regularItalic && styles.regularItalic,
        props.semibold && styles.semibold,
        props.semiboldItalic && styles.semiboldItalic,
        props.style,
        props?.fontSize && { fontSize: moderateScale(props?.fontSize) }
      ]}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

CustomText.defaultProps = {
  textInputStyle: {},
  // font: moderateScale(14)
};
const styles = StyleSheet.create({
  regular: {
    fontFamily: "OpenSans-Regular",
    color: "black"
  },
  light: {
    fontFamily: "OpenSans-Light",
    color: "black"
  },
  bold: {
    fontFamily: "OpenSans-Bold",
    color: "black"
  },
  boldItalic: {
    fontFamily: "OpenSans-BoldItalic",
    color: "black"
  },
  extraBold: {
    fontFamily: "OpenSans-ExtraBold",
    color: "black"
  },
  extraBoldItalic: {
    fontFamily: "OpenSans-ExtraBoldItalic",
    color: "black"
  },
  lightItalic: {
    fontFamily: "OpenSans-LightItalic",
    color: "black"
  },
  regularItalic: {
    fontFamily: "OpenSans-Italic",
    color: "black"
  },
  semibold: {
    fontFamily: "OpenSans-Semibold",
    color: "black"
  },
  semiboldItalic: {
    fontFamily: "OpenSans-SemiboldItalic",
    color: "black"
  },

});


