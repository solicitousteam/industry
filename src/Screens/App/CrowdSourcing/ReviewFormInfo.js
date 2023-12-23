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
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_crowd_sourcing } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { asin, set } from 'react-native-reanimated';
import { postAPI } from '../../../Networking/Request';
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import { strings } from '../../../localization/i18n';
import { damageList, rainFallList, weatherList } from '../../../Util/Common';
import { CustomText } from '../../../Component/Text';
import { moderateScale } from 'react-native-size-matters';

const ReviewFormInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const videoPlayer = useRef(null);


  const [damageCause_List, set_DamageCause_List] = useState([]);
  const [weather_phenomena_List, setWeather_phenomena_List] = useState([]);
  const [flood_Reason_List, setflood_Reason_List] = useState([]);
  const [loader, setLoader] = useState(false);
  const [damge_video, setVideo] = useState("");
  const [crowdData, setCrowdData] = useState("")

  useEffect(() => {
    getData();
  }, []);


  const getData = () => {
    const Data = route.params;
    setLoader(true)
    getCrowdDetails(Data.id)

  }

  async function getCrowdDetails(id) {
    const token = await AsyncStorage.getItem('loginToken')
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    };
    let formData = new FormData()
    formData.append("id", id)

    console.log(
      'url====',
      Config.baseUrl + APIConstants.crowd_source_details,
      headers,
      formData,
    );
    return postAPI(Config.baseUrl + APIConstants.crowd_source_details, headers, formData)
      .then(function (response) {
        setLoader(false)

        console.log('crowd_sourceAPI=15=', response);
        setCrowdData(response.data)

        //weather
        let weatherArr = []
        if (response.data.weather_phenomena.length > 0) {
          for (let i = 0;i < weatherList.length;i++) {

            for (let j = 0;j < response.data.weather_phenomena.length;j++) {
              if (weatherList[i].id == response.data.weather_phenomena[j]) {
                weatherArr.push(weatherList[i].name)
              }
            }

          }
        }
        //Flood
        let floodArr = []
        if (response.data.flood_reason.length > 0) {
          for (let i = 0;i < rainFallList.length;i++) {

            for (let j = 0;j < response.data.flood_reason.length;j++) {
              if (rainFallList[i].id == response.data.flood_reason[j]) {
                floodArr.push(rainFallList[i].name)
              }
            }

          }
        }
        // Damage
        let damageArr = []
        if (response.data.damage_cause.length > 0) {
          for (let i = 0;i < damageList.length;i++) {

            for (let j = 0;j < response.data.damage_cause.length;j++) {
              if (damageList[i].id == response.data.damage_cause[j]) {
                damageArr.push(damageList[i].name)
              }
            }

          }
        }
        setWeather_phenomena_List(weatherArr)
        setflood_Reason_List(floodArr)
        set_DamageCause_List(damageArr)
      })
      .catch(function (error) {
        setLoader(false)
        const crowd_sourceAPI = error?.response?.data
          ? error.response.data
          : error;
        console.log('crowd_sourceAPI==', crowd_sourceAPI);
        return crowd_sourceAPI;
      })
      .finally(function () {
        setLoader(false)
      });


  }

  const Item = ({ item, onPress }) => (

    <View>
      <TouchableOpacity onPress={onPress} style={styles.item}>

        <Image source={{ uri: item }} style={{ width: 80, height: 80, borderRadius: 12 }} />

      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };



  const submit = async () => {
    setLoader(true)
    const Token = await AsyncStorage.getItem('loginToken');
    let new_weather_phenomena_List = []
    //name append in new array and pass that array in api
    // .at.....
    const croudsourcingData = await dispatch(
      create_crowd_sourcing(
        Token,
        // croudSourcingID,
        cyclone_name,
        stateName,
        districtName,
        DOB,
        time,
        weather_phenomena_List,
        weather_phenomena_commnet,
        flood_Reason_List,
        flood_reason_comment,
        additional_damage_details,
        questions_to_manager,
        imageSource,
        damge_video,
        damageCause_List,
        damageCauseComment,
      ),
    );
    if (croudsourcingData.status == 200) {

      setLoader(false);
      navigation.navigate('ThankYouCrowdSourcing')
    } else {
      setLoader(false);
      dropDownAlertRef.alertWithType('error', 'DCRA', croudsourcingData.message);
    }
  }


  const edit = () => {
    setLoader(true)
    navigation.navigate('CrowdSourcingFirst', {
      screen: "edit",
      cyclone_name: cyclone_name,
      stateName: stateName,
      districtName: districtName,
      DOB: DOB,
      time: time,
      weather_phenomena_List: weather_phenomena_List,
      weather_phenomena_commnet: weather_phenomena_commnet,
      flood_Reason_List: flood_Reason_List,
      flood_reason_comment: flood_reason_comment,
      additional_damage_details: additional_damage_details,
      questions_to_manager: questions_to_manager,
      imageSource: imageSource,
      damge_video: damge_video,
      damageCause_List: damageCause_List,
      damageCauseComment: damageCauseComment
    }
    )
    setLoader(false)
  }

  if (!loader) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#3877F1" />
        <LinearGradient
          colors={['#3877F1', '#215ACA']}
          style={styles.linearGradient}>
          <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <Image source={require('../../../../assets/Ellipse_Head.png')} />
            <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
              <TouchableOpacity onPress={() => navigation.pop()} style={{ width: '20%' }}>
                <View>
                  <Image source={require('../../../../assets/Back_Arrow_White.png')} />
                </View>
              </TouchableOpacity>
              <View>
                <CustomText semibold style={{ color: '#fff', fontSize: moderateScale(16), }}>{strings("ReviewFormInfo.lbl_review_form")} </CustomText>
              </View>
              {route.params.isEdit ? <View style={(styles.bell, [{ flexDirection: 'row', width: '20%', justifyContent: 'flex-end' }])}>
                <TouchableOpacity onPress={() => edit()}>
                  <View>
                    <Image source={require('../../../../assets/Edit-White.png')} />
                  </View>
                </TouchableOpacity>
              </View> : <View style={(styles.bell, [{ flexDirection: 'row', width: '20%', justifyContent: 'flex-end' }])} />}
            </View>
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ padding: 20 }}>
            <View>
              <CustomText style={styles.textTitle}>{strings("CrowdSourcingFile.lbl_cyclone_name")}</CustomText>
              <CustomText semibold style={styles.text}>{crowdData ? crowdData.cyclone_name : ""}</CustomText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, paddingVertical: 10 }}>
                <View>
                  <CustomText style={styles.textTitle}>{strings("CrowdSourcingFile.lbl_state")}</CustomText>
                  <CustomText semibold style={styles.text}>{crowdData ? crowdData.state : ""}</CustomText>
                </View>
                <View style={{ marginTop: 20 }}>
                  <CustomText style={styles.textTitle}>{strings("CrowdSourcingFile.lbl_date")}</CustomText>
                  <CustomText semibold style={styles.text}>{crowdData ? crowdData.date : ""}</CustomText>
                </View>
              </View>
              <View
                style={{
                  height: '100%',
                  width: 1,
                  backgroundColor: '#000',
                  marginRight: '10%'
                }}
              />
              <View style={{ flex: 1, paddingVertical: 10 }}>
                <View>
                  <CustomText style={styles.textTitle}>{strings("CrowdSourcingFile.lbl_district")}</CustomText>
                  <CustomText semibold style={styles.text}>{crowdData ? crowdData.district : ""}</CustomText>
                </View>
                <View style={{ marginTop: 20 }}>
                  <CustomText style={styles.textTitle}>{strings("ReviewFormInfo.lbl_time_of_weather_event")}</CustomText>
                  <CustomText semibold style={styles.text}>{crowdData ? crowdData.event_time : ""}</CustomText>
                </View>

              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={16} semibold style={[{ color: 'rgba(56, 119, 241, 1)' }]}>{strings("ReviewFormInfo.lbl_weather_phenomena")}</CustomText>
            </View>
            <View style={{ marginTop: 10 }}>
              <CustomText fontSize={14} style={[{ color: '#000', lineHeight: 24 }]}>{weather_phenomena_List.join(", \n")}</CustomText>
              <CustomText style={{ color: '#000', fontSize: moderateScale(14), lineHeight: 24 }}>{crowdData ? crowdData.weather_phenomena_commnet : ""}</CustomText>
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={16} semibold style={[{ color: 'rgba(56, 119, 241, 1)' }]}>{strings("ReviewFormInfo.lbl_flooding_at_your_location_due_to")}{' '}</CustomText>
            </View>
            <View style={{ marginTop: 10 }}>
              <CustomText style={(styles.textTitle, [{ color: '#000', fontSize: moderateScale(14), lineHeight: 24 }])}>{flood_Reason_List.join(", \n")}</CustomText>
              <CustomText style={{ color: '#000', fontSize: moderateScale(14), lineHeight: 24 }}>
                {crowdData ? crowdData.flood_reason_comment : ""}
              </CustomText>
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={16} semibold style={[{ color: 'rgba(56, 119, 241, 1)' }]}>{strings("CrowdSourcingThird.lbl_damage_caused")}</CustomText>
            </View>
            <View style={{ marginTop: 10 }}>
              <CustomText style={([{ color: '#000', fontSize: moderateScale(14), lineHeight: 24 }])}>
                {damageCause_List.join(", \n")}
              </CustomText>
              <CustomText style={{ color: '#000', fontSize: moderateScale(14), lineHeight: 22 }}>{crowdData ? crowdData.damage_cause_comment : ""}</CustomText>
            </View>

            <FlatList
              style={{ marginVertical: 20 }}
              horizontal={true}
              data={crowdData.damge_images}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            {crowdData && crowdData.damge_video != "" ? <View style={{ paddingLeft: 5, height: 80, width: 80, }}>

              <Video
                source={{
                  uri: crowdData.damge_video,
                }}
                resizeMode='stretch'
                style={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0, height: 80, width: 80, borderRadius: 12,
                }}
                paused={true}
                muted={true}
                ref={videoPlayer}
                onLoad={(data) => {
                  videoPlayer.current.seek(1)
                }}
              />
              <View style={{ paddingLeft: 5, height: 80, width: 80, position: "absolute", justifyContent: "center", alignItems: "center" }}>
                <Image style={{ height: 24, width: 24 }} source={require("../../../../assets/Play.png")} />
              </View>
            </View> : <View />}

            {route.params.isEdit ? <TouchableOpacity
              // onPress={() => navigation.navigate('ThankYouCrowdSourcing')}
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
                <CustomText semibold style={{ fontSize: moderateScale(18), color: '#fff', }}>{strings("Common.button_submit")}</CustomText>
              </View>
              <View>
                <Image
                  source={require('../../../../assets/Login_Arrow.png')}
                  style={{ width: 27.5, height: 26.7 }}
                />
              </View>
            </TouchableOpacity> : <View />}
          </View>
        </ScrollView>
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
  bell: {
    alignItems: 'flex-end',
    padding: 5,
    width: '20%',
  },
  text: {
    color: '#000',
    fontSize: moderateScale(16),
  },
  textTitle: {
    fontSize: moderateScale(14),
    lineHeight: 22,
    color: "#000"
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 2,
    borderRadius: 40,
  },
});

export default ReviewFormInfo;
