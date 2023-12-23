import React, { Component } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { strings } from "../../localization/i18n"
import OTPInput from 'react-native-otp';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Config from '../../Networking/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { LoginMpin } from '../../Redux/Action/Auth';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import { notificationHandler } from './notificationHandler';
import PushNotification from 'react-native-push-notification'
import messaging from '@react-native-firebase/messaging';
const SetMpinErrorTitle = 'Error';
import { Notifications } from 'react-native-notifications';
import { CustomText } from '../../Component/Text';
import { moderateScale } from 'react-native-size-matters';
class MpinLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '1,2,3,4',
      token: '',
      loginMpin: '',
      isAPILoading: false,
      userName: '',
      mobileNumber: '',
      sceen: '',
      feedInfoid: ''
    };
    this.setLoginMpinRef = this.updateRef.bind(this, 'setLoginMpinRef');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }
  showErrorMessage(title, msg, time) {
    return this.refs.setLoginMpinRef.showMessage({
      message: title,
      description: msg,
      type: 'warning',
    });
  }
  // handleOTPChange = otp => {
  //   this.setState({otp: otp});
  //   console.log(this.state.otp,"{{{{{{{{{{{{{{{{")
  // };

  async componentDidMount() {



    messaging().onNotificationOpenedApp(remoteMessage => {
      alert()
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );

    });




    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
      console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
      completion({ alert: false, sound: false, badge: false });
    });

    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
      console.log(`Notification opened:>>>>>>>>>>>>>>`, JSON.stringify(notification.payload));
      this.setState({
        feedInfoid: notification.payload.object_id
      })
      completion();
    });
    const loginToken = await AsyncStorage.getItem('loginToken');
    const userMpin = await AsyncStorage.getItem('loginMpin');
    const userName = await AsyncStorage.getItem('loginUserName');
    const phone = await AsyncStorage.getItem('phone');
    console.log(phone)
    this.setState({
      loginToken: loginToken,
      loginMpin: userMpin,
      userName: userName,
      mobileNumber: phone

    });
  }

  // clearOTP = () => {
  //   this.setState({otp: undefined});
  // };

  async submitMpin(code) {
    this.setState({ isAPILoading: true });
    const mpin = this.state.loginMpin;
    const token = this.state.loginToken;
    console.log(token, '}}}}}}}}}}}}}}}');
    const otp = code;
    console.log(otp, '$$$$$$$$$$');
    // token = token

    if (otp !== '') {
      this.setState({ isAPILoading: true });
      // return this.props.navigation.navigate('Dashboard');
      const getLoginMpinData = await this.props.LoginMpin(token, otp);

      //   console.log(token, '---------------');
      // return fetch('http://hexeros.com/zb/dcra/public/api/V1/user/set_mpin', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     Authorization: 'Bearer ' + token,
      //     'Content-Type': 'application/json',
      //   },

      //   body: JSON.stringify({
      //     mpin: mpin,
      //     confirm_mpin: confirm_mpin,
      //   }),
      // })
      //   .then(response => response.json())
      //   .then(json => {
      //     console.log(json,"-------&&&&&&&&&&&&&&&&&&&&&&&&&&&&-----------------")
      //     if (json.message == 'MPIN set successfully') {
      //       this.setState({isAPILoading: false});
      //       this.props.navigation.navigate('Dashboard');
      //       console.log(json, '================0000000000000000000000');
      //     } else {
      //       this.setState({isAPILoading: false});
      //       this.showErrorMessage(
      //         SetMpinErrorTitle,
      //         json?.message
      //           ? json.message
      //           : 'Something went wrong!',
      //         5000,
      //         2,
      //       );
      //     }
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });

      console.log(getLoginMpinData);
      if (otp !== '' && getLoginMpinData.msg == 'login successfully') {
        // this.setState({isAPILoading: false, isModalVisible: true});
        this.setState({ isAPILoading: false });
        // await AsyncStorage.setItem('loginMpin', getLoginMpinData.data.mpin);


        if (this.state.feedInfoid) {
          this.props.navigation.navigate('FeedPost', {
            screen: 'Notification',
            feedInfoid: this.state.feedInfoid,
          })
        } else {
          this.props.navigation.navigate('Dashboard');
        }


      } else {
        this.setState({ isAPILoading: false });
        if (getLoginMpinData.msg == 'MPIN invalid') {
          this.showErrorMessage(SetMpinErrorTitle, getLoginMpinData.msg, 5000);
        }
        // this.showErrorMessage(
        //   SetMpinErrorTitle,
        //   getLoginMpinData?.msg ? getLoginMpinData.msg : 'Something went wrong!',
        //   5000,
        //   2,
        // );
      }
    } else {
      this.setState({ isAPILoading: false });
      // if (mpin > 4 && confirm_Mpin > 4 && mpin !== confirm_Mpin){
      if (otp == '') {
        this.showErrorMessage(
          SetMpinErrorTitle,
          strings("MpinScreen.msg_invalid_pin"),
          5000,
        );
      }
      if (getLoginMpinData.msg == '') {
        this.showErrorMessage(
          SetMpinErrorTitle,
          strings("MpinScreen.msg_invalid_pin"),
          5000,
        );
      }
      if (otp > 4) {
        this.showErrorMessage(SetMpinErrorTitle, strings("MpinScreen.msg_mpin_not_valid"), 5000);
      }

      // if (!enterOtp.trim()) {
      //   this.showErrorMessage(
      //     AccountVerificationOtpErrorTitle,
      //     'Please Enter OTP',
      //     5000,
      //     2,
      //   );
      //   return;
      // }
    }
  }

  async submitMobileNumber() {
    console.log()
    const mobileNumber = this.state.mobileNumber;

    console.log('mobileNumber: ', mobileNumber);


    // this.props.navigation.navigate("OTPVerification")
    // this.setState({isAPILoading: true});
    fetch(Config.baseUrl + 'send_otp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        country_code: '+91',
        mobile: mobileNumber,
      }),
    })
      .then(response => response.json())
      .then(json => {

        if (json.status === 200) {
          //  this.setState({isAPILoading: false});
          console.log(">>>>>>OTP: ", json.data.otp,)
          this.props.navigation.navigate('OTPVerification', {

            'OTP': json.data.otp,
            'Phone': mobileNumber,
            'userId': json.data.user_id,
          });

        } else {
          // this.setState({isAPILoading: false});
          this.showErrorMessage(
            SetMpinErrorTitle,
            json?.message
              ? json.message
              : 'Something went wrong!',
            5000,
            2,
          );
        }
      })
      .catch(error => {
        console.log('Send OTP error: ', error);
      });

  }


  render() {
    const { navigate } = this.props.navigation;
    const { isAPILoading, userName } = this.state;

    if (isAPILoading == false) {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <StatusBar backgroundColor="#3877F1" />
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', paddingVertical: '50%', backgroundColor: '#fff', paddingHorizontal: 10, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../../../assets/User.png')} style={{ justifyContent: 'center' }} />
                </View>
              </View>
              <View style={{ paddingHorizontal: 30, flex: 1, marginTop: 20 }}>
                <CustomText semibold style={{ fontSize: moderateScale(22), color: '#000', textAlign: 'center', }}>{strings("MpinLogin.lbl_hello")} {userName}!!</CustomText>
                <CustomText style={{ textAlign: 'center', marginTop: 10 }}>
                  {strings("MpinLogin.lbl_enter_mpin_access")}
                </CustomText>
              </View>
              <View>
                <OTPInputView
                  style={{
                    height: 200,
                    marginHorizontal: '10%',
                    borderRadius: 20,
                  }}
                  pinCount={4}
                  // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  // onCodeChanged = {code => this.setState({otp: code})}
                  autoFocusOnLoad
                  codeInputFieldStyle={{
                    borderRadius: 10,
                    height: 60,
                    width: 60,
                    color: '#000',
                  }}
                  codeInputHighlightStyle={{ borderRadius: 10 }}
                  onCodeFilled={code => this.submitMpin(code)}
                />
              </View>

              <TouchableOpacity
                style={{ alignItems: 'center', marginTop: '20%' }}
                onPress={() =>
                  this.submitMobileNumber()
                }>
                <View>
                  <CustomText style={{ fontSize: moderateScale(16), color: '#3877F1', }}>{strings("MpinLogin.lbl_forgot_mpin")}</CustomText>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <FlashMessage ref="setLoginMpinRef" />
        </SafeAreaView>
      );
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
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ LoginMpin }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MpinLogin);