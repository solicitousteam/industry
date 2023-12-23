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
import LinearGradient from 'react-native-linear-gradient';
import { GetUser, deleteUserData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postAPI } from '../../../Networking/Request';
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import { strings } from '../../../localization/i18n';
import { CustomText } from '../../../Component/Text';


const ManpowerResourcesInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  let [loader, setLoader] = useState(false);
  const [response, setResponse] = useState('');
  const [userId, setUserId] = useState('');
  const [delete_User_Data, set_Delete_User_Data] = useState([]);

  useEffect(() => {
    const Data = route.params;
    setUserId(Data.id);
    setResponse(Data.userInfo);
  }, []);

  const editUser = () => {
    navigation.navigate('AddManpowerResources', { userInfo: response, flag: 'editUser' });
  };

  const deleteUser = () => {

    Alert.alert(
      'DCRA',
      strings("DisasterMNanagerInfo.msg_delete_warning"),
      [
        { text: strings("Common.button_no"), onPress: () => console.log('No button clicked'), style: 'cancel' },
        { text: strings("Common.button_yes"), onPress: () => DeleteUser() },
      ],
      {
        cancelable: false
      }
    );
  };

  const DeleteUser = async () => {
    const id = userId;
    console.log(id, '------------------------');
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
          // dropDownAlertRef.alertWithType('success', 'DCRA', response.message);
          // refDelete.current.close()
          navigation.navigate('ManpowerResources');
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

    // const delete_User_Data_Response = await dispatch(deleteUserData(Token, id));
    // set_Delete_User_Data(delete_User_Data_Response.data);
    // if (delete_User_Data_Response.status == 200) {
    //   setLoader(false);
    //   navigation.navigate('ManpowerResources');
    // } else {
    //   setLoader(false);
    //   Alert.alert(delete_User_Data_Response.msg);
    // }
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
                onPress={() => navigation.navigate('ManpowerResources')}
                style={{ width: '20%' }}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: "65%", }}>
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
                  {response.name}
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
                  onPress={() => deleteUser()}>
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
                <CustomText regular fontSize={14} style={styles.textTitle}>{strings("AddManpowerResources.lbl_name")}</CustomText>
                <CustomText semibold fontSize={17} numberOfLines={2} style={styles.text}>
                  {response.name}
                </CustomText>
              </View>
              <View style={{ marginTop: 20 }}>
                <CustomText regular fontSize={14} style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_department_name")}</CustomText>
                <CustomText semibold fontSize={17} style={styles.text}>{response.department_name}</CustomText>
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
                <CustomText regular fontSize={14} style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_department_type")}</CustomText>
                <CustomText semibold fontSize={17} style={styles.text}>{response?.department_type}</CustomText>
              </View>
              <View style={{ marginTop: 20 }}>
                <CustomText regular fontSize={14} style={styles.textTitle}>{strings("AddManpowerResources.lbl_age")}</CustomText>
                <CustomText semibold fontSize={17} style={styles.text}>
                  {response.age}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomText regular fontSize={14} style={styles.textTitle}>{strings("AddManpowerResources.lbl_designation")}</CustomText>
            <CustomText semibold fontSize={17} style={styles.text}>{response.designation}</CustomText>
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomText regular fontSize={14} style={styles.textTitle}>{strings("AddManpowerResources.lbl_skill_set")}</CustomText>
            <CustomText semibold fontSize={17} style={styles.text}>{response.skills}</CustomText>
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomText regular fontSize={14} style={styles.textTitle}>{strings("ForgotPassword.lbl_mobile_number")}</CustomText>
            {response.mobile ? (
              <CustomText semibold fontSize={17} style={styles.text}>
                {response.mobile}
              </CustomText>
            ) : (
              <CustomText semibold fontSize={17} style={styles.text}>-</CustomText>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomText regular fontSize={14} style={styles.textTitle}>{strings("AddManpowerResources.lbl_status")}</CustomText>
            {response.status ? (
              <CustomText semibold fontSize={17} style={styles.text}>
                {response.status}
              </CustomText>
            ) : (
              <CustomText semibold fontSize={17} style={styles.text}>-</CustomText>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomText regular fontSize={14} style={styles.textTitle}>{strings("AddEquipmentAvailability.lbl_remarks")}</CustomText>
            {response.remark ? (
              <CustomText semibold fontSize={17} style={styles.text}>
                {response.remark}
              </CustomText>
            ) : (
              <CustomText semibold fontSize={17} style={styles.text}>-</CustomText>
            )}
          </View>


        </View>
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
  title: {
    fontSize: 17,
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
  info: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: '#000',
    marginTop: 3,
  },
  text: {
    // fontFamily: 'OpenSans-Semibold',
    fontWeight: '600',
    color: '#000',
    // fontSize: 17,
  },
  textTitle: {
    // fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    // fontSize: 14,
  },
});

export default ManpowerResourcesInfo;