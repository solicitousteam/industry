import React, { useEffect, useState, useRef } from 'react';
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
  FlatList,
  BackHandler,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddStateUserData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import lan from '../../../Networking/Language'
import { statelist } from '../../../Util/Common';
import { strings } from '../../../localization/i18n';
import { CustomText } from '../../../Component/Text';
import ImagePicker from "react-native-image-crop-picker";
import { createThumbnail } from "react-native-create-thumbnail";
import ActionSheet from 'react-native-action-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { headerpost, postAPI } from '../../../Networking/Request';
import Config from '../../../Networking/Config';
import Geolocation from '@react-native-community/geolocation';
import APIConstants from '../../../Networking/APIConstants';
import axios from 'axios';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { moderateScale } from 'react-native-size-matters';

var IMAGE_BUTTONS_PROFILE = [
  // strings("Common.lbl_select_image_from_gallery"),
  strings("Common.lbl_take_image_camera"),
];
var IMAGE_GALLERY_INDEX = 1;
var IMAGE_CANCEL_INDEX = 2;

const CrowdSourcingFirst = ({ navigation, route }) => {

  let dropDownAlertRef = useRef();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DOE, setDOE] = useState('');
  const [time, setTime] = useState('');
  const [stateName, setStateName] = useState("");
  const [districtName, setdistrictName] = useState("");
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [cyclone_name, setCycloneName] = useState("")
  const [isEdit, setIsEdit] = useState(route.params.isEdit)
  const [crowdData, setCrowdData] = useState("");
  const [modalVisible, setModalVisible] = useState(false)
  const [loader, setLoader] = useState(false);
  const [editResponse, setEditResponse] = useState("");
  const [contryState, setContryState] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [weather_phenomena_commnet, setweatherComment] = useState("");
  const [flood_reason_comment, setFloodComment] = useState("");
  const [weather_phenomena_List, setWeather_phenomena_List] = useState([]);
  const [imageSource, setImageSource] = useState([]);
  const [weatherList, setWeatherList] = useState([
    { id: 1, name: strings("CrowdSourcingSecond.lbl_gusty_wind"), isSelect: 0 },
    { id: 1, name: strings("CrowdSourcingSecond.lbl_rain"), isSelect: 0 },
    { id: 2, name: strings("CrowdSourcingSecond.lbl_drizzle"), isSelect: 0 },
    { id: 3, name: strings("CrowdSourcingSecond.lbl_storm_surge"), isSelect: 0 },
  ]);
  const [floodList, setFloodList] = useState([
    { id: 1, name: strings("CrowdSourcingSecond.lbl_rainfall"), isSelect: 0 },
    { id: 2, name: strings("CrowdSourcingSecond.lbl_storm_surge"), isSelect: 0 },
    { id: 3, name: strings("CrowdSourcingSecond.lbl_both"), isSelect: 0 }
  ]);
  const [flood_Reason_List, setFlood_Reason_List] = useState([]);
  const [loclatitude, setLatitude] = useState(null);
  const [loclongitude, setLongitude] = useState(null);



  const Item = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 13 }}>
            <CustomText regular style={styles.title}>{item.title}</CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );


  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    setContryState(statelist)
    if (route.params.isEdit) {
      setEditResponse(route.params)
      console.log("===============ROUTE=======R========")
      console.log(route.params.crowdData.damage_cause)
      console.log("===============ROUTE===============")

      setCycloneName(route.params.crowdData.cyclone_name)
      setCrowdData(route.params.crowdData)
      setDOE(route.params.crowdData.date)
      setTime(route.params.crowdData.event_time)
    }


    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };

  }, [route]);

  useEffect(() => {
    console.log('here');
    getLocation();
  }, [])

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  useEffect(() => {
    onGetInfoSelect()
  }, [])

  const onGetInfoSelect = async () => {
    try {
      const Token = await AsyncStorageLib.getItem('loginToken');
      let latitude = loclatitude;
      let longitude = loclongitude;
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data',
      };
      const url = `http://103.215.208.96:8100/api/administrator_boundary/`
      const formData = new FormData();
      formData.append('lat', latitude);
      formData.append('long', longitude);
      const response = await axios({
        url,
        method: 'POST',
        data: formData,
        headers,
      });

      console.log(' long and lat response: ', response.data);
    } catch (error) {
      console.log('error raised : ', error);
    }
  }


    // const getData = async () => {
    //   setLoader(true)
    //   const Data = route.params;

    //   await setEditResponse(Data)
    //   setLoader(false)
    //   setFlag(false)
    // if(Data.screen === "edit")
    // }


    const onChangeTime = (event, time) => {
      console.log(time, "================")
      // var formated_time = moment(time).format('HH:mm');
      console.log(moment(time).format('HH:mm'), '======');
      setShow(Platform.OS === 'ios');
      setTime(moment(time).format('HH:mm'));
    };

    const handleConfirmDate = (event, date) => {
      setModalVisible(false);
      var formated_date = moment(date).format('YYYY-MM-DD');
      // var day_name = t(moment(date).format('dddd'));
      setDOE(formated_date)
      // this.setState({
      //   DOB: formated_date,
      // });
    }

    const hideDatePicker = () => {
      this.setState({ setDatePickerVisibility: false });
    };

    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
    const showTimepicker = () => {
      showMode('time');
    };

    useEffect(() => {
      if (route.params.isEdit) {
        getData()
      }
    }, []);

    const getData = () => {
      const Data = route.params.crowdData
      console.log("========SECOND======")
      console.log(Data)
      setCrowdData(Data)
      setWeather_phenomena_List(Data.weather_phenomena);
      setFlood_Reason_List(Data.flood_reason);
      setweatherComment(Data.weather_phenomena_commnet);
      setFloodComment(Data.flood_reason_comment);

      //weather
      var matches = false;
      if (Data.weather_phenomena.length > 0) {
        for (let i = 0; i < weatherList.length; i++) {
          matches = false;
          for (let j = 0; j < Data.weather_phenomena.length; j++) {
            if (weatherList[i].id == Data.weather_phenomena[j]) {
              matches = true;
            }
          }
          if (matches) {
            var datum = weatherList[i];
            var newNum = "isSelect";
            var newVal = 1;
            datum[newNum] = newVal;
          };
        }
      }
      // FloodList
      var floodmatches = false;
      if (Data.flood_reason.length > 0) {
        for (let i = 0; i < floodList.length; i++) {
          floodmatches = false;
          for (let j = 0; j < Data.flood_reason.length; j++) {
            if (floodList[i].id == Data.flood_reason[j]) {
              floodmatches = true;
            }
          }
          if (floodmatches) {
            var datum = floodList[i];
            var newNum = "isSelect";
            var newVal = 1;
            datum[newNum] = newVal;
          };
        }
      }
    }

    const quickSubmit = async () => {
      const Token = await AsyncStorage.getItem('loginToken');
      let cyclone_Name = cyclone_name;
      let DOB = DOE;
      let new_time = time;
      let weather_Phenomena_List = weather_phenomena_List
      let weather_Phenomena_commnet = weather_phenomena_commnet;
      let flood_reason_List = flood_Reason_List
      let flood_Reason_comment = flood_reason_comment;
      let latitude = loclatitude;
      let longitude = loclongitude;
      let damageCause_List = route.params.damageCause_List;
      let damageCauseComment = route.params.damageCauseComment;
      let id = route.params.isEdit ? crowdData.id : "";

      let weatherArr = []
      for (let i = 0; i < weatherList.length; i++) {
        if (weatherList[i].isSelect === 1) {
          weatherArr.push(weatherList[i].id)
        }
      }

      setWeather_phenomena_List(weatherArr)

      //Flood List
      let floodArr = []
      for (let i = 0; i < floodList.length; i++) {
        if (floodList[i].isSelect === 1) {
          floodArr.push(floodList[i].id)
        }
      }
      setFlood_Reason_List(floodArr)
      console.log("floodArr", floodArr)

      if (cyclone_name == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_cyclone_name_required"));
        return;
      }
      if (DOE == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_select_doe"));
        return;
      }
      if (time == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_select_dob"));
        return;
      }
      if (weatherArr.length === 0) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingSecond.msg_select_weather_phenomena"));
        return;
      }

      if (floodArr.length === 0) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingSecond.msg_select_flood_type"));
        return;
      }
      if (imageSource.length === 0) {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          strings("Common.msg_select_atleast_one_image"),
        );
        return;
      }

      setLoader(true);

      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data',
      };
      let formData = new FormData();
      formData.append("cyclone_name", cyclone_Name);
      formData.append("Date", DOB);
      formData.append("event_time", new_time);
      weatherArr.forEach((item, i) => {
        const newFile = item
        formData.append(`weather_phenomena[${i}]`, newFile);
      });

      if (weather_Phenomena_commnet.trim()) {
        formData.append("weather_phenomena_commnet", weather_Phenomena_commnet.trim());
      }


      floodArr.forEach((item, i) => {
        const newFile = item
        formData.append(`flood_reason[${i}]`, newFile);
      });
      if (flood_Reason_comment.trim()) {
        formData.append("flood_reason_comment", flood_Reason_comment.trim());
      }
      formData.append('lat', latitude);
      formData.append('long', longitude);

      formData.append("id", id)
      imageSource.forEach((item, i) => {
        const newFile = {
          uri: item.uri, type: item.type, name: item.name
        }
        formData.append("damge_images[]", newFile);
      });

      console.log("weather_Phenomena_List: ", weather_Phenomena_List);
      console.log("flood_reason_List: ", flood_reason_List);

      console.log(
        'url====',
        Config.baseUrl + APIConstants.create_crowd_sourcing,
        headers,
        formData,
      );
      headerpost(
        headers,
        Config.baseUrl + APIConstants.create_crowd_sourcing,
        formData,
        'POST',
        'formData'
      )
        .then((result) => {
          setLoader(false);
          if (result.status == 200) {
            setLoader(false);
            navigation.navigate('ThankYouCrowdSourcing');
          } else {
            setLoader(false);
            dropDownAlertRef.alertWithType('error', 'DCRA', result.message);
          }
        })
        .catch((error) => {
          setLoader(false)
          console.log("error123", error)
          dropDownAlertRef.alertWithType('error', 'DCRA', error.message);
        })
    }

    const submit = () => {
      console.log(weather_phenomena_List, "weather_phenomena_List")
      console.log(flood_Reason_List, "flood_Reason_List")
      console.log(flood_reason_comment, "flood_reason_comment")
      console.log(weather_phenomena_commnet, "weather_phenomena_commnet")
      //Weather List
      let weatherArr = []
      for (let i = 0; i < weatherList.length; i++) {
        if (weatherList[i].isSelect === 1) {
          weatherArr.push(weatherList[i].id)
        }
      }
      setWeather_phenomena_List(weatherArr)
      console.log("weatherArr", weatherArr)

      //Flood List
      let floodArr = []
      for (let i = 0; i < floodList.length; i++) {
        if (floodList[i].isSelect === 1) {
          floodArr.push(floodList[i].id)
        }
      }
      setFlood_Reason_List(floodArr)
      console.log("floodArr", floodArr)

      if (cyclone_name == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_cyclone_name_required"));
        return;
      }
      if (DOE == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_select_doe"));
        return;
      }
      if (time == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_select_dob"));
        return;
      }
      if (weatherArr.length === 0) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingSecond.msg_select_weather_phenomena"));
        return;
      }

      if (floodArr.length === 0) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingSecond.msg_select_flood_type"));
        return;
      }
      if (imageSource.length === 0) {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          strings("Common.msg_select_atleast_one_image"),
        );
        return;
      }


      navigation.navigate('CrowdSourcingThird', {
        crowdData, cyclone_name, DOE, time, isEdit,
        weather_phenomena_List: weatherArr, flood_Reason_List: floodArr, weather_phenomena_commnet, flood_reason_comment, loclatitude, loclongitude,

      })

    }


    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: strings("PermissionsText.msg_camera_permission_title"),
            message: strings("PermissionsText.msg_camera_permission_msg"),
            buttonNeutral: strings("PermissionsText.button_ask_me_later"),
            buttonNegative: strings("Common.button_cancel"),
            buttonPositive: strings("Common.button_ok_caps")
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openImagePicker()
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const openImagePicker = () => {
      ActionSheet.showActionSheetWithOptions(
        {
          // title: 'Image Picker',
          title: strings("Common.lbl_select_option"),
          options: IMAGE_BUTTONS_PROFILE,
          chat: IMAGE_GALLERY_INDEX,
          tintColor: '#1E50CE',
        },
        buttonIndex => {
          if (buttonIndex == 0) {
            selectGalleryImage();
          } else if (buttonIndex == 1) {
            selectCameraImage();

          }
        },
      );
    };

    const selectGalleryImage = () => {
      try {
        let options = {
          title: strings("Common.lbl_choose_one_image"),
          maxWidth: 256,
          maxHeight: 256,
          noData: true,
          mediaType: 'photo',
          storageOptions: {
            skipBackup: true,
          },
        };

        launchImageLibrary(options, response => {
          setLoader(true);
          if (response.didCancel) {
            console.log('User cancelled photo picker');
            setLoader(false);
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            setLoader(false);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            setLoader(false);
          } else {
            let source = { uri: response.assets[0].uri };
            // ADD THIS
            console.log("Source", response.assets[0]);
            imageSource.push({
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type
            });
            setLoader(false);
          }
        });
      } catch (error) { }
    };
    const selectCameraImage = () => {
      try {
        let options = {
          title: strings("Common.lbl_choose_one_image"),
          maxWidth: 256,
          maxHeight: 256,
          noData: true,
          mediaType: 'photo',
          storageOptions: {
            skipBackup: true,
          },
        };

        launchCamera(options, response => {
          setLoader(true);
          if (response.didCancel) {
            console.log('User cancelled photo picker');
            setLoader(false);
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            setLoader(false);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            setLoader(false);
          } else {
            let source = { uri: response.assets[0].uri };
            // ADD THIS
            console.log("Source", response.assets[0]);
            imageSource.push({
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type
            });
            setLoader(false);
          }
        });
      } catch (error) { }
    };

    const deleteImage = e => {

      const deletedImage = imageSource.filter((item, index) => index !== e);
      setImageSource(deletedImage);
      console.log('imageSource', imageSource);
    };


    const renderItem = ({ item, index }) => {
      console.log("item", item);
      // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
      // const color = item.id === selectedId ? 'white' : 'black';
      return (
        <View>
          <TouchableOpacity style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-end' }}>
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: 60, height: 60, borderRadius: 10 }}
                />
                <TouchableOpacity style={{ position: 'absolute', flexDirection: 'row', borderRadius: 20, backgroundColor: '#fff', padding: 5, margin: 2, }}
                  onPress={() => deleteImage(index)}
                >
                  <View>
                    <Image
                      source={require('../../../../assets/Delete.png')}
                      style={{ width: 10, height: 11 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };



    if (!loader) {

      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#3877F1" />
          <LinearGradient colors={['#3877F1', '#215ACA']} style={styles.linearGradient}>
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Image source={require('../../../../assets/Ellipse_Head.png')} />
              <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => navigation.pop()} style={{ width: '20%' }}>
                    <Image source={require('../../../../assets/Back_Arrow_White.png')} />
                  </TouchableOpacity>
                  <CustomText semibold style={{ color: '#fff', fontSize: moderateScale(16), }}>{strings("CrowdSourcingFile.lbl_crowd_sourcing_form")}</CustomText>
                </View>

                <View style={{ width: '20%', alignItems: 'flex-end' }}>
                  <CustomText semibold style={{ color: '#fff', fontSize: moderateScale(16), }}>1/3</CustomText>
                </View>
              </View>
            </View>
          </LinearGradient>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 10 }}>
              <View style={{ paddingHorizontal: 10 }}>
                <View style={{ marginTop: '5%' }}>
                  <CustomText style={{ fontSize: moderateScale(14), color: '#000000' }}>{strings("CrowdSourcingFile.lbl_cyclone_name")}<CustomText style={{ color: 'red' }}>*</CustomText>
                  </CustomText>
                </View>
                <View style={{ borderWidth: 1, borderRadius: 12, borderColor: '#DFDFDF', marginTop: 5, }}>
                  <TextInput
                    maxLength={20}
                    value={cyclone_name}
                    style={{ fontFamily: "OpenSans-Regular", paddingHorizontal: moderateScale(10), fontSize: moderateScale(17), fontWeight: '600', color: '#0D2451', }}
                    onChangeText={cyclone_name => setCycloneName(cyclone_name)}
                  />
                </View>
                <View style={{ marginVertical: '3%' }}>
                  <CustomText style={{ fontSize: moderateScale(14), color: '#000000', }}>{strings("CrowdSourcingFirst.lbl_date_of_event")}</CustomText>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <View style={{ borderWidth: 1, borderRadius: 12, borderColor: '#DFDFDF', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', padding: 12, }}>
                    <View>
                      <CustomText style={{ fontSize: moderateScale(17), color: '#000000', }}>{DOE}</CustomText>
                    </View>
                    <Image source={require('../../../../assets/Calendar.png')} />
                  </View>
                </TouchableOpacity>
                {modalVisible && (
                  <DateTimePicker
                    value={date}
                    placeholderText={'DOE'}
                    mode={'date'}
                    maximumDate={new Date()}
                    // minimumDate={nextDate}
                    display="default"
                    format="YYYY/MM/DD"
                    onChange={(event, date) =>
                      handleConfirmDate(event, date)
                    }
                    onCancel={() => setModalVisible(false)}
                  />
                )}
                <View style={{ marginVertical: '3%' }}>
                  <CustomText style={{ fontSize: moderateScale(14), color: '#000000', }}>{strings("ReviewFormInfo.lbl_time_of_weather_event")} <CustomText style={{ color: 'red' }}>*</CustomText></CustomText>
                </View>
                <TouchableOpacity onPress={showTimepicker}>
                  <View style={{ borderWidth: 1, borderRadius: 12, borderColor: '#DFDFDF', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', padding: 12, }}>
                    <View>
                      <CustomText style={{ fontSize: moderateScale(17), color: '#000000' }}>{time}</CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"time"}
                    display="default"
                    onChange={(event, time) => onChangeTime(event, time)}
                  // onChange={(e) => console.log(e)}
                  />
                )}
              </View>
              <View style={{ marginTop: 20, marginHorizontal: 12 }}>
                <CustomText style={{ fontSize: moderateScale(17), color: '#000000' }}>{strings("CrowdSourcingSecond.lbl_weather_phenomena")}</CustomText>
              </View>
              <FlatList
                data={weatherList}
                renderItem={({ item, index }) => {
                  return <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginHorizontal: 12 }}>
                    <CheckBox
                      value={item.isSelect == 0 ? false : true}
                      onValueChange={newValue => {
                        let arr = [...weatherList]
                        if (newValue) {
                          arr[index] = { ...arr[index], isSelect: 1 };
                        } else {
                          arr[index] = { ...arr[index], isSelect: 0 };
                        }
                        setWeatherList(arr)
                      }}
                      tintColors
                    />
                    <CustomText semibold style={{ color: item.isSelect == 0 ? "#000" : '#3877F1', fontSize: moderateScale(13), marginLeft: 5 }}>{item.name}</CustomText>
                  </View>
                }}
                keyExtractor={item => item.id}
              />
              <View style={{ marginTop: 20, borderWidth: 1, borderRadius: 20, borderColor: '#E5E5E5', paddingHorizontal: 10, marginHorizontal: 12 }}>
                <TextInput
                  placeholder={strings("Common.hint_write_comment")}
                  multiline
                  value={weather_phenomena_commnet}
                  onChangeText={weather_phenomena_commnet => {
                    setweatherComment(weather_phenomena_commnet)
                  }}
                  style={{ color: '#0D2451', }}
                />
              </View>
              <View style={{ paddingHorizontal: 10, marginTop: 30, marginHorizontal: 12 }}>
                <CustomText style={{ lineHeight: 24, fontSize: moderateScale(15), color: "#000", }}>{strings("CrowdSourcingSecond.lbl_flooding_at_your_location")}</CustomText>
              </View>

              <FlatList
                data={floodList}
                renderItem={({ item, index }) => {
                  return <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginHorizontal: 12 }}>
                    <CheckBox
                      value={item.isSelect == 0 ? false : true}
                      onValueChange={newValue => {
                        let arr = [...floodList]
                        if (newValue) {
                          arr[index] = { ...arr[index], isSelect: 1 };
                        } else {
                          arr[index] = { ...arr[index], isSelect: 0 };
                        }
                        setFloodList(arr)
                      }}
                      tintColors
                    />
                    <CustomText semibold style={{ color: item.isSelect == 0 ? "#000" : '#3877F1', fontSize: moderateScale(13), marginLeft: 5 }}>{item.name}</CustomText>
                  </View>
                }}
                keyExtractor={item => item.id}
              />
              <View style={{ marginTop: 20, borderWidth: 1, paddingBottom: 20, borderRadius: 20, borderColor: '#E5E5E5', paddingHorizontal: 10, marginHorizontal: 12 }}>
                <TextInput
                  placeholder={strings("Common.hint_write_comment")}
                  multiline
                  value={flood_reason_comment}
                  onChangeText={flood_reason_comment => {
                    setFloodComment(flood_reason_comment)
                  }}
                  style={{ color: '#0D2451', }}
                />
              </View>
              <View style={{ marginTop: 20, marginHorizontal: 12 }}>
                <CustomText style={{ fontSize: moderateScale(14), color: '#000', }}>{strings("Common.lbl_upload_images")}</CustomText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 12 }}>
                <View style={{ marginRight: 5 }}>
                  <TouchableOpacity onPress={() => {
                    requestCameraPermission()
                  }}>
                    <View style={{ borderRadius: 20, padding: 20, backgroundColor: 'rgba(56, 119, 241, 0.12)', }}>
                      <Image source={require('../../../../assets/ImageIcon.png')} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <FlatList
                    style={{ marginRight: '20%' }}
                    horizontal={true}
                    data={imageSource}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  //   extraData={selectedId}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => quickSubmit()}
                style={{
                  marginVertical: 20, borderRadius: 48, paddingVertical: 16, backgroundColor: '#3877F1', shadowColor: '#3877F1',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.1, shadowRadius: 2, elevation: 9, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10,
                }}>
                <View style={{ width: 10 }}></View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 15, }}>
                  <CustomText semibold style={{ fontSize: moderateScale(18), color: '#fff', }}>{strings("Common.button_quick_submit")}</CustomText>
                </View>
                <View>
                  <Image source={require('../../../../assets/Login_Arrow.png')} style={{ width: 27.5, height: 26.7 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => submit()}
                style={{
                  marginVertical: 10, borderRadius: 48, paddingVertical: 16, backgroundColor: '#3877F1', shadowColor: '#3877F1',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.1, shadowRadius: 2, elevation: 9, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10,
                }}>
                <View style={{ width: 10 }}></View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 15, }}>
                  <CustomText semibold style={{ fontSize: moderateScale(18), color: '#fff', }}>{strings("Common.button_confirm_continue")}</CustomText>
                </View>
                <View>
                  <Image source={require('../../../../assets/Login_Arrow.png')} style={{ width: 27.5, height: 26.7 }} />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <DropdownAlert
            ref={ref => {
              if (ref) {
                dropDownAlertRef = ref;
              }
            }}
          />
        </SafeAreaView>
      );
    } else {
      return <ActivityIndicator style={{ justifyContent: 'center', flex: 1 }} />;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      marginTop: moderateScale(20),
      // fontWeight: "bold",
      fontSize: moderateScale(14),
    },
  });
  export default CrowdSourcingFirst;
