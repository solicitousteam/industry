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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { strings } from '../../../localization/i18n';
import DropdownAlert from 'react-native-dropdownalert';
import { CustomText } from '../../../Component/Text';
import { moderateScale } from 'react-native-size-matters';


const CrowdSourcingThird = ({ navigation, route }) => {
  let dropDownAlertRef = useRef();

  const [damageCause_List, set_DamageCause_List] = useState([]);
  const [damageList, setDamageList] = useState([
    { id: 1, name: strings("CrowdSourcingThird.lbl_tree_branches_breaking"), isSelect: 0 },
    { id: 2, name: strings("CrowdSourcingThird.lbl_small_tree_uprooting"), isSelect: 0 },
    { id: 3, name: strings("CrowdSourcingThird.lbl_big_tree_uprooting"), isSelect: 0 },
    { id: 4, name: strings("CrowdSourcingThird.lbl_electric_pole_bending"), isSelect: 0 },
    { id: 5, name: strings("CrowdSourcingThird.lbl_electric_pole_uprooting"), isSelect: 0 },
    { id: 6, name: strings("CrowdSourcingThird.lbl_electric_pole_iron_bending"), isSelect: 0 },
    { id: 7, name: strings("CrowdSourcingThird.lbl_electric_pole_iron_uprooting"), isSelect: 0 },
    { id: 8, name: strings("CrowdSourcingThird.lbl_electric_tower_bending"), isSelect: 0 },
    { id: 9, name: strings("CrowdSourcingThird.lbl_electric_tower_damanged_other_tower"), isSelect: 0 },
    { id: 10, name: strings("CrowdSourcingThird.lbl_telephone_damaged_bending"), isSelect: 0 },
    { id: 11, name: strings("CrowdSourcingThird.lbl_telephone_damaged_uprooting"), isSelect: 0 },
    { id: 12, name: strings("CrowdSourcingThird.lbl_telecommunication_damaged_bending"), isSelect: 0 },
    { id: 13, name: strings("CrowdSourcingThird.lbl_telecommunication_damaged_uprooting"), isSelect: 0 },
    { id: 14, name: strings("CrowdSourcingThird.lbl_damage_to_huts"), isSelect: 0 },
    { id: 15, name: strings("CrowdSourcingThird.lbl_damage_to_kutcha_strcuture"), isSelect: 0 },
    { id: 16, name: strings("CrowdSourcingThird.lbl_damage_to_semi_pukka"), isSelect: 0 },
    { id: 17, name: strings("CrowdSourcingThird.lbl_damage_to_pakka"), isSelect: 0 },
    { id: 18, name: strings("CrowdSourcingThird.lbl_flooding_of_land"), isSelect: 0 },
    { id: 19, name: strings("CrowdSourcingThird.lbl_damage_to_livestock"), isSelect: 0 },
    { id: 20, name: strings("CrowdSourcingThird.lbl_damage_to_humans"), isSelect: 0 },
    { id: 21, name: strings("CrowdSourcingThird.lbl_damage_to_vegetation"), isSelect: 0 },
  ]);
  const [damageCauseComment, setdamageCauseComment] = useState("");
  const [isEdit, setIsEdit] = useState(route.params.isEdit)
  const [crowdData, setCrowdData] = useState("");

  // line 991->


  useEffect(() => {
    if (route.params.isEdit)
      getData();
  }, []);

  const getData = () => {
    const Data = route.params.crowdData;
    console.log("==========THIRD====")
    console.log(Data)

    setCrowdData(Data)
    set_DamageCause_List(Data.damage_cause);
    setdamageCauseComment(Data.damage_cause_comment);

    //Damage
    var matches = false;
    if (Data.damage_cause.length > 0) {
      for (let i = 0; i < damageList.length; i++) {
        matches = false;
        for (let j = 0; j < Data.damage_cause.length; j++) {
          if (damageList[i].id == Data.damage_cause[j]) {
            matches = true;
          }
        }
        if (matches) {
          var datum = damageList[i];
          var newNum = "isSelect";
          var newVal = 1;
          datum[newNum] = newVal;
        };
      }
    }
  }

  const submit = () => {
    let damageArr = []
    for (let i = 0; i < damageList.length; i++) {
      if (damageList[i].isSelect === 1) {
        damageArr.push(damageList[i].id)
      }
    }
    set_DamageCause_List(damageArr)
    console.log("damageArr", damageArr)


    if (damageArr.length === 0) {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingThird.msg_select_damage_cause"));
      return;
    }

    console.log(damageCauseComment, "COMMENT")
    console.log(damageCause_List, "LIST  ")

    navigation.navigate('CrowdSourcingFourth', {
      weather_phenomena_List: route.params.weather_phenomena_List,
      flood_Reason_List: route.params.flood_Reason_List,
      weather_phenomena_commnet: route.params.weather_phenomena_commnet,
      flood_reason_comment: route.params.flood_reason_comment,
      crowdData, cyclone_name: route.params.cyclone_name, stateName: route.params.stateName, districtName: route.params.districtName, DOE: route.params.DOE, time: route.params.time, loclatitude: route.params.loclatitude,
      loclongitude: route.params.loclongitude, isEdit: route.params.isEdit,
      damageCause_List: damageArr, damageCauseComment
    })
  }

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
              <CustomText semibold style={{ color: '#fff', fontSize: moderateScale(16), }}>{strings("ThankYouCrowdSourcing.lbl_crowd_sourcing_form")}</CustomText>
            </View>

            <View style={{ width: '20%', alignItems: 'flex-end' }}>
              <CustomText semibold style={{ fontSize: moderateScale(16), color: '#fff', }}>2/3</CustomText>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginHorizontal: 10 }}>
        <View style={{ marginHorizontal: 10 }}>
          <View style={{ marginTop: 20 }}>
            <CustomText style={{ fontSize: moderateScale(16), color: '#000', }}>{strings("CrowdSourcingThird.lbl_damage_caused")}</CustomText>
          </View>
          <FlatList
            data={damageList}
            renderItem={({ item, index }) => {
              return <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                  <CheckBox
                    value={item.isSelect == 0 ? false : true}
                    onValueChange={newValue => {
                      let arr = [...damageList]
                      if (newValue) {
                        arr[index] = { ...arr[index], isSelect: 1 };
                      } else {
                        arr[index] = { ...arr[index], isSelect: 0 };
                      }
                      setDamageList(arr)
                    }}
                    tintColors
                  />
                  <CustomText semibold ellipsizeMode='tail' style={{ flex: 1, color: item.isSelect == 0 ? "#000" : '#3877F1', fontSize: moderateScale(13), paddingLeft: 5 }}>{item.name}</CustomText>
                </View>
              </View>
            }}
            keyExtractor={item => item.id}
          />
          <View style={{ marginTop: 20, borderWidth: 1, paddingBottom: 20, borderRadius: 20, borderColor: '#E5E5E5', paddingHorizontal: 10, }}>
            <TextInput
              placeholder={strings("Common.hint_write_comment")}
              multiline
              value={damageCauseComment}
              onChangeText={damageCauseComment => setdamageCauseComment(damageCauseComment)}
              style={{ color: '#0D2451', }}
            />
          </View>
          <View height={20} />
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
});
export default CrowdSourcingThird;
