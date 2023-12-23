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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { ForgotPassword } from '../../Redux/Action/Auth';
import { strings } from '../../localization/i18n';
import { CustomText } from '../../Component/Text';


const ForgotPasswordErrorTitle = '';

class SetNewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userID: '',
      password: '',
      confirmPassword: '',
      isAPILoading: false,
    };
    this.forgotPasswordRef = this.updateRef.bind(this, 'forgotPasswordRef');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  async componentDidMount() {
    const Token = await AsyncStorage.getItem('loginToken');
    this.setState({ token: Token });
    console.log(Token);
    console.log(">>>>>>>>>>>>>>>>>>>>.", this.props.route.params.userid)
    const userID = await AsyncStorage.getItem('loginID');
    this.setState({ userID: this.props.route.params.userid });
    console.log(userID, '=========');
  }
  showErrorMessage(title, msg, time) {
    return this.refs.forgotPasswordRef.showMessage({
      message: title,
      description: msg,
      type: 'warning',
    });
  }
  async submitNewPassword() {

    this.setState({ isAPILoading: true });
    const Token = this.state.token;
    const id = this.state.userID;
    const password = this.state.password;
    const confirm_password = this.state.confirmPassword;

    const getForgotPasswordData = await this.props.ForgotPassword(
      Token,
      id,
      password,
      confirm_password,
    );

    if (getForgotPasswordData.msg !== 'password updated successfully') {
      this.setState({ isAPILoading: false });
      if (password == '') {
        this.showErrorMessage(
          ForgotPasswordErrorTitle,
          strings("SetNewPassword.msg_password_required"),
          5000,
        );
        // this.showErrorMessage(RegisterErrorTitle, 'Username required', 5000);
      }

      if (password !== confirm_password) {
        this.showErrorMessage(
          ForgotPasswordErrorTitle,
          strings("SetNewPassword.msg_confirmpassword_mismatch"),
          5000,
        );
      }
      // if(password !== null && confirm_password !== null){
      //   this.props.navigation.navigate("Login")
      // }
    } else {
      // await AsyncStorage.setItem(
      //   'loginToken',
      //   JSON.stringify(getLoginData.data.token),
      // );
      // await AsyncStorage.setItem('loginData', JSON.stringify(getLoginData));
      // await AsyncStorage.setItem('loginID', JSON.stringify(getLoginData.data.id));
      this.props.navigation.navigate('Login', {
        data: getForgotPasswordData,
      });
      this.setState({ isAPILoading: false });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { isAPILoading } = this.state;

    if (!isAPILoading) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#3877F1" />
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
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={require('../../../assets/Lock.png')}
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
                  {strings("SetNewPassword.lbl_set_new_password")}
                </CustomText>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <View style={{ marginTop: 10 }}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings("SetNewPassword.lbl_new_password")}
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
                    maxLength={15}
                    value={this.state.password}
                    secureTextEntry
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      color: '#0D2451',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}
                    onChangeText={password =>
                      this.setState({ password: password })
                    }
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenS
                      fontWeight: '400',
                    }}>
                    {strings("SetNewPassword.lbl_confirm_password")}
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
                    maxLength={15}
                    value={this.state.confirmPassword}
                    secureTextEntry
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      color: '#0D2451',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}
                    onChangeText={confirmPassword =>
                      this.setState({ confirmPassword: confirmPassword })
                    }
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.submitNewPassword()}
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
                    {strings("Common.button_submit")}
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
          <FlashMessage ref="forgotPasswordRef" />
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
    paddingHorizontal: 10,
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ForgotPassword }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPassword);
