import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  BackHandler,
  Modal,
  Dimensions,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
// import { NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import { Logout } from '../../Redux/Action/Auth';
import {
  safe_or_not_safe,
  NotificationData,
  getNotificationCountsData,
  GetProfile,
} from '../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { strings } from '../../localization/i18n';
import Geolocation from '@react-native-community/geolocation';
import { CustomText } from '../../Component/Text';
import { moderateScale } from 'react-native-size-matters';
import Config from '../../Networking/Config';
import APIConstants from '../../Networking/APIConstants';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Dashboard = ({ navigation, props }) => {
  const dispatch = useDispatch();
  const safeUnsafePopup = useRef();
  const notsafeUnsafePopup = useRef();
  const [is_safe, setIs_Safe] = useState('0');
  const [water, setWater] = useState(false);
  const [tree, setTree] = useState(false);
  const [fire, setFire] = useState(false);
  const [val, setVal] = useState('');
  const [iAmSafeDescription, setIAmSafeDescription] = useState('');
  const [iAmNotSafeDescription, setIAmNotSafeDescription] = useState('');
  const [safUnsafeLoading, setSafUnsafeLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notSafeModalVisible, setNotSafeModalVisible] = useState(false);
  const [userType, setUserType] = useState('');
  const [cycloneAlert, setCycloneAlert] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [locationPermission, setLocationPermission] = useState('');
  const [currentlocationId, setCurrentlocationID] = useState('');
  let [loader, setLoader] = useState(false);
  const [notificationCount, setNotificationCount] = useState('');
  const isFocused = useIsFocused();
  const DATA = [
    {
      id: '53d3e82f-327e-4307-9fc6-90661f60887a',
      title: strings('Dashboard.lbl_location_specific_details'),
      uri: require('../../../assets/Map.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: strings('Dashboard.lbl_im_not_safe'),
      uri: require('../../../assets/Not_Safe.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: strings('Dashboard.lbl_im_safe'),
      uri: require('../../../assets/Safe.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: strings('Dashboard.lbl_crowd_sourcing'),
      uri: require('../../../assets/Users.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: strings('Dashboard.lbl_feed'),
      uri: require('../../../assets/Feed.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: strings('Dashboard.lbl_logout'),
      uri: require('../../../assets/Logout.png'),
    },
  ];

  const [appState, setAppstate] = useState('');
  const Item = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        {/* <View style={{ flexDirection: 'row', width: "100%" }}> */}
        <View style={{ width: '15%', justifyContent: 'center' }}>
          <Image
            style={{ resizeMode: 'contain', height: 30, width: 30 }}
            source={item.uri}
          />
        </View>
        <View style={{ marginLeft: 13, width: '70%' }}>
          <CustomText semibold numberOfLines={1} style={styles.title}>
            {item.title}
          </CustomText>
        </View>
        {/* </View> */}
        <View style={{ width: '15%', justifyContent: 'center' }}>
          <Image
            style={{ resizeMode: 'contain', height: 30, width: 30 }}
            source={require('../../../assets/Gray_Right.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  function handleBackButtonClick() {
    // _handleBackButtonClick = () => BackHandler.exitApp();
    // return true;

    {
      Alert.alert(
        strings('Dashboard.msg_exit_app_title'),
        strings('Dashboard.msg_existing_app_msg'),
        [
          {
            text: strings('Common.button_cancel'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: strings('Common.button_ok'),
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    }
  }

  useEffect(() => {
    getUserProfile();
    getUserType();
    requestLocationPermission();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    // alert("Hello")
    // getNotifications();
  }, [isFocused]);
  // const getNotifications = async () => {
  //   // setLoader(true);
  //   // this.setState({isAPILoading: true});
  //   const Token = await AsyncStorage.getItem('loginToken');
  //   const get_notification_count_Data = await dispatch(
  //     getNotificationCountsData(Token),
  //   );
  //   console.log(get_notification_count_Data, "COUNT")
  //   setNotificationCount(get_notification_count_Data.data.count);
  //   setLoader(false);
  // }

  const getUserType = async () => {
    setLoader(true);
    const userTypeInfo = await AsyncStorage.getItem('loginID');
    setUserType(userTypeInfo);
    console.log(userType, '================USERTYPE');
    setLoader(false);
  };

  const LogoutAccount = () => {
    Alert.alert(
      'DCRA',
      strings('MpinScreen.msg_logout_warning'),
      [
        {
          text: strings('Common.button_no'),
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
        { text: strings('Common.button_yes'), onPress: () => LogOut() },
      ],
      {
        cancelable: false,
      },
    );
  };

  const LogOut = async () => {
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    try {
      const logoutResponse = await dispatch(Logout(Token));
      if (logoutResponse && logoutResponse.status) {
        await AsyncStorage.clear();
        setLoader(false);
        // this.props.navigation.navigate('AccountType', { data: registerData.data })
        navigation.navigate('AuthStack');
        return true;
      } else {
        setLoader(false);
        // this.setState({isLogoutLoading: false});
        alert(logoutResponse.msg);
      }
    } catch (err) {
      setLoader(false);
      console.log('error is: ' + err);
    }
  };

  const safe = async () => {
    setModalVisible(true);

    // requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };
  };
  const requestLocationPermission = async () => {
    console.log('Enter');
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      getCurrentLocation();
      subscribeLocationLocation();
    } else {
      try {
        console.log('Enter in try');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: strings('PermissionsText.msg_location_permission_title'),
            message: strings('PermissionsText.msg_location_permission_msg'),
          },
        );
        console.log(granted, '---------===========');
        setLocationPermission(granted);
        // return
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Enter in try IF');

          //To Check, If Permission is granted
          getOneTimeLocation();
          getCurrentLocation();
          subscribeLocationLocation();
        } else {
          setLocationStatus(strings('PermissionsText.lbl_permission_denied'));
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const unSafe = async () => {
    setNotSafeModalVisible(true);
    // requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };
  };

  const call_Un_SafeClose = () => {
    setNotSafeModalVisible(false);
  };

  const callSafe = async () => {
    try {
      let val = '';
      if (!iAmSafeDescription.trim()) {
        return alert('Please add the reason.');
      }

      setIAmSafeDescription();
      setSafUnsafeLoading(true);
      Keyboard.dismiss();
      const userID = await AsyncStorage.getItem('loginID');
      const phone = await AsyncStorage.getItem('phone');
      console.log('userID: ', userID);
      const formdata = new FormData();
      formdata.append('user_id', userID);
      formdata.append(
        'location',
        `${currentLocation.longitude} ${currentLocation.latitude}`,
      );
      formdata.append('reason', iAmSafeDescription.trim());
      formdata.append('type', 'safe');
      formdata.append('is_safe', 'yes');
      formdata.append('mobile', phone);

      const Token = await AsyncStorageLib.getItem('loginToken');
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data',
      };
      console.log(
        'url: ',
        `http://app.solicitous.cloud/dcra/api/V1/${APIConstants.safe_or_not_safe}`,
      );
      const response = await axios({
        url: `http://app.solicitous.cloud/dcra/api/V1/${APIConstants.safe_or_not_safe}`,
        method: 'POST',
        data: formdata,
        headers,
      });
      console.log('safe API response: ', response);
      safeUnsafePopup?.current?.showMessage({
        message: 'Success',
        description: 'Reason sent successfully',
        type: 'success',
      });
      setIAmSafeDescription('');
      setModalVisible(!modalVisible);
      // setIs_Safe('1');
      // const Token = await AsyncStorage.getItem('loginToken');
      // const callSafeData = await dispatch(
      //   safe_or_not_safe(Token, is_safe, currentLatitude, currentLongitude),
      // );
      // if (callSafeData.status == 200) {
      //   // setLoader(false);
      //   setModalVisible(!modalVisible);
      // } else {
      //   // setLoader(false);
      //   console.log(callSafeData.msg);
      // }
    } catch (error) {
      console.log('safe api error: ', error);
      console.log('safe api error: ', error.response);
      safeUnsafePopup?.current?.showMessage({
        message: 'Error',
        description: JSON.stringify(error),
        type: 'error',
      });
    } finally {
      setSafUnsafeLoading(false);
    }
  };
  const call_Un_Safe = async () => {
    try {
      if (!iAmNotSafeDescription.trim()) {
        return alert('Please add the reason.');
      }
      let val = '';
      if (water === true) {
        val = val + ' ' + 'Water Entered in House';
      }
      if (tree === true) {
        val = val + ' ' + 'Tree fallen in front of my house';
      }
      if (fire === true) {
        val = val + ' ' + 'Fire in House';
      }

      setIAmNotSafeDescription(val + ' ' + iAmNotSafeDescription);
      setSafUnsafeLoading(true);
      Keyboard.dismiss();
      const userID = await AsyncStorage.getItem('loginID');

      const phone = await AsyncStorage.getItem('phone');
      const formdata = new FormData();
      formdata.append('user_id', userID);
      formdata.append(
        'location',
        `${currentLocation.longitude} ${currentLocation.latitude}`,
      );
      formdata.append('reason', iAmNotSafeDescription.trim());
      formdata.append('type', 'unsafe');
      formdata.append('is_safe', 'no');
      formdata.append('mobile', phone);

      const Token = await AsyncStorageLib.getItem('loginToken');
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios({
        url: `http://app.solicitous.cloud/dcra/api/V1/${APIConstants.safe_or_not_safe}`,
        method: 'POST',
        data: formdata,
        headers,
      });
      console.log('unsafe API response: ', response);
      setIAmNotSafeDescription('');
      setNotSafeModalVisible(!notSafeModalVisible);
      notsafeUnsafePopup?.current?.showMessage({
        message: 'Success',
        description: 'Reason sent successfully',
        type: 'success',
      });
      // setIs_Safe('0');
      // console.log(is_safe, '000&&&&&&&000');

      // const Token = await AsyncStorage.getItem('loginToken');

      // const callSafeData = await dispatch(
      //   safe_or_not_safe(Token, is_safe, currentLatitude, currentLongitude),
      // );
      // if (callSafeData.status == 200) {
      //   // setLoader(false);
      //   setNotSafeModalVisible(!notSafeModalVisible);
      // } else {
      //   // setLoader(false);
      //   console.log(callSafeData.msg);
      // }
    } catch (error) {
      console.log('unsafe api error: ', error.response);
      safeUnsafePopup?.current?.showMessage({
        message: 'Error',
        description: JSON.stringify(error),
        type: 'error',
      });
    } finally {
      setSafUnsafeLoading(false);
    }
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation(position.coords);
      },
      error => {
        console.log('getLocation error: ', error);
      },
      { enableHighAccuracy: true, timeout: 20000 },
    );
  };

  const getOneTimeLocation = () => {
    console.log('enter location in Function');
    setLocationStatus(strings('Dashboard.lbl_getting_loc'));
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus(strings('Dashboard.lbl_you_are_here'));

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log(
          position.coords.latitude,
          '000000000-----------00000000000ZZZZZZ',
        );
        console.log(
          position.coords.longitude,
          '000000000-----------00000000000ZZZZZZZZZZZZZ',
        );
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  const getUserProfile = async () => {
    // this.setState({isAPILoading: true});
    const Token = await AsyncStorage.getItem('loginToken');
    const getProfileData = await dispatch(GetProfile(Token));
    console.log(
      getProfileData.data.state,
      '{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{',
    );

    switch (getProfileData.data.state) {
      case 'Andhra Prades':
        setCurrentlocationID('1');
        break;
      case 'Daman & Diu':
        setCurrentlocationID('2');
        break;
      case 'Goa':
        setCurrentlocationID('3');
        break;
      case 'Gujarat':
        setCurrentlocationID('4');
        break;
      case 'Karnataka':
        setCurrentlocationID('5');
        break;
      case 'Kerala':
        setCurrentlocationID('6');
        break;
      case 'Maharashtra':
        setCurrentlocationID('7');

        break;
      case 'Puducherry':
        setCurrentlocationID('8');
        break;
      case 'Odisha':
        setCurrentlocationID('9');
        break;
      case 'Tamil Nadu':
        setCurrentlocationID('10');
        break;
      case 'West Bengal':
        setCurrentlocationID('11');
        break;
      case 'Andaman & Nicobar Islands':
        setCurrentlocationID('12');
        break;
      case 'Lakshadweep':
        setCurrentlocationID('13');
        break;
      case 'None':
        setCurrentlocationID('');
        break;

      default:
    }
  };
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus(strings('Dashboard.lbl_you_are_here'));
        console.log(position, '==================-------------==============');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };
  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          // console.log("item", JSON.stringify(item))
          console.log('item', JSON.stringify(item));
          if (item.title === strings('Dashboard.lbl_state_users')) {
            // navigation.navigate('StateUsers');
          }
          if (item.title === strings('Dashboard.lbl_disaster_managers')) {
            navigation.navigate('DisasterManagers');
          }
          // if (
          //   item.title !== strings('Dashboard.lbl_state_users') &&
          //   item.title !== strings('Dashboard.lbl_disaster_managers') &&
          //   item.title !== strings('Dashboard.lbl_verification_requests') &&
          //   item.title !== strings('Dashboard.lbl_crowd_sourcing') &&
          //   item.title !== strings('Dashboard.lbl_feed') &&
          //   item.title !== strings('Dashboard.lbl_feedbacks') &&
          //   item.title !== strings('Dashboard.lbl_map') &&
          //   item.title !== strings('Dashboard.lbl_im_safe') &&
          //   item.title !== strings('Dashboard.lbl_im_not_safe') &&
          //   item.title !== strings('Dashboard.lbl_reports') &&
          //   item.title !== strings('Dashboard.lbl_population_density') &&
          //   // item.title !== 'Resource Allocation' &&
          //   item.title !== strings('Profile.lbl_profile') &&
          //   item.title !== strings('Dashboard.lbl_feedback') &&
          //   item.title !== strings('Dashboard.lbl_local_weather_data') &&
          //   item.title !== strings('Dashboard.lbl_hydromet_hazard') &&
          //   item.title !== strings('Dashboard.lbl_logout') &&
          //   item.title !== strings('Dashboard.lbl_change_lang') &&
          //   item.title !== strings('Dashboard.lbl_delete_acc')
          // ) {
          //   navigation.navigate('WeatherTypes', {
          //     id: item.id,
          //     name: item.title,
          //   });
          // }
          if (
            item.title === strings('ResourceAllocation.lbl_resource_allocation')
          ) {
            navigation.navigate('ResourceAllocation');
          }
          if (item.title === strings('Dashboard.lbl_verification_requests')) {
            navigation.navigate('VerificationRequests');
          }
          if (item.title === strings('Dashboard.lbl_crowd_sourcing')) {
            navigation.navigate('CrowdSourcingfile');
          }
          if (item.title === strings('Dashboard.lbl_feed')) {
            navigation.navigate('FeedTabs');
          }
          if (item.title === strings('Dashboard.lbl_feedback')) {
            navigation.navigate('FeedBack');
          }
          if (item.title === strings('Dashboard.lbl_map')) {
            navigation.navigate('MapWebview', {
              Mapid: currentlocationId,
            });
          }
          if (item.title === strings('Dashboard.lbl_location_specific_details')) {
            navigation.navigate('LocationSpecipi');
            // LocationSpecificDetails
          }
          if (item.title === strings('Dashboard.lbl_change_lang')) {
            navigation.navigate('ChangeLanguage');
          }
          if (item.title === strings('Dashboard.lbl_reports')) {
            navigation.navigate('Report');
          }
          if (item.title === strings('Dashboard.lbl_local_weather_data')) {
            navigation.navigate('LocalWeatherData');
            // NEWTASKRUPISE
          }
          if (item.title === strings('Dashboard.lbl_im_safe')) {
            safe();
          }
          if (item.title === strings('Dashboard.lbl_im_not_safe')) {
            // setNotSafeModalVisible(true);
            unSafe();
          }
          if (item.title === strings('Dashboard.lbl_hydromet_hazard')) {
            navigation.navigate('HydrometHazard', {
              id: item.id,
              name: item.title,
            });
          }
          if (item.title === strings('Dashboard.lbl_hydromet_hazard')) {
            navigation.navigate('HydrometHazard', {
              id: item.id,
              name: item.title,
            });
          }
          if (item.title === strings('Profile.lbl_profile')) {
            navigation.navigate('Profile');
          }
          if (item.title === strings('Dashboard.lbl_delete_acc')) {
            navigation.navigate('DeleteAccount');
          }
          if (item.title === strings('Dashboard.lbl_logout')) {
            LogoutAccount();
          }
        }}
      />
    );
  };
  if (!loader) {
    return (
      <SafeAreaView style={styles.container}>
        {/* <StatusBar backgroundColor="#3877F1" /> */}
        <View style={{ height: '100%', backgroundColor: '#FFF' }}>
          <LinearGradient
            colors={['#3877F1', '#215ACA']}
            style={styles.linearGradient}>
            {/* <View
            style={{
              //   backgroundColor: '#5B4CDF',
              backgroundColor: "pink",
            }}> */}
            <Image source={require('../../../assets/Ellipse_Head.png')} />
            {/* <Header> */}
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                width: '100%',
                // paddingHorizontal: 20,
                // justifyContent: 'space-between',
                // alignItems: 'center',
              }}>
              {/* <View style={{ width: '20%' }}></View> */}
              <View
                style={{
                  marginTop: '5%',
                  marginLeft: '15%',
                  width: '65%',
                  alignItems: 'center',
                }}>
                <CustomText
                  semibold
                  numberOfLines={1}
                  style={{ color: '#fff', fontSize: moderateScale(16) }}>
                  {strings('Dashboard.lbl_dashboard_caps')}
                </CustomText>
              </View>
              {/* <TouchableOpacity
              // disabled
              style={[styles.bell]}
              onPress={() => navigation.navigate('Notification')}
            >
              <View>
                <Image source={require('../../../assets/Bell.png')} />
                {notificationCount === 0 ? (
                  <View></View>
                ) : (
                  <View style={styles.bellNotify}>
                    <CustomText style={{ fontSize: moderateScale(7), color: '#fff' }}>{notificationCount}</CustomText>
                  </View>
                )}

              </View>
            </TouchableOpacity> */}
            </View>

            {/* </Header> */}
            {/* </View> */}
          </LinearGradient>
          <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
            {/* {!!cycloneAlert && (<View style={styles.message}>
              <View style={styles.alertMessage}>
                <CustomText semibold style={{ color: '#fff', fontSize: moderateScale(9) }}>{strings("Dashboard.lbl_alert_msg")}</CustomText>
              </View>
              <View>
                <CustomText semibold style={{ color: '#215ACA', fontSize: moderateScale(12), lineHeight: 22 }}>{cycloneAlert}</CustomText>
              </View>
            </View>
            )} */}
          </View>
          <View style={{ height: '100%', }}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
            />
          </View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                {locationPermission === 'granted' ? (
                  <View style={styles.modalView}>
                    <CustomText style={styles.modalText}>
                      {strings('Dashboard.lbl_msg_sent')}
                    </CustomText>

                    <TextInput
                      placeholder={'Reason'}
                      value={iAmSafeDescription}
                      onChangeText={setIAmSafeDescription}
                      style={{
                        width: 250,
                        color: '#0D2451',
                        borderWidth: 1,
                        borderBottomColor: 'grey',
                        marginBottom: 16,
                      }}
                    />
                    {/* <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}> */}
                    {safUnsafeLoading ? (
                      <ActivityIndicator size="large" color="#3877F1" />
                    ) : (
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity onPress={() => callSafe()}>
                          <View style={[styles.button, styles.buttonClose]}>
                            <CustomText bold style={styles.textStyle}>
                              {strings('Common.button_ok_caps')}
                            </CustomText>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setModalVisible(!modalVisible); }}>
                          <View
                            style={{ marginLeft: 20, fontSize: 15, marginTop: 10 }}>
                            <CustomText bold style={{ color: 'blue' }}>
                              Close
                            </CustomText>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ) : (
                  <View style={styles.modalView}>
                    <CustomText style={styles.modalText}>
                      {strings('Dashboard.lbl_we_dont_have_sent')}
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}>
                      <View style={[styles.button, styles.buttonClose]}>
                        <CustomText bold style={styles.textStyle}>
                          {strings('Common.button_ok_caps')}
                        </CustomText>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <FlashMessage ref={safeUnsafePopup} />
            </Modal>
          </View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={notSafeModalVisible}
              onRequestClose={() => {
                setNotSafeModalVisible(!notSafeModalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <CustomText style={styles.modalText}>
                    {strings('Dashboard.lbl_msg_sent_state_admin')}
                  </CustomText>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <CheckBox
                      value={water}
                      onValueChange={newValue => {
                        setWater(newValue);
                      }}
                      tintColors
                    />
                    <CustomText
                      semibold
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: water == 0 ? '#000' : '#3877F1',
                        fontSize: moderateScale(14),
                        paddingLeft: 10,
                      }}>
                      Water Entered in House
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <CheckBox
                      value={tree}
                      onValueChange={newValue => {
                        setTree(newValue);
                      }}
                      tintColors
                    />
                    <CustomText
                      semibold
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: tree == 0 ? '#000' : '#3877F1',
                        fontSize: moderateScale(14),
                        paddingLeft: 10,
                      }}>
                      Tree fallen in front of house
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <CheckBox
                      value={fire}
                      onValueChange={newValue => {
                        setFire(newValue);
                      }}
                      tintColors
                    />
                    <CustomText
                      semibold
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: fire == 0 ? '#000' : '#3877F1',
                        fontSize: moderateScale(14),
                        paddingLeft: 10,
                      }}>
                      Fire in house
                    </CustomText>
                  </View>

                  <TextInput
                    placeholder={'Reason'}
                    value={iAmNotSafeDescription}
                    onChangeText={setIAmNotSafeDescription}
                    style={{
                      width: 250,
                      color: '#0D2451',
                      borderWidth: 1,
                      borderBottomColor: 'grey',
                      marginBottom: 16,
                    }}
                  />

                  {safUnsafeLoading ? (
                    <ActivityIndicator size="large" color="#3877F1" />
                  ) : (
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity onPress={() => call_Un_Safe()}>
                        <View style={[styles.button, styles.buttonClose]}>
                          <CustomText bold style={styles.textStyle}>
                            {strings('Common.button_ok_caps')}
                          </CustomText>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => call_Un_SafeClose()}>
                        <View
                          style={{ marginLeft: 20, fontSize: 15, marginTop: 10 }}>
                          <CustomText bold style={{ color: 'blue' }}>
                            Close
                          </CustomText>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <FlashMessage ref={notsafeUnsafePopup} />
            </Modal>
          </View>
        </View>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    height: '100%'
  },
  message: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 9,
  },
  alertMessage: {
    borderRadius: 25,
    width: '35%',
    backgroundColor: '#FB7429',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    marginBottom: 6,
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 2,
    borderRadius: 40,
    marginBottom: 20,
    // marginVertical: 5,
    marginHorizontal: 16,
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
    fontSize: moderateScale(16),
    color: '#0D2451',
  },
  bell: {
    marginTop: '3%',
    // alignItems: 'flex-end',
    alignItems: 'center',
    padding: 5,
    width: '20%',
  },
  bellNotify: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    position: 'absolute',
    backgroundColor: '#EB4335',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: -4,
  },

  // ModalView

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    // backgroundColor:'#c5c5c5',

    shadowColor: '#232324',
    shadowOffset: { width: 0, height: 1 },
    elevation: 200,
    // top: 200,
    // height:"20%",
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(100,100,100, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ Logout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export function split(string, length = 1000) {
  // Split text into individual words and count length
  const words = string.split(' ');
  const count = words.length;

  // Prepare elements and position tracker
  const elements = [];
  let position = 0;

  // Loop through words whilst position is less than count
  while (position < count) {
    // Prepare text for specified length and increment position
    const text = words.slice(position, length).join(' ');
    position += length;

    // Append text element
    elements.push(<CustomText>{text}</CustomText>);
  }

  return elements;
}