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
import { strings } from "../../../localization/i18n"
import moment from 'moment';
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
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import { postAPI } from '../../../Networking/Request';
import { CustomText } from '../../../Component/Text';
const Item = ({ item, onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: 13 }}>
          <CustomText fontSize={14} semibold style={styles.title}>{item.title}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);
const AddManpowerResources = ({ navigation, route }) => {
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
  const [statusName, setStatusName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
  // const [departType, setDepartType] = useState('Select Department type');
  const [districtName, setdistrictName] = useState(strings("CrowdSourcingFirst.lbl_select_district"));
  const [departmentName, setdepartmentName] = useState(strings("AddManpowerResources.lbl_select_department"));
  const [departmenttype, setDepartmentType] = useState(strings("AddManpowerResources.lbl_select_department_type"))
  const [designationName, setDesignationName] = useState(strings("AddManpowerResources.lbl_select_designation"));
  const [skillName, setSkillName] = useState(strings("AddManpowerResources.lbl_select_skill"));
  const [age, setAge] = useState('');
  // const [editManPower, setEditManPower] = useState({})

  const [ageToggle, setAgeToggle] = useState(false);

  const [skillToggle, setSkillToggle] = useState(false);
  const [designationToggle, setDesignationToggle] = useState(false);
  const [stateToggle, setStateToggle] = useState(false);
  const [departToggle, setDepartToggle] = useState(false)
  // const [departmentTypeToggle, setdepartmentTypeToggle] = useState(false)
  const [districtToggle, setdistrictToggle] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [MobileNum, setMobileNum] = useState();
  const [userDataInfo, setUserDataInfo] = useState('');
  const [userId, setUserId] = useState('');
  const [remark, setRemark] = useState('');
  const [statusInput, setStatusInput] = useState('');
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

  const [departmanetypeToggle, setDepartmentTypeToggle] = useState(false);

  const [departType, setDepartType] = useState([
    {
      id: '1',
      title: strings("AddEquipmentAvailability.lbl_govt"),
    },
    {
      id: '2',
      title: strings("AddEquipmentAvailability.lbl_private"),
    },
    {
      id: '3',
      title: strings("AddEquipmentAvailability.lbl_psunits"),
    },
    {
      id: '4',
      title: strings("AddEquipmentAvailability.lbl_ngo"),
    },
    {
      id: '5',
      title: strings("AddEquipmentAvailability.lbl_others"),
    }
  ]);
  const [departmentnameToggle, setDepartmentnameToggle] = useState(false);
  const [departmentname, setDepartmentName] = useState([
    {
      id: '1',
      title: strings("AddEquipmentAvailability.lbl_ndrf"),
    },
    {
      id: '2',
      title: strings("AddEquipmentAvailability.lbl_sdrf"),
    },
    {
      id: '3',
      title: strings("AddEquipmentAvailability.lbl_ngo"),
    },
    {
      id: '4',
      title: strings("AddEquipmentAvailability.lbl_ndma"),
    },
    {
      id: '5',
      title: strings("AddEquipmentAvailability.lbl_imd"),
    },
    {
      id: '6',
      title: strings("AddEquipmentAvailability.lbl_eoc"),
    },
    {
      id: '7',
      title: strings("AddEquipmentAvailability.lbl_sdma"),
    },
    {
      id: '8',
      title: strings("AddEquipmentAvailability.lbl_ddma"),
    },
    {
      id: '9',
      title: strings("AddEquipmentAvailability.lbl_others"),
    }
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
    // console.log(Data, "route.params");
    // alert(JSON.stringify(Data.userInfo))
    // setEditManPower(Data?.userInfo)
    const Header = Data.flag;
    setHeaderTitle(Header);
    // console.log(Header, '=================USER');
    // console.log(userDataInfo, '===========rrrrrrrrrr======USER');
    setFirstName(Data?.userInfo?.name);
    setMobileNum(Data?.userInfo?.mobile);
    setAge(Data?.userInfo?.age)
    // console.log(Data?.userInfo?.status, "Data?.userInfo?.status");
    setStatusInput(Data?.userInfo?.status)
    Data?.userInfo?.remark !== null ? setRemark(Data?.userInfo?.remark) : setRemark('')
    setUserId(Data?.userInfo?.id)
    if (Data.flag === "") {
      setDepartmentType(strings("AddManpowerResources.lbl_select_department_type"));
      setdepartmentName(strings("AddManpowerResources.lbl_select_department"));
      setDesignationName(strings("AddManpowerResources.lbl_select_designation"));
      setSkillName(strings("AddManpowerResources.lbl_select_skill"));
    } else {
      setDepartmentType(Data?.userInfo?.department_type);
      setdepartmentName(Data?.userInfo?.department_name);
      setDesignationName(Data?.userInfo?.designation);
      setSkillName(Data?.userInfo?.skills);
    }

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

  const onToggle = (item, name) => {
    console.log("name", name)
    if (name === "state") {
      setStatusName(item?.item?.title);
      setStateToggle(false);
    } else if (name === "departType") {
      setDepartmentType(item?.item?.title);
      setDepartmentTypeToggle(false)
    } else if (name === "departName") {
      setdepartmentName(item?.item?.title);
      setDepartmentnameToggle(false)
    } else if (name === "desigName") {
      setDesignationName(item?.item?.title);
      setDesignationToggle(false)
    } else if (name === "skillName") {
      setSkillName(item?.item?.title);
      setSkillToggle(false)
    } else if (name === "age") {
      setAge(item?.item?.title);
      setAgeToggle(false)
    }

    setdistrictName(strings("CrowdSourcingFirst.lbl_select_district"))

    setdistrictToggle(false);

  };

  const districtonToggle = item => {
    setdistrictName(item.title);
    setdistrictToggle(false);
  };

  const stateRenderItem = (item, name) => {
    return <Item item={item?.item} onPress={() => onToggle(item, name)} />;
  };
  const districtRenderItem = ({ item }) => {
    return <Item item={item} onPress={() => districtonToggle(item)} />;
  };

  const addStateUserData = async () => {

    const Token = await AsyncStorage.getItem('loginToken');

    // console.log(firstName, 'fffffffff');

    // console.log(MobileNum, 'fffffffff');
    // console.log(remark, 'fffffffff');

    // console.log(age, 'fffffffff');
    // console.log(departmentName, 'fffffffff');
    // console.log(departmenttype, 'fffffffff');
    // console.log(designationName, 'fffffffff');
    // console.log(skillName, 'fffffffff');
    // console.log(statusName, 'fffffffff');
    // console.log(userId, "userid");



    if (headerTitle === 'editUser') {
      if (firstName === '' || firstName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_empty_fname"));
        return;
      }

      if (departmenttype === strings("AddManpowerResources.lbl_select_department_type") || departmenttype === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_department_type_required"));
        return;
      }

      if (departmentName === strings("AddManpowerResources.lbl_select_department") || departmentName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddManpowerResources.lbl_department_name_required"));
        return;
      }

      if (designationName === strings("AddManpowerResources.lbl_select_designation") || designationName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddManpowerResources.lbl_designation_required"));
        return;
      }
      if (skillName === strings("AddManpowerResources.lbl_select_skill") || skillName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddManpowerResources.msg_skill_required"));
        return;
      }


      if (MobileNum == '' || MobileNum === undefined) {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          strings("AddManpowerResources.msg_mobilenum_required"),
        );
        return;
      }

    } else {
      if (firstName === '' || firstName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_empty_fname"));
        return;
      }

      if (departmenttype === strings("AddManpowerResources.lbl_select_department_type") || departmenttype === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_department_type_required"));
        return;
      }

      if (departmentName === strings("AddManpowerResources.lbl_select_department") || departmentName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddManpowerResources.lbl_department_name_required"));
        return;
      }

      if (designationName === strings("AddManpowerResources.lbl_select_designation") || designationName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddManpowerResources.lbl_designation_required"));
        return;
      }
      if (skillName === strings("AddManpowerResources.lbl_select_skill") || skillName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddManpowerResources.msg_skill_required"));
        return;
      }
      if (age === '' || age === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddManpowerResources.msg_age_required"));
        return;
      }

      if (MobileNum == '' || MobileNum === undefined) {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          strings("AddManpowerResources.msg_mobilenum_required"),
        );
        return;
      }


    }

    setLoader(true);
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'multipart/form-data',
    };
    let formData = new FormData()
    console.log(userId, "userId");

    userId !== '' && userId !== undefined && formData.append("id", userId)

    formData.append("name", firstName)
    formData.append("department_type", departmenttype)
    formData.append("department_name", departmentName)
    formData.append("designation", designationName)
    formData.append("skills", skillName)
    formData.append("age", age)
    formData.append("mobile", MobileNum)
    formData.append("status", statusInput)
    formData.append("remark", remark)

    console.log(
      'url====ADD_MAN_POWER_REC==',
      Config.baseUrl + APIConstants.ADD_MAN_POWER_REC,
      headers,
      formData,
    );

    return postAPI(Config.baseUrl + APIConstants.ADD_MAN_POWER_REC, headers, formData)
      .then(function (response) {
        setLoader(false)

        console.log('man power res:', response);
        if (response.status === 200) {

          navigation.navigate('ManpowerResources');
        }
      })
      .catch(function (error) {
        setLoader(false)
        const ErrorData = error?.response?.data
          ? error.response.data
          : error;
        setLoader(false);
        // console.log("error", error);
        dropDownAlertRef.alertWithType('DCRA', 'error', ErrorData);
      })
      .finally(function () {
        setLoader(false)
      });
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
                onPress={() => navigation.navigate('ManpowerResources')}
                style={{ width: '20%' }}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View>
                {headerTitle === 'editUser' ? (
                  <CustomText
                    regular
                    fontSize={16}
                    style={{
                      color: '#fff',
                      // fontSize: 16,
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>
                    {strings("AddManpowerResources.lbl_manpower_resources")}
                  </CustomText>
                ) : (
                  <CustomText
                    fontSize={16}
                    regular
                    style={{
                      color: '#fff',
                      // fontSize: 16,
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>
                    {strings("AddManpowerResources.lbl_manpower_resources")}
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
            <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
              <View style={{ marginTop: '5%' }}>
                <CustomText
                  fontSize={14}
                  regular
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}

                >
                  {strings("AddManpowerResources.lbl_name")} *
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
                  // maxLength={20}
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

              {/* <View style={{ marginTop: '5%' }}>
                <CustomText
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  State <CustomText style={{ color: 'red' }}>*</CustomText>
                </CustomText>
              </View> */}
              {/* <Collapse
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
                    <CustomText>{statusName}</CustomText>
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
                    renderItem={(e) => stateRenderItem(e, "state")}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse> */}
              {/* </View> */}

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
                  {strings("AddEquipmentAvailability.lbl_department_type")} *
                </CustomText>
              </View>
              <Collapse
                style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
                isExpanded={departmanetypeToggle}
                onToggle={isExpanded => setDepartmentTypeToggle(isExpanded)}>
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
                    <CustomText>{departmenttype}</CustomText>
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
                    data={departType}
                    renderItem={(e) => stateRenderItem(e, "departType")}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>
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
                  {strings("AddEquipmentAvailability.lbl_department_name")} *
                </CustomText>
              </View>

              <Collapse
                style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
                isExpanded={departmentnameToggle}
                onToggle={isExpanded => setDepartmentnameToggle(isExpanded)}>
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
                    <CustomText>{departmentName}</CustomText>
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
                    data={departmentname}
                    renderItem={(e) => stateRenderItem(e, "departName")}

                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>

              <View style={{ marginTop: '5%' }}>
                <CustomText
                  regular
                  fontSize={14}
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("AddManpowerResources.lbl_designation")} *
                </CustomText>
              </View>



              <Collapse
                style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
                isExpanded={designationToggle}
                onToggle={isExpanded => setDesignationToggle(isExpanded)}>
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
                    <CustomText>{designationName}</CustomText>
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
                    data={departmentname}
                    renderItem={(e) => stateRenderItem(e, "desigName")}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>
              <View style={{ marginTop: '5%' }}>
                <CustomText
                  regular
                  fontSize={14}
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("AddManpowerResources.lbl_skill_set")} *
                </CustomText>
              </View>
              <Collapse
                style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
                isExpanded={skillToggle}
                onToggle={isExpanded => setSkillToggle(isExpanded)}>
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
                    <CustomText>{skillName}</CustomText>
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
                    data={departmentname}
                    renderItem={(e) => stateRenderItem(e, "skillName")}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>
              <View style={{ marginTop: '5%' }}>
                <CustomText
                  regular
                  fontSize={14}
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("AddManpowerResources.lbl_age")} *
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
                  keyboardType={'numeric'}
                  maxLength={20}
                  value={age}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={age => setAge(age)}
                />
              </View>

              {/* <Collapse
                style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
                isExpanded={ageToggle}
                onToggle={isExpanded => setAgeToggle(isExpanded)}>
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
                    <CustomText>{age}</CustomText>
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
                    data={departmentname}
                    renderItem={(e) => stateRenderItem(e, "age")}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse> */}


              <View style={{ marginTop: '5%' }}>
                <CustomText
                  regular
                  fontSize={14}
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("ForgotPassword.lbl_mobile_number")} *
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
                  value={MobileNum}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative2MobileNumber =>
                    setMobileNum(relative2MobileNumber)
                  }
                />
              </View>
              <View style={{ marginTop: '5%' }}>
                <CustomText
                  regular
                  fontSize={14}
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("AddManpowerResources.lbl_status")}
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
                  // maxLength={10}
                  //  keyboardType={'numeric'}
                  value={statusInput}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative3MobileNumber =>
                    setStatusInput(relative3MobileNumber)
                  }
                />
              </View>

              <View style={{ marginTop: '5%' }}>
                <CustomText
                  regular
                  fontSize={14}
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("AddEquipmentAvailability.lbl_remarks")}
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
                  // maxLength={10}
                  // keyboardType={'numeric'}
                  value={remark}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative5MobileNumber =>
                    setRemark(relative5MobileNumber)
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
                  <CustomText
                    regular
                    fontSize={18}
                    style={{
                      // fontSize: 18,
                      color: '#fff',
                      // fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    {strings("Common.lbl_save")}
                  </CustomText>
                </View>
                <View>
                  {/* <Image
                    source={require('../../../../assets/Login_Arrow.png')}
                    style={{ width: 27.5, height: 26.7 }}
                  /> */}
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
export default AddManpowerResources;