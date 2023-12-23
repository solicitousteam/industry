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
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VerificationRequestData, ApprovedVerificationRequestData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { strings } from "../../../localization/i18n"
import { CustomText } from '../../../Component/Text';

const VerificationRequestInfo = ({ navigation, route }) => {
  let [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [response, setResponse] = useState('');
  const [userId, setUserId] = useState('');
  const [approved_VerificationRequestResponse, set_Approved_VerificationRequestResponse] = useState('');


  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    const Data = route.params;
    setResponse(Data.userInfo);
    console.log(Data.userInfo, "===-------000000000000")
    setUserId(Data.userInfo.id)
  }

  const ApproveRequest = async () => {
    const is_approved = 1
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    // this.setState({isAPILoading: true});
    console.log(userId, "_________++++++++++++++___________")
    const Approved_Verification_User_Data_Response = await dispatch(ApprovedVerificationRequestData(Token, userId, is_approved));
    set_Approved_VerificationRequestResponse(Approved_Verification_User_Data_Response.data);
    if (Approved_Verification_User_Data_Response.status == 200) {
      // getVerificationRequest()
      navigation.navigate('VerificationRequests')
      setLoader(false)
    } else {
      setLoader(false);
      Alert.alert(approved_VerificationRequestResponse.msg)
    }
  }
  const RejectRequest = async () => {
    const is_approved = 2
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    // this.setState({isAPILoading: true});
    console.log(userId, "_________++++++++++++++___________")

    const Approved_Verification_User_Data_Response = await dispatch(ApprovedVerificationRequestData(Token, userId, is_approved));
    set_Approved_VerificationRequestResponse(Approved_Verification_User_Data_Response.data);
    if (Approved_Verification_User_Data_Response.status == 200) {
      // getVerificationRequest()
      navigation.navigate('VerificationRequests')
      setLoader(false)
    } else {
      setLoader(false);
      Alert.alert(approved_VerificationRequestResponse.msg)
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
                onPress={() => navigation.navigate('VerificationRequests')}
                style={{ width: '20%' }}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                  }}>
                  {strings("VerificationRequestInfo.lbl_verification_requests_caps")}
                </Text>
              </View>
              <View style={styles.bell}></View>
            </View>
          </View>
        </LinearGradient>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
              <View style={{ width: "50%", marginTop: 10 }}>
                <CustomText regular style={styles.textTitle}>{strings("Registration.lbl_fullname")}</CustomText>
                <CustomText semibold style={styles.text} numberOfLines={1}>{response.first_name}</CustomText>
                <View style={{ marginTop: 20 }}>
                  <CustomText regular style={styles.textTitle}>{strings("Registration.lbl_username")}</CustomText>
                  <CustomText semibold style={styles.text}>{response.username}</CustomText>
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
                  <CustomText regular style={styles.textTitle}>{strings("Registration.lbl_dob")}</CustomText>
                  <CustomText semibold style={styles.text}>{response.date_of_birth}</CustomText>
                </View>
                <View style={{ marginTop: 20 }}>
                  <CustomText regular style={styles.textTitle}>{strings("Registration.lbl_mobile_number")}</CustomText>
                  <CustomText semibold style={styles.text}>{response.mobile}</CustomText>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={styles.textTitle}>{strings("CrowdSourcingFile.lbl_state")}</CustomText>
              {response.state ? (
                <CustomText semibold style={styles.text}>
                  {response.state}
                </CustomText>
              ) : (
                <CustomText semibold style={styles.text}>-</CustomText>
              )}
              {/* <CustomText semibold style={styles.text}>{response.state}</CustomText> */}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={styles.textTitle}>{strings("CrowdSourcingFile.lbl_district")}</CustomText>
              {response.district ? (
                <CustomText semibold style={styles.text}>
                  {response.district}
                </CustomText>
              ) : (
                <CustomText semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={styles.textTitle}>{strings("Registration.lbl_email")}</CustomText>
              {response.email ? (
                <CustomText semibold style={styles.text}>
                  {response.email}
                </CustomText>
              ) : (
                <CustomText semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={styles.textTitle}>{strings("Registration.lbl_relative_mobile_number")}</CustomText>
              {response.relative_mobile_number_1 ? (
                <CustomText semibold style={styles.text}>
                  {response.relative_mobile_number_1}
                </CustomText>
              ) : (
                <CustomText semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={styles.textTitle}>{strings("Registration.lbl_relative_two_number")}</CustomText>
              {response.relative_mobile_number_2 ? (
                <CustomText semibold style={styles.text}>
                  {response.relative_mobile_number_2}
                </CustomText>
              ) : (
                <CustomText semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={styles.textTitle}>{strings("Registration.lbl_relative_three_number")}</CustomText>
              {response.relative_mobile_number_3 ? (
                <CustomText semibold style={styles.text}>
                  {response.relative_mobile_number_3}
                </CustomText>
              ) : (
                <CustomText semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={styles.textTitle}>{strings("Registration.lbl_relative_four_number")}</CustomText>
              {response.relative_mobile_number_4 ? (
                <CustomText semibold style={styles.text}>
                  {response.relative_mobile_number_4}
                </CustomText>
              ) : (
                <CustomText semibold style={styles.text}>-</CustomText>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText style={styles.textTitle}>{strings("Registration.lbl_relative_five_number")}</CustomText>
              {response.relative_mobile_number_5 ? (
                <CustomText semibold style={styles.text}>
                  {response.relative_mobile_number_5}
                </CustomText>
              ) : (
                <CustomText style={styles.text}>-</CustomText>
              )}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => RejectRequest()}>
              <View style={styles.declineButtons}>
                <View style={{ marginRight: 10 }}>
                  <Image source={require('../../../../assets/Cross_White.png')} />
                </View>
                <View>
                  <CustomText style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
                    {strings("VerificationRequestInfo.lbl_decline")}
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => ApproveRequest()}>
              <View
                style={styles.AcceptButtons}>
                <View style={{ marginRight: 10 }}>
                  <Image source={require('../../../../assets/Right_White.png')} />
                </View>
                <View>
                  <CustomText style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
                    {strings("VerificationRequestInfo.lbl_accept")}
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
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
    fontSize: 17,
  },
  textTitle: {
    // fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    fontSize: 14,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    marginVertical: 20,
    bottom: 0,
  },
  declineButtons: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#EB4335',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 25,
  },
  AcceptButtons: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#37B34A',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 25,
  }
});

export default VerificationRequestInfo;
