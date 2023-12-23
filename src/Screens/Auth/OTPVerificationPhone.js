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
  ImageBackground,
} from 'react-native';
import Config from '../../Networking/Config';
import { SafeAreaView } from 'react-native-safe-area-context';
// import OTPInput from 'react-native-otp';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { strings } from "../../localization/i18n"
import { CustomText } from '../../Component/Text';
import axios from 'axios';

const mobileNumberErrorTitle = 'Error';
export default class OTPVerificationPhone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      verifyotp: '',
      screenType: '',
      phone: props?.route?.params?.mobileNo,
      userId: '',
      isAPILoading: false,
      selectCheckBox: false,
      count: 59,
      resend: false
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

  componentDidMount(props) {
    this.setState({ phone: JSON.stringify(props?.route?.params?.mobileNo) })
    // this.submitMobileNumber()
    this.countingStart()
  }

  countingStart = () => {
    this.timeCounter = setInterval(() => this.onStartCounting(), 1000);
    setTimeout(() => {
      clearInterval(this.timeCounter)
      this.setState({ resend: true })
    }, 60000);
  }

  onStartCounting = () => {
    if (this.state.count > 0) { this.setState({ count: this.state.count - 1 }) }
  }

  verifyOtp = () => {
    if (this.state.verifyotp != this.state.otp) {
      this.showErrorMessage(mobileNumberErrorTitle, strings("OtpVerification.msg_enter_valid_otp"), 5000);
    } else {

      this.props.navigation.navigate('SetNewPassword', {
        'userid': this.state.userId
      })
    }
  };

  submitMobileNumber = async (props) => {
    this.setState({ isAPILoading: true });
    var data = {
      country_code: "+91",
      mobile: this.state.phone,
    }
    await axios.post(`https://app.solicitous.cloud/dcra/api/V1/send_otp`, data, { headers: { 'Content-Type': 'application/json' } })
      .then(async response => {
        // this.setState({ isLoading: false });
        if (response.data.status == 200) {
          console.log('response.dataresponse.dataresponse.data+++++++++++++', response.data);
          this.setState({ isAPILoading: false });

        } else {
          alert(response.data.message)
        }
      })
      .catch(error => {
        this.setState({ isAPILoading: false });
      });
  }

  otpVerification = async () => {
    if (this.state.otp == '') {
      alert('enter OTP')
      return
    } else if (this.state.selectCheckBox == false) {
      alert('Please Select Check Box')
      return
    }
    else {
      var data = {
        otp: this.state.otp,
      }
      this.setState({ isAPILoading: true });
      await axios.post(`https://app.solicitous.cloud/dcra/api/V1/verify_otp`, data, { headers: { 'Content-Type': 'application/json' } })
        .then(async response => {
          // this.setState({ isLoading: false });
          this.setState({ isAPILoading: false });
          if (response.data.status == 200) {
            alert(response.data.message)
            this.setState({ isAPILoading: false });
            this.props.navigation.navigate('Dashboard');
            this.showErrorMessage(
              'DCRA',
              response.data.message,
              // getRegisterData.msg,
              5000,
            );
          } else {
            alert(response.data.message)
          }
        })
        .catch(error => {
          this.setState({ isAPILoading: false });
        });
    }
  }

  resendOTp = async () => {
    var data = {
      otp: this.state.otp,
    }
    this.setState({ isAPILoading: true });
    await axios.post(`https://app.solicitous.cloud/dcra/api/V1/resendOTP`, data, { headers: { 'Content-Type': 'application/json' } })
      .then(async response => {
        console.log('responseresponseresponseresponseresponse', response);
        // this.setState({ isLoading: false });
        this.setState({ isAPILoading: false });
        if (response.data.status == 200) {
          alert(response.data.message)
          this.setState({ isAPILoading: false });
          this.showErrorMessage(
            'DCRA',
            response.data.message,
            // getRegisterData.msg,
            5000,
          );
        } else {
          alert(response.data.message)
        }
      })
      .catch(error => {
        this.setState({ isAPILoading: false });
      });
  }

  render() {
    const { isAPILoading } = this.state;

    if (!isAPILoading) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#3877F1" />
          <ImageBackground source={require('../../../assets/Splash_Background.png')}
            style={styles.image}>
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
                  paddingVertical: '10%',
                  // paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    //   marginTop: '20%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={require('../../../assets/1_Logo.png')}
                      style={{ justifyContent: 'center', width: 92, height: 92 }}
                    // resizeMode={'stretch'}
                    />
                  </View>
                </View>
                <View style={{ backgroundColor: '#558beb', marginTop: '30%', borderRadius: 10 }}>
                  <View style={{marginTop:20}}>
                    <CustomText
                      style={{
                        fontSize: 24,
                        color: '#FFF',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '700',
                        textAlign: 'center',
                      }}>
                      {strings("OtpVerification.lbl_otp_verification")}
                    </CustomText>
                    <CustomText style={{ textAlign: 'center', marginTop: 10, color: '#FFF' }}>
                      {strings("OtpVerification.lbl_we_sent_verification_code")}  {this.state.phone}
                    </CustomText>
                  </View>
                  <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                  {
                    this.state.resend == true ?
                      <TouchableOpacity onPress={() => { this.resendOTp() }} style={{ backgroundColor: '#FFF', marginLeft: 'auto', marginRight: 10, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, }}>
                        <CustomText
                          style={{
                            fontSize: 16,
                            // color: '#3877F1',
                            fontFamily: 'OpenSans-Regular',
                            fontWeight: '600',
                            color: '#000000',
                            marginLeft: 'auto'
                          }}>
                          {strings("OtpVerification.button_resend_code")}
                        </CustomText>
                      </TouchableOpacity>
                      :
                      <Text style={{
                        marginLeft: 'auto', marginRight: 10, fontSize: 16,
                        // color: '#3877F1',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                        color: '#FFF',
                      }}>00:{this.state.count}</Text>
                  }

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10 }}>
                    {
                      this.state.selectCheckBox == false ?
                        <TouchableOpacity onPress={() => { this.setState({ selectCheckBox: !this.state.selectCheckBox }) }}>
                          <View style={{ height: 22, width: 22, backgroundColor: '#FFF', borderRadius: 5 }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => { this.setState({ selectCheckBox: !this.state.selectCheckBox }) }}>
                          <Image source={require('../../../assets/checkbox.png')}
                            style={{ width: 22, height: 22, tintColor: 'white' }} />
                        </TouchableOpacity>
                    }


                    <Text style={{ marginLeft: 10, fontSize: 14, color: '#FFF' }}>I agree and accept Terms & Conditions</Text>
                  </View>
                  {

                    <TouchableOpacity
                      onPress={() => {
                        // this.otpVerification()
                        this.props.navigation.navigate('Dashboard');
                      }}
                      style={{
                        //   marginBottom: 20,
                        marginTop: 20,
                        borderRadius: 48,
                        paddingVertical: 10,
                        backgroundColor: '#FFF',
                        shadowColor: '#3877F1',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 9,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginHorizontal: '30%',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 15,
                        }}>
                        <CustomText
                          style={{
                            fontSize: 18,
                            color: '#000000',
                            fontFamily: 'OpenSans-Regular',
                            fontWeight: '700',
                          }}>
                          {strings("OtpVerification.button_verify")}
                        </CustomText>
                      </View>
                    </TouchableOpacity>
                  }

                  <TouchableOpacity
                    onPress={() => {
                      // this.verifyOtp()
                      // // navigation.navigate('SetNewPassword')
                    }}
                    style={{
                      //   marginBottom: 20,
                      marginTop: 20,
                      borderRadius: 48,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderRadius: 20,
                      borderColor: '#FFF',
                      justifyContent: 'center',
                      marginHorizontal: '30%',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 15,
                      }}>
                      <CustomText
                        style={{
                          fontSize: 18,
                          color: '#FFF',
                          fontFamily: 'OpenSans-Regular',
                          fontWeight: '700',
                        }}>
                        {strings("Common.button_cancel")}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={{ alignItems: 'center', margin: 20, backgroundColor:'red' }}
                    onPress={() => {
                      this.submitMobileNumber()
                    }}
                  >
                  </TouchableOpacity> */}
                  <View style={{height:30}}></View>
                </View>

              </View>
            </ScrollView>
            <FlashMessage ref="otpref" />
          </ImageBackground>
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
    // paddingTop: 10,
    // paddingHorizontal: 10
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
