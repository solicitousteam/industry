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
  RefreshControl,
  Alert,
  ActivityIndicator
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CommentListData,
  AddEditCommentData,
  DeleteComment,
  DeleteFeed,
  getFeedInfoData
} from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { strings } from '../../../localization/i18n';
import { set } from 'react-native-reanimated';

const FeedPost = ({ navigation, route }) => {
  const dispatch = useDispatch();
  let [loader, setLoader] = useState(false);
  const refRBSheet = useRef();
  const refRBSheetFeed = useRef();
  const [commentListData, setCommentListData] = useState([]);
  const [comment, setComment] = useState('');
  var [editCommentData, setEditCommentData] = useState('');
  var [commentId, setCommentId] = useState('');
  const [getFeedData, setGetFeedData] = useState("");
  const [screen, setScreen] = useState("")
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
  ];
  const [response, setResponse] = useState('');
  const [header, setHeader] = useState('');
  var [feedId, setFeedId] = useState('');
  const [feed_text, setFeedText] = useState('');
  const [comment_count, setCommentCount] = useState('');
  const [comment_date, setCommentDate] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState("");
  const [userID, setUserID] = useState("");
  const [userImage, setUserImage] = useState("");
  const [fromUser, setFromUser] = useState("")

  useEffect(() => {
    setLoader(true);
    const Data = route.params;
    console.log(Data, "-------=============DATA")
    // return
    setScreen(Data.screen)
    if (Data.screen === "Notification") {
      getFeedInfo();

      getComment();
    } else {
      setUserImage(Data.feedInfo.profile_image)
      setHeader(Data.feedInfo.name);
      setState(Data.feedInfo.state);
      setDistrict(Data.feedInfo.district)
      setResponse(Data.feedInfo);
      setFeedText(Data.feedInfo.feed_text);
      setFeedId(Data.feedInfo.id);
      setFromUser(Data.feedInfo.user_id)
      setUserID(Data.feedInfo.from_user_id)
      setCommentCount(Data.feedInfo.comments);
      setCommentDate(moment(Data.feedInfo.date).calendar());
      getComment();
      setLoader(false)
    }
  }, []);

  const getFeedInfo = async () => {
    console.log("NOTIFICATION")
    // return
    setLoader(true)
    const Data = route.params;
    setScreen(Data.screen)
    console.log(Data, "-------===GET INFo")
    const User_ID = await AsyncStorage.getItem('loginID');
    console.log(User_ID, "--------=-=-=-=-=-=-=-=--=USERID")
    setUserID(User_ID)
    const FeedID = Data.feedInfoid;
    console.log(">>>>>>>>>>>>>>", Data.feedInfoid)
    console.log(">>>>>>>>>>>>>>", FeedID)
    const Token = await AsyncStorage.getItem('loginToken');
    const getFeedDetailsData = await dispatch(getFeedInfoData(Token, FeedID));

    console.log(getFeedDetailsData, 'RESPONSE DATA');
    if (getFeedDetailsData.status == 200) {
      setResponse(getFeedDetailsData.data);
      setGetFeedData(getFeedDetailsData.data);
      setUserImage(getFeedDetailsData.data.profile_image)
      setHeader(getFeedDetailsData.data.name);
      setState(getFeedDetailsData.data.state);
      setDistrict(getFeedDetailsData.data.district)

      setFeedText(getFeedDetailsData.data.feed_text);
      setFeedId(getFeedDetailsData.data.id);
      setFromUser(getFeedDetailsData.data.user_id)
      setCommentDate(moment(getFeedDetailsData.data.date).calendar());

      setLoader(false);
    } else {
      setLoader(false);
      Alert.alert(getFeedDetailsData.msg);
    }
    // }
  }

  const getComment = async () => {
    setLoader(true)
    const Data = route.params;
    setScreen(Data.screen)
    if (Data.screen === "Notification") {
      const FeedID = Data.feedInfoid;
      const Token = await AsyncStorage.getItem('loginToken');
      const getcommentListData = await dispatch(CommentListData(Token, FeedID));

      console.log(getcommentListData, 'RESPONSE DATA');
      if (getcommentListData.status == 200) {
        setCommentListData(getcommentListData.data);
        setLoader(false);
      } else {
        setLoader(false);
        Alert.alert(getcommentListData.msg);
      }
    } else {
      const User_ID = await AsyncStorage.getItem('loginID');
      console.log(User_ID, "--------=-=-=-=-=-=-=-=--=USERID")
      setUserID(User_ID)
      const FeedID = Data.feedInfo.id;
      const Token = await AsyncStorage.getItem('loginToken');
      const getcommentListData = await dispatch(CommentListData(Token, FeedID));

      console.log(getcommentListData, 'RESPONSE DATA');
      if (getcommentListData.status == 200) {
        setCommentListData(getcommentListData.data);
        setLoader(false);
      } else {
        setLoader(false);
        Alert.alert(getcommentListData.msg);
      }
    }
  };

  const addComment = async () => {
    setLoader(true);
    const Data = route.params;
    const FeedID = Data.feedInfo.id;
    // setFeedId(FeedID);
    const Token = await AsyncStorage.getItem('loginToken');

    console.log(">>>", Token, FeedID, comment)
    const commentData = await dispatch(
      AddEditCommentData(Token, FeedID, comment),
    );

    if (commentData.status == 200) {
      // setAddCommentData(commentData.data);
      setComment('');
      getComment();
      setLoader(false);
    } else {
      setLoader(false);
      Alert.alert(commentData.msg);
    }
  };

  const deleteComment = async commentId => {
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    const comment_delete = await dispatch(DeleteComment(Token, commentId));
    console.log(comment_delete, 'RESPONSE DATA');
    if (comment_delete.status == 200) {
      getComment();
      refRBSheet.current.close();
      setComment_Delete(comment_delete.data);
      setLoader(false);
    } else {
      setLoader(false);
      console.log(comment_delete.msg);
    }
  };

  const DeleteFeedWarning = () => {
    Alert.alert(
      'DCRA',
      strings("FeedPost.msg_delete_feed_warning"),
      [
        { text: strings("Common.button_no"), onPress: () => console.log('No button clicked'), style: 'cancel' },
        { text: strings("Common.button_yes"), onPress: () => deleteFeed() },
      ],
      {
        cancelable: false
      }
    );
  }


  const deleteFeed = async () => {

    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    const feed_delete = await dispatch(DeleteFeed(Token, feedId));
    if (feed_delete.status == 200) {
      // refRBSheet.current.close();
      navigation.navigate("FeedTabs")
      setLoader(false);
    } else {
      setLoader(false);
      console.log(feed_delete.msg);
    }
  };

  const editComment = async editCommentData => {
    setLoader(true)
    setFeedId(editCommentData.feed_id);
    setCommentId(editCommentData.id);
    setComment(editCommentData.comment_text);
    refRBSheet.current.close();
    setLoader(false)
  };

  const editCommnetSubmit = async (editCommentData) => {
    setLoader(true)
    setFeedId(editCommentData.feed_id);
    setCommentId(editCommentData.id);
    setComment(editCommentData.comment_text);
    const Token = await AsyncStorage.getItem('loginToken');

    const commentData = await dispatch(
      AddEditCommentData(Token, feedId, comment, commentId),
    );

    if (commentData.status == 200) {
      // setAddCommentData(commentData.data);
      setComment('');
      getComment();
      setLoader(false);
    } else {
      setLoader(false);
      Alert.alert(commentData.msg);
    }
  }


  const renderItem = ({ item }) => {

    return (
      <View>
        <View style={styles.item}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              {/* <Image source={require('../../../../assets/UserBlue.png')} /> */}
              <Image
                source={{ uri: item.profile_image }}
                style={{ width: 25, height: 25 }}
              />
              <View style={{ marginLeft: 13 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text
                  style={
                    (styles.info,
                      [{ fontFamily: 'Metropolis-Regular', fontSize: 10 }])
                  }>
                  {/* 2min ago */}
                  {moment(item.date).format('ll')}
                </Text>
              </View>
            </View>
            {item.user_id == userID ? (
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open(),
                    setCommentId(item.id),
                    setEditCommentData(item);
                }}
                style={{ padding: 3 }}>

                <View >
                  <Image
                    source={require('../../../../assets/MenuIcon_Black.png')}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <View></View>
            )}

            {/* White Icon */}
          </View>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Metropolis-Regular',
                fontWeight: '400',
              }}>
              {/* An influenza pandemic could very well disrupt normal supplies of
                food to your municipality even before the virus crosses municipal
                borders. */}
              {item.comment_text}
            </Text>
          </View>
        </View>
        {/* </TouchableOpacity> */}
      </View>
    );
    // }

  };

  // const publicFeedTab = e => {
  //   console.log(e);
  //   if (myFeed === e) {
  //     setMyFeed(false);
  //     setPublicFeed(true);
  //   }
  // };

  // const myPublicFeedTab = e => {
  //   console.log(e, '=========');
  //   if (publicFeed === e) {
  //     setMyFeed(true);
  //     setPublicFeed(false);
  //   }
  // };

  const onRefresh = () => {
    setLoader(true)
    getComment();
    setLoader(false)
    // setSearch('');
    // searchUser('');
    // const Token = await AsyncStorage.getItem('loginToken');
    // console.log(feedDataType, '===================TYPE');
    // console.log(Token, 'user token================');
    // const getFeedListData = await dispatch(
    //   GetFeedListData(Token, feedDataType),
    // );
    // if (getFeedListData.status == 200) {
    //   console.log(
    //     getFeedListData.data,
    //     'DDDDDDDDDDDDDDDAAAAAAAAAAAAAAAATTTTTTTTTTTTTTT',
    //   );
    //   setFeedData(getFeedListData.data);
    //   setLoader(false);
    // } else {
    //   Alert.alert(getFeedListData.msg);
    // }
    // getFeedList();
  };


  const editFeed = () => {
    navigation.navigate("CreatePost", { FeedData: response })
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
              <TouchableOpacity style={{ width: "20%" }}
                onPress={() => {
                  if (screen) {
                    navigation.navigate('FeedTabs');
                  } else {
                    navigation.goBack()
                  }

                }}
              >
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: "60%", alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                  }}>
                  {/* {getFeedData.name} POST */}
                  {header} {strings("FeedPost.lbl_post_caps")}
                </Text>
              </View>
              {/* {screen ? (
                <View> */}
              {userID == fromUser ? (
                <TouchableOpacity style={styles.bell}
                  onPress={() => {
                    refRBSheetFeed.current.open()
                  }}
                >
                  <View>
                    <Image source={require('../../../../assets/MenuIcon.png')} style={{ paddingVertical: 11 }} />
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={[styles.bell, { width: "20%" }]}></View>
              )}
              {/* </View>
              ) : (
                <View>
                  {userID == feedId ? (
                    <TouchableOpacity style={styles.bell}
                      onPress={() => {
                        refRBSheetFeed.current.open()

                      }}
                    >
                      <View>
                        <Image source={require('../../../../assets/MenuIcon.png')} />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={[styles.bell, {width: "20%"}]}></View>
                  )}
                </View>
              )} */}


            </View>

            {/* </Header> */}
          </View>
        </LinearGradient>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={styles.item}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View>
                  <Image
                    // source={{ uri: getFeedData.profile_image }}
                    source={{ uri: userImage }}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
                <View style={{ marginLeft: 13 }}>
                  {/* <Text style={styles.title}>{getFeedData.name}</Text> */}
                  <Text style={styles.title}>{header}</Text>
                  {state && district === "" ? (
                    // <Text style={styles.info}>{getFeedData.state}</Text>
                    <Text style={styles.info}>{state}</Text>
                  ) : (
                    <View>
                      {district && state === "" ? (
                        <Text style={styles.info}>{district}</Text>
                        // <Text style={styles.info}>{getFeedData.district}</Text>
                      ) : (
                        <View>
                          {state && district ? (
                            // <Text style={styles.info}>{getFeedData.state}, {getFeedData.district}</Text>
                            <Text style={styles.info}>{state}, {district}</Text>
                          ) : (
                            <Text style={styles.info}> - </Text>
                          )}

                        </View>
                      )}

                    </View>
                  )}
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Metropolis-Regular',
                    fontWeight: '400',
                  }}>
                  {/* {getFeedData.feed_text} */}
                  {feed_text}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 1,
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  borderRadius: 20,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image source={require('../../../../assets/FeedChat.png')} />
                <Text
                  style={{
                    fontFamily: 'Metropolis-Regular',
                    fontSize: 11,
                    marginLeft: 5,
                  }}>
                  {strings("FeedPost.lbl_comments")} ({commentListData.length})
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 9,
                    color: '#000',
                  }}>
                  {comment_date}
                </Text>
              </View>
            </View>

            <FlatList
              // style={{marginBottom: '55%'}}
              data={commentListData}
              // data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={commentListData}
              ListEmptyComponent={
                <View
                  style={{
                    marginTop: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>{strings("Common.lbl_result_not_found")}</Text>
                </View>
              }
              refreshControl={
                <RefreshControl
                  refreshing={loader}
                  onRefresh={onRefresh}
                // colors={[Colors.darkorange]}
                />
              }
            />

          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 20, backgroundColor: '#fff' }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 30,
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <View style={{ width: '90%' }}>
              <TextInput
                placeholder={strings("FeedPost.hint_write_your_comment_here")}
                value={comment}
                onChangeText={comment => setComment(comment)}
                style={{ color: '#0D2451', }}
              />
            </View>
            {commentId ? (
              <TouchableOpacity
                style={{ justifyContent: 'center', width: '10%' }}
                onPress={() => editCommnetSubmit(editCommentData)}>
                <View>
                  <Image source={require('../../../../assets/Message.png')} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ justifyContent: 'center', width: '10%' }}
                onPress={() => addComment()}>
                <View>
                  <Image source={require('../../../../assets/Message.png')} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          // closeOnPressMask={false}
          height={150}
          dragFromTopOnly={true}
          customStyles={{
            container: { paddingHorizontal: 20, borderRadius: 20 },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View>
            <TouchableOpacity
              // style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => editComment(editCommentData)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 20,
                  paddingBottom: 20,
                  borderBottomWidth: 1,
                  borderColor: '#c5c5c5',
                }}>
                {/* editCommentData */}
                <View>
                  <Image
                    source={require('../../../../assets/Edit.png')}
                    style={{ marginRight: 10 }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Metropolis-Regular',
                      fontSize: 19,
                      fontWeight: '400',
                      color: '#000',
                    }}>
                    {strings("FeedPost.lbl_edit_post")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => deleteComment(commentId)}>
              {/* <View > */}
              <View>
                <Image
                  source={require('../../../../assets/Delete.png')}
                  style={{ marginRight: 12 }}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: '#F44336',
                    fontFamily: 'Metropolis-Regular',
                    fontSize: 19,
                    fontWeight: '400',
                  }}>
                  {strings("FeedPost.lbl_delete_post")}
                </Text>
              </View>
              {/* </View> */}
            </TouchableOpacity>
          </View>
        </RBSheet>
        <RBSheet
          ref={refRBSheetFeed}
          closeOnDragDown={true}
          // closeOnPressMask={false}
          height={150}
          dragFromTopOnly={true}
          customStyles={{
            container: { paddingHorizontal: 20, borderRadius: 20 },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View>
            <TouchableOpacity
              // style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => editFeed()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 20,
                  paddingBottom: 20,
                  borderBottomWidth: 1,
                  borderColor: '#c5c5c5',
                }}>
                {/* editCommentData */}
                <View>
                  <Image
                    source={require('../../../../assets/Edit.png')}
                    style={{ marginRight: 10 }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Metropolis-Regular',
                      fontSize: 19,
                      fontWeight: '400',
                      color: '#000',
                    }}>
                    {strings("FeedPost.lbl_edit_post")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => DeleteFeedWarning()}>
              {/* <View > */}
              <View>
                <Image
                  source={require('../../../../assets/Delete.png')}
                  style={{ marginRight: 12 }}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: '#F44336',
                    fontFamily: 'Metropolis-Regular',
                    fontSize: 19,
                    fontWeight: '400',
                  }}>
                  {strings("FeedPost.lbl_delete_post")}
                </Text>
              </View>
              {/* </View> */}
            </TouchableOpacity>
          </View>
        </RBSheet>

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
    paddingBottom: 20,
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
    justifyContent: 'space-between',
    padding: 5,
    // marginTop: 10,
    borderRadius: 10,
    // marginBottom: 20,
    // marginVertical: 5,
    marginHorizontal: '3%',
    // flexDirection: 'row',
  },
  title: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#0D2451',
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
    fontSize: 9,
    color: '#3877F1',
    fontFamily: 'OpenSans-Regular',
    fontWeight: '600',
  },
  info: {
    fontSize: 9,
    fontFamily: 'OpenSans-Regular',
    color: '#000',
    marginTop: 3,
  },
  bottomSheetTitleText: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#000',
  },
  resetFilter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resetFilterText: {
    color: '#EB4335',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  TabsFont: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 12,
    color: '#000',
  },
});

export default FeedPost;
