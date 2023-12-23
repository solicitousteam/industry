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
  BackHandler,
  ActivityIndicator,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddDisasterUser } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { strings } from "../../../localization/i18n"
import DropdownAlert from 'react-native-dropdownalert';
import { CustomText } from '../../../Component/Text';

const Item = ({ item, onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: 13 }}>
          <CustomText semibold fontSize={14} style={styles.title}>{item.title}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);
const AddDisasterManager = ({ navigation, route }) => {
  const dispatch = useDispatch();
  let dropDownAlertRef = useRef();

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DOB, setDOB] = useState('');
  const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
  const [districtName, setdistrictName] = useState(strings("CrowdSourcingFirst.lbl_select_district"));
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  let [loader, setLoader] = useState(false);
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
  const [contryDistrict, setContryDistrict] = useState([
    {
      id: '5',
      title: strings("CountryState.lbl_andhra_pradesh"),
    },
    {
      id: '6',
      title: strings("CountryState.lbl_arunachal_pradesh"),
    },
    {
      id: '7',
      title: strings("CountryState.lbl_assam"),
    },
    {
      id: '8',
      title: strings("CountryState.lbl_bihar"),
    },
  ]);
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    // setLoader(true);
    const Data = route.params;
    console.log(Data, "EDIT")

    // const Userdata = Data.userInfo;
    // setUserDataInfo(Data);
    const Header = Data.flag;
    setHeaderTitle(Header);
    console.log(headerTitle, '=================USER');
    // console.log(userDataInfo, '===========rrrrrrrrrr======USER');
    setUserName(Data.userInfo.first_name);
    setMobileNumber(Data.userInfo.mobile);
    if (Data.flag === "") {
      setStateName(strings("CrowdSourcingFirst.lbl_select_state"));
    } else {
      setStateName(Data.userInfo.state);
    }
    setUserId(Data.userInfo.id);
    // setLoader(false);
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
    console.log(moment(currentDate).format('DD-MM-YYYY'), '======');
    setShow(Platform.OS === 'ios');
    setDOB(moment(currentDate).format('DD/MM/YYYY'));
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
    setStateToggle(false);
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

  const AddDisasterUserData = async () => {
    const Token = await AsyncStorage.getItem('loginToken');

    if (userName == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddDisasterManager.msg_empty_name"));
      return;
      // this.showErrorMessage(RegisterErrorTitle, 'Username required', 5000);
    }

    if (mobileNumber == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddDisasterManager.msg_empty_mobilenumber"));

      // showErrorMessage(LoginErrorTitle, "Mobilenumber Required", 5000);
      // this.showErrorMessage(RegisterErrorTitle, 'Password required', 5000);
      return;
    }
    if (stateName == 'Select State') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_state_required"));
      // showErrorMessage(LoginErrorTitle, "State Required", 5000);
      // this.showErrorMessage(RegisterErrorTitle, 'Password required', 5000);
      return;
    }
    setLoader(true);
    const addUserData = await dispatch(
      AddDisasterUser(Token, userId, userName, mobileNumber, stateName),
    );
    if (addUserData.status == 200) {
      setLoader(false);
      navigation.navigate('DisasterManagers');
    } else {
      setLoader(false);
      dropDownAlertRef.alertWithType('error', 'DCRA', addUserData.message);
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
                onPress={() => navigation.navigate('DisasterManagers')}
                style={{ width: '20%' }}>
                <Image
                  source={require('../../../../assets/Back_Arrow_White.png')}
                />
              </TouchableOpacity>
              <View style={{ width: "65%" }}>
                {headerTitle === 'editDisasterManager' ? (
                  <CustomText
                    regular
                    fontSize={16}
                    numberOfLines={1}
                    style={{
                      color: '#fff',
                      // fontSize: 16,
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                      textAlign: "center"
                    }}>
                    {strings("AddDisasterManager.lbl_edit_disaster_manager_caps")}
                  </CustomText>
                ) : (
                  <CustomText
                    numberOfLines={1}
                    regular
                    fontSize={16}
                    style={{
                      color: '#fff',
                      // fontSize: 16,
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                      textAlign: "center"
                    }}>
                    {strings("AddDisasterManager.lbl_add_disaster_manager")}
                  </CustomText>
                )}
              </View>
              <View style={{ width: '20%' }}></View>
            </View>
            {/* </Header> */}
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ paddingHorizontal: 10 }}>
              <View style={{ marginTop: '5%' }}>
                <CustomText
                  fontSize={14}
                  regular
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_fullname")} <CustomText style={{ color: 'red' }}>*</CustomText>
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
                  value={userName}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    color: '#0D2451',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                  }}
                  onChangeText={userName => setUserName(userName)}
                />
              </View>

              <View style={{ marginTop: '5%' }}>
                <CustomText
                  fontSize={14}
                  regular
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("Registration.lbl_mobile_number")} <CustomText style={{ color: 'red' }}>*</CustomText>
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
                  value={mobileNumber}
                  keyboardType={'numeric'}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    color: '#0D2451',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                  }}
                  onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
                />
              </View>

              <View style={{ marginTop: '5%' }}>
                <CustomText
                  fontSize={14}
                  regular
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("CrowdSourcingFile.lbl_state")} <CustomText style={{ color: 'red' }}>*</CustomText>
                </CustomText>
              </View>
              <Collapse
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#DFDFDF',
                }}
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
                    <CustomText>{stateName}</CustomText>
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
            </View>
            <TouchableOpacity
              onPress={() => AddDisasterUserData()}
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
                <CustomText
                  fontSize={18}
                  regular
                  style={{
                    // fontSize: 18,
                    color: '#fff',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                  }}>
                  {strings("Common.button_save")}
                </CustomText>
              </View>
              <View>
                <Image
                  source={require('../../../../assets/Login_Arrow.png')}
                  style={{ width: 27.5, height: 26.7 }}
                />
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
    // fontSize: 14,
    // fontFamily: 'Metropolis_SemiBold',
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
export default AddDisasterManager;
