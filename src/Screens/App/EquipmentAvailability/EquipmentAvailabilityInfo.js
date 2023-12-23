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
  ActivityIndicator,
  Alert,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import RBSheet from 'react-native-raw-bottom-sheet';
import { strings } from "../../../localization/i18n"

import LinearGradient from 'react-native-linear-gradient';
import { GetUser, deleteUserData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import { postAPI } from '../../../Networking/Request';
import { styles } from './EquipmentAvailabilityInfoStyle';
import { CustomText } from '../../../Component/Text';

const EquipmentAvailabilityInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  let [loader, setLoader] = useState(false);
  const [response, setResponse] = useState('');
  const [userId, setUserId] = useState('');
  const [delete_User_Data, set_Delete_User_Data] = useState([]);
  const [equipmentDetails, setEquipmentDetails] = useState({})
  const refDelete = useRef();

  useEffect(() => {
    // const Data = route.params;
    setEquipmentDetails(route.params.userInfo)
    // console.log(Data, "=================================================");
    // setUserId(Data.id);
    // setResponse(Data.userInfo);
  }, [equipmentDetails]);

  const editUser = () => {
    navigation.navigate('AddEquipmentAvailability', { userInfo: equipmentDetails, flag: 'editUser' });
  };

  const deleteUser = () => {

    Alert.alert(
      'DCRA',
      strings("DisasterMNanagerInfo.msg_delete_warning"),
      [
        { text: strings("Common.buton_no"), onPress: () => console.log('No button clicked'), style: 'cancel' },
        { text: strings("Common.buton_yes"), onPress: () => DeleteUser() },
      ],
      {
        cancelable: false
      }
    );
  };

  function onPressDelete() {
    refDelete.current.open()
  }

  async function deleteEquipment() {
    const token = await AsyncStorage.getItem('loginToken')
    refDelete.current.close()
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    };
    console.log(equipmentDetails.id, "equipmentDetails.id");

    let formData = new FormData()
    formData.append("id", equipmentDetails.id)
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
          dropDownAlertRef.alertWithType('success', 'DCRA', response.message);
          navigation.navigate('EquipmentAvailability');
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


  const DeleteUser = async () => {
    const id = userId;
    console.log(id, '------------------------');
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    // this.setState({isAPILoading: true});

    console.log(Token, 'user token================');
    const delete_User_Data_Response = await dispatch(deleteUserData(Token, id));
    set_Delete_User_Data(delete_User_Data_Response.data);
    if (delete_User_Data_Response.status == 200) {
      setLoader(false);
      navigation.navigate('EquipmentAvailability');
    } else {
      setLoader(false);
      Alert.alert(delete_User_Data_Response.msg);
    }
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
              //   backgroundColor: '#5B4CDF',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
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
              <TouchableOpacity
                onPress={() => navigation.navigate('EquipmentAvailability')}
                style={{ width: '10%' }}>
                <Image
                  source={require('../../../../assets/Back_Arrow_White.png')}
                />
              </TouchableOpacity>
              <View style={{ width: "60%" }}>
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
                  {equipmentDetails.name}
                </CustomText>
              </View>
              <View style={(styles.bell, [{ flexDirection: 'row' }])}>
                <TouchableOpacity onPress={() => editUser()}>
                  <View>
                    <Image
                      source={require('../../../../assets/Edit-White.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => onPressDelete()}>
                  <View>
                    <Image
                      source={require('../../../../assets/Delete-White.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
            <View style={{ paddingVertical: 10, width: "50%" }}>
              <View>
                <CustomText fontSize={14} regular style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_equipment_name")}</CustomText>
                <CustomText semibold fontSize={17} style={styles.text}>
                  {equipmentDetails.name}
                </CustomText>
              </View>
              <View style={{ marginTop: 20 }}>
                <CustomText fontSize={14} regular style={styles.textTitle}>{strings("EquipmentAvailabilityInfo.lbl_departnment_name")}</CustomText>
                <CustomText semibold fontSize={17} style={styles.text}>{equipmentDetails.department_name}</CustomText>
              </View>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderColor: '#c5c5c5',
              }}>
              <View>
                <CustomText fontSize={14} regular style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_department_type")}</CustomText>
                <CustomText semibold fontSize={17} style={styles.text}>{equipmentDetails.department_type}</CustomText>
              </View>
              <View style={{ marginTop: 20 }}>
                <CustomText fontSize={14} regular style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_equipment_type")}</CustomText>
                <CustomText semibold fontSize={17} style={styles.text}>
                  {equipmentDetails.type}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomText style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_equipment_category")}</CustomText>
            <CustomText semibold fontSize={17} style={styles.text}>{equipmentDetails.category}</CustomText>
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomText fontSize={14} regular style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_condition")}</CustomText>
            <CustomText semibold fontSize={17} style={styles.text}>{equipmentDetails.condition}</CustomText>
          </View>
          {/* <View style={{marginTop: 20}}>
            <CustomText style={styles.textTitle}>Mobile Number</CustomText>
            {response.relative_mobile_number_1 ? (
              <CustomText style={styles.text}>
                {response.relative_mobile_number_1}
              </CustomText>
            ) : (
              <CustomText style={styles.text}>-</CustomText>
            )}
          </View> */}
          <View style={{ marginTop: 20 }}>
            <CustomText fontSize={14} regular style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_year")}</CustomText>
            {equipmentDetails.year ? (
              <CustomText semibold fontSize={17} style={styles.text}>
                {equipmentDetails.year}
              </CustomText>
            ) : (
              <CustomText semibold fontSize={17} style={styles.text}>-</CustomText>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomText fontSize={14} regular style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_remarks")}</CustomText>
            {equipmentDetails.remark ? (
              <CustomText semibold fontSize={17} style={styles.text}>
                {equipmentDetails.remark}
              </CustomText>
            ) : (
              <CustomText semibold fontSize={17} style={styles.text}>-</CustomText>
            )}
          </View>


        </View>
        <RBSheet
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
              <CustomText style={[styles.WarningTitleText,]}>{strings("CrowdSourcingFile.msg_delete_warning")} </CustomText>
            </View>
            <View style={styles.deleteBtnView}>

              <TouchableOpacity
                onPress={() => { refDelete.current.close() }}
                style={styles.deleteBtn}>
                <View
                  style={styles.deleteBtnViewTxt}>
                  <CustomText
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
                    style={styles.dedeleteBtnYesTxt}>
                    {strings("Common.button_yes")}
                  </CustomText>
                </View>

              </TouchableOpacity>
            </View>
          </ScrollView>
        </RBSheet>
      </SafeAreaView>
    );
  } else {
    return <ActivityIndicator style={{ justifyContent: 'center', flex: 1 }} />;
  }
};



export default EquipmentAvailabilityInfo;
