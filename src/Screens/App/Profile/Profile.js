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
    BackHandler,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetProfile, EditProfile } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'react-native-reanimated';
import DropdownAlert from 'react-native-dropdownalert';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
} from 'accordion-collapse-react-native';
import { strings } from '../../../localization/i18n';
import { CustomText } from '../../../Component/Text'

const Profile = ({ navigation, route }) => {
    let dropDownAlertRef = useRef();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [relative1MobileNumber, setRelative1MobileNumber] = useState('');
    const [relative2MobileNumber, setRelative2MobileNumber] = useState('');
    const [relative3MobileNumber, setRelative3MobileNumber] = useState('');
    const [relative4MobileNumber, setRelative4MobileNumber] = useState('');
    const [relative5MobileNumber, setRelative5MobileNumber] = useState('');

    let [loader, setLoader] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [DOB, setDOB] = useState('10-10-2002');
    const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
    const [districtName, setdistrictName] = useState(strings("CrowdSourcingFirst.lbl_select_district"));
    const [stateToggle, setStateToggle] = useState(false);
    const [districtToggle, setdistrictToggle] = useState(false);
    const [headerTitle, setHeaderTitle] = useState('');
    const [userDataInfo, setUserDataInfo] = useState('');
    const [userId, setUserId] = useState('');
    const [fieldEdit, setEditField] = useState(false);
    const [focusField, setFocusField] = useState(false)
    const [collapseFlag, setCollapsFlag] = useState(true);
    const [profileData, setProfileData] = useState("");
    const [userType, setUserType] = useState("");
    const [Address, setAddress] = useState('Pune Maharashtra')
    const [relaNameOne, setRelaNameOne] = useState('Admin1')
    const [relaNameTwo, setRelaNameTwo] = useState('Admin2')
    const [contryState, setContryState] = useState([
        {
            id: '28',
            title: strings("CountryState.lbl_andhra_pradesh"),
        },
        {
            id: '25',
            title: strings("CountryState.lbl_daman_diu"),
        },
        {
            id: '30',
            title: strings("CountryState.lbl_goa"),
        },
        {
            id: '24',
            title: strings("CountryState.lbl_gujarat"),
        },
        {
            id: '29',
            title: strings("CountryState.lbl_karnataka"),
        },
        {
            id: '32',
            title: strings("CountryState.lbl_kerala"),
        },
        {
            id: '27',
            title: strings("CountryState.lbl_maharashtra"),
        },
        {
            id: '34',
            title: strings("CountryState.lbl_puducherry"),
        },
        {
            id: '21',
            title: strings("CountryState.lbl_odisha"),
        },
        {
            id: '33',
            title: strings("CountryState.lbl_tamil_nadu"),
        },
        {
            id: '19',
            title: strings("CountryState.lbl_west_bengal"),
        },
        {
            id: '35',
            title: strings("CountryState.lbl_andaman_nicobar_islands"),
        },
        {
            id: '31',
            title: strings("CountryState.lbl_lakshadweep"),
        },
    ]);

    const [gujaratDistrict, setGujaratDistrict] = useState([{
        id: '474',
        title: strings("District.lbl_ahmadabad"),
    },
    {
        id: '480',
        title: strings("District.lbl_amreli"),
    },
    {
        id: '482',
        title: strings("District.lbl_anand"),
    },
    {
        id: '469',
        title: strings("District.lbl_banas_kantha"),
    },
    {
        id: '488',
        title: strings("District.lbl_bharuch"),
    },
    {
        id: '481',
        title: strings("District.lbl_bhavnagar"),
    },
    {
        id: '477',
        title: strings("District.lbl_jamnagar"),
    },
    {
        id: '479',
        title: strings("District.lbl_junagadh"),
    },
    {
        id: '468',
        title: strings("District.lbl_kachchh"),
    },
    {
        id: '483',
        title: strings("District.lbl_kheda"),
    },
    {
        id: '487',
        title: strings("District.lbl_narmada"),
    },
    {
        id: '490',
        title: strings("District.lbl_navsari"),
    },
    {
        id: '470',
        title: strings("District.lbl_patan"),
    },
    {
        id: '478',
        title: strings("District.lbl_porbandar"),
    },
    {
        id: '476',
        title: strings("District.lbl_rajkot"),
    },
    {
        id: '492',
        title: strings("District.lbl_surat"),
    },
    {
        id: '475',
        title: strings("District.lbl_surendranagar"),
    },
    {
        id: '486',
        title: strings("District.lbl_vadodara"),
    },
    {
        id: '491',
        title: strings("District.lbl_valsad"),
    },
    ]);

    const [
        Andaman_Nicobar_Islands_District,
        setAndaman_Nicobar_Islands_District,
    ] = useState([
        {
            id: '638',
            title: strings("District.lbl_nicobars"),
        },
        {
            id: '639',
            title: strings("District.lbl_north_middle_andaman"),
        },
        {
            id: '640',
            title: strings("District.lbl_south_andaman"),
        },
    ]);

    const [Daman_Diu_District, setDaman_Diu_District] = useState([
        {
            id: '495',
            title: strings("District.lbl_daman"),
        },
        {
            id: '494',
            title: strings("District.lbl_diu"),
        },
    ]);

    const [Andhra_Pradesh_District, setAndhra_Pradesh_District] = useState([
        {
            id: '545',
            title: strings("District.lbl_east_godavari"),
        },
        {
            id: '548',
            title: strings("District.lbl_guntur"),
        },
        {
            id: '547',
            title: strings("District.lbl_krishna"),
        },
        {
            id: '549',
            title: strings("District.lbl_prakasam"),
        },
        {
            id: '550',
            title: strings("District.lbl_sri_potti"),
        },
        {
            id: '542',
            title: strings("District.lbl_srikakulam"),
        },
        {
            id: '544',
            title: strings("District.lbl_vishakhapatnam"),
        },
        {
            id: '543',
            title: strings("District.lbl_vizianagaram"),
        },
        {
            id: '546',
            title: strings("District.lbl_west_godavari"),
        },
    ]);

    const [Goa_District, setGoa_District] = useState([
        {
            id: '585',
            title: strings("District.lbl_north_goa"),
        },
        {
            id: '586',
            title: strings("District.lbl_south_goa"),
        },
    ]);

    const [Karnataka_District, setKarnataka_District] = useState([
        {
            id: '575',
            title: strings("District.lbl_dakshina_kannada"),
        },
        {
            id: '569',
            title: strings("District.lbl_udupi"),
        },
        {
            id: '563',
            title: strings("District.lbl_uttara_kannada"),
        },
        {
            id: '598',
            title: strings("District.lbl_alappuzha"),
        },
        {
            id: '595',
            title: strings("District.lbl_ernakulam"),
        },
        {
            id: '589',
            title: strings("District.lbl_kannur"),
        },
        {
            id: '588',
            title: strings("District.lbl_kasaragod"),
        },
        {
            id: '600',
            title: strings("District.lbl_kollam"),
        },
        {
            id: '597',
            title: strings("District.lbl_kottayam"),
        },
        {
            id: '591',
            title: strings("District.lbl_kozhikode"),
        },
        {
            id: '592',
            title: strings("District.lbl_malappuram"),
        },
        {
            id: '593',
            title: strings("District.lbl_palakkad"),
        },
        {
            id: '599',
            title: strings("District.lbl_pathanamthitta"),
        },
        {
            id: '594',
            title: strings("District.lbl_thiruvananthapuram"),
        },
    ]);

    const [Lakshadweep_District, setLakshadweep_District] = useState([
        {
            id: '587',
            title: strings("District.lbl_lakshadweep"),
        },
    ]);

    const [Maharashtra_District, setMaharashtra_District] = useState([
        {
            id: '519',
            title: strings("District.lbl_mumbai"),
        },
        {
            id: '518',
            title: strings("District.lbl_mumbai_suburban"),
        },
        {
            id: '520',
            title: strings("District.lbl_raigarh"),
        },
        {
            id: '528',
            title: strings("District.lbl_ratnagiri"),
        },
        {
            id: '529',
            title: strings("District.lbl_sindhudurg"),
        },
        {
            id: '517',
            title: strings("District.lbl_thane"),
        },
    ]);

    const [Odisha_District, setOdisha_District] = useState([
        {
            id: '377',
            title: strings("District.lbl_baleswar"),
        },
        {
            id: '378',
            title: strings("District.lbl_bhadrak"),
        },
        {
            id: '381',
            title: strings("District.lbl_cuttack"),
        },
        {
            id: '388',
            title: strings("District.lbl_ganjam"),
        },
        {
            id: '380',
            title: strings("District.lbl_jagatsinghpur"),
        },
        {
            id: '382',
            title: strings("District.lbl_jajpur"),
        },
        {
            id: '386',
            title: strings("District.lbl_khordha"),
        },
        {
            id: '376',
            title: strings("District.lbl_mayurbhanj"),
        },
        {
            id: '387',
            title: strings("District.lbl_puri"),
        },
    ]);

    const [Puducherry_District, setPuducherry_District] = useState([
        {
            id: '637',
            title: strings("District.lbl_karaikal"),
        },
        {
            id: '636',
            title: strings("District.lbl_mahe"),
        },
        {
            id: '635',
            title: strings("District.lbl_puducherry"),
        },
        {
            id: '634',
            title: strings("District.lbl_yanam"),
        },
    ]);

    const [Tamil_Nadu_District, setTamil_Nadu_District] = useState([
        {
            id: '603',
            title: strings("District.lbl_chennai"),
        },
        {
            id: '617',
            title: strings("District.lbl_cuddalore"),
        },
        {
            id: '604',
            title: strings("District.lbl_kancheepuram"),
        },
        {
            id: '629',
            title: strings("District.lbl_kanniyakumari"),
        },
        {
            id: '618',
            title: strings("District.lbl_nagapattinam"),
        },
        {
            id: '621',
            title: strings("District.lbl_pudukkottai"),
        },
        {
            id: '626',
            title: strings("District.lbl_ramanathapuram"),
        },
        {
            id: '620',
            title: strings("District.lbl_thanjavur"),
        },
        {
            id: '602',
            title: strings("District.lbl_thiruvallur"),
        },
        {
            id: '619',
            title: strings("District.lbl_thiruvarur"),
        },
        {
            id: '627',
            title: strings("District.lbl_thoothukkudi"),
        },
        {
            id: '628',
            title: strings("District.lbl_tirunelveli"),
        },
        {
            id: '607',
            title: strings("District.lbl_viluppuram"),
        },
    ]);

    const [West_Bengal_District, setWest_Bengal_District] = useState([
        {
            id: '341',
            title: strings("District.lbl_haora"),
        },
        {
            id: '338',
            title: strings("District.lbl_hugli"),
        },
        {
            id: '342',
            title: strings("District.lbl_kolkata"),
        },
        {
            id: '337',
            title: strings("District.lbl_north_twenty_four_parganas"),
        },
        {
            id: '344',
            title: strings("District.lbl_paschim_medinipur"),
        },
        {
            id: '345',
            title: strings("District.lbl_purba_medinipur"),
        },
        {
            id: '343',
            title: strings("District.lbl_south_twenty_four_parganas"),
        },
    ]);

    useEffect(() => {
        getUserProfile();
        // if (flag === true)
        //   getData();
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);

    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    const getUserProfile = async () => {
        setLoader(true);
        // this.setState({isAPILoading: true});
        const Token = await AsyncStorage.getItem('loginToken');
        const getProfileData = await dispatch(GetProfile(Token));
        console.log(getProfileData.data, "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{")
        setUserType(getProfileData.data.type)
        setProfileData(getProfileData.data);
        setFirstName(getProfileData.data.name)
        setUserName(getProfileData.data.username);
        setEmail(getProfileData.data.email);
        setMobileNumber(getProfileData.data.mobile);
        setDOB(getProfileData.data.date_of_birth ? getProfileData.data.date_of_birth : '10 - 10 - 2002');
        setStateName(getProfileData.data.state);
        setdistrictName(getProfileData.data.district);
        setRelative1MobileNumber(getProfileData.data.relative_mobile_number_1 ? getProfileData.data.relative_mobile_number_1 : '9090909090');
        setRelative2MobileNumber(getProfileData.data.relative_mobile_number_2 ? getProfileData.data.relative_mobile_number_2 : '9191919191');
        setRelative3MobileNumber(getProfileData.data.relative_mobile_number_3);
        setRelative4MobileNumber(getProfileData.data.relative_mobile_number_4);
        setRelative5MobileNumber(getProfileData.data.relative_mobile_number_5);
        setLoader(false);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log(moment(currentDate).format('YYYY/MM/DD'), '======');
        setShow(Platform.OS === 'ios');
        setDOB(moment(currentDate).format('YYYY/MM/DD'));
    };

    const showMode = currentMode => {
        if (fieldEdit === false) {
            setShow(false);
        } else {
            setShow(true);
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const onToggle = item => {
        setStateName(item.title);
        setdistrictName(strings("CrowdSourcingFirst.lbl_select_district"))
        setStateToggle(false);
        setdistrictToggle(false);

    };
    const districtonToggle = item => {
        setdistrictName(item.title);
        setdistrictToggle(false);
    };

    const stateRenderItem = ({ item }) => {
        return <Item item={item} onPress={() => onToggle(item)} />;
    };
    const districtRenderItem = ({ item }) => {
        return <Item item={item} onPress={() => districtonToggle(item)} />;
    };

    const Item = ({ item, onPress }) => (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.item}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 13 }}>
                        <CustomText fontSize={17} regular style={styles.title}>{item.title}</CustomText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
    const VideoItem = ({ item, onPress }) => (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.item}>
                <Image source={item.uri} />

                <View style={{ position: 'absolute', alignSelf: 'center', marginVertical: "40%" }}>
                    <Image
                        source={require('../../../../assets/VideoPlay.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </View>
                {/* </TouchableOpacity>
        </View> */}

                {/* </View> */}
            </TouchableOpacity>
        </View>
    );

    const submit = async () => {
        if (userType === "admin") {
            if (firstName === '') {
                dropDownAlertRef.alertWithType('error', 'DCRA', strings("Registration.msg_enter_fullname"));
                return
            }
            if (userName === '') {
                dropDownAlertRef.alertWithType('error', 'DCRA', strings("Registration.msg_enter_username"));
                return
            }
            if (email === '') {
                dropDownAlertRef.alertWithType(
                    'error', 'DCRA',
                    strings("Registration.msg_enter_email"),
                );
                return
            }
            setLoader(true)
            const Token = await AsyncStorage.getItem('loginToken');


            const editProfileData = await dispatch(
                EditProfile(
                    Token,
                    firstName,
                    userName,
                    // device_id,
                    // device_type,
                    email,
                    mobileNumber,
                    DOB,
                    // password,
                    stateName,
                    districtName,
                    relative1MobileNumber,
                    relative2MobileNumber,
                    relative3MobileNumber,
                    relative4MobileNumber,
                    relative5MobileNumber,
                ),
            );
            if (editProfileData.status == 200) {

                setLoader(false);
                navigation.navigate('Dashboard')
            } else {
                setLoader(false);
                dropDownAlertRef.alertWithType('error', 'DCRA', editProfileData.message);
            }
        } else if (userType === "user") {
            if (firstName === '') {
                dropDownAlertRef.alertWithType('error', 'DCRA', strings("Registration.msg_enter_fullname"));
                // this.showErrorMessage(RegisterErrorTitle, 'Firstname required', 5000);
                return
            }
            if (userName === '') {
                dropDownAlertRef.alertWithType('error', 'DCRA', strings("Registration.msg_enter_username"));
                // this.showErrorMessage(RegisterErrorTitle, 'Username required', 5000);
                return
            }
            if (email === '') {
                dropDownAlertRef.alertWithType(
                    'error', 'DCRA',
                    strings("Registration.msg_enter_email"),
                );
                return
            }
            if (mobileNumber === '') {
                dropDownAlertRef.alertWithType(
                    'error', 'DCRA',
                    strings("Registration.msg_enter_mobilenumber"),
                );
                return
            }
            if (DOB === '') {
                dropDownAlertRef.alertWithType(
                    'error', 'DCRA',
                    strings("Registration.msg_select_dob"),
                );
                return
            }

            if (relative1MobileNumber === '') {
                dropDownAlertRef.alertWithType(
                    'error', 'DCRA',
                    strings("Registration.msg_enter_atleast_one_relative_number"),
                );
                return
            }
            setLoader(true)
            const Token = await AsyncStorage.getItem('loginToken');


            const editProfileData = await dispatch(
                EditProfile(
                    Token,
                    firstName,
                    userName,
                    // device_id,
                    // device_type,
                    email,
                    mobileNumber,
                    DOB,
                    // password,
                    stateName,
                    districtName,
                    relative1MobileNumber,
                    relative2MobileNumber,
                    relative3MobileNumber,
                    relative4MobileNumber,
                    relative5MobileNumber,
                ),
            );
            if (editProfileData.status == 200) {

                setLoader(false);
                navigation.navigate('Dashboard')
            } else {
                setLoader(false);
                dropDownAlertRef.alertWithType('error', 'DCRA', editProfileData.message);
            }
        } else {
            if (firstName === '') {
                dropDownAlertRef.alertWithType('error', 'DCRA', strings("Registration.msg_enter_fullname"));
                // this.showErrorMessage(RegisterErrorTitle, 'Firstname required', 5000);
                return
            }
            if (userName === '') {
                dropDownAlertRef.alertWithType('error', 'DCRA', strings("Registration.msg_enter_username"));
                // this.showErrorMessage(RegisterErrorTitle, 'Username required', 5000);
                return
            }
            if (email === '') {
                dropDownAlertRef.alertWithType(
                    'error', 'DCRA',
                    strings("Registration.msg_enter_email"),
                );
                return
            }
            if (mobileNumber === '') {
                dropDownAlertRef.alertWithType(
                    'error', 'DCRA',
                    strings("Registration.msg_enter_mobilenumber"),
                );
                return
            }
            if (DOB === '') {
                dropDownAlertRef.alertWithType(
                    'error', 'DCRA',
                    strings("Registration.msg_select_dob"),
                );
                return
            }
            if (stateName === strings("CrowdSourcingFirst.lbl_select_state") || stateName === null) {
                dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_state_required"));
                return;
            }
            if (districtName === strings("CrowdSourcingFirst.lbl_select_district") || districtName === null) {
                dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.msg_district_required"));
                return;
            }
            if (relative1MobileNumber === '') {
                dropDownAlertRef.alertWithType(
                    'error', 'DCRA',
                    strings("Registration.msg_enter_atleast_one_relative_number"),
                );
                return
            }
            setLoader(true)
            const Token = await AsyncStorage.getItem('loginToken');

            const editProfileData = await dispatch(
                EditProfile(
                    Token,
                    firstName,
                    userName,
                    // device_id,
                    // device_type,
                    email,
                    mobileNumber,
                    DOB,
                    // password,
                    stateName,
                    districtName,
                    relative1MobileNumber,
                    relative2MobileNumber,
                    relative3MobileNumber,
                    relative4MobileNumber,
                    relative5MobileNumber,
                ),
            );
            if (editProfileData.status == 200) {

                setLoader(false);
                navigation.navigate('Dashboard')
            } else {
                setLoader(false);
                dropDownAlertRef.alertWithType('error', 'DCRA', editProfileData.message);
            }
        }

    }


    const edit = () => {
        if (fieldEdit === true) {
            setEditField(false)
            setCollapsFlag(true)
        } else {
            setEditField(true)
            setFocusField(true)
            setCollapsFlag(false)
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
                                onPress={() => navigation.goBack()}
                                style={{ width: '15%' }}>
                                <Image
                                    source={require('../../../../assets/Back_Arrow_White.png')}
                                />
                            </TouchableOpacity>
                            <View style={{ width: "65%" }}>
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
                                    {strings("Profile.lbl_profile")}

                                </CustomText>
                            </View>
                            {fieldEdit === true ? (
                                <View style={(styles.bell, [{ flexDirection: 'row', width: "20%", justifyContent: 'flex-end' }])}>
                                    <CustomText style={{ color: "#fff", textAlign: "center" }}>{strings("Common.button_save")}</CustomText>
                                </View>
                            ) : (

                                <View style={(styles.bell, [{ flexDirection: 'row', width: "20%", justifyContent: 'flex-end' }])}>
                                    <TouchableOpacity onPress={() => edit()}>
                                        <View>
                                            <Image
                                                source={require('../../../../assets/Edit-White.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </LinearGradient>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    {userType === "admin" ? (
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={{ paddingHorizontal: 10, marginTop: 40 }}>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        fontSize={14}
                                        regular
                                        style={{
                                            // fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings("Registration.lbl_fullname")}
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        maxLength={20}
                                        value={firstName}
                                        returnKeyType={"next"}
                                        autoFocus={focusField}
                                        editable={fieldEdit}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                            color: '#0D2451',
                                        }}
                                        onChangeText={firstName => setFirstName(firstName)}
                                    />
                                </View>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        fontSize={14}
                                        regular
                                        style={{
                                            // fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings("Registration.lbl_username")}
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        maxLength={20}
                                        value={userName}
                                        editable={fieldEdit}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                            color: '#0D2451',
                                        }}
                                        onChangeText={userName => setUserName(userName)}
                                    />
                                </View>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        regular
                                        fontSize={14}
                                        style={{
                                            // fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings("Registration.lbl_email")} <CustomText style={{ color: 'red' }}>*</CustomText>
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        maxLength={250}
                                        keyboardType={'email-address'}
                                        editable={fieldEdit}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            color: '#0D2451',
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                        }}
                                        value={email}
                                        onChangeText={email => setEmail(email)}
                                    />
                                </View>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        regular
                                        fontSize={14}
                                        style={{
                                            // fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings("Registration.lbl_mobile_number")} <CustomText style={{ color: 'red' }}>*</CustomText>
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        maxLength={10}
                                        editable={fieldEdit}
                                        value={mobileNumber}
                                        keyboardType={'numeric'}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            color: '#0D2451',
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                        }}
                                        onChangeText={mobileNumber =>
                                            setMobileNumber(mobileNumber)
                                        }
                                    />
                                </View>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        regular
                                        style={{
                                            fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings('Registration.lbl_dob')}{' '}
                                        <CustomText style={{ color: 'red' }}>*</CustomText>
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        editable={fieldEdit}
                                        value={DOB}
                                        keyboardType={'numeric'}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            color: '#0D2451',
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                        }}
                                        onChangeText={DOB =>
                                            setDOB(DOB)
                                        }
                                    />
                                </View>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        regular
                                        style={{
                                            fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings('Registration.lbl_address')}{' '}
                                        <CustomText style={{ color: 'red' }}>*</CustomText>
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        editable={fieldEdit}
                                        value={Address}
                                        keyboardType={'numeric'}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            color: '#0D2451',
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                        }}
                                        onChangeText={address =>
                                            setAddress(address)
                                        }
                                    />
                                </View>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        regular
                                        style={{
                                            fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings('Registration.lbl_relative_mobile_number')}{' '}
                                        <CustomText style={{ color: 'red' }}>*</CustomText>
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        editable={fieldEdit}
                                        value={relative1MobileNumber}
                                        keyboardType={'numeric'}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            color: '#0D2451',
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                        }}
                                        onChangeText={relative1MobileNumber =>
                                            setRelative1MobileNumber(relative1MobileNumber)
                                        }
                                    />
                                </View>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        regular
                                        style={{
                                            fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings('Registration.lbl_relative_name')}{' '}
                                        <CustomText style={{ color: 'red' }}>*</CustomText>
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        editable={fieldEdit}
                                        value={relaNameOne}
                                        keyboardType={'numeric'}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            color: '#0D2451',
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                        }}
                                        onChangeText={relaNameOne =>
                                            setRelaNameOne(relaNameOne)
                                        }
                                    />
                                </View>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        regular
                                        style={{
                                            fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings('Registration.lbl_relative_two_number')}{' '}
                                        <CustomText style={{ color: 'red' }}>*</CustomText>
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        editable={fieldEdit}
                                        value={relative2MobileNumber}
                                        keyboardType={'numeric'}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            color: '#0D2451',
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                        }}
                                        onChangeText={relative2MobileNumber =>
                                            setRelative2MobileNumber(relative2MobileNumber)
                                        }
                                    />
                                </View>
                                <View style={{ marginTop: '5%' }}>
                                    <CustomText
                                        regular
                                        style={{
                                            fontSize: 14,
                                            color: '#000000',
                                            // fontFamily: 'OpenSans-Regular',
                                            fontWeight: '400',
                                        }}>
                                        {strings('Registration.lbl_relative_two_name')}{' '}
                                        <CustomText style={{ color: 'red' }}>*</CustomText>
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: '#DFDFDF',
                                        marginTop: 5,
                                    }}>
                                    <TextInput
                                        editable={fieldEdit}
                                        value={relaNameTwo}
                                        keyboardType={'numeric'}
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 17,
                                            color: '#0D2451',
                                            fontFamily: 'OpenSans-Regular',
                                            fontWeight: '600',
                                        }}
                                        onChangeText={relaNameTwo =>
                                            setRelaNameTwo(relaNameTwo)
                                        }
                                    />
                                </View>








                                <TouchableOpacity
                                    // onPress={() => navigation.navigate('Dashboard')}
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
                                        <CustomText
                                            fontSize={18}
                                            regular
                                            style={{
                                                // fontSize: 18,
                                                color: '#fff',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '700',
                                            }}>
                                            {strings("Common.button_save")}
                                        </CustomText>
                                    </View>
                                    <View>
                                        <Image
                                            source={require('../../../../assets/Login_Arrow.png')}
                                            style={{ width: 27.5, height: 26.7 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={{ paddingHorizontal: 10 }}>
                            {userType === "user" ? (
                                <View style={{ paddingHorizontal: 10, marginTop: 40 }}>
                                    <View>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_fullname")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={20}
                                            value={firstName}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={firstName => setFirstName(firstName)}
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            regular
                                            fontSize={14}
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_username")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={20}
                                            value={userName}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={userName => setUserName(userName)}
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_email")} <CustomText style={{ color: 'red' }}>*</CustomText>
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={250}
                                            keyboardType={'email-address'}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                color: '#0D2451',
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                            }}
                                            value={email}
                                            onChangeText={email => setEmail(email)}
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_mobile_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            editable={fieldEdit}
                                            keyboardType={'numeric'}
                                            value={mobileNumber}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_dob")}
                                        </CustomText>
                                    </View>
                                    <TouchableOpacity onPress={showDatepicker}>
                                        <View
                                            style={{
                                                borderWidth: 1,
                                                borderRadius: 12,
                                                borderColor: '#DFDFDF',
                                                marginTop: 5,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                padding: 12,
                                            }}>
                                            <View>
                                                <CustomText
                                                    regular
                                                    fontSize={17}
                                                    style={{
                                                        // fontSize: 17,
                                                        color: '#000000',
                                                        // fontFamily: 'OpenSans-Regular',
                                                        fontWeight: '600',
                                                    }}>
                                                    {DOB}
                                                </CustomText>
                                            </View>
                                            <View>
                                                <Image
                                                    source={require('../../../../assets/Calendar.png')}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={mode}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}

                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            regular
                                            fontSize={14}
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_mobile_number")} <CustomText style={{ color: 'red' }}>*</CustomText>
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative1MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative1MobileNumber =>
                                                setRelative1MobileNumber(relative1MobileNumber)
                                            }
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_two_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative2MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative2MobileNumber =>
                                                setRelative2MobileNumber(relative2MobileNumber)
                                            }
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_three_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative3MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative3MobileNumber =>
                                                setRelative3MobileNumber(relative3MobileNumber)
                                            }
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_four_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative4MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative4MobileNumber =>
                                                setRelative4MobileNumber(relative4MobileNumber)
                                            }
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_five_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative5MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative5MobileNumber =>
                                                setRelative5MobileNumber(relative5MobileNumber)
                                            }
                                        />
                                    </View>
                                    <TouchableOpacity
                                        // onPress={() => navigation.navigate('Dashboard')}
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
                                            <CustomText
                                                regular
                                                fontSize={18}
                                                style={{
                                                    // fontSize: 18,
                                                    color: '#fff',
                                                    // fontFamily: 'OpenSans-Regular',
                                                    fontWeight: '700',
                                                }}>
                                                {strings("Common.button_save")}
                                            </CustomText>
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../../assets/Login_Arrow.png')}
                                                style={{ width: 27.5, height: 26.7 }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={{ paddingHorizontal: 10, marginTop: 40 }}>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_fullname")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={20}
                                            value={firstName}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={firstName => setFirstName(firstName)}
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_username")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={20}
                                            value={userName}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={userName => setUserName(userName)}
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_email")} <CustomText style={{ color: 'red' }}>*</CustomText>
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={250}
                                            keyboardType={'email-address'}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                color: '#0D2451',
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                            }}
                                            value={email}
                                            onChangeText={email => setEmail(email)}
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_mobile_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            editable={fieldEdit}
                                            keyboardType={'numeric'}
                                            value={mobileNumber}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_dob")}
                                        </CustomText>
                                    </View>
                                    <TouchableOpacity onPress={showDatepicker}>
                                        <View
                                            style={{
                                                borderWidth: 1,
                                                borderRadius: 12,
                                                borderColor: '#DFDFDF',
                                                marginTop: 5,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                padding: 12,
                                            }}>
                                            <View>
                                                <CustomText
                                                    regular
                                                    fontSize={17}
                                                    style={{
                                                        // fontSize: 17,
                                                        color: '#000000',
                                                        // fontFamily: 'OpenSans-Regular',
                                                        fontWeight: '600',
                                                    }}>
                                                    {DOB}
                                                </CustomText>
                                            </View>
                                            <View>
                                                <Image
                                                    source={require('../../../../assets/Calendar.png')}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={mode}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("CrowdSourcingFile.lbl_state")} <CustomText style={{ color: 'red' }}>*</CustomText>
                                        </CustomText>
                                    </View>
                                    <Collapse
                                        style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
                                        isExpanded={stateToggle}
                                        disabled={collapseFlag}
                                        onToggle={isExpanded => setStateToggle(isExpanded)}>
                                        <CollapseHeader
                                            style={{
                                                borderRadius: 14,
                                                borderWidth: 1,
                                                borderColor: '#DFDFDF',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                paddingVertical: 17,
                                                paddingHorizontal: 10,
                                                alignItems: 'center',
                                            }}>
                                            <View>
                                                <CustomText>{stateName}</CustomText>
                                            </View>
                                            <Image
                                                source={require('../../../../assets/DownArrow.png')}
                                            //   style={{width: 22, height: 20}}
                                            // resizeMode={'stretch'}
                                            />
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <FlatList
                                                style={{ paddingVertical: 10 }}
                                                data={contryState}
                                                renderItem={stateRenderItem}
                                                keyExtractor={item => item.id}
                                            />
                                        </CollapseBody>
                                    </Collapse>
                                    {/* </View> */}
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("CrowdSourcingFile.lbl_district")} <CustomText style={{ color: 'red' }}>*</CustomText>
                                        </CustomText>
                                    </View>
                                    {stateName === strings("CountryState.lbl_gujarat") ? (
                                        <Collapse
                                            style={{
                                                borderWidth: 1,
                                                borderRadius: 15,
                                                borderColor: '#DFDFDF',
                                            }}
                                            isExpanded={districtToggle}
                                            disabled={collapseFlag}
                                            onToggle={isExpanded => setdistrictToggle(isExpanded)}>
                                            <CollapseHeader
                                                style={{
                                                    borderRadius: 14,
                                                    borderWidth: 1,
                                                    borderColor: '#DFDFDF',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    paddingVertical: 17,
                                                    paddingHorizontal: 10,
                                                    alignItems: 'center',
                                                }}>
                                                <View>
                                                    <CustomText>{districtName}</CustomText>
                                                </View>
                                                <Image
                                                    source={require('../../../../assets/DownArrow.png')}
                                                //   style={{width: 22, height: 20}}
                                                // resizeMode={'stretch'}
                                                />
                                            </CollapseHeader>
                                            <CollapseBody>
                                                <FlatList
                                                    style={{ paddingVertical: 10 }}
                                                    data={gujaratDistrict}
                                                    renderItem={districtRenderItem}
                                                    keyExtractor={item => item.id}
                                                />
                                            </CollapseBody>
                                        </Collapse>
                                    ) : (
                                        <Collapse
                                            style={{
                                                borderWidth: 1,
                                                borderRadius: 15,
                                                borderColor: '#DFDFDF',
                                            }}
                                            isExpanded={districtToggle}
                                            disabled={collapseFlag}
                                            onToggle={isExpanded => setdistrictToggle(isExpanded)}>
                                            <CollapseHeader
                                                style={{
                                                    borderRadius: 14,
                                                    borderWidth: 1,
                                                    borderColor: '#DFDFDF',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    paddingVertical: 17,
                                                    paddingHorizontal: 10,
                                                    alignItems: 'center',
                                                }}>
                                                <View>
                                                    <CustomText>{districtName}</CustomText>
                                                </View>
                                                <Image
                                                    source={require('../../../../assets/DownArrow.png')}
                                                //   style={{width: 22, height: 20}}
                                                // resizeMode={'stretch'}
                                                />
                                            </CollapseHeader>
                                            {stateName === strings("CountryState.lbl_andaman_nicobar_islands") ? (
                                                <CollapseBody>
                                                    <FlatList
                                                        style={{ paddingVertical: 10 }}
                                                        data={Andaman_Nicobar_Islands_District}
                                                        renderItem={districtRenderItem}
                                                        keyExtractor={item => item.id}
                                                    />
                                                </CollapseBody>
                                            ) : (
                                                <CollapseBody>
                                                    {stateName === strings("CountryState.lbl_andhra_pradesh") ? (
                                                        <View>
                                                            <FlatList
                                                                style={{ paddingVertical: 10 }}
                                                                data={Andhra_Pradesh_District}
                                                                renderItem={districtRenderItem}
                                                                keyExtractor={item => item.id}
                                                            />
                                                        </View>
                                                    ) : (
                                                        <View>
                                                            {stateName === strings("CountryState.lbl_daman_diu") ? (
                                                                <FlatList
                                                                    style={{ paddingVertical: 10 }}
                                                                    data={Daman_Diu_District}
                                                                    renderItem={districtRenderItem}
                                                                    keyExtractor={item => item.id}
                                                                />
                                                            ) : (
                                                                <View>
                                                                    {stateName === strings("CountryState.lbl_goa") ? (
                                                                        <FlatList
                                                                            style={{ paddingVertical: 10 }}
                                                                            data={Goa_District}
                                                                            renderItem={districtRenderItem}
                                                                            keyExtractor={item => item.id}
                                                                        />
                                                                    ) : (
                                                                        <View>
                                                                            {stateName === strings("CountryState.lbl_karnataka") ? (
                                                                                <FlatList
                                                                                    style={{ paddingVertical: 10 }}
                                                                                    data={Karnataka_District}
                                                                                    renderItem={districtRenderItem}
                                                                                    keyExtractor={item => item.id}
                                                                                />
                                                                            ) : (
                                                                                <View>
                                                                                    {stateName === strings("CountryState.lbl_kerala") ? (
                                                                                        <FlatList
                                                                                            style={{ paddingVertical: 10 }}
                                                                                            data={Karnataka_District}
                                                                                            renderItem={districtRenderItem}
                                                                                            keyExtractor={item => item.id}
                                                                                        />
                                                                                    ) : (
                                                                                        <View>
                                                                                            {stateName === strings("CountryState.lbl_lakshadweep") ? (
                                                                                                <FlatList
                                                                                                    style={{ paddingVertical: 10 }}
                                                                                                    data={Lakshadweep_District}
                                                                                                    renderItem={districtRenderItem}
                                                                                                    keyExtractor={item => item.id}
                                                                                                />
                                                                                            ) : (
                                                                                                <View>
                                                                                                    {stateName === strings("CountryState.lbl_maharashtra") ? (
                                                                                                        <FlatList
                                                                                                            style={{ paddingVertical: 10 }}
                                                                                                            data={Maharashtra_District}
                                                                                                            renderItem={districtRenderItem}
                                                                                                            keyExtractor={item => item.id}
                                                                                                        />
                                                                                                    ) : (
                                                                                                        <View>
                                                                                                            {stateName === strings("CountryState.lbl_odisha") ? (
                                                                                                                <FlatList
                                                                                                                    style={{
                                                                                                                        paddingVertical: 10,
                                                                                                                    }}
                                                                                                                    data={Odisha_District}
                                                                                                                    renderItem={
                                                                                                                        districtRenderItem
                                                                                                                    }
                                                                                                                    keyExtractor={item =>
                                                                                                                        item.id
                                                                                                                    }
                                                                                                                />
                                                                                                            ) : (
                                                                                                                <View>
                                                                                                                    {stateName ===
                                                                                                                        strings("CountryState.lbl_puducherry") ? (
                                                                                                                        <FlatList
                                                                                                                            style={{
                                                                                                                                paddingVertical: 10,
                                                                                                                            }}
                                                                                                                            data={
                                                                                                                                Puducherry_District
                                                                                                                            }
                                                                                                                            renderItem={
                                                                                                                                districtRenderItem
                                                                                                                            }
                                                                                                                            keyExtractor={item =>
                                                                                                                                item.id
                                                                                                                            }
                                                                                                                        />
                                                                                                                    ) : (
                                                                                                                        <View>
                                                                                                                            {stateName ===
                                                                                                                                strings("CountryState.lbl_tamil_nadu") ? (
                                                                                                                                <FlatList
                                                                                                                                    style={{
                                                                                                                                        paddingVertical: 10,
                                                                                                                                    }}
                                                                                                                                    data={
                                                                                                                                        Tamil_Nadu_District
                                                                                                                                    }
                                                                                                                                    renderItem={
                                                                                                                                        districtRenderItem
                                                                                                                                    }
                                                                                                                                    keyExtractor={item =>
                                                                                                                                        item.id
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            ) : (
                                                                                                                                <View>
                                                                                                                                    {stateName === strings("CountryState.lbl_west_bengal") ? (
                                                                                                                                        <FlatList
                                                                                                                                            style={{
                                                                                                                                                paddingVertical: 10,
                                                                                                                                            }}
                                                                                                                                            data={
                                                                                                                                                West_Bengal_District
                                                                                                                                            }
                                                                                                                                            renderItem={
                                                                                                                                                districtRenderItem
                                                                                                                                            }
                                                                                                                                            keyExtractor={item =>
                                                                                                                                                item.id
                                                                                                                                            }
                                                                                                                                        />
                                                                                                                                    ) : (
                                                                                                                                        <View>


                                                                                                                                        </View>
                                                                                                                                    )}

                                                                                                                                </View>
                                                                                                                            )}
                                                                                                                        </View>
                                                                                                                    )}
                                                                                                                </View>
                                                                                                            )}
                                                                                                        </View>
                                                                                                    )}
                                                                                                </View>
                                                                                            )}
                                                                                        </View>
                                                                                    )}
                                                                                </View>
                                                                            )}
                                                                        </View>
                                                                    )}
                                                                </View>
                                                            )}
                                                        </View>
                                                    )}
                                                </CollapseBody>
                                            )}
                                        </Collapse>
                                    )}
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_mobile_number")} <CustomText style={{ color: 'red' }}>*</CustomText>
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative1MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative1MobileNumber =>
                                                setRelative1MobileNumber(relative1MobileNumber)
                                            }
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_two_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative2MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative2MobileNumber =>
                                                setRelative2MobileNumber(relative2MobileNumber)
                                            }
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_three_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative3MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative3MobileNumber =>
                                                setRelative3MobileNumber(relative3MobileNumber)
                                            }
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            regular
                                            fontSize={14}
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_four_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative4MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative4MobileNumber =>
                                                setRelative4MobileNumber(relative4MobileNumber)
                                            }
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>
                                        <CustomText
                                            fontSize={14}
                                            regular
                                            style={{
                                                // fontSize: 14,
                                                color: '#000000',
                                                // fontFamily: 'OpenSans-Regular',
                                                fontWeight: '400',
                                            }}>
                                            {strings("Registration.lbl_relative_five_number")}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            borderColor: '#DFDFDF',
                                            marginTop: 5,
                                        }}>
                                        <TextInput
                                            maxLength={10}
                                            keyboardType={'numeric'}
                                            value={relative5MobileNumber}
                                            editable={fieldEdit}
                                            style={{
                                                paddingHorizontal: 10,
                                                fontSize: 17,
                                                fontFamily: 'OpenSans-Regular',
                                                fontWeight: '600',
                                                color: '#0D2451',
                                            }}
                                            onChangeText={relative5MobileNumber =>
                                                setRelative5MobileNumber(relative5MobileNumber)
                                            }
                                        />
                                    </View>
                                    <TouchableOpacity
                                        // onPress={() => navigation.navigate('Dashboard')}
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
                                            <CustomText
                                                fontSize={18}
                                                regular
                                                style={{
                                                    // fontSize: 18,
                                                    color: '#fff',
                                                    // fontFamily: 'OpenSans-Regular',
                                                    fontWeight: '700',
                                                }}>
                                                {strings("Common.button_save")}
                                            </CustomText>
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../../assets/Login_Arrow.png')}
                                                style={{ width: 27.5, height: 26.7 }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}

                        </View>
                    )
                    }

                </ScrollView >
                <DropdownAlert
                    ref={ref => {
                        if (ref) {
                            dropDownAlertRef = ref;
                        }
                    }}
                />

            </SafeAreaView >
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
        // fontSize: 17,
        // fontFamily: 'OpenSans-Regular',
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
        fontSize: 17,
    },
    textTitle: {
        fontFamily: 'OpenSans-Regular',
        fontWeight: '400',
        fontSize: 14,
    },
    item: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: 5,
        marginTop: 2,
        borderRadius: 40,
    },
    title: {
        marginTop: 20,
        // fontWeight: "bold",
        fontSize: 14,
        fontFamily: 'Metropolis_SemiBold',
    },
});

export default Profile;
