
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
  Alert,
  ActivityIndicator,
  RefreshControl, Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { useIsFocused } from '@react-navigation/native';
import { strings } from '../../../localization/i18n';
import { statelist } from '../../../Util/Common';
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import { postAPI } from '../../../Networking/Request';
import { Searchbar } from 'react-native-paper';
import { CustomText } from '../../../Component/Text';
import { moderateScale } from 'react-native-size-matters';


const FeedTabs = ({ navigation }) => {
  const refRBSheet = useRef();
  let [loader, setLoader] = useState(false);
  // const refRBSheet = useRef();
  const [search, setSearch] = useState('');
  const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
  const [districtName, setdistrictName] = useState(strings("CrowdSourcingFirst.lbl_select_district"));
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [feedDataType, setFeedDataType] = useState('public');
  const [districtList, setDistrictList] = useState([]);
  const [contryState, setContryState] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [isRefreshing, setRefreshing] = useState(false)

  const isFocused = useIsFocused();

  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    setContryState(statelist)
    getFeedList(feedDataType, search, "");

  }, [isFocused])

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  const stateRenderItem = ({ item }) => {
    return <LocationItem item={item} onPress={() => onToggle(item)} />;
  };

  const districtRenderItem = ({ item }) => {
    return <LocationItem item={item} onPress={() => districtonToggle(item)} />;
  };

  const onToggle = item => {
    setStateName(item.title);
    setdistrictName(strings("CrowdSourcingFirst.lbl_select_district"))
    setStateToggle(false);
    setdistrictToggle(false);
    setDistrictList(item.district)

  };

  const districtonToggle = item => {
    setdistrictName(item.title);
    setdistrictToggle(false);
  };

  const LocationItem = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 13 }}>
            <CustomText semibold style={styles.title}>{item.title}</CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const getFeedList = async (feedType, search, value) => {
    setLoader(true)
    const Token = await AsyncStorage.getItem('loginToken')
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'multipart/form-data',
    };
    let formData = new FormData()
    if (value == "reset" || value == "tab") {
      formData.append("limit", 1000)
      formData.append("offset ", 0)
      formData.append("state_filter", "")
      formData.append("district_filter", "")
      formData.append("search", "")
      formData.append("type", feedType)
    } else if (value == "search") {
      formData.append("limit", 1000)
      formData.append("offset ", 0)
      formData.append("state_filter", "")
      formData.append("district_filter", "")
      formData.append("search", search)
      formData.append("type", "public")
    } else {
      formData.append("limit", 1000)
      formData.append("offset ", 0)
      formData.append("state_filter", stateName == strings("CrowdSourcingFirst.lbl_select_state") ? "" : stateName)
      formData.append("district_filter", districtName == strings("CrowdSourcingFirst.lbl_select_district") ? "" : districtName)
      formData.append("search", "")
      formData.append("type", feedType)
    }

    console.log(
      'url====',
      Config.baseUrl + APIConstants.getFeedList,
      headers,
      formData,
    );
    return postAPI(Config.baseUrl + APIConstants.getFeedList, headers, formData)
      .then(function (response) {
        setLoader(false)
        setRefreshing(false)
        console.log('feed_sourceAPI=15=', response);
        if (response.data.length > 0) {
          setFeedData(response.data)
        } else {
          setFeedData([])
        }
      })
      .catch(function (error) {
        setLoader(false)
        const feed_sourceAPI = error?.response?.data
          ? error.response.data
          : error;
        console.log('feed_sourceAPI==', feed_sourceAPI);
        setFeedData([])
        setRefreshing(false)
        return feed_sourceAPI;
      })
      .finally(function () {
        setLoader(false)
        setRefreshing(false)
      });
  };



  const Item = ({ item, onPress }) => {
    let imageData = item.profile_image ? { uri: item?.profile_image } : require('../../../../assets/DefaultUser.png')
    return (

      <View>
        <TouchableOpacity onPress={() =>
          navigation.navigate('FeedPost', {
            feedInfo: item,
          })
        } style={styles.item}>
          <View style={{ flexDirection: 'row', width: "100%", alignItems: "center" }}>
            <View style={{ justifyContent: 'center' }}>
              <Image source={imageData} style={{ width: 30, height: 30 }} />
            </View>
            <View style={{ justifyContent: "center", paddingLeft: 13, flex: 1 }}>
              <CustomText style={styles.title}>{item.name}</CustomText>
              <CustomText style={styles.info}>{item.state}, {item.district}</CustomText>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <CustomText style={{ fontSize: moderateScale(12), color: "#000" }}>{item.feed_text}</CustomText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, }}>
            <View style={{ borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#C4C4C4', flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../../../assets/FeedChat.png')} />
              <CustomText style={{ fontSize: moderateScale(11), marginLeft: 5 }}>{strings("FeedPost.lbl_comment")} ({item.comments})</CustomText>
            </View>
            <View>
              <CustomText style={{ fontSize: moderateScale(9), color: '#000', }}>{moment(item.date).calendar()}</CustomText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate('FeedPost', {
            feedInfo: item,
          })
        }
      />
    );
  };

  function onSearch(text) {
    setSearch(text)
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTyping(false),
      setTypingTimeout(setTimeout(function () {
        if (text != "") {
          getFeedList(feedDataType, text, "search")
        } else {
          Keyboard.dismiss()
          getFeedList(feedDataType, "", "search")
        }
      }, 1000))
  }

  function onPressFilter() {
    refRBSheet.current.open()
  }

  if (!loader) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#3877F1" />
        <LinearGradient
          colors={['#3877F1', '#215ACA']}
          style={styles.linearGradient}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../../../assets/Ellipse_Head.png')} />
            <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
              <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ width: '10%' }}>
                <Image source={require('../../../../assets/Back_Arrow_White.png')} />
              </TouchableOpacity>
              <View style={{ width: "80%" }}>
                <CustomText semibold
                  numberOfLines={1}
                  style={{ color: '#fff', fontSize: moderateScale(16), textAlign: 'center' }}>{strings("FeedPost.lbl_feed")}</CustomText>
              </View>
              <TouchableOpacity
                style={styles.bell}
                onPress={() => navigation.navigate('CreatePost')}>
                <Image source={require('../../../../assets/Plus.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "75%", alignSelf: "center", marginTop: 20, borderRadius: 20, backgroundColor: '#EDEDED', paddingHorizontal: 10, paddingVertical: 8, }}>
          <TouchableOpacity style={{ alignItems: "center", backgroundColor: feedDataType == "public" ? '#fff' : "transparent", paddingHorizontal: 15, borderRadius: 20, justifyContent: 'center', paddingVertical: 3, flex: 1 }} onPress={() => {
            getFeedList('public', search, "tab")
            setFeedDataType('public')
          }}>
            <CustomText style={styles.TabsFont}>{strings("FeedPost.lbl_public_feed")}</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center", backgroundColor: feedDataType == "my" ? '#fff' : "transparent", paddingHorizontal: 15, borderRadius: 20, justifyContent: 'center', paddingVertical: 3, flex: 1 }} onPress={() => {
            getFeedList('my', "", "tab")
            setFeedDataType('my')
          }}>
            <CustomText style={styles.TabsFont}>{strings("FeedPost.lbl_my_feed")}</CustomText>
          </TouchableOpacity>
        </View>
        {feedDataType === "public" ? (
          <View style={{ marginTop: 20, flexDirection: "row", width: "95%", justifyContent: "space-between", alignSelf: "center" }}>
            <Searchbar
              style={{
                width: "85%", elevation: 0, borderWidth: 1.5,
                borderColor: "#DFDFDF", height: 46, borderRadius: 10,

              }}
              placeholder={strings("Common.hint_search")}
              onChangeText={(text) => onSearch(text)}
              value={search}
              returnKeyType="search"
              inputStyle={{ marginLeft: 0, color: "#000000", fontSize: moderateScale(15), fontStyle: "normal", }}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPressFilter()} style={{ width: "15%", justifyContent: "center", alignItems: "center" }}>
              <Image style={{ height: 18, width: 18, resizeMode: "contain" }} source={require("../../../../assets/Filter.png")} />
              <CustomText style={{
                marginTop: moderateScale(2), fontSize: moderateScale(10),
                fontWeight: "800", color: "#000000"
              }}>{strings("CrowdSourcingFile.lbl_filter_caps")}</CustomText>
            </TouchableOpacity>
          </View>
        ) : <View />}

        {feedData.length > 0 ? <FlatList
          data={feedData}
          keyExtractor={item => item.id}
          style={{ width: "100%", marginTop: 10 }}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return <View height={15} />
          }}
          refreshing={isRefreshing}
          onRefresh={() => {
            setRefreshing(true)
            getFeedList(feedDataType, "", "reset")
          }}
          contentContainerStyle={{ paddingBottom: 10 }} />
          : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <CustomText style={{ fontSize: moderateScale(17), color: "#000" }}>{strings("Common.lbl_result_not_found")}</CustomText>
          </View>
        }


        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          // closeOnPressMask={false}
          height={380}
          dragFromTopOnly={true}
          customStyles={{
            container: { paddingHorizontal: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <CustomText bold style={styles.bottomSheetTitleText}>{strings("CrowdSourcingFile.lbl_filter_by")}</CustomText>
            </View>
            <View style={{ marginTop: '5%' }}>
              <CustomText style={{ fontSize: moderateScale(14), color: '#000000' }}>{strings("CrowdSourcingFile.lbl_state")}</CustomText>
            </View>
            <Collapse
              style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
              isExpanded={stateToggle}
              onToggle={isExpanded => setStateToggle(isExpanded)}>
              <CollapseHeader
                style={{
                  borderRadius: 14, borderWidth: 1, borderColor: '#DFDFDF', flexDirection: 'row', justifyContent: 'space-between',
                  paddingVertical: 17, paddingHorizontal: 10, alignItems: 'center',
                }}>
                <View>
                  <CustomText>{stateName}</CustomText>
                </View>
                <Image source={require('../../../../assets/DownArrow.png')} />
              </CollapseHeader>
              <CollapseBody>
                <FlatList
                  style={{ paddingVertical: 10 }}
                  data={contryState}
                  renderItem={stateRenderItem}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={() => {
                    return <View height={20} />
                  }}
                />
              </CollapseBody>
            </Collapse>
            <View style={{ marginTop: '5%' }}>
              <CustomText style={{ fontSize: moderateScale(14), color: '#000000' }}>{strings("CrowdSourcingFile.lbl_district")}</CustomText>
            </View>
            <Collapse style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
              isExpanded={districtToggle}
              onToggle={isExpanded => setdistrictToggle(isExpanded)}>
              <CollapseHeader
                style={{
                  borderRadius: 14, borderWidth: 1, borderColor: '#DFDFDF', flexDirection: 'row', justifyContent: 'space-between',
                  paddingVertical: 17, paddingHorizontal: 10, alignItems: 'center',
                }}>
                <View>
                  <CustomText>{districtName}</CustomText>
                </View>
                <Image source={require('../../../../assets/DownArrow.png')} />
              </CollapseHeader>
              <CollapseBody>
                <FlatList
                  style={{ paddingVertical: 10 }}
                  data={districtList}
                  renderItem={districtRenderItem}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={() => {
                    return <View height={20} />
                  }}
                />
              </CollapseBody>
            </Collapse>


            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close()
                setSearch("")
                getFeedList(feedDataType, "", "")
              }}
              style={{
                marginTop: 20, borderRadius: 48, paddingVertical: 16, backgroundColor: '#3877F1',
                shadowColor: '#3877F1',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1, shadowRadius: 2, elevation: 5, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10,
              }}>
              <View style={{ width: 10 }}></View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 15, }}>
                <CustomText semibold style={{ fontSize: moderateScale(17), color: '#fff', }}>{strings("CrowdSourcingFile.lbl_apply")}</CustomText>
              </View>
              <View>
                <Image source={require('../../../../assets/Login_Arrow.png')} style={{ width: 27.5, height: 26.7 }} />
              </View>
            </TouchableOpacity>
            <View style={styles.resetFilter}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.close()
                  setStateName(strings("CrowdSourcingFirst.lbl_select_state"))
                  setdistrictName(strings("CrowdSourcingFirst.lbl_select_district"))
                  setSearch("")
                  getFeedList(feedDataType, "", "reset")
                }}>
                <CustomText bold style={styles.resetFilterText}>{strings("CrowdSourcingFile.lbl_reset_filter")}</CustomText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </RBSheet>
      </SafeAreaView>
    );
  } else {
    return <ActivityIndicator style={{ justifyContent: 'center', flex: 1, backgroundColor: "transparent" }} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // marginTop: 2,
    borderRadius: 10,
    marginBottom: 20,
    // marginVertical: 5,
    marginHorizontal: 16,
    // flexDirection: 'row',
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
    fontSize: moderateScale(12),
    color: '#0D2451',
    lineHeight: 16
  },
  bell: {
    alignItems: 'flex-end',
    padding: 5,
    width: '10%',
  },
  info: {
    fontSize: moderateScale(9),
    color: '#000',
    marginTop: 3,
  },
  bottomSheetTitleText: {
    fontSize: moderateScale(15),
    color: '#000',
  },
  resetFilter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resetFilterText: {
    color: '#EB4335',
    fontSize: moderateScale(17),
  },
  TabsFont: {
    fontSize: moderateScale(12),
    color: '#000',
  },
});

export default FeedTabs;
