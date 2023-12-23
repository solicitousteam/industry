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
  Alert,
  BackHandler,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GetUser, deleteUserData } from '../../../Redux/Action/Admin';
import { strings } from '../../../localization/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { CustomText } from "../../../Component/Text";
const DisasterManagerInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [response, setResponse] = React.useState('');
  const [userId, setUserId] = useState('')
  const [delete_User_Data, set_Delete_User_Data] = useState([]);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    const Data = route.params;
    // console.log(Data, "000000000000")
    setUserId(Data.id)
    setResponse(Data.userInfo);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const deleteUser = async () => {


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
  }

  const DeleteUser = async () => {
    const id = userId
    console.log(id, "------------------------")
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    // this.setState({isAPILoading: true});

    console.log(Token, 'user token================');
    const delete_User_Data_Response = await dispatch(deleteUserData(Token, id));
    set_Delete_User_Data(delete_User_Data_Response.data);
    if (delete_User_Data_Response.status == 200) {
      navigation.navigate("DisasterManagers")
      setLoader(false)

    } else {
      setLoader(false)
      Alert.alert(delete_User_Data_Response.msg)
    }
  }
  const editUser = () => {
    navigation.navigate("AddDisasterManager", { userInfo: response, flag: "editDisasterManager" })
  }
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
              onPress={() => navigation.navigate('DisasterManagers')}
              style={{ width: '20%' }}>
              <Image
                source={require('../../../../assets/Back_Arrow_White.png')}
              />
            </TouchableOpacity>
            <View style={{ width: "60%" }}>
              <CustomText
                regular fontSize={16} numberOfLines={1}
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                  textAlign: "center"
                }}
              >

                {response.first_name}
              </CustomText>
            </View>
            <View style={(styles.bell, [{ flexDirection: 'row', marginLeft: 10 }])}>
              <TouchableOpacity onPress={() => editUser()}>
                <Image
                  source={require('../../../../assets/Edit-White.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteUser()}>
                <Image
                  source={require('../../../../assets/Delete-White.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={{ padding: 20 }}>
        <View>
          <View style={{ paddingVertical: 10 }}>
            <View>
              <CustomText regular fontSize={14} style={styles.textTitle}>{strings("Registration.lbl_fullname")}</CustomText>
              {response.first_name ? (

                <CustomText semibold fontSize={17} style={styles.text}>{response.first_name}</CustomText>
              ) : (
                <CustomText semibold fontSize={17} style={styles.text}>-</CustomText>
              )}
              {/* <CustomText regular fontSize={}style={styles.text}>{response.first_name} {response.last_name}</CustomText> */}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText regular fontSize={14} style={styles.textTitle}>{strings("Registration.lbl_mobile_number")}</CustomText>
              {response.mobile ? (

                <CustomText semibold fontSize={17} style={styles.text}>{response.mobile}</CustomText>
              ) : (
                <CustomText semibold fontSize={17} style={styles.text}>-</CustomText>
              )}
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <CustomText regular fontSize={14} style={styles.textTitle}>{strings("CrowdSourcingFile.lbl_state")}</CustomText>
            {response.state ? (

              <CustomText semibold fontSize={17} style={styles.text}>{response.state}</CustomText>
            ) : (
              <CustomText semibold fontSize={17} style={styles.text}>-</CustomText>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
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
    fontFamily: 'OpenSans-Semibold',
    fontWeight: '600',
    color: '#000',
    // fontSize: 17,
  },
  textTitle: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    // fontSize: 14,
  },
});

export default DisasterManagerInfo;
