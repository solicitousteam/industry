import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from '../../Component/Text';
import { strings } from '../../localization/i18n';

const ThankYou = ({ navigation, route }) => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3877F1" />
      <View style={{ paddingHorizontal: 10, flex: 1, backgroundColor: '#fff' }}>
        {/* <View
            style={{
                // flex:1,
            }}>
            
          </View> */}
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <View
            style={{
              //   marginTop: '20%',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                width: 144,
                height: 144,
                borderRadius: 72,
                alignSelf: 'center',
                backgroundColor: '#EAF1FF',
                justifyContent: 'center',
                marginBottom: 35,
              }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/OTP.png')}
                  style={{ justifyContent: 'center' }}
                // resizeMode={'stretch'}
                />
              </View>
            </View>
            <View>
              <CustomText
                regular
                style={{
                  fontSize: 34,
                  color: '#3877F1',
                  // fontFamily: 'OpenSans-Regular',
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                {strings("ThankYou.lbl_thank_you")}
              </CustomText>
              <CustomText
                regular
                style={{
                  marginTop: 10,
                  fontSize: 17,
                  color: '#000',
                  // fontFamily: 'OpenSans-Regular',
                  textAlign: 'center',
                }}>
                {strings("ThankYou.lbl_account_is_under_verification")}
              </CustomText>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Start")}
          style={{
            marginBottom: 20,
            marginTop: 20,
            borderRadius: 48,
            paddingVertical: 16,
            backgroundColor: '#3877F1',
            shadowColor: '#3877F1',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 9,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View style={{ width: 10 }}></View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <CustomText
              regular
              style={{
                fontSize: 18,
                color: '#fff',
                // fontFamily: 'OpenSans-Regular',
                fontWeight: '700',
              }}>
              {strings("ThankYou.lbl_explore_as_guest")}
            </CustomText>
          </View>
          <View>
            <Image
              source={require('../../../assets/Login_Arrow.png')}
              style={{ width: 27.5, height: 26.7 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

}
export default ThankYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    ...Platform.select({
      android: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'center',
        // marginTop: "20%",
      },
      ios: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'center',
        marginTop: '20%',
      },
    }),
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
