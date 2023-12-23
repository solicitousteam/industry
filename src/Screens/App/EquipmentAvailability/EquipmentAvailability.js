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
import { styles } from "./EquipmentAvailabilityStyle";
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import { postAPI } from '../../../Networking/Request';
import DropdownAlert from 'react-native-dropdownalert';
import { strings } from "../../../localization/i18n"
import { CustomText } from '../../../Component/Text';



const EquipmentAvailability = ({ navigation, route }) => {
   const dispatch = useDispatch();
   const isFocused = useIsFocused();
   const refRBSheet = useRef();
   const refDelete = useRef();
   let dropDownAlertRef = useRef()

   let [loader, setLoader] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
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
   const [offset, setOffset] = useState(0)

   // const [token, setToken] = ('')
   const [loginUserData, setLoginUserData] = useState("")
   const [equipmentList, setEquipmentList] = useState([]);
   const [searchTxt, setSearchTxt] = useState("")
   const [equipmentItem, setEquipmentItem] = useState({})

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






   // useEffect(() => {
   //    setLoader(true)
   //    getUser()
   //    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
   //    return () => {
   //       BackHandler.removeEventListener(
   //          'hardwareBackPress',
   //          handleBackButtonClick,
   //       );
   //    };
   // }, []);
   useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
         BackHandler.removeEventListener(
            'hardwareBackPress',
            handleBackButtonClick,
         );
      };

   }, [route]);
   // useEffect(() => {
   //    setLoader(true)
   //    // getUser()
   //    // getLoginData()
   // }, [isFocused])

   useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
         // The screen is focused
         // Call any action
         getLoginData()
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
   }, [navigation])

   async function getLoginData() {
      setLoader(true)
      const value = await AsyncStorage.getItem("loginUserData")
      const data = JSON.parse(value)
      // console.log("Data", data) 

      setLoginUserData(data)
      setTimeout(() => {
         getEquipmentAvailabilityList(data.token, searchTxt)
      }, 1000)
   }

   function getEquipmentAvailabilityList(token, state) {
      const headers = {
         Accept: 'application/json',
         Authorization: 'Bearer ' + token,
         'Content-Type': 'multipart/form-data',
      };
      let formData = new FormData()
      formData.append("limit", 1000)
      formData.append("offset ", 0)
      // formData.append("search ", state)
      // formData.append("filter",filter)

      console.log(
         'url====',
         Config.baseUrl + APIConstants.EQUIPMENT_LIST,
         headers,
         formData,
      );

      return postAPI(Config.baseUrl + APIConstants.EQUIPMENT_LIST, headers, formData)
         .then(function (response) {
            setLoader(false)
            // console.log('EQUIPMENT_LIST', response);
            if (response.data.length > 0) {
               setEquipmentList(response.data)
            } else {
               setEquipmentList([])
            }
         })
         .catch(function (error) {
            setLoader(false)
            const errorData = error?.response?.data
               ? error.response.data
               : error;
            console.log('errorData==', errorData);
            setEquipmentList([])
            return errorData;
         })
         .finally(function () {
            setLoader(false)
            // console.log('crowd_sourceAPI=finally=');
         });


   }
   const getUser = async () => {
      setLoader(true);
      // this.setState({isAPILoading: true});
      const Token = await AsyncStorage.getItem('loginToken');

      console.log(Token, 'user token================');
      const getUserData = await dispatch(GetUser(Token, offset));
      if (getUserData.status == 200) {
         setStateUserData(getUserData.data);
         setNewStateUserData(getUserData.data);
         setStateUserTempList(getUserData.data);
         setLoader(false);
      } else {
         setLoader(false);
         Alert.alert(getUserData.msg);
         return
      }
   };

   const AccordianItem = ({ item, onPress }) => (
      <View>
         <TouchableOpacity onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
               <View style={{ marginLeft: 13 }}>
                  <CustomText fontSize={14} semibold style={styles.AccordianTitle}>{item.title}</CustomText>
               </View>
            </View>
         </TouchableOpacity>
      </View>
   );
   const Item = ({ item, onPress }) => (
      <View>
         <TouchableOpacity onPress={onPress} style={styles.item}>
            {/* <View> */}
            <View style={styles.flatListViewText}>
               <CustomText fontSize={17} regular style={styles.title}>{item.name}</CustomText>
               <CustomText fontSize={12} regular style={styles.info}>{item.department_type}</CustomText>
               <CustomText fontSize={12} regular style={styles.info}>{item.department_name}</CustomText>
            </View>

            <View style={styles.flatListViewBtn}>
               <TouchableOpacity style={{ marginBottom: 15, marginRight: 13 }} onPress={() => editEquipmentList(item)}>
                  {/* <View > */}
                  <Image source={require('../../../../assets/Edit.png')} />
                  {/* </View> */}
               </TouchableOpacity>
               <TouchableOpacity style={{ marginBottom: 15 }} onPress={() => onPressDelete(item)}>
                  {/* <View > */}
                  <Image source={require('../../../../assets/Delete.png')} />
                  {/* </View> */}
               </TouchableOpacity>
            </View>
            {/* </View> */}
         </TouchableOpacity>
      </View>
   );

   const onToggle = item => {
      setStateName(item.title);
      setStateToggle(false);
   };
   // const districtonToggle = item => {
   //    setdistrictName(item.title);
   //    setdistrictToggle(false);
   // };

   const stateRenderItem = ({ item }) => {
      return <AccordianItem item={item} onPress={() => onToggle(item)} />;
   };
   // const districtRenderItem = ({ item }) => {
   //    return <AccordianItem item={item} onPress={() => districtonToggle(item)} />;
   // };



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
               navigation.navigate('EquipmentAvailabilityInfo', { userInfo: item, id: item.id })
            }
         />
      );
   };


   const editEquipmentList = item => {
      navigation.navigate('AddEquipmentAvailability', { userInfo: item, flag: 'editUser' });
   };

   const onPressDelete = (item) => {
      // console.log(typeof item);
      setEquipmentItem(item)
      refDelete.current.open()
   };
   function deleteEquipment() {
      refDelete.current.close()
      const headers = {
         Accept: 'application/json',
         Authorization: 'Bearer ' + loginUserData.token,
         'Content-Type': 'multipart/form-data',
      };
      let formData = new FormData()
      formData.append("id", equipmentItem.id)
      console.log(
         'url====',
         Config.baseUrl + APIConstants.DELETE_EQUIPMENT,
         headers,
         formData,
      );
      return postAPI(Config.baseUrl + APIConstants.DELETE_EQUIPMENT, headers, formData)
         .then(function (response) {
            setLoader(false)
            console.log('delete_crowd=15=', response);
            if (response.status === 200) {
               getEquipmentAvailabilityList(loginUserData.token, searchTxt)
               dropDownAlertRef.alertWithType('success', 'DCRA', response.message);
            }
            // return crowd_sourceAPI;
         })
         .catch(function (error) {
            setLoader(false)
            const errorData = error?.response?.data
               ? error.response.data
               : error;
            console.log('crowd_sourceAPI==', errorData);
            dropDownAlertRef.alertWithType('error', 'DCRA', error.message);
            return errorData;
         })
         .finally(function () {
            setLoader(false)
            // console.log('crowd_sourceAPI=finally=');
         });

   }

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
   }
   // const renderFooterMy = () => {
   //    return (
   //       //Footer View with Load More button
   //       <View style={styles.footer}>
   //          {flatListLoader ? (
   //             <ActivityIndicator
   //                color="#3877F1"
   //                style={{ marginLeft: 8 }} />
   //          ) : (
   //             <TouchableOpacity
   //                activeOpacity={0.9}
   //                onPress={loadStateUser}
   //                //On Click of button load more data
   //                style={styles.loadMoreBtn}>
   //                <CustomText style={styles.btnText}>Load More</CustomText>

   //             </TouchableOpacity>
   //          )}

   //       </View>
   //    );
   // };
   if (!loader) {
      return (
         <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#3877F1" />
            <LinearGradient
               colors={['#3877F1', '#215ACA']}>
               <View
                  style={styles.headerStyle}>
                  <Image source={require('../../../../assets/Ellipse_Head.png')} />
                  <View
                     style={styles.headerView}>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('ResourceAllocation')}
                        style={styles.touchableStyle}>

                        <Image
                           source={require('../../../../assets/Back_Arrow_White.png')}
                        />

                     </TouchableOpacity>
                     <View style={{ width: "70%" }}>
                        <CustomText
                           fontSize={16}
                           regular
                           numberOfLines={1}
                           style={styles.headerTextStyle}>
                           {strings("AddEquipmentAvailability.lbl_equipment_availability")}
                        </CustomText>
                     </View>
                     <TouchableOpacity
                        style={styles.bell}
                        onPress={() =>
                           navigation.navigate('AddEquipmentAvailability', { userInfo: '', flag: '' })
                        }>

                        <Image source={require('../../../../assets/Plus.png')} />

                     </TouchableOpacity>
                  </View>

                  {/* </Header> */}
               </View>
            </LinearGradient>
            <View
               style={styles.serachView}>
               <View style={styles.searchBar}>
                  <View style={{ width: '90%' }}>
                     <TextInput
                        style={styles.searchText}
                        placeholderTextColor={'#000'}
                        placeholder={strings("Common.hint_search")}
                        // keyboardType='email-address'
                        value={search}
                        onChangeText={event => setSearch(event)}
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
                           style={styles.searchImage}
                           source={require('../../../../assets/Search.png')}
                        />
                     </TouchableOpacity>
                  ) : (
                     <TouchableOpacity
                        onPress={() => {
                           close();
                        }}>
                        <Image
                           style={styles.searchImage}
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
               {/* <RBSheet
                  ref={refDelete}
                  closeOnDragDown={true}
                  // closeOnPressMask={false}
                  height={340}
                  dragFromTopOnly={true}
                  customStyles={{
                     container: { paddingHorizontal: 20, borderRadius: 20 },
                     draggableIcon: {
                        backgroundColor: '#000',
                     },
                  }}>
                  <ScrollView showsVerticalScrollIndicator={false}>

                     <View style={styles.deleteView}>
                        <Image source={require('../../../../assets/trash.png')} />
                     </View>

                     <View style={styles.deleteView}>
                        <CustomText fontSize={18} regular style={[styles.WarningTitleText,]}>{strings("CrowdSourcingFile.msg_delete_warning")}</CustomText>
                     </View>
                     <View style={styles.deleteBtnView}>

                        <TouchableOpacity
                           onPress={() => { refDelete.current.close() }}
                           style={styles.deleteBtn}>
                           <View
                              style={styles.deleteBtnViewTxt}>
                              <CustomText
                                 fontSize={18}
                                 regular
                                 style={styles.deleteBtnText}>
                                 {strings("Common.button_no")}
                              </CustomText>
                           </View>

                        </TouchableOpacity>
                        <TouchableOpacity
                           onPress={() => { deleteEquipment() }}
                           style={styles.deleteBtnPressYes}>
                           <View
                              style={styles.deleteBtnViewTxt}>
                              <CustomText
                                 regular
                                 fontSize={18}
                                 style={styles.deleteBtnYesTxt}>
                                 {strings("Common.button_yes")}
                              </CustomText>
                           </View>

                        </TouchableOpacity>
                     </View>
                  </ScrollView>
               </RBSheet> */}
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
                        onPress={() => { deleteEquipment() }}
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
                        <CustomText fontSize={15} regular style={styles.bottomSheetTitleText}>{strings("CrowdSourcingFile.lbl_filter_by")}</CustomText>
                     </View>
                     <View style={styles.filterView}>
                        <CustomText
                           fontSize={14}
                           regular
                           style={styles.filterText}>
                           {strings("AddEquipmentAvailability.lbl_equipment_category")}
                        </CustomText>
                     </View>
                     <Collapse
                        style={styles.collapseStyle}
                        isExpanded={stateToggle}
                        onToggle={isExpanded => setStateToggle(isExpanded)}>
                        <CollapseHeader
                           style={styles.collapseHeader}>
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
                              style={styles.collapseBody}
                              data={contryState}
                              renderItem={stateRenderItem}
                              keyExtractor={item => item.id}
                           />
                        </CollapseBody>
                     </Collapse>

                     <TouchableOpacity
                        onPress={() => filterUser()}
                        style={styles.filterApplyBtn}>
                        <View style={{ width: 10 }}></View>
                        <View
                           style={styles.filterApplyView}>
                           <CustomText
                              fontSize={18}
                              regular
                              style={styles.filterApplyText}>
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
                           <CustomText bold fontSize={18} style={styles.resetFilterText}>{strings("CrowdSourcingFile.lbl_reset_filter")}</CustomText>
                        </TouchableOpacity>
                     </View>
                  </ScrollView>
               </RBSheet>
            </View>


            {search !== "" || equipmentList.length < 10 || stateName !== strings("CrowdSourcingFirst.lbl_select_state") ? (
               // {searchFilterList === [] ? (
               <FlatList
                  style={{ flex: 1, width: '100%' }}
                  data={equipmentList}
                  ListEmptyComponent={
                     <View
                        style={styles.noResultView}>
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
                  data={equipmentList}
                  ListEmptyComponent={
                     <View
                        style={styles.noResultView}>
                        <CustomText fontSize={14}>{strings("Common.lbl_result_not_found")}</CustomText>
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
            )}

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



export default EquipmentAvailability;