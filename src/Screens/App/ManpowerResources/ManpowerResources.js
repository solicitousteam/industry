import React, { useState, useRef, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUser, deleteUserData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { navigate, reset } from '../../../Navigation/RootNavigation';
import { useIsFocused } from '@react-navigation/native';
import { postAPI } from '../../../Networking/Request';
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import { strings } from '../../../localization/i18n';
import { CustomText } from '../../../Component/Text';


const ManpowerResources = ({ navigation, props }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const refRBSheet = useRef();
  const refDelete = useRef();
  let [loader, setLoader] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
  const [Skill, setSkill] = useState(strings("AddManpowerResources.lbl_select_skill"));
  const [districtName, setdistrictName] = useState(strings("CrowdSourcingFirst.lbl_select_district"));
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [stateUserData, setStateUserData] = useState([]);
  const [delete_User_Data, set_Delete_User_Data] = useState([]);
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState('');
  let [searchFilterList, setSearchFilterList] = useState([]);
  const [newStateUserData, setNewStateUserData] = useState([]);
  const [stateUserTempList, setStateUserTempList] = useState([]);
  const [flatListLoader, setFlatListLoader] = useState(false)
  const [offset, setOffset] = useState(0);
  let dropDownAlertRef = useRef()
  const [AllUserData, setAllUserData] = useState();
  const [LoaderValue, setLoaderValue] = useState(10);


  const [flag, setFlag] = useState(true)
  const SkillSet = [{
    id: 1,
    title: strings("ManpowerResources.lbl_skill_one")
  },
  {
    id: 2,
    title: strings("ManpowerResources.lbl_skill_two")
  }
  ]
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

  const [gujaratDistrict, setGujaratDistrict] = useState([
    {
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


  useEffect(() => {
    setLoader(true)
    getUser()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    setLoader(true)
    getUser()
  }, [isFocused])

  const getUser = async () => {
    setLoader(true);
    // this.setState({isAPILoading: true});
    const Token = await AsyncStorage.getItem('loginToken');

    // console.log(Token, 'user token==============12==');
    const getUserData = await dispatch(GetUser(Token, offset));
    if (getUserData.status == 200) {
      console.log("getUserData.data", getUserData.data)
      setStateUserData(getUserData.data);
      setNewStateUserData(getUserData.data);
      setStateUserTempList(getUserData.data);
      setLoader(false);
    } else {
      setLoader(false);
      Alert.alert(getUserData.msg);
      return
    }
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'application/json',
      // 'Accept-Encoding': 'gzip; q=0'
    };
    const data = {
      limt: LoaderValue,
      offset: offset,
      search: search,
      filter_by: ""
    }
    // console.log(Token, 'user token==============12==');
    //   console.log("Config.baseUrl + APIConstants.get_manPower",Config.baseUrl + APIConstants.get_manPower)

    postAPI(
      Config.baseUrl + APIConstants.get_manPower, headers,
      data,
    )
      .then(function (response) {
        // handle success
        const socialRegistretionAPI = response;
        // console.log('registretionAPI=15=', response);
        setAllUserData(socialRegistretionAPI?.data);
        return socialRegistretionAPI;
      })
      .catch(function (error) {
        // handle error
        const socialRegistretionAPI = error?.response?.data ? error.response.data : error;
        //   console.log('register==', registerAPI);
        return socialRegistretionAPI;
      })
      .finally(function () {
        // always executed
        //   console.log('register=finally=');
      });
  };

  const AccordianItem = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 13 }}>
            <CustomText semibold fontSize={14} style={styles.AccordianTitle}>{item.title}</CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const Item = ({ item, onPress }) => (

    // <View>

    <TouchableOpacity onPress={onPress} style={styles.item}>
      {/* <View> */}
      <View style={{
        padding: "5%",
        width: "75%"
      }}>
        <CustomText regular fontSize={17} style={styles.title}>{item.name}</CustomText>
        <CustomText regular fontSize={12} style={styles.info}>{item.department_type}</CustomText>
        <CustomText regular fontSize={12} style={styles.info}>{item.department_name}</CustomText>
        {/* <CustomText style={styles.info}>{item.mobile}</CustomText> */}
      </View>
      {/* </View> */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: '25%', }}>
        <TouchableOpacity style={{ marginBottom: 15, marginRight: 13 }} onPress={() => editUser(item)}>
          {/* <View style={{ margin: 5 }}> */}
          <Image source={require('../../../../assets/Edit.png')} />
          {/* </View> */}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 15 }} onPress={() => deleteUser(item.id)}>
          {/* <View style={{ margin: 5 }}> */}
          <Image source={require('../../../../assets/Delete.png')} />
          {/* </View> */}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    // </View>
  );

  const onToggle = item => {
    setStateName(item.title);
    setStateToggle(false);
  };
  const districtonToggle = item => {
    setdistrictName(item.title);
    setdistrictToggle(false);
  };

  const stateRenderItem = ({ item }) => {
    return <AccordianItem item={item} onPress={() => onToggle(item)} />;
  };

  const skillRenderItem = ({ item }) => {
    return <AccordianItem item={item} onPress={() => setSkill(item?.title)} />;
  };
  const districtRenderItem = ({ item }) => {
    return <AccordianItem item={item} onPress={() => districtonToggle(item)} />;
  };



  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }



  const onRefresh = async () => {
    if (stateName === strings("CrowdSourcingFirst.lbl_select_state") && districtName === strings("CrowdSourcingFirst.lbl_select_district") && search === "") {
      const refreshOffSet = 0
      console.log("ENTER IN IF")
      setSearch('');
      searchUser('');
      //offset
      // getUser();
      const Token = await AsyncStorage.getItem('loginToken');

      console.log(Token, 'user token================');
      const getUserData = await dispatch(GetUser(Token, refreshOffSet));

      if (getUserData.status == 200) {
        setStateUserData(getUserData.data);
        setNewStateUserData(getUserData.data);
        setStateUserTempList(getUserData.data);
      } else {
        setFlatListLoader(false);
        Alert.alert(getUserData.msg);
        return
      }
      //offset

    } else if (search !== "") {
      searchUser(search);
    } else {
      console.log("ENTER IN ELSEF")
      filterUser();
    }
  };
  // , []);


  const loadStateUser = async () => {
    setFlatListLoader(true);
    setLoaderValue(LoaderValue + 10)
    const offsetLength = stateUserTempList.length;
    console.log(offsetLength, "lemdt")

    const Token = await AsyncStorage.getItem('loginToken')
    const getUserData = await dispatch(
      GetUser(Token, offsetLength),
    );
    if (getUserData.status == 200) {
      const Addition = offsetLength + getUserData.data.length
      setStateUserData(getUserData.data)
      stateUserTempList.push(...getUserData.data)
      console.log(stateUserTempList, "_+_+_+_+_")
      setOffset(Addition);
      console.log(offset, "OFFSET")
      setFlatListLoader(false);
      return
    } else {
      setFlatListLoader(false);
      Alert.alert(getUserData.msg);
      return
    }
  }


  // const renderFooterStateuser = () => {
  //   return (
  //     //Footer View with Load More button
  //     flatListLoader ?
  //       <View style={styles.footer}>
  //         <ActivityIndicator size={"large"} />
  //       </View>
  //       : null
  //   );
  // };

  const renderItem = ({ item }) => {
    setUserId(item.id);
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate('ManpowerResourcesInfo', { userInfo: item, id: item.id })
        }
      />
    );
  };


  const editUser = item => {
    navigation.navigate('AddManpowerResources', { userInfo: item, flag: 'editUser' });
  };

  async function deleteManPower() {
    refDelete.current.close()
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    // this.setState({isAPILoading: true});

    console.log(Token, 'user token================');

    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'multipart/form-data',
    };
    let formData = new FormData()
    formData.append("id", userId)
    console.log(
      'url====',
      Config.baseUrl + APIConstants.DELETE_MAN_POWER_REC,
      headers,
      formData,
    );
    return postAPI(Config.baseUrl + APIConstants.DELETE_MAN_POWER_REC, headers, formData)
      .then(function (response) {
        console.log('DELETE API==========', response);

        setLoader(false)
        if (response.status === 200) {
          dropDownAlertRef.alertWithType('success', 'DCRA', response.message);
          // refDelete.current.close()
          getUser()
        }
      })
      .catch(function (error) {
        setLoader(false)
        const errorData = error?.response?.data
          ? error.response.data
          : error;
        console.log('errorData==', error);
        dropDownAlertRef.alertWithType('error', 'DCRA', error.message);
        return errorData;
      })
      .finally(function () {
        setLoader(false)
        // console.log('crowd_sourceAPI=finally=');
      });
  }

  const deleteUser = id => {
    refDelete.current.open()
    // Alert.alert(
    //   'DCRA',
    //   'Are you sure want to delete?',
    //   [
    //     { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
    //     { text: 'Yes', onPress: () => DeleteUser(id) },
    //   ],
    //   {
    //     cancelable: false
    //   }
    // );


  };

  const DeleteUser = async (id) => {
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    // this.setState({isAPILoading: true});

    console.log(Token, 'user token================');
    const delete_User_Data_Response = await dispatch(deleteUserData(Token, id));
    if (delete_User_Data_Response.status == 200) {
      console.log(delete_User_Data_Response.data, "DELETE DI State")
      set_Delete_User_Data(delete_User_Data_Response.data);
      getUser();
      // setLoader(false);
    } else {
      setLoader(false);
      Alert.alert(delete_User_Data_Response.msg);
    }
  }
  const close = async () => {
    if (stateName === strings("CrowdSourcingFirst.lbl_select_state") && districtName === strings("CrowdSourcingFirst.lbl_select_district")) {
      setLoader(true);
      setSearch(''),
        searchUser('');


      //offset
      // getUser();
      const Token = await AsyncStorage.getItem('loginToken');
      const offset = 0;
      console.log(Token, 'user token================');
      const getUserData = await dispatch(GetUser(Token, offset));


      if (getUserData.status == 200) {
        setStateUserData(getUserData.data);
        setNewStateUserData(getUserData.data);
        setStateUserTempList(getUserData.data);
        setLoader(false)
      } else {
        setLoader(false)
        Alert.alert(getUserData.msg);
      }
      //offset
    } else {
      setSearch('')
      // filterUser();

      //offset

      if (stateName && districtName === strings("CrowdSourcingFirst.lbl_select_district")) {

        // var data = newStateUserData.filter(
        var data = stateUserData.filter(
          listItem =>
            listItem.state
              .toLowerCase()
              .includes(stateName.toString().toLowerCase())
        );

        // setStateUserData(data);
        setStateUserTempList(data)
        setLoader(false);
      } else {
        // var data = newStateUserData.filter(
        var data = stateUserData.filter(
          listItem =>
            listItem.state
              .toLowerCase()
              .includes(stateName.toString().toLowerCase()) && listItem.district
                .toLowerCase()
                .includes(districtName.toString().toLowerCase()),
        );

        // setStateUserData(data);
        setStateUserTempList(data)
        setLoader(false);
      }
      //offset

    }
  }
  const searchUser = search => {
    setLoader(true);

    console.log("newStateUserData", newStateUserData)

    if (search === "") {
      // setStateUserData(newStateUserData);
      setStateUserTempList(newStateUserData);
      setLoader(false);
    } else {
      // var data = stateUserData.filter(listItem =>
      var data = stateUserTempList.filter(listItem =>
        listItem.first_name
          .toLowerCase()
          .includes(search.toString().toLowerCase()),
      );
      // setStateUserData(data)
      setStateUserTempList(data)
      setLoader(false);
    }
  };
  const filterUser = () => {
    refRBSheet.current.close();

    if (stateName && districtName === strings("CrowdSourcingFirst.lbl_select_district")) {

      // var data = newStateUserData.filter(


      var data = AllUserData.filter(
        listItem =>
          listItem.skills
            .toLowerCase()
            .includes(Skill.toString().toLowerCase())
      );

      console.log("data", data)
      var data = stateUserTempList.filter(
        listItem =>
          listItem.state
            .toLowerCase()
            .includes(stateName.toString().toLowerCase())
      );

      // setStateUserData(data);
      setStateUserTempList(data)
      setLoader(false);
    } else {
      // var data = newStateUserData.filter(
      var data = stateUserTempList.filter(
        listItem =>
          listItem.state
            .toLowerCase()
            .includes(stateName.toString().toLowerCase()) && listItem.district
              .toLowerCase()
              .includes(districtName.toString().toLowerCase()),
      );

      setStateUserData(data);
      setStateUserTempList(data)
      setLoader(false);
    }
    // setSearchFilterList(data);
    // setStateName('Select State'),
    // setdistrictName('Select District');
  };

  const resetFilter = async () => {
    setLoader(true)
    setStateName(strings("CrowdSourcingFirst.lbl_select_state")),
      setdistrictName(strings("CrowdSourcingFirst.lbl_select_district"));
    setSearch('')
    // getUser();

    // Offset
    const Token = await AsyncStorage.getItem('loginToken');
    const offset = 0;
    console.log(Token, 'user token================');
    const getUserData = await dispatch(GetUser(Token, offset));
    if (getUserData.status == 200) {
      setStateUserData(getUserData.data);
      setNewStateUserData(getUserData.data);
      setStateUserTempList(getUserData.data);
      setLoader(false)
    } else {
      setLoader(false)
      Alert.alert(getUserData.msg);
    }

    refRBSheet.current.close();
    refDelete.current.close();
  }

  const onSearch = (event) => {
    setSearch(event);
  }
  const renderFooterMy = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        {flatListLoader ? (
          <ActivityIndicator
            color="#3877F1"
            style={{ marginLeft: 8 }} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={loadStateUser}
            //On Click of button load more data
            style={styles.loadMoreBtn}>
            <CustomText fontSize={15} style={styles.btnText}>{strings("Common.lbl_load_more")}</CustomText>

          </TouchableOpacity>
        )}

      </View>
    );
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
              //   backgroundColor: '#5B4CDF',
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
                onPress={() => navigation.navigate('ResourceAllocation')}
                style={{ width: '15%' }}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: "70%" }}>
                <CustomText
                  regular
                  fontSize={16}
                  style={{
                    color: '#fff',
                    // fontSize: 16,
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    textAlign: "center"
                  }}>
                  {strings("AddManpowerResources.lbl_manpower_resources")}
                </CustomText>
              </View>
              <TouchableOpacity
                style={styles.bell}
                onPress={() =>
                  navigation.navigate('AddManpowerResources', { userInfo: '', flag: '' })
                }>
                {/* <View style={{ backgroundColor: "pink", width: '15%' }}> */}
                <Image source={require('../../../../assets/Plus.png')} />
                {/* </View> */}
              </TouchableOpacity>
            </View>

            {/* </Header> */}
          </View>
        </LinearGradient>
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
            flexDirection: 'row',
          }}>
          {/* {console.log("searc", search)} */}
          <View style={styles.searchBar}>
            <View style={{ width: '90%' }}>
              <TextInput
                style={{ fontSize: 15, color: '#000' }}
                placeholderTextColor={'#000'}
                placeholder={strings("Common.hint_search")}
                // keyboardType='email-address'
                value={search}
                onChangeText={event => onSearch(event)}
                returnKeyType="search"
                onSubmitEditing={() => onRefresh()}
              // onSubmitEditing={(e) => console.log(e,"--------")}
              />
            </View>
            {search == null || search == '' ? (
              <TouchableOpacity
              // onPress={() => searchUser(search)}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('../../../../assets/Search.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  close();
                }}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('../../../../assets/Cross_Black.png')}
                />
              </TouchableOpacity>
            )}

          </View>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={{ alignItems: 'center' }}>
              <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/Filter.png')} />
              <CustomText regular fontSize={9} style={styles.filterText}>{strings("CrowdSourcingFile.lbl_filter_caps")}</CustomText>
            </View>
          </TouchableOpacity>
          <RBSheet
            ref={refDelete}
            closeOnDragDown={true}
            height={300}
            dragFromTopOnly={true}
            customStyles={{
              container: { paddingHorizontal: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
              draggableIcon: {
                backgroundColor: '#C4C4C4', width: 78
              },
            }}>

            <View style={{ flex: 1 }}>
              <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 80, width: 80 }} source={require('../../../../assets/trash1.png')} />
              </View>

              <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                <CustomText style={[styles.WarningTitleText, { width: '100%', textAlign: 'center' }]}>{strings("AddEquipmentAvailability.msg_delete_warning")} </CustomText>
              </View>
            </View>
            <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { refDelete.current.close() }} style={{ width: 100 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                  <CustomText fontSize={18} style={{ color: '#545454', fontWeight: '700', }}>
                    {strings("Common.button_no")}
                  </CustomText>
                </View>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { deleteManPower() }}
                style={{
                  borderRadius: 48, height: 45, backgroundColor: '#3877F1', shadowColor: '#3877F1',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 5, width: 100, justifyContent: "center"
                }}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <CustomText fontSize={18} style={{ color: '#fff', fontWeight: '700', }}>{strings("Common.button_yes")}</CustomText>
                </View>
              </TouchableOpacity>
            </View>
          </RBSheet>


          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            // closeOnPressMask={false}
            height={300}
            dragFromTopOnly={true}
            customStyles={{
              container: { paddingHorizontal: 20, borderRadius: 20 },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <CustomText regular fontSize={15} style={styles.bottomSheetTitleText}>{strings("CrowdSourcingFile.lbl_filter_by")}</CustomText>
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
                  {strings("AddManpowerResources.lbl_skill_set")}
                </CustomText>
              </View>
              <Collapse
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#DFDFDF',
                }}
                isExpanded={stateToggle}
                onToggle={isExpanded => setStateToggle(!isExpanded)}>
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
                    <CustomText fontSize={14}>{Skill}</CustomText>
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
                    data={SkillSet}
                    renderItem={skillRenderItem}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>

              <TouchableOpacity
                onPress={() => filterUser()}
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
                    {strings("CrowdSourcingFile.lbl_apply")}
                  </CustomText>
                </View>
                <View>
                  {/* <Image
                    source={require('../../../../assets/Login_Arrow.png')}
                    style={{ width: 27.5, height: 26.7 }}
                  /> */}
                </View>
              </TouchableOpacity>
              <View style={styles.resetFilter}>
                <TouchableOpacity
                  onPress={() => {
                    resetFilter();
                  }}>
                  <CustomText fontSize={18} bold style={styles.resetFilterText}>{strings("CrowdSourcingFile.lbl_reset_filter")}</CustomText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </RBSheet>
        </View >

        {console.log("alluser", AllUserData)}
        {
          search !== "" || stateUserData.length < 10 || stateName !== strings("CrowdSourcingFirst.lbl_select_state") ? (
            // {searchFilterList === [] ? (
            <FlatList
              style={{ flex: 1 }}
              data={AllUserData}
              ListEmptyComponent={
                <View
                  style={{
                    marginTop: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText>{strings("Common.lbl_result_not_found")}</CustomText>
                </View>
              }
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              refreshControl={
                <RefreshControl
                  refreshing={loader}
                  onRefresh={onRefresh}
                // colors={[Colors.darkorange]}
                />
              }
            />
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={AllUserData}
              ListEmptyComponent={
                <View
                  style={{
                    marginTop: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText>{strings("Common.lbl_result_not_found")}</CustomText>
                </View>
              }
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              // onEndReached={loadStateUser}
              // ListFooterComponent={renderFooterStateuser}
              // ListFooterComponent={renderFooterMy}
              refreshControl={
                <RefreshControl
                  refreshing={loader}
                  onRefresh={onRefresh}
                // colors={[Colors.darkorange]}
                />
              }
            />
          )
        }
        <DropdownAlert
          ref={ref => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
        />

      </SafeAreaView >
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
    width: 80,
    backgroundColor: '#FB7429',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    marginBottom: 6,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: '4%',
    marginHorizontal: "4%",
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
    elevation: 3,
  },
  title: {
    // fontSize: 17,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#0D2451',
  },
  AccordianTitle: {
    marginTop: 20,
    // fontWeight: "bold",
    // fontSize: 14,
    // fontFamily: 'Metropolis_SemiBold',
  },
  bell: {
    alignItems: 'flex-end',
    padding: 5,
    width: '15%',
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
  searchBar: {
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '85%',
  },
  filterText: {
    // fontSize: 9,
    color: '#3877F1',
    // fontFamily: 'OpenSans-Regular',
    fontWeight: '600',
  },
  info: {
    // fontSize: 12,
    // fontFamily: 'OpenSans-Regular',
    color: '#000',
    marginTop: 3,
  },
  WarningTitleText: {
    // fontSize: 18,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#000',
  },
  bottomSheetTitleText: {
    // fontSize: 15,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#000',
  },
  resetFilter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resetFilterText: {
    color: '#EB4335',
    // fontFamily: 'OpenSans-Bold',
    // fontSize: 18,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#3877F1',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnText: {
    color: 'white',
    // fontSize: 15,
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ManpowerResources;
