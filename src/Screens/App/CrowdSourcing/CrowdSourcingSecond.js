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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';
import { strings } from '../../../localization/i18n';
import { CustomText } from '../../../Component/Text';
import { moderateScale } from 'react-native-size-matters';


const CrowdSourcingSecond = ({ navigation, route }) => {
  let dropDownAlertRef = useRef();

  const [weather_phenomena_commnet, setweatherComment] = useState("");
  const [flood_reason_comment, setFloodComment] = useState("");
  const [weather_phenomena_List, setWeather_phenomena_List] = useState([]);
  const [weatherList, setWeatherList] = useState([
    // { id: 1, name: strings("CrowdSourcingSecond.lbl_gusty_wind"), isSelect: 0 },
    { id: 1, name: strings("CrowdSourcingSecond.lbl_rain"), isSelect: 0 },
    { id: 2, name: strings("CrowdSourcingSecond.lbl_drizzle"), isSelect: 0 },
    { id: 3, name: strings("CrowdSourcingSecond.lbl_storm_surge"), isSelect: 0 },
  ]);
  const [floodList, setFloodList] = useState([
    { id: 1, name: strings("CrowdSourcingSecond.lbl_rainfall"), isSelect: 0 },
    { id: 2, name: strings("CrowdSourcingSecond.lbl_storm_surge"), isSelect: 0 },
    { id: 3, name: strings("CrowdSourcingSecond.lbl_both"), isSelect: 0 }
  ]);
  const [flood_Reason_List, setFlood_Reason_List] = useState([]);
  const [isEdit, setIsEdit] = useState(route.params.isEdit)
  const [crowdData, setCrowdData] = useState("");


  useEffect(() => {
    if (route.params.isEdit) {
      getData()
    }
  }, []);

  const getData = () => {
    const Data = route.params.crowdData
    console.log("========SECOND======")
    console.log(Data)
    setCrowdData(Data)
    setWeather_phenomena_List(Data.weather_phenomena);
    setFlood_Reason_List(Data.flood_reason);
    setweatherComment(Data.weather_phenomena_commnet);
    setFloodComment(Data.flood_reason_comment);

    //weather
    var matches = false;
    if (Data.weather_phenomena.length > 0) {
      for (let i = 0; i < weatherList.length; i++) {
        matches = false;
        for (let j = 0; j < Data.weather_phenomena.length; j++) {
          if (weatherList[i].id == Data.weather_phenomena[j]) {
            matches = true;
          }
        }
        if (matches) {
          var datum = weatherList[i];
          var newNum = "isSelect";
          var newVal = 1;
          datum[newNum] = newVal;
        };
      }
    }
    // FloodList
    var floodmatches = false;
    if (Data.flood_reason.length > 0) {
      for (let i = 0; i < floodList.length; i++) {
        floodmatches = false;
        for (let j = 0; j < Data.flood_reason.length; j++) {
          if (floodList[i].id == Data.flood_reason[j]) {
            floodmatches = true;
          }
        }
        if (floodmatches) {
          var datum = floodList[i];
          var newNum = "isSelect";
          var newVal = 1;
          datum[newNum] = newVal;
        };
      }
    }
  }

  const submit = () => {

    console.log(weather_phenomena_List, "weather_phenomena_List")
    console.log(flood_Reason_List, "flood_Reason_List")
    console.log(flood_reason_comment, "flood_reason_comment")
    console.log(weather_phenomena_commnet, "weather_phenomena_commnet")
    //Weather List
    let weatherArr = []
    for (let i = 0; i < weatherList.length; i++) {
      if (weatherList[i].isSelect === 1) {
        weatherArr.push(weatherList[i].id)
      }
    }
    setWeather_phenomena_List(weatherArr)
    console.log("weatherArr", weatherArr)

    //Flood List
    let floodArr = []
    for (let i = 0; i < floodList.length; i++) {
      if (floodList[i].isSelect === 1) {
        floodArr.push(floodList[i].id)
      }
    }
    setFlood_Reason_List(floodArr)
    console.log("floodArr", floodArr)


    if (weatherArr.length === 0) {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingSecond.msg_select_weather_phenomena"));
      return;
    }
   
    if (floodArr.length === 0) {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingSecond.msg_select_flood_type"));
      return;
    }

    navigation.navigate('CrowdSourcingThird', {
      weather_phenomena_List: weatherArr, flood_Reason_List: floodArr, weather_phenomena_commnet, flood_reason_comment,
      crowdData, cyclone_name: route.params.cyclone_name, stateName: route.params.stateName, districtName: route.params.districtName, DOB: route.params.DOB, time: route.params.time, isEdit

    })
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3877F1" />
      <LinearGradient
        colors={['#3877F1', '#215ACA']}
        style={styles.linearGradient}>
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
          <Image source={require('../../../../assets/Ellipse_Head.png')} />

          <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.pop()} style={{ width: '20%' }}>
                <Image source={require('../../../../assets/Back_Arrow_White.png')} />
              </TouchableOpacity>
              <CustomText semibold style={{ color: '#fff', fontSize: moderateScale(16), }}>{strings("ThankYouCrowdSourcing.lbl_crowd_sourcing_form")}</CustomText>
            </View>

            <View style={{ width: '20%', alignItems: 'flex-end' }}>
              <CustomText semibold style={{ fontSize: moderateScale(16), color: '#fff', }}>2/4</CustomText>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ marginTop: 20 }}>
            <CustomText style={{ fontSize: moderateScale(17), color: '#000000', }}>{strings("CrowdSourcingSecond.lbl_weather_phenomena")}</CustomText>
          </View>

          <FlatList
            data={weatherList}
            renderItem={({ item, index }) => {
              return <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <CheckBox
                  value={item.isSelect == 0 ? false : true}
                  onValueChange={newValue => {
                    let arr = [...weatherList]
                    if (newValue) {
                      arr[index] = { ...arr[index], isSelect: 1 };
                    } else {
                      arr[index] = { ...arr[index], isSelect: 0 };
                    }
                    setWeatherList(arr)
                  }}
                  tintColors
                />
                <CustomText semibold style={{ color: item.isSelect == 0 ? "#000" : '#3877F1', fontSize: moderateScale(13), marginLeft: 5 }}>{item.name}</CustomText>
              </View>
            }}
            keyExtractor={item => item.id}
          />
          <View style={{ marginTop: 20, borderWidth: 1, borderRadius: 20, borderColor: '#E5E5E5', paddingHorizontal: 10, }}>
            <TextInput
              placeholder={strings("Common.hint_write_comment")}
              multiline
              value={weather_phenomena_commnet}
              onChangeText={weather_phenomena_commnet => {
                setweatherComment(weather_phenomena_commnet)
              }}
              style={{ color: '#0D2451', }}
            />
          </View>

          <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
            <CustomText style={{ lineHeight: 24, fontSize: moderateScale(15), color: "#000", }}>{strings("CrowdSourcingSecond.lbl_flooding_at_your_location")}</CustomText>
          </View>

          <FlatList
            data={floodList}
            renderItem={({ item, index }) => {
              return <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <CheckBox
                  value={item.isSelect == 0 ? false : true}
                  onValueChange={newValue => {
                    let arr = [...floodList]
                    if (newValue) {
                      arr[index] = { ...arr[index], isSelect: 1 };
                    } else {
                      arr[index] = { ...arr[index], isSelect: 0 };
                    }
                    setFloodList(arr)
                  }}
                  tintColors
                />
                <CustomText semibold style={{ color: item.isSelect == 0 ? "#000" : '#3877F1', fontSize: moderateScale(13), marginLeft: 5 }}>{item.name}</CustomText>
              </View>
            }}
            keyExtractor={item => item.id}
          />

          <View style={{ marginTop: 20, borderWidth: 1, paddingBottom: 20, borderRadius: 20, borderColor: '#E5E5E5', paddingHorizontal: 10, }}>
            <TextInput
              placeholder={strings("Common.hint_write_comment")}
              multiline
              value={flood_reason_comment}
              onChangeText={flood_reason_comment => {
                setFloodComment(flood_reason_comment)
              }}
              style={{ color: '#0D2451', }}
            />
          </View>

          <TouchableOpacity
            onPress={() => submit()}
            style={{
              marginVertical: 20, borderRadius: 48, paddingVertical: 16, backgroundColor: '#3877F1', shadowColor: '#3877F1',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1, shadowRadius: 2, elevation: 9, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10,
            }}>
            <View style={{ width: 10 }}></View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 15, }}>
              <CustomText semibold style={{ fontSize: moderateScale(18), color: '#fff', }}>{strings("Common.button_continue")}</CustomText>
            </View>
            <View>
              <Image source={require('../../../../assets/Login_Arrow.png')} style={{ width: 27.5, height: 26.7 }} />
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
});
export default CrowdSourcingSecond;
