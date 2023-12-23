import React, { useEffect, useState, useRef, Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, AsyncStorage, ActivityIndicator,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Config from '../../Networking/Config';
// import OTPInput from 'react-native-otp';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { strings } from "../../localization/i18n"
import { CustomText } from '../../Component/Text';
const mobileNumberErrorTitle = 'Error';
export default class OTPVerification extends Component {

  constructor(props) {
    super(props);

    this.state = {
      otp: '',
      verifyotp: '',
      screenType: '',
      phone: '',
      userId: '',
      isAPILoading: false
    };
    this.otpref = this.updateRef.bind(this, 'otpref');
  }
  updateRef(name, ref) {
    this[name] = ref;
  }
  showErrorMessage(title, msg, time) {
    return this.refs.otpref.showMessage({
      message: title,
      description: msg,
      type: 'warning',
    });
  }

  handleOTPChange = otp => {

    this.setState({
      otp: otp
    })
  };

  componentDidMount() {
    this.setState({
      phone: this.props.route.params.Phone,
      verifyotp: this.props.route.params.OTP,
      userId: this.props.route.params.userId
    })

  }

  verifyOtp = () => {

    if (this.state.verifyotp != this.state.otp) {


      this.showErrorMessage(mobileNumberErrorTitle, strings("OtpVerification.msg_enter_valid_otp"), 5000);
    } else {

      this.props.navigation.navigate('Mpin')

    }
  };

  submitMobileNumber = async () => {

    const token = await AsyncStorage.getItem('loginToken');
    if (this.state.phone.length !== 10) {
      // this.showErrorMessage(mobileNumberErrorTitle, "Enter Valid Mobile number", 5000);
    } else {
      // this.props.navigation.navigate("OTPVerification")
      this.setState({ isAPILoading: true });
      fetch(Config.baseUrl + 'send_otp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          country_code: '+91',
          mobile: this.state.phone,
        }),
      })
        .then(response => response.json())
        .then(json => {

          if (json.status === 200) {
            this.setState({ isAPILoading: false });
            this.setState({
              verifyotp: json.data.otp,
              userId: json.data.user_id
            })
            //  setverifyOtp(json.data.otp)
            // this.props.navigation.navigate('OTPVerification',{
            //   'OTP':json.data.otp,
            //   'Phone':mobileNumber
            // });

          } else {
            this.setState({ isAPILoading: false });
            // this.showErrorMessage(
            //   mobileNumberErrorTitle,
            //   json?.message
            //     ? json.message
            //     : 'Something went wrong!',
            //   5000,
            //   2,
            // );
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  render() {
    const { isAPILoading } = this.state;
    if (!isAPILoading) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#3877F1" />
          {/* <TouchableOpacity onPress={() => navigate('ForgotPassword')}> */}
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
              <Image
                source={require('../../../assets/Back_Arrow.png')}
                style={{ width: 22, height: 20 }}
              // resizeMode={'stretch'}
              />
            </View>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingVertical: '30%',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  //   marginTop: '20%',
                  flexDirection: 'row',
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
              </View>
              <View style={{ paddingHorizontal: 30, flex: 1 }}>
                <CustomText
                  regular
                  style={{
                    fontSize: 24,
                    color: '#000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {strings("OtpVerification.lbl_otp_verification")}
                </CustomText>
                <CustomText style={{ textAlign: 'center', marginTop: 10 }}>
                  {strings("OtpVerification.lbl_we_sent_verification_code")}  {this.state.phone}
                </CustomText>
              </View>
              <View>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  {/* <OTPInput
                  value={this.state.mpin}
                  onChange={this.handleOTPChange}
                  tintColor="#FB6C6A"
                  offTintColor="#BBBCBE"
                  otpLength={4}
                  //   containerStyle={{borderColor: "#000", backgroundColor:'red'}}
                  cellStyle={{ borderWidth: 1, borderRadius: 10, width: 45 }}
                /> */}
                  <OTPInputView
                    style={{
                      height: 90,
                      marginHorizontal: '10%',
                      borderRadius: 20,
                    }}
                    pinCount={6}
                    onCodeChanged={code => this.handleOTPChange(code)}
                    autoFocusOnLoad
                    codeInputFieldStyle={{
                      borderRadius: 10,
                      margin: 3,
                      height: 50,
                      width: 50,
                      color: '#000',
                    }}
                    codeInputHighlightStyle={{ borderWidth: 1, borderRadius: 10, width: 55 }}
                  // onCodeFilled={code => this.submitMpin(code)}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.verifyOtp()
                  // navigation.navigate('SetNewPassword')

                }}
                style={{
                  //   marginBottom: 20,
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
                    {strings("OtpVerification.button_verify")}
                  </CustomText>
                </View>
                <View>
                  <Image
                    source={require('../../../assets/Login_Arrow.png')}
                    style={{ width: 27.5, height: 26.7 }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', margin: 20 }}
                onPress={() => {
                  this.submitMobileNumber()
                }}
              >
                <View>
                  <CustomText
                    regular
                    style={{
                      fontSize: 16,
                      color: '#3877F1',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}>
                    {strings("OtpVerification.button_resend_code")}
                  </CustomText>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <FlashMessage ref="otpref" />
        </SafeAreaView>)
    } else {
      return (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center' }}
          size="large"
          color="#3877F1"
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 10
  },
});

