import React, { useState, useEffect, useRef } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    BackHandler,
    Image, ScrollView, ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../../Redux/Action/Auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Config from '../../Networking/Config';
import FlashMessage from 'react-native-flash-message';
import DropdownAlert from 'react-native-dropdownalert';
import { loginMpinAPI } from '../../Networking/Manager/AuthAPIManager';
import APIConstants from '../../Networking/APIConstants';
import { getAPI, postAPI } from '../../Networking/Request';
import { CommonActions } from '@react-navigation/native';
import { strings } from '../../localization/i18n';
import { CustomText } from '../../Component/Text';
import { moderateScale } from 'react-native-size-matters';

const DeleteAccount = ({ route, navigation }) => {
    const [response, setResponse] = useState('');
    const [loader, setLoader] = useState(false);
    const [code, setCode] = useState("");
    const [userName, setUserName] = useState("");
    const [mobile, setMobile] = useState("");
    const [token, setToken] = useState("");
    const [loginUserData, setLoginUserData] = useState("");
    let dropDownAlertRef = useRef()

    useEffect(() => {
        setLoginUserName()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    async function setLoginUserName() {
        const userName1 = await AsyncStorage.getItem('loginUserName');
        setUserName(userName1)
        const value = await AsyncStorage.getItem("loginUserData")
        const data = JSON.parse(value)
        console.log("data", data)
        setMobile(data.mobile)
        setToken(data.token)
        setLoginUserData(data)
    }
    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }



    async function LogOut() {
        await AsyncStorage.removeItem("fcmToken")
        await AsyncStorage.removeItem("loginUserName")
        await AsyncStorage.removeItem("userType")
        await AsyncStorage.removeItem("phone")
        await AsyncStorage.removeItem("loginUserData")
        await AsyncStorage.removeItem("registrationData")
        await AsyncStorage.removeItem("loginID")
        await AsyncStorage.removeItem("loginToken")
        await AsyncStorage.removeItem("language")
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'AuthStack' },
                ],
            })
        )
        return
        const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + loginUserData.token,
            'Content-Type': 'multipart/form-data',
        };

        console.log(
            'url====',
            Config.baseUrl + APIConstants.logout,
            headers,
        );
        return getAPI(Config.baseUrl + APIConstants.logout, headers)
            .then(function (response) {
                setLoader(false)
                if (response.status == 200) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'AuthStack' },
                            ],
                        })
                    )
                    dropDownAlertRef.alertWithType('success', 'DCRA', response.message);
                } else {
                    dropDownAlertRef.alertWithType('error', 'DCRA', response.message);
                }

            })
            .catch(function (error) {
                setLoader(false)
                dropDownAlertRef.alertWithType('error', 'DCRA', error.message);
                console.log('loginMpin==', error);

            })


    }
    async function submitMobileNumber() {

        const token = await AsyncStorage.getItem('loginToken');

        fetch(Config.baseUrl + 'send_otp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                country_code: '+91',
                mobile: mobile,
            }),
        })
            .then(response => response.json())
            .then(json => {

                if (json.status === 200) {

                    console.log(">>>>>>", token + json.data.otp,)
                    navigation.navigate('OTPVerification', {
                        'OTP': json.data.otp,
                        'Phone': mobile,
                        'userId': json.data.user_id,
                    });

                } else {
                    dropDownAlertRef.alertWithType('error', 'DCRA', json.message);
                }
            })
            .catch(error => {
                console.error(error);
            });

    }

    async function submitMpin() {


        console.log(code, '$$$$$$$$$$');

        if (code !== '') {
            setLoader(true)
            LoginMpin(code)
        }
        else if (code == '') {
            dropDownAlertRef.alertWithType('error', 'DCRA', strings("DeleteAccount.msg_enter_pin"));
        }
        else if (code !== '' && code > 4) {
            dropDownAlertRef.alertWithType('error', 'DCRA', strings("MpinScreen.msg_mpin_not_valid"));
        }
    }


    function LoginMpin(code) {
        const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + loginUserData.token,
            'Content-Type': 'multipart/form-data',
        };
        let formData = new FormData()
        formData.append("mpin", code)

        console.log(
            'url====',
            Config.baseUrl + APIConstants.loginMpin,
            headers,
            formData,
        );
        return postAPI(Config.baseUrl + APIConstants.loginMpin, headers, formData)
            .then(function (response) {
                setLoader(false)

                console.log('loginMpin123', response);
                if (response.status == 200) {
                    deleteAccount()
                } else {
                    dropDownAlertRef.alertWithType('error', 'DCRA', response.message);
                }

            })
            .catch(function (error) {
                setLoader(false)
                dropDownAlertRef.alertWithType('error', 'DCRA', error.message);
                console.log('loginMpin==', error);

            })
        // .finally(function () {
        //     setLoader(false)
        // });

    }

    function deleteAccount() {
        const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + loginUserData.token,
            'Content-Type': 'multipart/form-data',
        };

        console.log(
            'url====',
            Config.baseUrl + APIConstants.DELETE_ACCOUNT,
            headers,
        );
        return getAPI(Config.baseUrl + APIConstants.DELETE_ACCOUNT, headers)
            .then(function (response) {
                setLoader(false)
                if (response.status == 200) {
                    dropDownAlertRef.alertWithType('success', 'DCRA', response.message);
                    setTimeout(() => {
                        LogOut()
                    }, 1000)
                } else {
                    dropDownAlertRef.alertWithType('error', 'DCRA', response.message);
                }

            })
            .catch(function (error) {
                setLoader(false)
                dropDownAlertRef.alertWithType('error', 'DCRA', error.message);
                console.log('loginMpin==', error);

            })
        // .finally(function () {
        //     setLoader(false)
        // });


    }

    if (!loader) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#3877F1" />
                <LinearGradient
                    colors={['#3877F1', '#215ACA']}
                    style={styles.linearGradient}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <Image source={require('../../../assets/Ellipse_Head.png')} />
                        <View style={{ position: 'absolute', flexDirection: 'row', width: '100%', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => navigation.pop()} style={{ width: '20%' }}>
                                <Image source={require('../../../assets/Back_Arrow_White.png')} />
                            </TouchableOpacity>
                            <View>
                                <CustomText semibold style={{ color: '#fff', fontSize: moderateScale(16),  textTransform: 'uppercase' }}>{strings("Dashboard.lbl_delete_acc")}</CustomText>
                            </View>
                            <View style={styles.bell}></View>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 10, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../../assets/User.png')} style={{ justifyContent: 'center' }} />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
                            <CustomText semibold style={{ fontSize: moderateScale(22), color: '#000',  textAlign: 'center', }}>{strings("MpinLogin.lbl_hello")} {userName}!!</CustomText>
                            <CustomText style={{fontSize:moderateScale(14),color:"#000", textAlign: 'center', marginTop: 10 }}>
                                {strings("DeleteAccount.msg_enter_mpin_to_delete")}
                            </CustomText>
                        </View>
                        <View>
                            <OTPInputView
                                style={{
                                    height: 150,
                                    marginHorizontal: '10%',
                                    borderRadius: 20,
                                }}
                                pinCount={4}
                                code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                onCodeChanged={code => setCode(code)}
                                autoFocusOnLoad
                                codeInputFieldStyle={{ borderRadius: 10, height: 60, width: 60, color: '#000' }}
                                codeInputHighlightStyle={{ borderRadius: 10 }}
                            // onCodeFilled={code => { submitMpin(code) }}
                            />
                        </View>

                        <TouchableOpacity
                            style={{ alignItems: 'center' }}
                            onPress={() => { submitMobileNumber() }}>
                            <CustomText style={{ fontSize: moderateScale(16), color: '#3877F1', }}>{strings("MpinLogin.lbl_forgot_mpin")}</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>

                <View height={20} />
                <TouchableOpacity
                    onPress={() => {
                        submitMpin()
                    }}
                    style={{
                        marginVertical: 20, borderRadius: 48, paddingVertical: 16, backgroundColor: '#3877F1', shadowColor: '#3877F1',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        }, width: "90%", alignSelf: "center",
                        shadowOpacity: 0.1, shadowRadius: 2, elevation: 9, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10,
                    }}>
                    <View style={{ width: 10 }}></View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 15, }}>
                        <CustomText semibold style={{ fontSize: moderateScale(17), color: '#fff' }}>{strings("Common.button_submit")}</CustomText>
                    </View>
                    <View>
                        <Image source={require('../../../assets/Login_Arrow.png')} style={{ width: 27.5, height: 26.7 }} />
                    </View>
                </TouchableOpacity>
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
    bell: {
        width: '20%',
    },
});

export default DeleteAccount;
