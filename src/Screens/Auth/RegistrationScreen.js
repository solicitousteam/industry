import React, {Component} from 'react';
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
  Alert,
  Linking,
} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Config from '../../Networking/Config';
import CheckBox from '@react-native-community/checkbox';
import {Registration, SocialRegistration} from '../../Redux/Action/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {moderateScale} from 'react-native-size-matters';

// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import {strings} from '../../localization/i18n';
import {CustomText} from '../../Component/Text';

// var date = new Date();

const RegisterErrorTitle = 'Error';

const RenderItem = ({item, selectedValue, onValueChange}) => {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <CheckBox
          value={item.value == selectedValue.value}
          onValueChange={() => {
            onValueChange(item);
          }}
          tintColors
        />
        <CustomText
          semibold
          ellipsizeMode="tail"
          style={{
            flex: 1,
            color: item.isSelect == 0 ? '#000' : '#3877F1',
            fontSize: moderateScale(14),
            paddingLeft: 10,
          }}>
          {item.title}
        </CustomText>
      </View>
    </View>
  );
};

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      open: false,
      date: new Date(),
      showDatePicker: false,
      DOB: '',
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      modalVisible: false,
      name: '',
      userName: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      relative1MobileNumber: '',
      relative2MobileNumber: '',
      relative3MobileNumber: '',
      relative4MobileNumber: '',
      relative5MobileNumber: '',
      deviceID: '',
      deviceName: '',
      isAPILoading: false,
      email: '',
      FCM_Token: '',
      social_id: '',
      loginType: '',
      address: '',
      gender: '',
      genders: [
        {
          id: 0,
          title: 'Male',
          value: 'male',
        },
        {
          id: 1,
          title: 'Female',
          value: 'female',
        },
        {
          id: 2,
          title: 'Other',
          value: 'other',
        },
      ],
      relative1Name: '',
      relative2Name: '',
      mobileNumber2: '',
    };
    this.registerRef = this.updateRef.bind(this, 'registerRef');
  }
  updateRef(name, ref) {
    this[name] = ref;
  }
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({open: false});
    this.setState({date: currentDate});
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  showDatePicker = visible => {
    this.setState({setDatePickerVisibility: visible});
  };

  hideDatePicker = () => {
    this.setState({setDatePickerVisibility: false});
  };

  handleConfirmDate(event, date) {
    this.setModalVisible(false);
    var formated_date = moment(date).format('DD-MM-YYYY');
    // var day_name = t(moment(date).format('dddd'));
    this.setState({
      DOB: formated_date,
    });
  }

  // showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // showDatepicker = () => {
  //   showMode('date');
  // };

  async componentDidMount() {
    const userInfo = this.props.route.params;
    // console.log(userInfo, 'INFO___________________++++++++++++++++');
    if (userInfo?.loginType === 'google') {
      // const googleUserInfo = JSON.stringify(userInfo)
      console.log(userInfo.userInfo, 'GOOGLE INFO REGISTRATION');
      this.setState({
        name: userInfo.userInfo.name,
        social_id: userInfo.userInfo.id,
        email: userInfo.userInfo.email,
        loginType: userInfo.loginType,
      });
    } else if (userInfo?.loginType === 'facebook') {
      this.setState({
        name: this.props.route.params.userInfo.name,
        social_id: this.props.route.params.userInfo.id,
        loginType: userInfo.loginType,
      });
    } else {
      console.log('userInfo not found');
    }

    let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({FCM_Token: fcmToken});
    // console.log(this.state.FCM_Token, 'TOKEN');
    let deviceId = DeviceInfo.getDeviceId();
    this.setState({deviceID: deviceId});
    let deviceName = DeviceInfo.getSystemName().toLowerCase();
    this.setState({deviceName: deviceName});
  }

  showErrorMessage(title, msg, time) {
    return this.refs.registerRef.showMessage({
      message: title,
      description: msg,
      type: 'warning',
      // titleStyle,
      textStyle: {
        // fontSize: RFValue(8, wp('100%')),
        // fontFamily: FontConstants.FontDisplay.SFProSemiBold,
      },
      // position,
      // icon: {icon: 'warning', position: 'left'},
      // backgroundColor: ColorConstant.errorColor,
      // duration: time,
    });
  }

  async submit_Registration_Data() {
    // this.setState({isAPILoading: true});
    // console.log('type 22');
    if (this.state.social_id != '') {
      this.submitSocialRegistrationInfo();
    } else {
      if (this.state.name == '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_enter_fullname'),
          5000,
        );
        // this.showErrorMessage(RegisterErrorTitle, 'Firstname required', 5000);
        return;
      }
      if (this.state.mobileNumber == '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_enter_mobilenumber'),
          // 'Mobile number required',
          5000,
        );
        return;
      }
      if (this.state.DOB == '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_select_dob'),
          // 'Date of birth required',
          5000,
        );
        return;
      }

      if (this.state.userName == '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_enter_username'),
          5000,
        );
        // this.showErrorMessage(RegisterErrorTitle, 'Username required', 5000);
        return;
      }

      if (this.state.social_id == '') {
        if (this.state.password == '') {
          this.showErrorMessage(
            'DCRA',
            strings('Registration.msg_enter_password'),
            5000,
          );
          // this.showErrorMessage(RegisterErrorTitle, 'Password required', 5000);
          return;
        }

        if (
          this.state.confirmPassword !== this.state.password ||
          this.state.confirmPassword == ''
        ) {
          this.showErrorMessage(
            'DCRA',
            strings('Registration.msg_confirm_password_and_password_mismatch'),
            5000,
          );
          return;
        }
      }

      if (this.state.address == '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_enter_address'),
          // getRegisterData.msg,
          5000,
        );
        return;
      }

      if (this.state.gender === '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_select_gender'),
          // getRegisterData.msg,
          5000,
        );
        return;
      }

      if (this.state.relative1Name === '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_enter_relative_one_name'),
          // getRegisterData.msg,
          5000,
        );
        return;
      }

      if (this.state.relative1MobileNumber == '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_enter_atleast_one_relative_number'),
          // getRegisterData.msg,
          5000,
        );
        return;
      }
      if (this.state.isCheckBoxSelect == '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_select_terms_cond'),
          5000,
        );
        return;
      }
      const Data = {
        name: this.state.name,
        mobileNumber: this.state.mobileNumber,
        DOB: this.state.DOB,
        userName: this.state.userName,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        email: this.state.email,
        address: this.state.address,
        gender: this.state.gender.value,
        relative1Name: this.state.relative1Name,
        relative1MobileNumber: this.state.relative1MobileNumber,
        relative2Name: this.state.relative2Name,
        relative2MobileNumber: this.state.relative2MobileNumber,
        mobileNumber2: this.mobileNumber2,
        // relative3MobileNumber: this.state.relative3MobileNumber,
        // relative4MobileNumber: this.state.relative4MobileNumber,
        // relative5MobileNumber: this.state.relative5MobileNumber,
        isCheckBoxSelect: this.state.isSelected,
        deviceID: this.state.deviceID,
        deviceName: this.state.deviceName,
      };

      await AsyncStorage.setItem('registrationData', JSON.stringify(Data));
      const name = this.state.name;
      const mobileNumber = this.state.mobileNumber;
      const DOB = this.state.DOB;
      const userName = this.state.userName;
      const password = this.state.password;
      const confirmPassword = this.state.confirmPassword;
      const email = this.state.email;
      const address = this.state.address;
      const gender = this.state.gender.value;
      const relative1Name = this.state.relative1Name;
      const relative2Name = this.state.relative2Name;
      const relative1MobileNumber = this.state.relative1MobileNumber;
      const relative2MobileNumber = this.state.relative2MobileNumber;
      const mobileNumber2 = this.state.mobileNumber2;
      // const relative3MobileNumber = this.state.relative3MobileNumber;
      // const relative4MobileNumber = this.state.relative4MobileNumber;
      // const relative5MobileNumber = this.state.relative5MobileNumber;
      const isCheckBoxSelect = this.state.isSelected;
      const deviceID = this.state.deviceID;
      const deviceName = this.state.deviceName;
      const FCM_Token = this.state.FCM_Token;

      let getRegisterData = '';

      getRegisterData = await this.props.Registration(
        name,
        mobileNumber,
        DOB,
        userName,
        password,
        confirmPassword,
        email,
        address,
        gender,
        relative1Name,
        relative1MobileNumber,
        relative2Name,
        relative2MobileNumber,
        mobileNumber2,
        isCheckBoxSelect,
        deviceID,
        deviceName,
        FCM_Token,
      );

      this.setState({isAPILoading: true});
      if (getRegisterData.status == 200) {
        this.setState({isAPILoading: false});
        this.props.navigation.navigate('ThankYou', {
          data: getRegisterData,
        });
      } else {
        this.setState({isAPILoading: false});
        this.showErrorMessage(
          'DCRA',
          getRegisterData.msg,
          // getRegisterData.msg,
          5000,
        );
      }
    }
    // if(getRegisterData.msg !== "register successfully"){
    //   this.showErrorMessage(
    //     RegisterErrorTitle,
    //     ,
    //     5000,
    //   );
    // }
    // if(getRegisterData.msg == "registrer successfully"){
    //   // this.setState({isAPILoading: false});

    //   this.props.navigation.navigate('ThankYou', {
    //     data: getRegisterData,
    //   })
    // }
  }

  async submitSocialRegistrationInfo() {
    // console.log('type ', this.state.social_id);

    if (this.state.name == '') {
      this.showErrorMessage(
        'DCRA',
        strings('Registration.msg_enter_fullname'),
        5000,
      );
      // this.showErrorMessage(RegisterErrorTitle, 'Firstname required', 5000);
      return;
    }

    if (this.state.mobileNumber == '') {
      this.showErrorMessage(
        'DCRA',
        strings('Registration.msg_enter_mobilenumber'),
        // 'Mobile number required',
        5000,
      );
      return;
    }

    if (this.state.DOB == '') {
      this.showErrorMessage(
        'DCRA',
        strings('Registration.msg_select_dob'),
        // 'Date of birth required',
        5000,
      );
      return;
    }

    if (this.state.userName == '') {
      this.showErrorMessage(
        'DCRA',
        strings('Registration.msg_enter_username'),
        5000,
      );
      // this.showErrorMessage(RegisterErrorTitle, 'Username required', 5000);
      return;
    }

    if (this.state.social_id == '') {
      if (this.state.password == '') {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_enter_password'),
          5000,
        );
        // this.showErrorMessage(RegisterErrorTitle, 'Password required', 5000);
        return;
      }
      if (
        this.state.confirmPassword !== this.state.password ||
        this.state.confirmPassword == ''
      ) {
        this.showErrorMessage(
          'DCRA',
          strings('Registration.msg_confirm_password_and_password_mismatch'),
          5000,
        );
        return;
      }
    }

    if (this.state.email == '') {
      this.showErrorMessage(
        'DCRA',
        strings('Registration.msg_enter_email'),
        // getRegisterData.msg,
        5000,
      );
      return;
    }

    if (this.state.address == '') {
      this.showErrorMessage(
        'DCRA',
        strings('Registration.msg_enter_email'),
        // getRegisterData.msg,
        5000,
      );
      return;
    }

    if (this.state.relative1MobileNumber == '') {
      this.showErrorMessage(
        'DCRA',
        strings('Registration.msg_enter_atleast_one_relative_number'),
        // getRegisterData.msg,
        5000,
      );
      return;
    }

    if (this.state.isCheckBoxSelect == '') {
      this.showErrorMessage(
        'DCRA',
        strings('Registration.msg_select_terms_cond'),
        5000,
      );
      return;
    }
    // const Data = {
    //   firstName: this.state.firstName,
    //   userName: this.state.userName,
    //   mobileNumber: this.state.mobileNumber,
    //   DOB: this.state.DOB,
    //   password: this.state.password,
    //   confirmPassword: this.state.confirmPassword,
    //   email: this.state.email,
    //   relative1MobileNumber: this.state.relative1MobileNumber,
    //   relative2MobileNumber: this.state.relative2MobileNumber,
    //   relative3MobileNumber: this.state.relative3MobileNumber,
    //   relative4MobileNumber: this.state.relative4MobileNumber,
    //   relative5MobileNumber: this.state.relative5MobileNumber,
    //   isCheckBoxSelect: this.state.isSelected,
    //   deviceID: this.state.deviceID,
    //   deviceName: this.state.deviceName,
    // };

    // await AsyncStorage.setItem('registrationData', JSON.stringify(Data));
    const name = this.state.name;
    const userName = this.state.userName;
    const mobileNumber = this.state.mobileNumber;
    const DOB = this.state.DOB;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const email = this.state.email;
    const relative1MobileNumber = this.state.relative1MobileNumber;
    const relative2MobileNumber = this.state.relative2MobileNumber;
    const relative3MobileNumber = this.state.relative3MobileNumber;
    const relative4MobileNumber = this.state.relative4MobileNumber;
    const relative5MobileNumber = this.state.relative5MobileNumber;
    const isCheckBoxSelect = this.state.isSelected;
    const deviceID = this.state.deviceID;
    const deviceName = this.state.deviceName;
    const FCM_Token = this.state.FCM_Token;
    const type = this.state.loginType;
    const social_id = this.state.social_id;

    let getSocialRegisterData = '';

    getSocialRegisterData = await this.props.SocialRegistration(
      name,
      userName,
      mobileNumber,
      DOB,
      password,
      confirmPassword,
      email,
      relative1MobileNumber,
      relative2MobileNumber,
      relative3MobileNumber,
      relative4MobileNumber,
      relative5MobileNumber,
      isCheckBoxSelect,
      deviceID,
      deviceName,
      FCM_Token,
      type,
      social_id,
    );

    this.setState({isAPILoading: true});
    if (getSocialRegisterData.status == 200) {
      this.setState({isAPILoading: false});
      this.props.navigation.navigate('ThankYou', {
        data: getSocialRegisterData,
      });
    } else {
      this.setState({isAPILoading: false});
      this.showErrorMessage(
        'DCRA',
        getSocialRegisterData.msg,
        // getRegisterData.msg,
        5000,
      );
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const {date, DOB, modalVisible, isAPILoading} = this.state;

    if (!isAPILoading) {
      return (
        // <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#3877F1" />
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <View style={{paddingHorizontal: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <TouchableOpacity onPress={() => navigate('Login')}>
                  <View style={{width: 10}}>
                    <Image
                      source={require('../../../assets/Back_Arrow.png')}
                      style={{width: 22, height: 20}}
                      // resizeMode={'stretch'}
                    />
                  </View>
                </TouchableOpacity>
                <View>
                  <CustomText
                    bold
                    style={{
                      // fontFamily: 'OpenSans-Bold',
                      fontSize: 17,
                      color: '#000',
                    }}>
                    {strings('Registration.lbl_registration')}
                  </CustomText>
                </View>
                <View style={{width: 10}}></View>
              </View>

              <View style={{paddingHorizontal: 10, marginTop: 40}}>
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_fullname')}{' '}
                    <CustomText style={{color: 'red'}}>*</CustomText>
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
                    maxLength={20}
                    value={this.state.name}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                      color: '#0D2451',
                    }}
                    onChangeText={name => this.setState({name: name})}
                  />
                </View>

                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_mobile_number')}{' '}
                    <CustomText style={{color: 'red'}}>*</CustomText>
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
                    onChangeText={mobileNumber =>
                      this.setState({mobileNumber: mobileNumber})
                    }
                  />
                </View>
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_dob')}{' '}
                    <CustomText style={{color: 'red'}}>*</CustomText>
                  </CustomText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(true);
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 12,
                      borderColor: '#DFDFDF',
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 12,
                    }}>
                    <View>
                      <CustomText
                        regular
                        style={{
                          fontSize: 17,
                          color: '#000000',
                          // fontFamily: 'OpenSans-Regular',
                          fontWeight: '600',
                        }}>
                        {DOB}
                      </CustomText>
                    </View>
                    <View>
                      <Image source={require('../../../assets/Calendar.png')} />
                    </View>
                  </View>
                </TouchableOpacity>
                {modalVisible && (
                  <DateTimePicker
                    value={date}
                    placeholderText={'DOB'}
                    mode={'date'}
                    // maximumDate={moment(today).add(1, 'day').format('DD-MM-YYYY')}
                    // minimumDate={nextDate}
                    display="default"
                    format="DD/MM/YYYY"
                    onChange={(event, date) =>
                      this.handleConfirmDate(event, date)
                    }
                    onCancel={this.hideDatePicker}
                    // onChange={date => this.setState({date: this.state.date})}
                    // onChange={date => console.log(date)}
                  />
                )}
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_username')}{' '}
                    <CustomText style={{color: 'red'}}>*</CustomText>
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
                      this.setState({userName: userName.replace(/\s/g, '')})
                    }
                  />
                </View>
                {this.state.loginType ? (
                  <View></View>
                ) : (
                  <View>
                    <View style={{marginTop: '5%'}}>
                      <CustomText
                        regular
                        style={{
                          fontSize: 14,
                          color: '#000000',
                          // fontFamily: 'OpenSans-Regular',
                          fontWeight: '400',
                        }}>
                        {strings('Registration.lbl_password')}{' '}
                        <CustomText style={{color: 'red'}}>*</CustomText>
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
                        style={{
                          paddingHorizontal: 10,
                          fontSize: 17,
                          color: '#0D2451',
                          fontFamily: 'OpenSans-Regular',
                          fontWeight: '600',
                        }}
                        value={this.state.password}
                        onChangeText={password =>
                          this.setState({password: password})
                        }
                        secureTextEntry
                      />
                    </View>
                    <View style={{marginTop: '5%'}}>
                      <CustomText
                        regular
                        style={{
                          fontSize: 14,
                          color: '#000000',
                          // fontFamily: 'OpenSans-Regular',
                          fontWeight: '400',
                        }}>
                        {strings('Registration.lbl_confirm_password')}{' '}
                        <CustomText style={{color: 'red'}}>*</CustomText>
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
                        style={{
                          paddingHorizontal: 10,
                          fontSize: 17,
                          color: '#0D2451',
                          fontFamily: 'OpenSans-Regular',
                          fontWeight: '600',
                        }}
                        value={this.state.confirmPassword}
                        onChangeText={confirmPassword =>
                          this.setState({confirmPassword: confirmPassword})
                        }
                        secureTextEntry
                      />
                    </View>
                  </View>
                )}
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_email')}{' '}
                    {/* <CustomText style={{color: 'red'}}>*</CustomText> */}
                  </CustomText>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: '#DFDFDF',
                    marginTop: 5,
                  }}>
                  {this.state.loginType === 'google' ? (
                    <TextInput
                      maxLength={250}
                      keyboardType={'email-address'}
                      editable={false}
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 17,
                        color: '#0D2451',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                      }}
                      value={this.state.email}
                      onChangeText={email =>
                        this.setState({
                          email: email,
                        })
                      }
                    />
                  ) : (
                    <TextInput
                      maxLength={250}
                      keyboardType={'email-address'}
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 17,
                        color: '#0D2451',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                      }}
                      value={this.state.email}
                      onChangeText={email =>
                        this.setState({
                          email: email,
                        })
                      }
                    />
                  )}
                </View>
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_address')}{' '}
                    <CustomText style={{color: 'red'}}>*</CustomText>
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
                    maxLength={20}
                    value={this.state.address}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                      color: '#0D2451',
                    }}
                    onChangeText={address => this.setState({address: address})}
                  />
                </View>
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_gender')}{' '}
                    <CustomText style={{color: 'red'}}>*</CustomText>
                  </CustomText>
                </View>
                <View>
                  {this.state.genders.map(val => {
                    return (
                      <RenderItem
                        item={val}
                        selectedValue={this.state.gender}
                        onValueChange={val =>
                          this.setState({
                            gender: val,
                          })
                        }
                      />
                    );
                  })}
                </View>
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_relative_name')}{' '}
                    <CustomText style={{color: 'red'}}>*</CustomText>
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
                    maxLength={20}
                    value={this.state.relative1Name}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                      color: '#0D2451',
                    }}
                    onChangeText={name => this.setState({relative1Name: name})}
                  />
                </View>
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_relative_mobile_number')}{' '}
                    <CustomText style={{color: 'red'}}>*</CustomText>
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
                    keyboardType={'numeric'}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      color: '#0D2451',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}
                    value={this.state.relative1MobileNumber}
                    onChangeText={relative1MobileNumber =>
                      this.setState({
                        relative1MobileNumber: relative1MobileNumber,
                      })
                    }
                  />
                </View>
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_relative_two_name')}{' '}
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
                    maxLength={20}
                    value={this.state.relative2Name}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                      color: '#0D2451',
                    }}
                    onChangeText={name => this.setState({relative2Name: name})}
                  />
                </View>
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_relative_two_number')}
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
                    keyboardType={'numeric'}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      color: '#0D2451',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}
                    value={this.state.relative2MobileNumber}
                    onChangeText={relative2MobileNumber =>
                      this.setState({
                        relative2MobileNumber: relative2MobileNumber,
                      })
                    }
                  />
                </View>
                {/* <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_relative_three_number')}
                  </CustomText>
                </View> */}
                {/* <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: '#DFDFDF',
                    marginTop: 5,
                  }}>
                  <TextInput
                    maxLength={10}
                    keyboardType={'numeric'}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      color: '#0D2451',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}
                    value={this.state.relative3MobileNumber}
                    onChangeText={relative3MobileNumber =>
                      this.setState({
                        relative3MobileNumber: relative3MobileNumber,
                      })
                    }
                  />
                </View> */}
                {/* <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_relative_four_number')}
                  </CustomText>
                </View> */}
                {/* <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: '#DFDFDF',
                    marginTop: 5,
                  }}>
                  <TextInput
                    maxLength={10}
                    keyboardType={'numeric'}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      color: '#0D2451',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}
                    value={this.state.relative4MobileNumber}
                    onChangeText={relative4MobileNumber =>
                      this.setState({
                        relative4MobileNumber: relative4MobileNumber,
                      })
                    }
                  />
                </View> */}
                <View style={{marginTop: '5%'}}>
                  <CustomText
                    regular
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    {strings('Registration.lbl_mobile_number_two')}
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
                    keyboardType={'numeric'}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      color: '#0D2451',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}
                    value={this.state.mobileNumber2}
                    onChangeText={mobileNumber2 =>
                      this.setState({
                        mobileNumber2: mobileNumber2,
                      })
                    }
                  />
                </View>

                <View style={{flexDirection: 'row', marginVertical: 20}}>
                  <CheckBox
                    value={this.state.isSelected}
                    onValueChange={value =>
                      this.setState({
                        isSelected: value,
                      })
                    }
                    onAnimationDidStop={() =>
                      console.log('onAnimationDidStopEvent')
                    }
                    lineWidth={2}
                    hideBox={false}
                    boxType={'circle'}
                    tintColors={'#9E663C'}
                    onCheckColor={'#6F763F'}
                    onFillColor={'#4DABEC'}
                    onTintColor={'#F4DCF8'}
                    animationDuration={0.5}
                    disabled={false}
                    onAnimationType={'bounce'}
                    offAnimationType={'stroke'}
                  />
                  <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    onPress={() =>
                      Linking.openURL(Config.baseUrl + 'content/term_condition')
                    }>
                    <CustomText
                      semibold
                      style={{
                        fontSize: 14,
                        color: '#0D2451',
                        // fontFamily: 'OpenSans-Semibold',
                        fontWeight: '600',
                      }}>
                      {strings('Registration.lbl_agree_to_our')}{' '}
                      <CustomText style={{color: '#3877F1'}}>
                        {strings('Registration.lbl_tc')}
                      </CustomText>
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => this.submit_Registration_Data()}
                  style={{
                    marginBottom: 20,
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
                  <View style={{width: 10}}></View>
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
                      {strings('Common.button_submit')}
                    </CustomText>
                  </View>
                  <View>
                    <Image
                      source={require('../../../assets/Login_Arrow.png')}
                      style={{width: 27.5, height: 26.7}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <FlashMessage ref="registerRef" />
        </View>
      );
    } else {
      return (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center'}}
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
  goldImage: {
    ...Platform.select({
      android: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingHorizontal: '25%',
      },
      ios: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingHorizontal: '18%',
      },
    }),
  },
  title: {
    marginTop: 20,
    // fontWeight: "bold",
    fontSize: 20,
    fontFamily: 'Metropolis_SemiBold',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'Metropolis_Regular',
    color: '#000',
    opacity: 0.5,
  },
  textInput: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 14,
    padding: 15,
    borderColor: '#F0F0F0',
    backgroundColor: '#F0F0F0',
    fontFamily: 'Poppins_Regular',
  },
  forgotPassword: {
    marginTop: 30,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Metropolis_Regular',
    color: '#000',
  },
  loginButton: {
    marginTop: 22,
    // backgroundColor: "#FE8312",
    borderRadius: 52,
    paddingVertical: 20,
    alignItems: 'center',

    shadowColor: '#FE8312',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 20,
  },
  signupText: {
    marginTop: 36,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({Registration, SocialRegistration}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
