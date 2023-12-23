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
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { Login, socialLogin } from '../../Redux/Action/Auth';

// import auth from '@react-native-firebase/auth';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from '../../Networking/Config';
import messaging from '@react-native-firebase/messaging';

import {
  LoginManager,
  AccessToken,
  Profile,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import { strings } from '../../localization/i18n';
import { CustomText } from '../../Component/Text';
// import app from '@react-native-firebase/app';

// zY00cczs2SG28RTn1bZQvsCftvI= Facrbook hashkey

const LoginErrorTitle = '';

var socialInitialCheck = true;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      deviceID: '',
      deviceName: '',
      isAPILoading: false,
      FCM_Token: '',
      userGoogleInfo: '',
      loader: false,
      userInfo: '',
      googleUserInfo: '',
    };
    this.loginRef = this.updateRef.bind(this, 'loginRef');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  async componentDidMount() {
    // let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.requestPermission();
    // this.setState({ FCM_Token: fcmToken });
    let deviceId = DeviceInfo.getDeviceId();
    this.setState({ deviceID: deviceId });
    let deviceName = DeviceInfo.getSystemName().toLowerCase();
    this.setState({ deviceName: deviceName });

    await GoogleSignin.configure({
      //  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '1036825045237-fk5roqvf665m8g9snrce0elh28mdmvam.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // androidClientId: "1036825045237-5a0u0k9cr384o3r4ek7acuttk48mgitj.apps.googleusercontent.com",
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // scopes: ['profile', 'email']
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  checkPermission = async () => {
    // const db = firebase.initializeApp();

    // const enabled = await messaging().hasPermission();
    const enabled = await messaging().requestPermission();
    console.log(enabled, 'ENABLED');
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };
  requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };

  getToken = async () => {
    console.log('ENTER FCM');
    const fcmToken = await messaging().getToken();
    // console.log(fcmToken, "FCM TOKEN<<<<")
    await AsyncStorage.setItem('fcmToken', fcmToken);
    this.setState({ FCM_Token: fcmToken });

    // await messaging().registerDeviceForRemoteMessages(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    // });

    await messaging().registerDeviceForRemoteMessages();

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   navigation.navigate(remoteMessage.data.type);
    // });
    return;
  };

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name, email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({ userInfo: user });
          console.log('result:', user);

          this.loginFacebook();
          // this.props.navigation.navigate("Registration", { userInfo: this.state.userInfo, loginType: 'facebook' })
        }
      },
    );

    console.log(profileRequest, 'PROFILE');
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  
  showErrorMessage(title, msg, time) {
    return this.refs.loginRef.showMessage({
      message: title,
      description: msg,
      type: 'warning',
    });
  }

  submit_Login_Data = () => {
    if (this.state.userName == '') {
      this.showErrorMessage(
        LoginErrorTitle,
        strings('Login.msg_empty_username'),
        5000,
      );
      // this.showErrorMessage(RegisterErrorTitle, 'Username required', 5000);
      return;
    }

    if (this.state.password == '') {
      this.showErrorMessage(
        LoginErrorTitle,
        strings('Registration.msg_enter_mobilenumber'),
        5000,
      );
      // this.showErrorMessage(RegisterErrorTitle, 'Password required', 5000);
      return;
    }
    else {
      this.props.navigation.navigate('OTPVerificationPhone', { mobileNo: this.state.password })
    }
    // this.setState({ isAPILoading: true });
  }

  render() {
    // const {navigate} = this.props.navigation;
    const { isAPILoading } = this.state;
    // const isLogin = this.state.userInfo.name;
    // const onPressButton = isLogin
    //   ? this.logoutWithFacebook
    //   : this.loginWithFacebook;

    if (isAPILoading == false) {
      return (
        <SafeAreaView style={styles.container}>
          {/* <View style={styles.container}> */}
          <StatusBar backgroundColor="#3877F1" />
          <ImageBackground source={require('../../../assets/Splash_Background.png')}
            style={styles.image}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 10 }}>
                {/* <TouchableOpacity onPress={() => navigate('Start')}>
                  <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                    <Image
                      source={require('../../../assets/Back_Arrow.png')}
                      style={{ width: 22, height: 20 }}
                    // resizeMode={'stretch'}
                    />
                  </View>
                </TouchableOpacity> */}

                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/1_Logo.png')}
                    style={{ width: 92, height: 92 }}
                  // resizeMode={'stretch'}
                  />

                  {/* <Image
                  source={require('../../../assets/2_Logo.png')}
                  style={{ width: 52, height: 92 }}
                // resizeMode={'stretch'}
                /> */}
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={{ marginTop: '23%' }}>
                    <CustomText
                      regular
                      style={{
                        fontSize: 24,
                        color: '#FFF',
                        // fontFamily: 'OpenSans-Regular',
                        fontWeight: '700',
                        textAlign: 'center'
                      }}>
                      {/* {strings('Login.lbl_login_into_your_acc')} */}
                      {/* children={''} */}
                      Web-DCRA & DSS
                    </CustomText>
                  </View>
                  <View style={{ marginTop: '5%' }}>
                    <CustomText
                      regular
                      style={{
                        fontSize: 14,
                        color: '#FFF',
                        // fontFamily: 'OpenSans-Regular',
                        fontWeight: '400',
                      }}>
                      {strings('Registration.lbl_fullname')}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 12,
                      borderColor: '#FFF',
                      marginTop: 5,
                      backgroundColor: '#FFF'
                    }}>
                    <TextInput
                      maxLength={20}
                      value={this.state.userName}
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 17,
                        color: '#0D2451',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',

                      }}
                      onChangeText={userName =>
                        this.setState({ userName: userName })
                      }
                    />
                  </View>
                  <View style={{ marginTop: '5%' }}>
                    <CustomText
                      regular
                      style={{
                        fontSize: 14,
                        color: '#FFF',
                        // fontFamily: 'OpenSans-Regular',
                        fontWeight: '400',
                      }}>
                      {strings('Registration.lbl_mobile_number')}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 12,
                      borderColor: '#DFDFDF',
                      marginTop: 5,
                      backgroundColor: '#FFF'
                    }}>
                    <TextInput
                      maxLength={10}
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 17,
                        color: '#0D2451',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                      }}
                      value={this.state.password}
                      onChangeText={password =>
                        this.setState({ password: password })
                      }
                      keyboardType={'number-pad'}
                    />
                  </View>
                  {/* <TouchableOpacity
                  style={{alignItems: 'center', margin: 20}}
                  onPress={() => navigate('ForgotPassword')}>
                  <View>
                    <CustomText
                      regular
                      style={{
                        fontSize: 16,
                        color: '#3877F1',
                        // fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                      }}>
                      {strings('Login.lbl_forgot_password')}
                    </CustomText>
                  </View>
                </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => { this.submit_Login_Data() }}
                    // this.submit_Login_Data()
                    // OTPVerificationPhone
                    style={{
                      marginTop: '10%',
                      marginBottom: 0,
                      borderRadius: 48,
                      paddingVertical: 16,
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
                      marginHorizontal: '20%',
                    }}>
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
                          color: '#000',
                          // fontFamily: 'OpenSans-Regular',
                          fontWeight: '700',
                          textAlign: 'center'
                        }}>
                        {strings('Login.button_login')}
                      </CustomText>
                    </View>
                    {/* <View>
                      <Image
                        source={require('../../../assets/Login_Arrow.png')}
                        style={{ width: 27.5, height: 26.7, tintColor: '#000' }}
                      />
                    </View> */}
                  </TouchableOpacity>
                  {/* <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Registration')
                    }
                    style={styles.item}>
                    <View style={{marginLeft: 13, width: '70%'}}>
                      <CustomText
                        semibold
                        style={[
                          styles.title,
                          {textAlign: 'center', right: -40},
                        ]}>
                        {'Signup'}
                      </CustomText>
                    </View>
                    <View style={{justifyContent: 'center', right: -5}}>
                      <Image
                        style={{resizeMode: 'contain', height: 30, width: 30}}
                        source={require('../../../assets/Gray_Right.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View> */}
                </View>

                {/* <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginBottom: '5%',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{margin: '2%'}}
                  source={require('../../../assets/Line.png')}
                />
                <View>
                  <CustomText
                    regular
                    style={{
                      color: '#000000',
                      fontWeight: '500',
                    }}>
                    {strings('Login.lbl_or')}
                  </CustomText>
                </View>
                <Image
                  style={{margin: '2%'}}
                  source={require('../../../assets/Line.png')}
                />
              </View> */}
                {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => this.GoogleSignup()}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('../../../assets/Google.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.loginWithFacebook()}>
                  <View>
                    <Image
                      style={{marginLeft: 10, width: 35, height: 35}}
                      source={require('../../../assets/Facebook.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View> */}
              </View>
              {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: "10%" }}>
              <Image source={require('../../../assets/Ellipse.png')} style={{ width: "100%" }} />
              <TouchableOpacity
                style={{ position: 'absolute' }}
                // onPress={() => navigate('Registration')}>
                onPress={() => navigate('Registration')}>
                <CustomText
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    textDecorationLine: 'underline',
                  }}>
                  {strings("Login.lbl_create_acc_for_generaluser")}
                </CustomText>
              </TouchableOpacity>
            </View> */}
              <View
                style={{ marginTop: '25%', marginBottom: 16, marginHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ChangeLanguage')}
                  style={styles.item}>
                  <View style={{ width: '15%', justifyContent: 'center' }}>
                    <Image
                      style={{ resizeMode: 'contain', height: 30, width: 30 }}
                      source={require('../../../assets/change_language.png')}
                    />
                  </View>
                  <View style={{ marginLeft: 13, width: '70%' }}>
                    <CustomText
                      semibold
                      style={[styles.title, { textAlign: 'center' }]}>
                      {strings('Dashboard.lbl_change_lang')}
                    </CustomText>
                  </View>
                  <View style={{ width: '15%', justifyContent: 'center' }}>
                    <Image
                      style={{ resizeMode: 'contain', height: 30, width: 30 }}
                      source={require('../../../assets/Gray_Right.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </ImageBackground>
          <FlashMessage ref="loginRef" />
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
    // paddingTop: 5,
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 2,
    borderRadius: 40,
    marginBottom: 20,
    // marginVertical: 5,
    // marginHorizontal: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 9,
  },
  title: {
    fontSize: 16,
    color: '#0D2451',
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ Login }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);