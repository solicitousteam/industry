import React, { useRef, useState, useEffect } from 'react';
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
  ActivityIndicator,
  BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { strings } from "../../../localization/i18n"
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddStateUserData } from '../../../Redux/Action/Admin';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
const Item = ({ item, onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: 13 }}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);
const AddStateUser = ({ navigation, route }) => {
  let dropDownAlertRef = useRef();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [relative1MobileNumber, setRelative1MobileNumber] = useState('');
  const [relative2MobileNumber, setRelative2MobileNumber] = useState('');
  const [relative3MobileNumber, setRelative3MobileNumber] = useState('');
  const [relative4MobileNumber, setRelative4MobileNumber] = useState('');
  const [relative5MobileNumber, setRelative5MobileNumber] = useState('');

  let [loader, setLoader] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DOB, setDOB] = useState('');
  const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
  const [districtName, setdistrictName] = useState(strings("CrowdSourcingFirst.lbl_select_district"));
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [userDataInfo, setUserDataInfo] = useState('');
  const [userId, setUserId] = useState('');
  const [contryState, setContryState] = useState([
    {
      id: '28',
      title: strings("CountryState.lbl_andhra_pradesh"),
    },
    {
      id: '25',
      title: strings("CountryState.lbl_daman_diu"),
    },
    {
      id: '30',
      title: strings("CountryState.lbl_goa"),
    },
    {
      id: '24',
      title: strings("CountryState.lbl_gujarat"),
    },
    {
      id: '29',
      title: strings("CountryState.lbl_karnataka"),
    },
    {
      id: '32',
      title: strings("CountryState.lbl_kerala"),
    },
    {
      id: '27',
      title: strings("CountryState.lbl_maharashtra"),
    },
    {
      id: '34',
      title: strings("CountryState.lbl_puducherry"),
    },
    {
      id: '21',
      title: strings("CountryState.lbl_odisha"),
    },
    {
      id: '33',
      title: strings("CountryState.lbl_tamil_nadu"),
    },
    {
      id: '19',
      title: strings("CountryState.lbl_west_bengal"),
    },
    {
      id: '35',
      title: strings("CountryState.lbl_andaman_nicobar_islands"),
    },
    {
      id: '31',
      title: strings("CountryState.lbl_lakshadweep"),
    },
  ]);

  const [gujaratDistrict, setGujaratDistrict] = useState([{
    id: '474',
    title: strings("District.lbl_ahmadabad"),
  },
  {
    id: '480',
    title: strings("District.lbl_amreli"),
  },
  {
    id: '482',
    title: strings("District.lbl_anand"),
  },
  {
    id: '469',
    title: strings("District.lbl_banas_kantha"),
  },
  {
    id: '488',
    title: strings("District.lbl_bharuch"),
  },
  {
    id: '481',
    title: strings("District.lbl_bhavnagar"),
  },
  {
    id: '477',
    title: strings("District.lbl_jamnagar"),
  },
  {
    id: '479',
    title: strings("District.lbl_junagadh"),
  },
  {
    id: '468',
    title: strings("District.lbl_kachchh"),
  },
  {
    id: '483',
    title: strings("District.lbl_kheda"),
  },
  {
    id: '487',
    title: strings("District.lbl_narmada"),
  },
  {
    id: '490',
    title: strings("District.lbl_navsari"),
  },
  {
    id: '470',
    title: strings("District.lbl_patan"),
  },
  {
    id: '478',
    title: strings("District.lbl_porbandar"),
  },
  {
    id: '476',
    title: strings("District.lbl_rajkot"),
  },
  {
    id: '492',
    title: strings("District.lbl_surat"),
  },
  {
    id: '475',
    title: strings("District.lbl_surendranagar"),
  },
  {
    id: '486',
    title: strings("District.lbl_vadodara"),
  },
  {
    id: '491',
    title: strings("District.lbl_valsad"),
  },
  ]);

  const [Daman_Diu_District, setDaman_Diu_District] = useState([
    {
      id: '495',
      title: strings("District.lbl_daman"),
    },
    {
      id: '494',
      title: strings("District.lbl_diu"),
    },
  ]);

  const [Andhra_Pradesh_District, setAndhra_Pradesh_District] = useState([
    {
      id: '545',
      title: strings("District.lbl_east_godavari"),
    },
    {
      id: '548',
      title: strings("District.lbl_guntur"),
    },
    {
      id: '547',
      title: strings("District.lbl_krishna"),
    },
    {
      id: '549',
      title: strings("District.lbl_prakasam"),
    },
    {
      id: '550',
      title: strings("District.lbl_sri_potti"),
    },
    {
      id: '542',
      title: strings("District.lbl_srikakulam"),
    },
    {
      id: '544',
      title: strings("District.lbl_vishakhapatnam"),
    },
    {
      id: '543',
      title: strings("District.lbl_vizianagaram"),
    },
    {
      id: '546',
      title: strings("District.lbl_west_godavari"),
    },
  ]);

  const [Goa_District, setGoa_District] = useState([
    {
      id: '585',
      title: strings("District.lbl_north_goa"),
    },
    {
      id: '586',
      title: strings("District.lbl_south_goa"),
    },
  ]);

  const [Karnataka_District, setKarnataka_District] = useState([
    {
      id: '575',
      title: strings("District.lbl_dakshina_kannada"),
    },
    {
      id: '569',
      title: strings("District.lbl_udupi"),
    },
    {
      id: '563',
      title: strings("District.lbl_uttara_kannada"),
    },
    {
      id: '598',
      title: strings("District.lbl_alappuzha"),
    },
    {
      id: '595',
      title: strings("District.lbl_ernakulam"),
    },
    {
      id: '589',
      title: strings("District.lbl_kannur"),
    },
    {
      id: '588',
      title: strings("District.lbl_kasaragod"),
    },
    {
      id: '600',
      title: strings("District.lbl_kollam"),
    },
    {
      id: '597',
      title: strings("District.lbl_kottayam"),
    },
    {
      id: '591',
      title: strings("District.lbl_kozhikode"),
    },
    {
      id: '592',
      title: strings("District.lbl_malappuram"),
    },
    {
      id: '593',
      title: strings("District.lbl_palakkad"),
    },
    {
      id: '599',
      title: strings("District.lbl_pathanamthitta"),
    },
    {
      id: '594',
      title: strings("District.lbl_thiruvananthapuram"),
    },
  ]);

  const [Lakshadweep_District, setLakshadweep_District] = useState([
    {
      id: '587',
      title: strings("District.lbl_lakshadweep"),
    },
  ]);

  const [Maharashtra_District, setMaharashtra_District] = useState([
    {
      id: '519',
      title: strings("District.lbl_mumbai"),
    },
    {
      id: '518',
      title: strings("District.lbl_mumbai_suburban"),
    },
    {
      id: '520',
      title: strings("District.lbl_raigarh"),
    },
    {
      id: '528',
      title: strings("District.lbl_ratnagiri"),
    },
    {
      id: '529',
      title: strings("District.lbl_sindhudurg"),
    },
    {
      id: '517',
      title: strings("District.lbl_thane"),
    },
  ]);

  const [Odisha_District, setOdisha_District] = useState([
    {
      id: '377',
      title: strings("District.lbl_baleswar"),
    },
    {
      id: '378',
      title: strings("District.lbl_bhadrak"),
    },
    {
      id: '381',
      title: strings("District.lbl_cuttack"),
    },
    {
      id: '388',
      title: strings("District.lbl_ganjam"),
    },
    {
      id: '380',
      title: strings("District.lbl_jagatsinghpur"),
    },
    {
      id: '382',
      title: strings("District.lbl_jajpur"),
    },
    {
      id: '386',
      title: strings("District.lbl_khordha"),
    },
    {
      id: '376',
      title: strings("District.lbl_mayurbhanj"),
    },
    {
      id: '387',
      title: strings("District.lbl_puri"),
    },
  ]);

  const [Puducherry_District, setPuducherry_District] = useState([
    {
      id: '637',
      title: strings("District.lbl_karaikal"),
    },
    {
      id: '636',
      title: strings("District.lbl_mahe"),
    },
    {
      id: '635',
      title: strings("District.lbl_puducherry"),
    },
    {
      id: '634',
      title: strings("District.lbl_yanam"),
    },
  ]);

  const [Tamil_Nadu_District, setTamil_Nadu_District] = useState([
    {
      id: '603',
      title: strings("District.lbl_chennai"),
    },
    {
      id: '617',
      title: strings("District.lbl_cuddalore"),
    },
    {
      id: '604',
      title: strings("District.lbl_kancheepuram"),
    },
    {
      id: '629',
      title: strings("District.lbl_kanniyakumari"),
    },
    {
      id: '618',
      title: strings("District.lbl_nagapattinam"),
    },
    {
      id: '621',
      title: strings("District.lbl_pudukkottai"),
    },
    {
      id: '626',
      title: strings("District.lbl_ramanathapuram"),
    },
    {
      id: '620',
      title: strings("District.lbl_thanjavur"),
    },
    {
      id: '602',
      title: strings("District.lbl_thiruvallur"),
    },
    {
      id: '619',
      title: strings("District.lbl_thiruvarur"),
    },
    {
      id: '627',
      title: strings("District.lbl_thoothukkudi"),
    },
    {
      id: '628',
      title: strings("District.lbl_tirunelveli"),
    },
    {
      id: '607',
      title: strings("District.lbl_viluppuram"),
    },
  ]);

  const [West_Bengal_District, setWest_Bengal_District] = useState([
    {
      id: '341',
      title: strings("District.lbl_haora"),
    },
    {
      id: '338',
      title: strings("District.lbl_hugli"),
    },
    {
      id: '342',
      title: strings("District.lbl_kolkata"),
    },
    {
      id: '337',
      title: strings("District.lbl_north_twenty_four_parganas"),
    },
    {
      id: '344',
      title: strings("District.lbl_paschim_medinipur"),
    },
    {
      id: '345',
      title: strings("District.lbl_purba_medinipur"),
    },
    {
      id: '343',
      title: strings("District.lbl_south_twenty_four_parganas"),
    },
  ]);
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    setLoader(true);
    const Data = route.params;
    // const Userdata = route.params.userInfo;
    // setUserDataInfo(Userdata);
    const Header = Data.flag;
    setHeaderTitle(Header);
    console.log(Header, '=================USER');
    // console.log(userDataInfo, '===========rrrrrrrrrr======USER');
    setFirstName(Data.userInfo.first_name);
    setUserName(Data.userInfo.username);
    setMobileNumber(Data.userInfo.mobile);
    setDOB(Data.userInfo.date_of_birth);
    if (Data.flag === "") {
      setStateName(strings("CrowdSourcingFirst.lbl_select_state"));
      setdistrictName(strings("CrowdSourcingFirst.lbl_select_district"));
    } else {
      setStateName(Data.userInfo.state);
      setdistrictName(Data.userInfo.district);
    }
    setRelative1MobileNumber(Data.userInfo.relative_mobile_number_1);
    setRelative2MobileNumber(Data.userInfo.relative_mobile_number_2);
    setRelative3MobileNumber(Data.userInfo.relative_mobile_number_3);
    setRelative4MobileNumber(Data.userInfo.relative_mobile_number_4);
    setRelative5MobileNumber(Data.userInfo.relative_mobile_number_5);
    setUserId(Data.userInfo.id);
    setLoader(false);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(moment(currentDate).format('YYYY/MM/DD'), '======');
    setShow(Platform.OS === 'ios');
    setDOB(moment(currentDate).format('YYYY/MM/DD'));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onToggle = item => {
    setStateName(item.title);
    setdistrictName(strings("CrowdSourcingFirst.lbl_select_district"))
    setStateToggle(false);
    setdistrictToggle(false);

  };
  const districtonToggle = item => {
    setdistrictName(item.title);
    setdistrictToggle(false);
  };

  const stateRenderItem = ({ item }) => {
    return <Item item={item} onPress={() => onToggle(item)} />;
  };
  const districtRenderItem = ({ item }) => {
    return <Item item={item} onPress={() => districtonToggle(item)} />;
  };

  const addStateUserData = async () => {
    const Token = await AsyncStorage.getItem('loginToken');

    console.log(firstName, 'fffffffff');
    console.log(userName, 'fffffffff');
    console.log(mobileNumber, 'fffffffff');
    console.log(DOB, 'fffffffff');
    console.log(password, 'fffffffff');
    console.log(relative1MobileNumber, 'fffffffff');
    console.log(relative2MobileNumber, 'fffffffff');
    console.log(relative3MobileNumber, 'fffffffff');
    console.log(relative4MobileNumber, 'fffffffff');
    console.log(relative5MobileNumber, 'fffffffff');

    if (headerTitle === 'editUser') {
      if (firstName == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_empty_fname"));
        return;
      }
      if (userName == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_empty_username"));
        return;
      }

      if (mobileNumber == '') {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          strings("AddDisasterManager.msg_empty_mobilenumber"),
        );
        return;
      }
      if (DOB == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_select_dob"));
        return;
      }
      if (stateName == strings("CrowdSourcingFirst.lbl_select_state")) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_state_required"));
        return;
      }
      if (districtName == strings("CrowdSourcingFirst.lbl_select_district")) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_district_required"));
        return;
      }
    } else {
      if (firstName === '' || firstName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_empty_fname"));
        return;
      }
      if (userName === '' || userName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_empty_username"));
        return;
      }

      if (mobileNumber == '' || mobileNumber === undefined) {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          strings("AddDisasterManager.msg_empty_mobilenumber"),
        );
        return;
      }
      if (DOB === '' || DOB === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_select_dob"));
        return;
      }
      if (password === '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("Login.msg_empty_password"));
        return;
      }
      if (confirmPassword !== password || confirmPassword == '') {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          strings("AddEquipmentAvailability.msg_empty_confirm_password"),
        );
        return;
      }
      if (stateName === 'Select State' || stateName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_state_required"));
        return;
      }
      if (districtName === 'Select District' || districtName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_district_required"));
        return;
      }
    }

    setLoader(true);
    const addStateData = await dispatch(
      AddStateUserData(
        Token,
        userId,
        firstName,
        userName,
        mobileNumber,
        DOB,
        password,
        stateName,
        districtName,
        relative1MobileNumber,
        relative2MobileNumber,
        relative3MobileNumber,
        relative4MobileNumber,
        relative5MobileNumber,
      ),
    );
    if (addStateData.status == 200) {
      setFirstName('');
      setUserName('');
      setMobileNumber('');
      setDOB('');
      setStateName(strings("CrowdSourcingFirst.lbl_select_state"));
      setdistrictName(strings("CrowdSourcingFirst.lbl_select_district"));
      setRelative1MobileNumber('');
      setRelative2MobileNumber('');
      setRelative3MobileNumber('');
      setRelative4MobileNumber('');
      setRelative5MobileNumber('');
      setUserId('');
      setLoader(false);
      navigation.navigate('StateUsers');
    } else {
      setLoader(false);
      dropDownAlertRef.alertWithType('DCRA', 'error', addStateData.msg);
    }
  };

  if (!loader) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#3877F1" />
        <LinearGradient
          colors={['#3877F1', '#215ACA']}
          style={styles.linearGradient}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={require('../../../../assets/Ellipse_Head.png')} />
            {/* <Header> */}
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('StateUsers')}
                style={{ width: '20%' }}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: "75%" }}>
                {headerTitle === 'editUser' ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#fff',
                      textAlign: "center",
                      fontSize: 16,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    {strings("AddStateUser.lbl_edit_state_user_caps")}
                  </Text>
                ) : (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      textAlign: "center",
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    {strings("AddStateUser.lbl_add_state_user_caps")}
                  </Text>
                )}
              </View>
              <View style={{ width: '20%' }}></View>
            </View>
            {/* </Header> */}
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ paddingHorizontal: 10, marginTop: 40 }}>
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_fullname")}
                </Text>
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
                  value={firstName}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={firstName => setFirstName(firstName)}
                />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_username")}
                </Text>
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
                  value={userName}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={userName => setUserName(userName)}
                />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_mobile_number")}
                </Text>
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
                  value={mobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
                />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_dob")}
                </Text>
              </View>
              <TouchableOpacity onPress={showDatepicker}>
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
                    <Text
                      style={{
                        fontSize: 17,
                        color: '#000000',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                      }}>
                      {DOB}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={require('../../../../assets/Calendar.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}
              {headerTitle === 'editUser' ? (
                <View></View>
              ) : (
                <View>
                  <View style={{ marginTop: '5%' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000000',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '400',
                      }}>
                      {strings("Registration.lbl_password")} <Text style={{ color: 'red' }}>*</Text>
                    </Text>
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
                      value={password}
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 17,
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                        color: '#0D2451',
                      }}
                      onChangeText={password => setPassword(password)}
                      secureTextEntry
                    />
                  </View>
                  <View style={{ marginTop: '5%' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000000',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '400',
                      }}>
                      {strings("Registration.lbl_confirm_password")} <Text style={{ color: 'red' }}>*</Text>
                    </Text>
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
                      value={confirmPassword}
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 17,
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                        color: '#0D2451',
                      }}
                      onChangeText={confirmPassword =>
                        setConfirmPassword(confirmPassword)
                      }
                      secureTextEntry
                    />
                  </View>
                </View>
              )}

              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("CrowdSourcingFile.lbl_state")} <Text style={{ color: 'red' }}>*</Text>
                </Text>
              </View>
              <Collapse
                style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
                isExpanded={stateToggle}
                onToggle={isExpanded => setStateToggle(isExpanded)}>
                <CollapseHeader
                  style={{
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: '#DFDFDF',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 17,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text>{stateName}</Text>
                  </View>
                  <Image
                    source={require('../../../../assets/DownArrow.png')}
                  //   style={{width: 22, height: 20}}
                  // resizeMode={'stretch'}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <FlatList
                    style={{ paddingVertical: 10 }}
                    data={contryState}
                    renderItem={stateRenderItem}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>
              {/* </View> */}
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("CrowdSourcingFile.lbl_district")} <Text style={{ color: 'red' }}>*</Text>
                </Text>
              </View>
              {stateName === strings("CountryState.lbl_gujarat") ? (
                <Collapse
                  style={{
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: '#DFDFDF',
                  }}
                  isExpanded={districtToggle}
                  onToggle={isExpanded => setdistrictToggle(isExpanded)}>
                  <CollapseHeader
                    style={{
                      borderRadius: 14,
                      borderWidth: 1,
                      borderColor: '#DFDFDF',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 17,
                      paddingHorizontal: 10,
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text>{districtName}</Text>
                    </View>
                    <Image
                      source={require('../../../../assets/DownArrow.png')}
                    //   style={{width: 22, height: 20}}
                    // resizeMode={'stretch'}
                    />
                  </CollapseHeader>
                  <CollapseBody>
                    <FlatList
                      style={{ paddingVertical: 10 }}
                      data={gujaratDistrict}
                      renderItem={districtRenderItem}
                      keyExtractor={item => item.id}
                    />
                  </CollapseBody>
                </Collapse>
              ) : (
                <Collapse
                  style={{
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: '#DFDFDF',
                  }}
                  isExpanded={districtToggle}
                  onToggle={isExpanded => setdistrictToggle(isExpanded)}>
                  <CollapseHeader
                    style={{
                      borderRadius: 14,
                      borderWidth: 1,
                      borderColor: '#DFDFDF',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 17,
                      paddingHorizontal: 10,
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text>{districtName}</Text>
                    </View>
                    <Image
                      source={require('../../../../assets/DownArrow.png')}
                    //   style={{width: 22, height: 20}}
                    // resizeMode={'stretch'}
                    />
                  </CollapseHeader>
                  {stateName === strings("CountryState.lbl_andaman_nicobar_islands") ? (
                    <CollapseBody>
                      <FlatList
                        style={{ paddingVertical: 10 }}
                        data={Andaman_Nicobar_Islands_District}
                        renderItem={districtRenderItem}
                        keyExtractor={item => item.id}
                      />
                    </CollapseBody>
                  ) : (
                    <CollapseBody>
                      {stateName === strings("CountryState.lbl_andhra_pradesh") ? (
                        <View>
                          <FlatList
                            style={{ paddingVertical: 10 }}
                            data={Andhra_Pradesh_District}
                            renderItem={districtRenderItem}
                            keyExtractor={item => item.id}
                          />
                        </View>
                      ) : (
                        <View>
                          {stateName === strings("CountryState.lbl_daman_diu") ? (
                            <FlatList
                              style={{ paddingVertical: 10 }}
                              data={Daman_Diu_District}
                              renderItem={districtRenderItem}
                              keyExtractor={item => item.id}
                            />
                          ) : (
                            <View>
                              {stateName === strings("CountryState.lbl_goa") ? (
                                <FlatList
                                  style={{ paddingVertical: 10 }}
                                  data={Goa_District}
                                  renderItem={districtRenderItem}
                                  keyExtractor={item => item.id}
                                />
                              ) : (
                                <View>
                                  {stateName === strings("CountryState.lbl_karnataka") ? (
                                    <FlatList
                                      style={{ paddingVertical: 10 }}
                                      data={Karnataka_District}
                                      renderItem={districtRenderItem}
                                      keyExtractor={item => item.id}
                                    />
                                  ) : (
                                    <View>
                                      {stateName === strings("CountryState.lbl_kerala") ? (
                                        <FlatList
                                          style={{ paddingVertical: 10 }}
                                          data={Karnataka_District}
                                          renderItem={districtRenderItem}
                                          keyExtractor={item => item.id}
                                        />
                                      ) : (
                                        <View>
                                          {stateName === strings("CountryState.lbl_lakshadweep") ? (
                                            <FlatList
                                              style={{ paddingVertical: 10 }}
                                              data={Lakshadweep_District}
                                              renderItem={districtRenderItem}
                                              keyExtractor={item => item.id}
                                            />
                                          ) : (
                                            <View>
                                              {stateName === strings("CountryState.lbl_maharastra") ? (
                                                <FlatList
                                                  style={{ paddingVertical: 10 }}
                                                  data={Maharashtra_District}
                                                  renderItem={districtRenderItem}
                                                  keyExtractor={item => item.id}
                                                />
                                              ) : (
                                                <View>
                                                  {stateName === strings("CountryState.lbl_odisha") ? (
                                                    <FlatList
                                                      style={{
                                                        paddingVertical: 10,
                                                      }}
                                                      data={Odisha_District}
                                                      renderItem={
                                                        districtRenderItem
                                                      }
                                                      keyExtractor={item =>
                                                        item.id
                                                      }
                                                    />
                                                  ) : (
                                                    <View>
                                                      {stateName ===
                                                        strings("CountryState.lbl_puducherry") ? (
                                                        <FlatList
                                                          style={{
                                                            paddingVertical: 10,
                                                          }}
                                                          data={
                                                            Puducherry_District
                                                          }
                                                          renderItem={
                                                            districtRenderItem
                                                          }
                                                          keyExtractor={item =>
                                                            item.id
                                                          }
                                                        />
                                                      ) : (
                                                        <View>
                                                          {stateName ===
                                                            strings("CountryState.lbl_tamil_nadu") ? (
                                                            <FlatList
                                                              style={{
                                                                paddingVertical: 10,
                                                              }}
                                                              data={
                                                                Tamil_Nadu_District
                                                              }
                                                              renderItem={
                                                                districtRenderItem
                                                              }
                                                              keyExtractor={item =>
                                                                item.id
                                                              }
                                                            />
                                                          ) : (
                                                            <View>
                                                              {stateName === strings("CountryState.lbl_west_bengal") ? (
                                                                <FlatList
                                                                  style={{
                                                                    paddingVertical: 10,
                                                                  }}
                                                                  data={
                                                                    West_Bengal_District
                                                                  }
                                                                  renderItem={
                                                                    districtRenderItem
                                                                  }
                                                                  keyExtractor={item =>
                                                                    item.id
                                                                  }
                                                                />
                                                              ) : (
                                                                <View>
                                                                  {/* <FlatList
                                                              style={{
                                                                paddingVertical: 10,
                                                              }}
                                                              data={
                                                                Lakshadweep_District
                                                              }
                                                              renderItem={
                                                                districtRenderItem
                                                              }
                                                              keyExtractor={item =>
                                                                item.id
                                                              }
                                                            /> */}
                                                                </View>
                                                              )}

                                                            </View>
                                                          )}
                                                        </View>
                                                      )}
                                                    </View>
                                                  )}
                                                </View>
                                              )}
                                            </View>
                                          )}
                                        </View>
                                      )}
                                    </View>
                                  )}
                                </View>
                              )}
                            </View>
                          )}
                        </View>
                      )}
                    </CollapseBody>
                  )}
                  {/* <CollapseBody>
                <FlatList
                  style={{paddingVertical: 10}}
                  data={Tamil_Nadu_District}
                  renderItem={districtRenderItem}
                  keyExtractor={item => item.id}
                />
              </CollapseBody> */}
                </Collapse>
              )}
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_relative_mobile_number")} <Text style={{ color: 'red' }}>*</Text>
                </Text>
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
                  value={relative1MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative1MobileNumber =>
                    setRelative1MobileNumber(relative1MobileNumber)
                  }
                />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_relative_two_number")}
                </Text>
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
                  value={relative2MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative2MobileNumber =>
                    setRelative2MobileNumber(relative2MobileNumber)
                  }
                />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_relative_three_number")}
                </Text>
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
                  value={relative3MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative3MobileNumber =>
                    setRelative3MobileNumber(relative3MobileNumber)
                  }
                />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_relative_four_number")}
                </Text>
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
                  value={relative4MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative4MobileNumber =>
                    setRelative4MobileNumber(relative4MobileNumber)
                  }
                />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_relative_five_number")}
                </Text>
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
                  value={relative5MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative5MobileNumber =>
                    setRelative5MobileNumber(relative5MobileNumber)
                  }
                />
              </View>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Dashboard')}
                onPress={() => addStateUserData()}
                style={{
                  marginVertical: 20,
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
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    {strings("Common.button_save")}
                  </Text>
                </View>
                <View>
                  <Image
                    source={require('../../../../assets/Login_Arrow.png')}
                    style={{ width: 27.5, height: 26.7 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
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
    fontSize: 14,
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
export default AddStateUser;
