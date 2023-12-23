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
import { strings } from '../../../localization/i18n';
import { CustomText } from '../../../Component/Text';

const StateUserInfo = ({ navigation, route }) => {
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
    navigation.navigate('AddStateUser', { userInfo: response, flag: 'editUser' });
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
    const delete_User_Data_Response = await dispatch(deleteUserData(Token, id));
    set_Delete_User_Data(delete_User_Data_Response.data);
    if (delete_User_Data_Response.status == 200) {
      setLoader(false);
      navigation.navigate('StateUsers');
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
                onPress={() => navigation.navigate('StateUsers')}
                style={{ width: '15%' }}>
                <Image
                  source={require('../../../../assets/Back_Arrow_White.png')}
                />
              </TouchableOpacity>
              <View style={{ width: '60%' }}>
                <CustomText
                  numberOfLines={1}
                  regular
                  fontSize={16}
                  style={{
                    color: '#fff',
                    // fontSize: 16,
                    // fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                    textAlign: 'center'
                  }}>
                  {response.first_name}
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
                  <Image
                    source={require('../../../../assets/Delete-White.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
              <View style={{ paddingVertical: 10, width: "50%" }}>
                <View>
                  <CustomText fontSize={14} style={styles.textTitle}>{strings("Registration.lbl_fullname")}</CustomText>
                  <CustomText fontSize={17} semibold style={styles.text}>
                    {response.first_name}
                  </CustomText>
                </View>
                <View style={{ marginTop: 20 }}>
                  <CustomText fontSize={14} regular style={styles.textTitle}>{strings("Registration.lbl_username")}</CustomText>
                  <CustomText fontSize={17} semibold style={styles.text}>{response.username}</CustomText>
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
                  <CustomText fontSize={14} regular style={styles.textTitle}>{strings("Registration.lbl_dob")}</CustomText>
                  <CustomText fontSize={17} semibold style={styles.text}>{response.date_of_birth}</CustomText>
                </View>
                <View style={{ marginTop: 20 }}>
                  <CustomText fontSize={14} regular style={styles.textTitle}>{strings("Registration.lbl_mobile_number")}</CustomText>
                  <CustomText fontSize={17} semibold style={styles.text}>
                    {response.relative_mobile_number_1}
                  </CustomText>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={14} regular style={styles.textTitle}>{strings("CrowdSourcingFile.lbl_state")}</CustomText>
              <CustomText fontSize={17} semibold style={styles.text}>{response.state}</CustomText>
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={14} regular style={styles.textTitle}>{strings("CrowdSourcingFile.lbl_district")}</CustomText>
              <CustomText fontSize={17} semibold style={styles.text}>{response.district}</CustomText>
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={14} regular style={styles.textTitle}>{strings("Registration.lbl_relative_mobile_number")}</CustomText>
              {response.relative_mobile_number_1 ? (
                <CustomText fontSize={17} semibold style={styles.text}>
                  {response.relative_mobile_number_1}
                </CustomText>
              ) : (
                <CustomText fontSize={17} semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={14} regular style={styles.textTitle}>{strings("Registration.lbl_relative_two_number")}</CustomText>
              {response.relative_mobile_number_2 ? (
                <CustomText fontSize={17} semibold style={styles.text}>
                  {response.relative_mobile_number_2}
                </CustomText>
              ) : (
                <CustomText fontSize={17} semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={14} regular style={styles.textTitle}>{strings("Registration.lbl_relative_three_number")}</CustomText>
              {response.relative_mobile_number_3 ? (
                <CustomText fontSize={17} semibold style={styles.text}>
                  {response.relative_mobile_number_3}
                </CustomText>
              ) : (
                <CustomText fontSize={17} semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={14} regular style={styles.textTitle}>{strings("Registration.lbl_relative_four_number")}</CustomText>
              {response.relative_mobile_number_4 ? (
                <CustomText fontSize={17} semibold style={styles.text}>
                  {response.relative_mobile_number_4}
                </CustomText>
              ) : (
                <CustomText fontSize={17} semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText fontSize={14} regular style={styles.textTitle}>{strings("Registration.lbl_relative_five_number")}</CustomText>
              {response.relative_mobile_number_5 ? (
                <CustomText fontSize={17} semibold style={styles.text}>
                  {response.relative_mobile_number_5}
                </CustomText>
              ) : (
                <CustomText fontSize={17} semibold style={styles.text}>-</CustomText>
              )}
            </View>
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

export default StateUserInfo;
