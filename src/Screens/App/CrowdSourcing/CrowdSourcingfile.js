import React, {useEffect, useState, useRef} from 'react';
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
  Alert,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import {AddStateUserData} from '../../../Redux/Action/Admin';
import {useDispatch, useSelector} from 'react-redux';
import lan from '../../../Networking/Language';
import {Searchbar} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {statelist} from '../../../Util/Common';
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import {postAPI} from '../../../Networking/Request';
import {strings} from '../../../localization/i18n';
import {CustomText} from '../../../Component/Text';
import {moderateScale} from 'react-native-size-matters';

const CrowdSourcingFile = ({navigation, route}) => {
  const dispatch = useDispatch();

  var [loader, setLoader] = useState(false);
  const [crowdList, setCrowdList] = useState([]);
  const [userToggle, setUserToggle] = useState(false);
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setDistrictToggle] = useState(false);
  const [stateName, setStateName] = useState(
    strings('CrowdSourcingFirst.lbl_select_state'),
  );
  const [stateUserList, setStateUserList] = useState([
    strings('CrowdSourcingFile.lbl_user'),
    'State User',
  ]);
  const [stateUserName, setStateUserName] = useState(
    strings('CrowdSourcingFirst.lbl_select_user_type'),
  );
  const [contryState, setContryState] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [districtName, setDistrictName] = useState(
    strings('CrowdSourcingFirst.lbl_select_district'),
  );
  const [loginUserData, setLoginUserData] = useState('');
  const [crowdData, setCrowdData] = useState('');
  const [searchTxt, setSearchTxt] = useState('');
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);

  const refDelete = useRef();
  const refFilter = useRef();
  let dropDownAlertRef = useRef();
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [route]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setLoader(true);
      setContryState(statelist);
      getLoginData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  async function getLoginData() {
    const value = await AsyncStorage.getItem('loginUserData');
    const data = JSON.parse(value);
    // console.log("Data", data)
    setLoginUserData(data);
    setTimeout(() => {
      getCrowdSourcingList(data.token, searchTxt);
    }, 1000);
  }
  function getCrowdSourcingList(token, state) {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    };
    let formData = new FormData();
    formData.append('limit', 1000);
    formData.append('offset ', 0);
    formData.append('state', state);
    formData.append('district', '');
    formData.append('user', '');
    console.log(
      'url====',
      Config.baseUrl + APIConstants.crowd_source_list,
      headers,
      formData,
    );
    return postAPI(
      Config.baseUrl + APIConstants.crowd_source_list,
      headers,
      formData,
    )
      .then(function (response) {
        setLoader(false);

        console.log('crowd_sourceAPI=15=', response);
        if (response?.data?.length > 0) {
          setCrowdList(response.data);
        } else {
          setCrowdList([]);
        }
        // return crowd_sourceAPI;
      })
      .catch(function (error) {
        setLoader(false);
        const crowd_sourceAPI = error?.response?.data
          ? error.response.data
          : error;
        console.log('crowd_sourceAPI==', crowd_sourceAPI);
        setCrowdList([]);
        return crowd_sourceAPI;
      })
      .finally(function () {
        setLoader(false);
        // console.log('crowd_sourceAPI=finally=');
      });
  }

  function filterCrowdSourcingList(value) {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + loginUserData.token,
      'Content-Type': 'multipart/form-data',
    };
    let formData = new FormData();
    if (value == 'filter') {
      formData.append('limit', 1000);
      formData.append('offset ', 0);
      formData.append(
        'state',
        stateName == strings('CrowdSourcingFirst.lbl_select_state')
          ? ''
          : stateName,
      );
      formData.append(
        'district',
        districtName == strings('CrowdSourcingFirst.lbl_select_district')
          ? ''
          : districtName,
      );
      formData.append(
        'user',
        stateUserName == strings('CrowdSourcingFirst.lbl_select_user_type')
          ? ''
          : stateUserName == 'User'
          ? 'user'
          : 'state_user',
      );
    } else {
      formData.append('limit', 1000);
      formData.append('offset ', 0);
      formData.append('state', '');
      formData.append('district', '');
      formData.append('user', '');
    }
    console.log(
      'url====',
      Config.baseUrl + APIConstants.crowd_source_list,
      headers,
      formData,
    );
    return postAPI(
      Config.baseUrl + APIConstants.crowd_source_list,
      headers,
      formData,
    )
      .then(function (response) {
        setLoader(false);

        console.log('crowd_sourceAPI=15=', response);
        if (response.data.length > 0) {
          setCrowdList(response.data);
        } else {
          setCrowdList([]);
        }
        // return crowd_sourceAPI;
      })
      .catch(function (error) {
        setLoader(false);
        const crowd_sourceAPI = error?.response?.data
          ? error.response.data
          : error;
        console.log('crowd_sourceAPI==', crowd_sourceAPI);
        setCrowdList([]);
        return crowd_sourceAPI;
      })
      .finally(function () {
        setLoader(false);
        // console.log('crowd_sourceAPI=finally=');
      });
  }

  function onSearch(text) {
    setSearchTxt(text);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTyping(false),
      setTypingTimeout(
        setTimeout(function () {
          if (text != '') {
            getCrowdSourcingList(loginUserData.token, text);
          } else {
            Keyboard.dismiss();
            getCrowdSourcingList(loginUserData.token, '');
          }
        }, 1000),
      );
  }

  function deleteCrowd() {
    refDelete.current.close();
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + loginUserData.token,
      'Content-Type': 'multipart/form-data',
    };
    let formData = new FormData();
    formData.append('id', crowdData.id);
    console.log(
      'url====',
      Config.baseUrl + APIConstants.delete_crowd_source,
      headers,
      formData,
    );
    return postAPI(
      Config.baseUrl + APIConstants.delete_crowd_source,
      headers,
      formData,
    )
      .then(function (response) {
        setLoader(false);

        console.log('delete_crowd=15=', response);
        // getCrowdSourcingList(loginUserData.token, searchTxt)
        dropDownAlertRef.alertWithType('success', 'DCRA', response.message);
        // return crowd_sourceAPI;
      })
      .catch(function (error) {
        setLoader(false);
        const sourceAPI = error?.response?.data ? error.response.data : error;
        console.log('sourceAPI==', sourceAPI);
        dropDownAlertRef.alertWithType('error', 'DCRA', error.message);
        return sourceAPI;
      })
      .finally(function () {
        setLoader(false);
        // console.log('crowd_sourceAPI=finally=');
      });
  }

  const userRenderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setStateUserName(item);
          setUserToggle(false);
        }}>
        <CustomText style={styles.AccordianTitle}>{item}</CustomText>
      </TouchableOpacity>
    );
  };

  const stateRenderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setStateName(item.title);
          setStateToggle(false);
          setDistrictList(item.district);
        }}>
        <CustomText style={styles.AccordianTitle}>{item.title}</CustomText>
      </TouchableOpacity>
    );
  };

  const districtRenderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setDistrictName(item.title);
          setDistrictToggle(false);
        }}>
        <CustomText style={styles.AccordianTitle}>{item.title}</CustomText>
      </TouchableOpacity>
    );
  };

  function onPressDelete(item, index) {
    setCrowdData(item);
    refDelete.current.open();
  }

  function onPressFilter() {
    refFilter.current.open();
  }

  function renderItem({item, index}) {
    return (
      <View style={styles.viewContainer}>
        <View style={{paddingHorizontal: 15, paddingVertical: 12}}>
          <View style={styles.viewContainer1}>
            <View style={styles.viewContainer2}>
              <CustomText style={styles.textStyle1}>
                {strings('CrowdSourcingFile.lbl_cyclone_name')}
              </CustomText>
              <CustomText style={styles.textStyle2}>
                {item.cyclone_name}
              </CustomText>
            </View>
            <View style={styles.viewContainer2}>
              <CustomText style={styles.textStyle1}>
                {strings('CrowdSourcingFile.lbl_state')}
              </CustomText>
              <CustomText style={styles.textStyle2}>{item.state}</CustomText>
            </View>
          </View>

          <View style={[styles.viewContainer1, {marginTop: 15}]}>
            <View style={styles.viewContainer2}>
              <CustomText style={styles.textStyle1}>
                {strings('CrowdSourcingFile.lbl_date')}
              </CustomText>
              <CustomText style={styles.textStyle2}>{item.date}</CustomText>
            </View>
            <View style={styles.viewContainer2}>
              <CustomText style={styles.textStyle1}>
                {strings('CrowdSourcingFile.lbl_district')}
              </CustomText>
              <CustomText style={styles.textStyle2}>{item.district}</CustomText>
            </View>
          </View>
        </View>
        <View height={5} />
        <View style={[styles.viewContainer1, {height: 40}]}>
          <TouchableOpacity
            style={[
              styles.viewContainer3,
              {borderBottomLeftRadius: 10, backgroundColor: '#F9F9F9'},
            ]}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('ReviewFormInfo', {
                cyclone_name: item.cyclone_name,
                stateName: item.state,
                districtName: item.district,
                DOB: item.user.date_of_birth,
                time: moment(item.created_at).format('HH:mm'),
                weather_phenomena_List: item.weather_phenomena,
                weather_phenomena_commnet: item.weather_phenomena_commnet,
                flood_Reason_List: item.flood_reason,
                flood_reason_comment: item.flood_reason_comment,
                additional_damage_details: item.additional_damage_details,
                questions_to_manager: item.questions_to_manager,
                imageSource: item.damge_images,
                damge_video: item.damge_video,
                damageCause_List: item.damage_cause,
                damageCauseComment: item.damage_cause_comment,
                isEdit: false,
                id: item.id,
              });
            }}>
            <CustomText style={[styles.textStyle1, {color: '#000000'}]}>
              {strings('CrowdSourcingFile.lbl_view_detail')}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewContainer3}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('CrowdSourcingFirst', {
                isEdit: true,
                crowdData: item,
              });
            }}>
            <LinearGradient
              colors={['#3877F1', '#1243A2']}
              style={{
                width: '100%',
                height: 40,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomText style={[styles.textStyle1, {color: 'white'}]}>
                {strings('CrowdSourcingFile.lbl_edit_detail')}
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function adminrenderItem({item, index}) {
    return (
      <View style={styles.viewContainer}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 15,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <View style={styles.viewContainer2}>
              <CustomText regular style={styles.textStyle1}>
                {strings('CrowdSourcingFile.lbl_cyclone_name')}
              </CustomText>
              <CustomText style={styles.textStyle2}>
                {item.cyclone_name}
              </CustomText>
            </View>
            <View height={15} />
            <View style={styles.viewContainer2}>
              <CustomText style={styles.textStyle1}>
                {strings('CrowdSourcingFile.lbl_date')}
              </CustomText>
              <CustomText style={styles.textStyle2}>{item.date}</CustomText>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.viewContainer2}>
              <CustomText style={styles.textStyle1}>
                {strings('CrowdSourcingFile.lbl_user_type')}
              </CustomText>
              <CustomText style={styles.textStyle2}>
                {item.user.type}
              </CustomText>
            </View>
            <View height={15} />
            <View style={styles.viewContainer2}>
              <CustomText style={styles.textStyle1}>
                {strings('CrowdSourcingFile.lbl_district')}
              </CustomText>
              <CustomText
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={styles.textStyle2}>
                {item.district}
              </CustomText>
            </View>
          </View>
          <View
            style={{
              flex: 0.4,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('ReviewFormInfo', {
                  cyclone_name: item.cyclone_name,
                  stateName: item.state,
                  districtName: item.district,
                  DOB: item.user.date_of_birth,
                  time: moment(item.created_at).format('HH:mm'),
                  weather_phenomena_List: item.weather_phenomena,
                  weather_phenomena_commnet: item.weather_phenomena_commnet,
                  flood_Reason_List: item.flood_reason,
                  flood_reason_comment: item.flood_reason_comment,
                  additional_damage_details: item.additional_damage_details,
                  questions_to_manager: item.questions_to_manager,
                  imageSource: item.damge_images,
                  damge_video: item.damge_video,
                  damageCause_List: item.damage_cause,
                  damageCauseComment: item.damage_cause_comment,
                  isEdit: false,
                  id: item.id,
                });
              }}>
              <Image
                style={styles.imageStyle}
                source={require('../../../../assets/View1.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onPressDelete(item, index);
              }}>
              <Image
                style={styles.imageStyle}
                source={require('../../../../assets/Delete1.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (!loader) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#3877F1" />
        <LinearGradient
          colors={['#3877F1', '#215ACA']}
          style={styles.linearGradient}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../../../assets/Ellipse_Head.png')} />
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={{width: '20%'}}>
                  <View>
                    <Image
                      source={require('../../../../assets/Back_Arrow_White.png')}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{width: '70%'}}>
                  <CustomText
                    numberOfLines={1}
                    style={{
                      width: '100%',
                      color: '#fff',
                      textAlign: 'center',
                      fontSize: moderateScale(16),
                      fontWeight: '700',
                      textTransform: 'uppercase',
                    }}>
                    {strings('CrowdSourcingFile.lbl_crowd_sourcing_form')}
                  </CustomText>
                </View>
              </View>

              {/* {loginUserData.type == "admin" ? <View /> : <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                navigation.navigate("CrowdSourcingFirst", { isEdit: false })
                            }} style={{ width: '10%', alignItems: 'flex-end', justifyContent: "center" }}>
                                <Image style={{ height: 22, width: 22 }} source={require("../../../../assets/add.png")} />
                            </TouchableOpacity>} */}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('CrowdSourcingFirst', {isEdit: false});
                }}
                style={{
                  width: '10%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 22, width: 22}}
                  source={require('../../../../assets/add.png')}
                />
              </TouchableOpacity>
            </View>
            {/* </Header> */}
          </View>
        </LinearGradient>
        {loginUserData.type == 'admin' ? (
          <View style={{paddingVertical: 10, paddingHorizontal: 10, flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Searchbar
                style={{
                  width: '85%',
                  elevation: 0,
                  borderWidth: 1.5,
                  borderColor: '#DFDFDF',
                  height: 46,
                  borderRadius: 10,
                }}
                placeholder={strings('CrowdSourcingFile.hint_search_by_state')}
                onChangeText={text => onSearch(text)}
                value={searchTxt}
                inputStyle={{
                  marginLeft: 0,
                  color: '#000000',
                  fontSize: moderateScale(15),
                  fontStyle: 'normal',
                }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onPressFilter()}
                style={{
                  width: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: moderateScale(3),
                }}>
                <Image
                  style={{height: 18, width: 18, resizeMode: 'contain'}}
                  source={require('../../../../assets/Filter.png')}
                />
                <CustomText
                  style={{
                    marginTop: moderateScale(2),
                    fontSize: moderateScale(9),
                    fontWeight: '700',
                    color: '#3877F1',
                  }}>
                  {strings('CrowdSourcingFile.lbl_filter_caps')}
                </CustomText>
              </TouchableOpacity>
            </View>

            {crowdList.length > 0 ? (
              <FlatList
                data={crowdList}
                keyExtractor={item => item.id}
                style={{width: '100%', marginTop: 15}}
                renderItem={adminrenderItem}
                ItemSeparatorComponent={() => {
                  return <View height={15} />;
                }}
                contentContainerStyle={{paddingBottom: 10}}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{fontSize: moderateScale(17), color: '#000'}}>
                  {strings('Common.lbl_result_not_found')}
                </CustomText>
              </View>
            )}
          </View>
        ) : (
          <View style={{paddingVertical: 10, paddingHorizontal: 10, flex: 1}}>
            {crowdList.length > 0 ? (
              <FlatList
                data={crowdList}
                keyExtractor={item => item.id}
                style={{width: '100%', marginTop: 10}}
                renderItem={renderItem}
                ItemSeparatorComponent={() => {
                  return <View height={15} />;
                }}
                contentContainerStyle={{paddingBottom: 10}}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{fontSize: moderateScale(17), color: '#000'}}>
                  {strings('Common.lbl_result_not_found')}
                </CustomText>
              </View>
            )}
          </View>
        )}
        <RBSheet
          ref={refDelete}
          closeOnDragDown={true}
          height={300}
          dragFromTopOnly={true}
          customStyles={{
            container: {
              paddingHorizontal: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            draggableIcon: {
              backgroundColor: '#C4C4C4',
              width: 78,
            },
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                marginTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 80, width: 80}}
                source={require('../../../../assets/trash1.png')}
              />
            </View>

            <View
              style={{
                marginTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomText
                style={[
                  styles.WarningTitleText,
                  {width: '100%', textAlign: 'center'},
                ]}>
                {strings('AddEquipmentAvailability.msg_delete_warning')}{' '}
              </CustomText>
            </View>
          </View>
          <View
            style={{
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                refDelete.current.close();
              }}
              style={{width: 100}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <CustomText
                  style={{
                    fontSize: moderateScale(18),
                    color: '#545454',
                    fontWeight: '700',
                  }}>
                  {strings('Common.button_no')}
                </CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteCrowd();
              }}
              style={{
                borderRadius: 48,
                height: 45,
                backgroundColor: '#3877F1',
                shadowColor: '#3877F1',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 5,
                width: 100,
                justifyContent: 'center',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <CustomText
                  style={{
                    fontSize: moderateScale(18),
                    color: '#fff',
                    fontWeight: '700',
                  }}>
                  {strings('Common.button_yes')}
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>
        </RBSheet>

        <RBSheet
          ref={refFilter}
          closeOnDragDown={true}
          height={500}
          dragFromTopOnly={true}
          customStyles={{
            container: {
              paddingHorizontal: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            draggableIcon: {
              backgroundColor: '#C4C4C4',
              width: 78,
            },
          }}>
          <View style={{flex: 1, paddingVertical: 10}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <CustomText style={styles.bottomSheetTitleText}>
                {strings('CrowdSourcingFile.lbl_filter_by')}
              </CustomText>
              <View height={15} />
              <CustomText style={styles.titleTextStyle}>
                {strings('CrowdSourcingFile.lbl_user')}
              </CustomText>
              <Collapse
                style={styles.collapseStyle}
                isExpanded={userToggle}
                onToggle={isExpanded => setUserToggle(isExpanded)}>
                <CollapseHeader style={styles.collapseHeader}>
                  <CustomText>{stateUserName}</CustomText>
                  <Image source={require('../../../../assets/DownArrow.png')} />
                </CollapseHeader>
                <CollapseBody>
                  <FlatList
                    style={{paddingVertical: 5, paddingHorizontal: 10}}
                    data={stateUserList}
                    renderItem={userRenderItem}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>

              <View height={10} />
              <CustomText style={styles.titleTextStyle}>
                {strings('CrowdSourcingFile.lbl_state')}
              </CustomText>
              <Collapse
                style={styles.collapseStyle}
                isExpanded={stateToggle}
                onToggle={isExpanded => setStateToggle(isExpanded)}>
                <CollapseHeader style={styles.collapseHeader}>
                  <CustomText>{stateName}</CustomText>
                  <Image source={require('../../../../assets/DownArrow.png')} />
                </CollapseHeader>
                <CollapseBody>
                  <FlatList
                    style={{paddingVertical: 5, paddingHorizontal: 10}}
                    data={contryState}
                    renderItem={stateRenderItem}
                    // ItemSeparatorComponent={() => {
                    //     return <View height={5} />
                    // }}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>
              <View height={10} />
              <CustomText style={styles.titleTextStyle}>
                {strings('CrowdSourcingFile.lbl_district')}
              </CustomText>
              <Collapse
                style={styles.collapseStyle}
                isExpanded={districtToggle}
                onToggle={isExpanded => setDistrictToggle(isExpanded)}>
                <CollapseHeader style={styles.collapseHeader}>
                  <CustomText>{districtName}</CustomText>
                  <Image source={require('../../../../assets/DownArrow.png')} />
                </CollapseHeader>
                <CollapseBody>
                  <FlatList
                    style={{paddingVertical: 5, paddingHorizontal: 10}}
                    data={districtList}
                    renderItem={districtRenderItem}
                    // ItemSeparatorComponent={() => {
                    //     return <View height={5} />
                    // }}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>
            </ScrollView>
          </View>

          <TouchableOpacity
            onPress={() => {
              filterCrowdSourcingList('filter');
              refFilter.current.close();
              setSearchTxt('');
            }}
            style={{
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
              elevation: 5,
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
                style={{
                  fontSize: moderateScale(18),
                  color: '#fff',
                  fontWeight: '700',
                }}>
                {strings('CrowdSourcingFile.lbl_apply')}
              </CustomText>
            </View>
            <View>
              <Image
                source={require('../../../../assets/Login_Arrow.png')}
                style={{width: 27.5, height: 26.7}}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.resetFilter}>
            <TouchableOpacity
              onPress={() => {
                setStateName('Select State');
                setDistrictName('Select District');
                setStateUserName('Select User Type');
                filterCrowdSourcingList('reset');
                refFilter.current.close();
              }}>
              <CustomText style={styles.resetFilterText}>
                {strings('CrowdSourcingFile.lbl_reset_filter')}
              </CustomText>
            </TouchableOpacity>
          </View>
        </RBSheet>
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
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewContainer: {
    ...Platform.select({
      ios: {
        shadowColor: 'grey',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
    borderRadius: 10,
    width: '98%',
    backgroundColor: 'white',
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: 'rgba(56, 119, 241, 0.2)',
  },
  viewContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  viewContainer2: {
    flex: 1,
    alignItems: 'flex-start',
  },
  viewContainer3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  textStyle1: {
    fontWeight: '400',
    fontSize: moderateScale(13),
    fontStyle: 'normal',
    lineHeight: 18,
    color: '#545454',
  },
  textStyle2: {
    fontWeight: '800',
    fontSize: moderateScale(15),
    fontStyle: 'normal',
    lineHeight: 20,
    color: '#000000',
    marginTop: moderateScale(3),
  },
  imageStyle: {
    height: 42,
    width: 42,
    resizeMode: 'cover',
  },
  WarningTitleText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#000',
    lineHeight: 26,
  },
  resetFilter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resetFilterText: {
    color: '#EB4335',
    fontSize: moderateScale(18),
  },
  bottomSheetTitleText: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#000',
  },
  titleTextStyle: {
    fontSize: moderateScale(14),
    color: '#000000',
    fontWeight: '400',
    opacity: 0.6,
    lineHeight: 19,
  },
  collapseStyle: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DFDFDF',
    marginTop: 10,
  },
  collapseHeader: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 17,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  AccordianTitle: {
    marginTop: moderateScale(10),
    // fontWeight: "bold",
    fontSize: moderateScale(14),
    color: '#000',
  },
});
export default CrowdSourcingFile;
