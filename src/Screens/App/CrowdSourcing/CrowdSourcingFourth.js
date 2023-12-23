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
  ActivityIndicator, PermissionsAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_crowd_sourcing } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import Video from 'react-native-video';
import ImagePicker from "react-native-image-crop-picker";
import { createThumbnail } from "react-native-create-thumbnail";
import ActionSheet from 'react-native-action-sheet';
import lan from '../../../Networking/Language'
import { headerpost, postAPI } from '../../../Networking/Request';
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import { strings } from "../../../localization/i18n"
import { CustomText } from '../../../Component/Text';
import { moderateScale } from 'react-native-size-matters';

var VIDEO_BUTTONS_PROFILE = [
  strings("Common.lbl_select_video_from_gallery"),
  strings("Common.lbl_record_video_camera"),
];
var VIDEO_GALLERY_INDEX = 1;
var VIDEO_CANCEL_INDEX = 2;
var IMAGE_BUTTONS_PROFILE = [
  strings("Common.lbl_select_image_from_gallery"),
  strings("Common.lbl_take_image_camera"),
];
var IMAGE_GALLERY_INDEX = 1;
var IMAGE_CANCEL_INDEX = 2;

const CrowdSourcingFourth = ({ navigation, route }) => {
  const dispatch = useDispatch();
  let dropDownAlertRef = useRef();
  const videoPlayer = useRef(null);

  const [questions_to_manager, setquestions_to_manager] = useState('');
  const [additional_damage_details, setadditional_damage_details] =
    useState('');
  const [isEdit, setIsEdit] = useState(route.params.isEdit)
  const [crowdData, setCrowdData] = useState("");
  const [imageSource, setImageSource] = useState([]);
  const [loader, setLoader] = useState(false);
  const [damge_video, setVideo] = useState("");
  const [damge_thumbnail, setThumbnail] = useState("");
  
  var playerRef = useRef()

  useEffect(() => {
    if (route.params.isEdit)
      getData();
  }, []);

  

  const getData = () => {
    const Data = route.params.crowdData;
    console.log(route.params);

    setCrowdData(Data)
    setadditional_damage_details(Data.additional_damage_details)
    setquestions_to_manager(Data.questions_to_manager)
    let imageArr = []
    if (Data.damge_images.length > 0) {
      for (let i = 0; i < Data.damge_images.length; i++) {
        imageArr.push({
          uri: Data.damge_images[i],
          name: Data.damge_images.includes("png") ? `image${i}.png` : `image${i}.jpg`,
          type: Data.damge_images.includes("png") ? 'image/png' : 'image/jpeg'
        })
      }
    }
    setImageSource(imageArr)
    if (Data.damge_video != "") {
      setVideo({
        uri: Data.damge_video, type: "video/mp4",
        name: "video.mp4"
      })
    }
  };








  const deleteImage = e => {

    const deletedImage = imageSource.filter((item, index) => index !== e);
    setImageSource(deletedImage);
    console.log('imageSource', imageSource);
  };


  const selectOpenPickerVideo = () => {
    ImagePicker.openPicker({ mediaType: "video" })
      .then(setVideoToUpload => {
        console.log(setVideoToUpload, "========")

        if (setVideoToUpload.duration < 30500) {
          setVideo({
            uri: setVideoToUpload.path, type: setVideoToUpload.mime,
            name: "video.mp4"
          })
          createThumbnail({
            url: setVideoToUpload.path,
            timeStamp: 10000,
          })
            .then(response => {
              setThumbnail(response.path)
              console.log(response.path)
            })
            .catch(err => console.log({ err }));
        } else {

        }
      })
      .catch(console.error);
  };


  const selectOpenCameraVideo = () => {
    ImagePicker.openCamera({ mediaType: "video" })
      .then(setVideoToUpload => {
        console.log(setVideoToUpload, "========")

        if (setVideoToUpload.duration < 30500) {
          setVideo({
            uri: setVideoToUpload.path, type: setVideoToUpload.mime,
            name: "video.mp4"
          })
          createThumbnail({
            url: setVideoToUpload.path,
            timeStamp: 10000,
          })
            .then(response => {
              setThumbnail(response.path)
              console.log(response.path)
            })
            .catch(err => console.log({ err }));
        } else {
          dropDownAlertRef.alertWithType(
            'error',
            'DCRA',
            strings("Common.msg_upload_video_less_seconds"),
          );
        }
      })
      .catch(console.error);
  };

  const openVideoPicker = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        // title: 'Image Picker',
        title: strings("Common.lbl_select_option"),
        options: VIDEO_BUTTONS_PROFILE,
        chat: VIDEO_GALLERY_INDEX,
        cancelButtonIndex: VIDEO_CANCEL_INDEX,
        tintColor: '#1E50CE',
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          selectOpenPickerVideo();
        } else if (buttonIndex == 1) {
          selectOpenCameraVideo();

        }
      },
    );
  };



  const renderItem = ({ item, index }) => {
    console.log("item", item);
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';
    return (
      <View>
        <TouchableOpacity style={styles.item}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-end' }}>
              <Image
                source={{ uri: item.uri }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />
              <TouchableOpacity style={{ position: 'absolute', flexDirection: 'row', borderRadius: 20, backgroundColor: '#fff', padding: 5, margin: 2, }}
                onPress={() => deleteImage(index)}
              >
                <View>
                  <Image
                    source={require('../../../../assets/Delete.png')}
                    style={{ width: 10, height: 11 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  const submitForm = async () => {
    const Token = await AsyncStorage.getItem('loginToken');

    if (additional_damage_details == '') {
      dropDownAlertRef.alertWithType(
        'error',
        'DCRA',
        strings("CrowdSourcingFourth.msg_empty_additional_damage_desc"),
      );
      return;
    }
    if (questions_to_manager == '') {
      dropDownAlertRef.alertWithType(
        'error',
        'DCRA',
        strings("CrowdSourcingFourth.msg_empty_questions_disaster_manager"),
      );
      return;
    }
    submit()

  };

  const submit = async () => {
    setLoader(true)
    const Token = await AsyncStorage.getItem('loginToken');
    let cyclone_name = route.params.cyclone_name
    let DOE = route.params.DOE
    let time = route.params.time
    let weather_phenomena_List = route.params.weather_phenomena_List
    let weather_Phenomena_commnet = route.params.weather_phenomena_commnet
    let flood_Reason_List = route.params.flood_Reason_List
    let flood_Reason_comment = route.params.flood_reason_comment
    let damageCause_List = route.params.damageCause_List
    let damageCauseComment = route.params.damageCauseComment
    let latitude = route.params.loclatitude;
    let longitude = route.params.loclongitude;
    let id = route.params.isEdit ? crowdData.id : ""

    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'multipart/form-data',
    };
    let formData = new FormData()
    formData.append("cyclone_name", cyclone_name)
    formData.append("Date", DOE)
    formData.append("event_time", time)
    weather_phenomena_List.forEach((item, i) => {
      const newFile = item
      formData.append(`weather_phenomena[${i}]`, newFile);
    });
    if (weather_Phenomena_commnet.trim()) {
      formData.append("weather_phenomena_commnet", weather_Phenomena_commnet.trim());
    }
    flood_Reason_List.forEach((item, i) => {
      const newFile = item
      formData.append(`flood_reason[${i}]`, newFile);
    });
    if (flood_Reason_comment.trim()) {
      formData.append("flood_reason_comment", flood_Reason_comment.trim());
    }
    formData.append("additional_damage_details", additional_damage_details)
    formData.append("questions_to_manager", questions_to_manager)
    formData.append("damge_video", damge_video)
    damageCause_List.forEach((item, i) => {
      const newFile = item
      formData.append(`damage_cause[${i}]`, newFile);
    });
    if (damageCauseComment.trim()) {
      formData.append("damage_cause_comment", damageCauseComment.trim());
    }
    formData.append('lat', latitude);
    formData.append('long', longitude);
    formData.append("id", id)
    imageSource.forEach((item, i) => {
      const newFile = {
        uri: item.uri, type: item.type, name: item.name
      }
      formData.append("damge_images[]", newFile);
    });

    console.log(
      'url====',
      Config.baseUrl + APIConstants.create_crowd_sourcing,
      headers,
      formData,
    );
    headerpost(headers, Config.baseUrl + APIConstants.create_crowd_sourcing, formData, 'POST', "formData")
      .then((result) => {
        setLoader(false)
        if (result.status == 200) {

          setLoader(false);
          navigation.navigate('ThankYouCrowdSourcing')

        } else {
          setLoader(false);
          dropDownAlertRef.alertWithType('error', 'DCRA', result.message);
        }
      })
      .catch((error) => {
        setLoader(false)
        console.log("error123", error)
        dropDownAlertRef.alertWithType('error', 'DCRA', error.message);
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
            <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.pop()} style={{ width: '20%' }}>
                  <Image source={require('../../../../assets/Back_Arrow_White.png')} />
                </TouchableOpacity>
                <CustomText semibold style={{ color: '#fff', fontSize: moderateScale(16), }}>{strings("CrowdSourcingFile.lbl_crowd_sourcing_form")}</CustomText>
              </View>

              <View style={{ width: '20%', alignItems: 'flex-end' }}>
                <CustomText semibold style={{ color: '#fff', fontSize: moderateScale(16), }}>3/3</CustomText>
              </View>
            </View>
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginHorizontal: 10 }}>
          <View style={{ marginHorizontal: 10 }}>
            <View style={{ marginTop: 20 }}>
              <CustomText style={{ fontSize: moderateScale(14), color: '#000' }}>{strings("CrowdSourcingFourth.msg_additiona_damage_desc_pls_type")}</CustomText>
            </View>

            <View style={{ marginTop: 20, borderWidth: 1, paddingBottom: 20, borderRadius: 20, borderColor: '#E5E5E5', paddingHorizontal: 10, }}>
              <TextInput
                placeholder={strings("Common.hint_write_comment")}
                multiline
                value={additional_damage_details}
                onChangeText={additional_damage_details =>
                  setadditional_damage_details(additional_damage_details)
                }
                style={{ color: '#0D2451', }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={{ fontSize: moderateScale(14), color: '#000', }}>{strings("CrowdSourcingFourth.lbl_ques_to_disaster_managers")}</CustomText>
            </View>

            <View style={{ marginTop: 20, borderWidth: 1, paddingBottom: 20, borderRadius: 20, borderColor: '#E5E5E5', paddingHorizontal: 10, }}>
              <TextInput
                placeholder={
                  strings("CrowdSourcingFourth.hint_what_additional_questions")
                }
                multiline
                value={questions_to_manager}
                onChangeText={questions_to_manager =>
                  setquestions_to_manager(questions_to_manager)
                }
                style={{ color: '#0D2451', }}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>

              <View>
                <FlatList
                  style={{ marginRight: '20%' }}
                  horizontal={true}
                  data={imageSource}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                //   extraData={selectedId}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={{ fontSize: moderateScale(14), color: '#000', }}>{strings("Common.lbl_upload_video_max_one")}</CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
              <View style={{ marginRight: 5 }}>
                <TouchableOpacity onPress={() => openVideoPicker()}>
                  <View style={{ borderRadius: 20, padding: 20, backgroundColor: 'rgba(56, 119, 241, 0.12)' }}>
                    <Image source={require('../../../../assets/Video.png')} />
                  </View>
                </TouchableOpacity>
              </View>
              {damge_video ? (
                <View>
                  <TouchableOpacity style={styles.item}>
                    <View style={{ alignSelf: 'flex-end', padding: 5, borderRadius: 10 }}>
                      <TouchableOpacity onPress={() => { setVideo('') }}
                        style={{ position: 'absolute', zIndex: 1, borderRadius: 20, backgroundColor: '#fff', padding: 5, top: 10, left: 12 }}>
                        <View>
                          <Image
                            source={require('../../../../assets/Delete.png')}
                            style={{ width: 10, height: 11 }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'flex-end', borderRadius: 20 }}>
                      <TouchableOpacity style={{ borderRadius: 20, marginLeft: 20, }}  >
                        <View>
                          <Video source={{ uri: damge_video.uri }}   // Can be a URL or a local file.
                            ref={playerRef}
                            paused={true}
                            muted={true}
                            controls={false}
                            resizeMode={"cover"}
                            style={{ height: 60, width: 100 }}
                            onLoad={(data) => {
                              playerRef.current.seek(1)
                              console.log("dataaaa", data)
                            }} />
                        </View>
                      </TouchableOpacity>
                    </View>

                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}

            </View>
            <TouchableOpacity
              onPress={() => submitForm()}
              style={{
                marginTop: 50, borderRadius: 48, paddingVertical: 16, backgroundColor: '#3877F1', shadowColor: '#3877F1',
                shadowOffset: {
                  width: 0,
                  height: 2,
                }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 9, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10,
              }}>
              <View style={{ width: 10 }}></View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 15, }}>
                <CustomText semibold style={{ fontSize: moderateScale(18), color: '#fff', }}>{strings("Common.button_submit")}</CustomText>
              </View>
              <Image source={require('../../../../assets/Login_Arrow.png')} style={{ width: 27.5, height: 26.7 }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <DropdownAlert ref={ref => {
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
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 2,
    borderRadius: 40,
  },
});
export default CrowdSourcingFourth;
