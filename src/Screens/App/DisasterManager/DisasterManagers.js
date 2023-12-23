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
  RefreshControl
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetDisasterUser, deleteUserData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { strings } from "../../../localization/i18n"
import { reset } from '../../../Navigation/RootNavigation';
import { CustomText } from '../../../Component/Text';

const DisasterManagers = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const refRBSheet = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const [stateName, setStateName] = useState(strings(strings("CrowdSourcingFirst.lbl_select_state")));
  const [districtName, setdistrictName] = useState(strings("CrowdSourcingFirst.lbl_select_district"));
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  let [loader, setLoader] = useState(false);
  let [searchFilterList, setSearchFilterList] = useState([]);
  const [search, setSearch] = useState('');
  const [disasterUserData, setDisasterUserData] = useState([]);
  const [delete_User_Data, set_Delete_User_Data] = useState([]);

  const [newDisasterUserData, setNewDisasterUserData] = useState([]);
  const [disasterUserTempList, setDisasterUserTempList] = useState([]);
  const [flatListLoader, setFlatListLoader] = useState(false)
  const [offset, setOffset] = useState(0)
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


  const AccordianItem = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={{ margin: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 13 }}>
            <CustomText fontSize={14} semibold style={styles.AccordianTitle}>{item.title}</CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );



  const editUser = (item) => {
    navigation.navigate("AddDisasterManager", { userInfo: item, flag: "editDisasterManager" })
  }

  const deleteUser = id => {

    Alert.alert(
      'DCRA',
      strings("DisasterMNanagerInfo.msg_delete_warning"),
      [
        { text: strings("Common.button_no"), onPress: () => console.log('No button clicked'), style: 'cancel' },
        { text: strings("Common.button_yes"), onPress: () => DeleteUser(id) },
      ],
      {
        cancelable: false
      }
    );


  };

  const DeleteUser = async (id) => {

    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    const delete_User_Data_Response = await dispatch(deleteUserData(Token, id));
    if (delete_User_Data_Response.status == 200) {
      set_Delete_User_Data(delete_User_Data_Response.data);
      getDisasterUser()
      // setLoader(false)
    } else {
      setLoader(false);
      Alert.alert(delete_User_Data_Response.msg)
    }
  }

  const onToggle = item => {
    setStateName(item.title);
    setStateToggle(false);
  };
  const districtonToggle = item => {
    setdistrictName(item.title);
    setdistrictToggle(false);
  };


  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    setLoader(true)
    getDisasterUser();
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
    setLoader(true)
    getDisasterUser();
  }, [isFocused])

  const onRefresh = async () => {
    if (stateName === strings("CrowdSourcingFirst.lbl_select_state") && search === "") {
      console.log("ENTER IN IF")
      setSearch('');
      searchUser('');

      //offset
      // getDisasterUser();
      const refreshOffSet = 0
      const Token = await AsyncStorage.getItem('loginToken');

      console.log(Token, 'user token================');
      const getDisasterUserData = await dispatch(GetDisasterUser(Token, refreshOffSet));
      setDisasterUserData(getDisasterUserData.data);
      setNewDisasterUserData(getDisasterUserData.data)
      setDisasterUserTempList(getDisasterUserData.data)
      // setLoader(false);
      //offset
    } else if (search !== "") {
      searchUser(search);
    } else {
      console.log("ENTER IN ELSEF")
      filterUser();
    }
  };

  const getDisasterUser = async () => {
    // setLoader(true);
    // this.setState({isAPILoading: true});
    const Token = await AsyncStorage.getItem('loginToken');

    console.log(Token, 'user token================');
    const getDisasterUserData = await dispatch(GetDisasterUser(Token, offset));
    if (getDisasterUserData.status == 200) {
      setDisasterUserData(getDisasterUserData.data);
      setNewDisasterUserData(getDisasterUserData.data);
      setDisasterUserTempList(getDisasterUserData.data);
      setLoader(false);
    } else {
      setFlatListLoader(false);
      setLoader(false);
      Alert.alert(getDisasterUserData.msg);
      return
    }
  };

  const stateRenderItem = ({ item }) => {
    return <AccordianItem item={item} onPress={() => onToggle(item)} />;
  };
  const districtRenderItem = ({ item }) => {
    return <AccordianItem item={item} onPress={() => districtonToggle(item)} />;
  };

  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';
    // console.log(item, "==========================ITEM");
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("DisasterManagerInfo", { userInfo: item, id: item.id })}
      />
    );
  };
  const Item = ({ item, onPress }) => (
    // <View>
    <TouchableOpacity onPress={onPress} style={styles.item}>
      {/* <View> */}
      <View style={{
        padding: "5%",
        width: "75%"
      }}>
        <CustomText fontSize={17} regular style={styles.title}>{item.first_name}</CustomText>
        <CustomText fontSize={12} regular style={styles.info}>{item.state}</CustomText>
        {/* <CustomText fontSize={12} regular style={styles.info}>{item.district}</CustomText> */}
        <CustomText fontSize={12} regular style={styles.info}>{item.mobile}</CustomText>
      </View>
      {/* </View> */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: '25%' }}>
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
  const close = async () => {
    console.log("CLOSE")
    if (stateName === strings("CrowdSourcingFirst.lbl_select_state")) {
      setLoader(true);
      setSearch(''),
        searchUser('');
      // getDisasterUser();
      //OFFSET
      const refreshOffSet = 0
      const Token = await AsyncStorage.getItem('loginToken');

      console.log(Token, 'user token================');
      const getDisasterUserData = await dispatch(GetDisasterUser(Token, refreshOffSet));
      setDisasterUserData(getDisasterUserData.data);
      setNewDisasterUserData(getDisasterUserData.data)
      setDisasterUserTempList(getDisasterUserData.data)
      //OFFSET
      setLoader(false);
    } else {
      console.log("CLOSE ELSE")
      setSearch('')

      var data = disasterUserData.filter(
        listItem =>
          listItem.state
            .toLowerCase()
            .includes(stateName.toString().toLowerCase()),
      );

      // setDisasterUserData(data);
      setDisasterUserTempList(data)
      // filterUser();
    }
  }
  const searchUser = (search) => {
    // setLoader(true);
    // console.log(search, '||||||||||||||||||||||||||');
    // var data = disasterUserData.filter(listItem =>
    //   listItem.first_name
    //     .toLowerCase()
    //     .includes(search.toString().toLowerCase()),
    // );
    // console.log(
    //   disasterUserData.filter(listItem =>
    //     listItem.first_name
    //       .toLowerCase()
    //       .includes(search.toString().toLowerCase()),
    //   ),
    //   '>>>>>>>>>>>>>>>>>>>>>>>>.......',
    // );
    // setSearchFilterList(data);
    // setLoader(false);
    // console.log(data, '%%%%%%%%%%%%%%%%%%%%%%%%%%');

    setLoader(true);

    if (search === "") {
      // setDisasterUserData(newDisasterUserData);
      setDisasterUserTempList(newDisasterUserData);
    } else {
      var data = disasterUserTempList.filter(listItem =>
        listItem.first_name
          .toLowerCase()
          .includes(search.toString().toLowerCase()),
      );
      // setDisasterUserData(data)
      setDisasterUserTempList(data)
    }
    setLoader(false);
  };

  const filterUser = () => {
    console.log("Close FILTER")
    setLoader(true);
    refRBSheet.current.close();
    // var data = newDisasterUserData.filter(
    var data = disasterUserTempList.filter(
      listItem =>
        listItem.state
          .toLowerCase()
          .includes(stateName.toString().toLowerCase()),
    );

    setDisasterUserData(data);
    setDisasterUserTempList(data)
    setLoader(false)
  }

  const resetFilter = async () => {
    setLoader(true)
    setStateName(strings("CrowdSourcingFirst.lbl_select_state")),
      setSearch('')
    // getDisasterUser();
    const refreshOffSet = 0
    const Token = await AsyncStorage.getItem('loginToken');

    console.log(Token, 'user token================');
    const getDisasterUserData = await dispatch(GetDisasterUser(Token, refreshOffSet));
    if (getDisasterUserData.status == 200) {
      setDisasterUserData(getDisasterUserData.data);
      setNewDisasterUserData(getDisasterUserData.data)
      setDisasterUserTempList(getDisasterUserData.data)
      setLoader(false)
    } else {
      setLoader(false)
      Alert.alert(getUserData.msg);
    }
    refRBSheet.current.close();
  }

  const loadDisasterManager = async () => {
    setFlatListLoader(true);

    const offsetLength = disasterUserTempList.length;
    console.log(offsetLength, "lemdt")

    const Token = await AsyncStorage.getItem('loginToken')
    const getDisasterUserData = await dispatch(
      GetDisasterUser(Token, offsetLength),
    );
    if (getDisasterUserData.status == 200) {
      const Addition = offsetLength + getDisasterUserData.data.length
      setDisasterUserData(getDisasterUserData.data)
      disasterUserTempList.push(...getDisasterUserData.data)
      console.log(disasterUserTempList, "_+_+_+_+_")

      // return
      // setNewFeedData(get_notification_Data.data)
      setOffset(Addition);
      console.log(offset, "OFFSET")
      setFlatListLoader(false);
      return
    } else {
      setFlatListLoader(false);
      Alert.alert(getDisasterUserData.msg);
      return
    }
  }
  const renderFooterDisasterManager = () => {
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
            onPress={loadDisasterManager}
            //On Click of button load more data
            style={styles.loadMoreBtn}>
            <CustomText fontSize={15} style={styles.btnText}>{strings("Common.lbl_load_more")}</CustomText>

          </TouchableOpacity>
        )}

      </View>
    );
  };
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
                onPress={() => navigation.navigate('Dashboard')}
                style={{ width: '15%' }}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: "68%" }}>
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
                  {strings("DisasterMNanagerInfo.lbl_disaster_managers_caps")}
                </CustomText>
              </View>
              <TouchableOpacity
                style={styles.bell}
                onPress={() => navigation.navigate("AddDisasterManager", { userInfo: "", flag: "" })}>
                <View>
                  <Image source={require('../../../../assets/Plus.png')} />
                </View>
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
          <View style={styles.searchBar}>
            <View style={{ width: '90%' }}>
              <TextInput
                style={{ fontSize: 15, color: '#000' }}
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
            {/* <TouchableOpacity>
            <View>
              <Image source={require('../../../../assets/Search.png')} />
            </View>
          </TouchableOpacity> */}
          </View>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={{ alignItems: 'center' }}>
              <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/Filter.png')} />
              <CustomText fontSize={9} regular style={styles.filterText}>{strings("CrowdSourcingFile.lbl_filter_caps")}</CustomText>
            </View>
          </TouchableOpacity>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            // closeOnPressMask={false}
            height={290}
            dragFromTopOnly={true}
            customStyles={{
              container: { paddingHorizontal: 20, borderRadius: 20 },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <CustomText fontSize={15} regular style={styles.bottomSheetTitleText}>Filter By:</CustomText>
              </View>
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
                  {strings("CrowdSourcingFile.lbl_state")}
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
              {/* </View> */}

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
                  <Image
                    source={require('../../../../assets/Login_Arrow.png')}
                    style={{ width: 27.5, height: 26.7 }}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.resetFilter}>
                <TouchableOpacity onPress={() => resetFilter()}>
                  <CustomText bold fontSize={18} style={styles.resetFilterText}>{strings("CrowdSourcingFile.lbl_reset_filter")}</CustomText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </RBSheet>
        </View>

        {/* {searchFilterList === [] ||
        searchFilterList === null ||
        searchFilterList === '' ? ( */}
        {/* {searchFilterList.length <= 0 ? ( */}
        {/* {disasterUserData.length > 0 ? (
          <FlatList
            style={{ flex: 1 }}
            data={disasterUserData}
            ListEmptyComponent={
              <View
                style={{
                  marginTop: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText>Result Not Found</CustomText>
              </View>
            }
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            refreshControl={<RefreshControl
              refreshing={loader}
              onRefresh={onRefresh}
            // colors={[Colors.darkorange]}
            />}
          />
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={searchFilterList}
            ListEmptyComponent={
              <View
                style={{
                  marginTop: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText>Result Not Found</CustomText>
              </View>
            }
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            refreshControl={<RefreshControl
              refreshing={loader}
              onRefresh={onRefresh}
            // colors={[Colors.darkorange]}
            />}
          />
        )} */}

        {search !== "" || disasterUserData.length < 10 || stateName !== strings("CrowdSourcingFirst.lbl_select_state") ? (
          <FlatList
            style={{ flex: 1 }}
            data={disasterUserTempList}
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
            refreshControl={<RefreshControl
              refreshing={loader}
              onRefresh={onRefresh}
            // colors={[Colors.darkorange]}
            />}
          />
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={disasterUserTempList}
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
            // onEndReached={loadStateUser}
            // ListFooterComponent={renderFooterDisasterManager}
            keyExtractor={item => item.id}
            extraData={selectedId}
            refreshControl={<RefreshControl
              refreshing={loader}
              onRefresh={onRefresh}
            // colors={[Colors.darkorange]}
            />}
          />
        )}
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

    borderRadius: 10, marginBottom: '4%',
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
  bottomSheetTitleText: {
    // fontSize: 15,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#000',
  },
  resetFilter: {
    alignItems: 'center',
    marginVertical: 20
  },
  resetFilterText: {
    color: "#EB4335",
    // fontFamily: "OpenSans-Bold",
    // fontSize: 18
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

export default DisasterManagers;
