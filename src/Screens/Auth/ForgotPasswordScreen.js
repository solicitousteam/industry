import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Config from '../../Networking/Config';
import { strings } from '../../localization/i18n';
import { CustomText } from '../../Component/Text';

const mobileNumberErrorTitle = 'Error';

export default class forgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      isAPILoading: false
    };
    this.mobileNumberRef = this.updateRef.bind(this, 'mobileNumberRef');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  showErrorMessage(title, msg, time) {
    return this.refs.mobileNumberRef.showMessage({
      message: title,
      description: msg,
      type: 'warning',
    });
  }

  async submitMobileNumber() {
    console.log()
    const mobileNumber = this.state.mobileNumber;
    const token = await AsyncStorage.getItem('loginToken');
    console.log(">>>>>>", token + mobileNumber,)
    if (mobileNumber.length !== 10) {
      this.showErrorMessage(mobileNumberErrorTitle, strings("ForgotPassword.msg_invalid_mobilenumber"), 5000);
    } else {
      // this.props.navigation.navigate("OTPVerification")
      this.setState({ isAPILoading: true });
      fetch(Config.baseUrl + 'send_otp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          country_code: '+91',
          mobile: mobileNumber,
        }),
      })
        .then(response => response.json())
        .then(json => {

          console.log('json: ', json);
          if (json.status === 200) {
            this.setState({ isAPILoading: false });
            this.props.navigation.navigate('OTPVerificationPhone', {

              'OTP': json.data.otp,
              'Phone': mobileNumber,
              'userId': json.data.user_id,
            });

          } else {
            this.setState({ isAPILoading: false });
            this.showErrorMessage(
              mobileNumberErrorTitle,
              json?.message
                ? json.message
                : 'Something went wrong!',
              5000,
              2,
            );
          }
        })
        .catch(error => {
          console.log('forgot password error: ', error);
        });
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    const { isAPILoading } = this.state;

    if (!isAPILoading) {
      return (<SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#3877F1" />
        <TouchableOpacity onPress={() => navigate('Login')}>
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
                  marginBottom: 35
                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../../../assets/Lock.png')}
                    style={{ justifyContent: 'center' }}
                  // resizeMode={'stretch'}
                  />
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 30, flex: 1, }}>
              <CustomText
                regular
                style={{
                  fontSize: 24,
                  color: '#000',
                  // fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                {strings("ForgotPassword.lbl_forgot_password")}
              </CustomText>
              <CustomText regular style={{ textAlign: 'center', marginVertical: 15, color: '#000', fontSize: 15, fontWeight: "400" }}>
                {strings("ForgotPassword.lbl_enter_registered_mobilenumber")}
              </CustomText>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <View>
                <CustomText
                  regular
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("ForgotPassword.lbl_mobile_number")}
                </CustomText>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor: '#DFDFDF',
                  marginTop: 5,
                }}>
                <TextInput
                  maxLength={10}
                  value={this.state.mobileNumber}
                  keyboardType={'numeric'}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    color: '#0D2451',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                  }}
                  onChangeText={mobileNumber => this.setState({ mobileNumber: mobileNumber })}
                />
              </View>
            </View>

            <TouchableOpacity onPress={() => this.submitMobileNumber()}
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
                  {strings("Common.button_continue")}
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
        </ScrollView>
        <FlashMessage ref="mobileNumberRef" />
      </SafeAreaView>);
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
    paddingTop: 5,
    paddingHorizontal: 10
  },
});
