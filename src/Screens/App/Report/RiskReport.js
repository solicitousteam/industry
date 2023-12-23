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
  ActivityIndicator
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
import { strings } from "../../../localization/i18n"
import { CustomText } from '../../../Component/Text';

const RiskReport = ({ navigation, route }) => {

  let dropDownAlertRef = useRef();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DOB, setDOB] = useState('');
  const [time, setTime] = useState('');
  const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
  const [districtName, setdistrictName] = useState(strings("CrowdSourcingFirst.lbl_select_district"));
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [cyclone_name, setCycloneName] = useState("")

  const [damageCause_List, set_DamageCause_List] = useState([]);
  const [damageCauseComment, setdamageCauseComment] = useState('');
  const [questions_to_manager, setquestions_to_manager] = useState('');
  // const [damge_video, setdamge_video] = useState('');
  const [additional_damage_details, setadditional_damage_details] =
    useState('');
  const [weather_phenomena_commnet, setweatherComment] = useState('');
  const [flood_reason_comment, setfloodComment] = useState('');
  const [weather_phenomena_List, setWeather_phenomena_List] = useState([]);
  const [flood_Reason_List, setflood_Reason_List] = useState([]);

  const [imageSource, setImageSource] = useState([]);
  const [damge_video, setVideo] = useState("");

  const [modalVisible, setModalVisible] = useState(false)
  const [croudSourcingID, setCroudSourcingID] = useState("")
  var [loader, setLoader] = useState(false);
  const [editResponse, setEditResponse] = useState("");
  const [flag, setFlag] = useState(true);
  const [screen, setScreen] = useState("")
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

  const [
    Andaman_Nicobar_Islands_District,
    setAndaman_Nicobar_Islands_District,
  ] = useState([
    {
      id: '638',
      title: strings("District.lbl_nicobars"),
    },
    {
      id: '639',
      title: strings("District.lbl_north_middle_andaman"),
    },
    {
      id: '640',
      title: strings("District.lbl_south_andaman"),
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


  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    console.log("ENTER")
    if (route.params) {
      setEditResponse(route.params)
      console.log("===============ROUTE=======R========")
      console.log(route.params)
      console.log("===============ROUTE===============")



      setScreen(route.params.screen);
      setCycloneName(route.params.cyclone_name);
      console.log(route.params.cyclone_name, "CCCCCCCCCcc")
      setStateName(route.params.stateName);
      setdistrictName(route.params.districtName);
      setTime(route.params.time);
      setDOB(route.params.DOB);
      setWeather_phenomena_List(route.params.weather_phenomena_List);
      setflood_Reason_List(route.params.flood_Reason_List);
      setweatherComment(route.params.weather_phenomena_commnet);
      setfloodComment(route.params.flood_reason_comment);
      set_DamageCause_List(route.params.damageCause_List);
      setdamageCauseComment(route.params.damageCauseComment);
      setadditional_damage_details(route.params.additional_damage_details)
      setquestions_to_manager(route.params.questions_to_manager)
      setImageSource(route.params.imageSource)
      setVideo(route.params.damge_video)

      // if (flag === true) {
      // getData();
      // }
    }


    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };

  }, [route]);

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
    setDOB(formated_date)
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

  const submit = () => {
    if (cyclone_name == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_cyclone_name_required"));
      return;
    }
    if (stateName == 'Select State') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_state_required"));
      return;
    }
    if (districtName == 'Select District') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_district_required"));
      return;
    }
    if (DOB == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_select_dob"));
      return;
    }
    if (time == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_select_time"));
      return;
    }


    navigation.navigate('CrowdSourcingSecond', {
      // croudSourcingID: croudSourcingID, 
      screen: screen,
      cyclone_name: cyclone_name,
      stateName: stateName,
      districtName: districtName,
      DOB: DOB,
      time: time,
      weather_phenomena_List: weather_phenomena_List,
      flood_Reason_List: flood_Reason_List,
      weather_phenomena_commnet: weather_phenomena_commnet,
      flood_reason_comment: flood_reason_comment,
      damageCause_List: damageCause_List,
      damageCauseComment: damageCauseComment,
      additional_damage_details: additional_damage_details,
      questions_to_manager: questions_to_manager,
      imageSource: imageSource,
      damge_video: damge_video

    })


  }

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
                onPress={() => navigation.goBack()}
                style={{ width: '20%', }}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: "80%", paddingRight: "10%" }}>
                <CustomText
                  numberOfLines={1}
                  fontSize={16}
                  regular
                  style={{
                    color: '#fff',
                    // fontSize: 16,
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                    textAlign: "center"
                  }}>
                  {strings("CycloneDetails.lbl_risk_analysis_report")}
                </CustomText>
              </View>
              <View style={{ width: '20%', }}></View>
            </View>
            {/* </Header> */}
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ paddingHorizontal: 10 }}>



              <View style={{ marginVertical: '3%' }}>
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
              <View style={{ marginVertical: '3%' }}>
                <CustomText
                  regular
                  fontSize={14}
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("CrowdSourcingFile.lbl_district")} <CustomText style={{ color: 'red' }}>*</CustomText>
                </CustomText>
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
                      <CustomText>{districtName}</CustomText>
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
                      <CustomText>{districtName}</CustomText>
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

                </Collapse>
              )}



              {/* {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"time"}
                  display="default"
                  onChange={(event, time) => onChangeTime(event, time)}
                // onChange={(e) => console.log(e)}
                />
              )} */}

              <View style={{ marginVertical: '3%' }}>
                <CustomText
                  fontSize={14}
                  regular
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("RiskReport.lbl_tehsil")} <CustomText style={{ color: 'red' }}>*</CustomText>
                </CustomText>
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

              <View style={{ marginVertical: '3%' }}>
                <CustomText
                  fontSize={14}
                  regular
                  style={{
                    // fontSize: 14,
                    color: '#000000',
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  {strings("RiskReport.lbl_hazard_type")} <CustomText style={{ color: 'red' }}>*</CustomText>
                </CustomText>
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
            </View>
            <TouchableOpacity
              // onPress={() => navigation.navigate('CrowdSourcingSecond')}
              onPress={() => submit()}
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
                  {strings("RiskReport.lbl_report")}
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
export default RiskReport;
