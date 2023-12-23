import React, { useRef, useState, useEffect } from 'react';
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
  BackHandler,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from "react-native-image-crop-picker";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { strings } from "../../../localization/i18n"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SendFeedBackData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { CustomText } from '../../../Component/Text';


const FeedBack = ({ navigation }) => {
  let dropDownAlertRef = useRef();

  const dispatch = useDispatch();
  // const [stateName, setStateName] = useState('Select State');
  let [loader, setLoader] = useState(false)
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [type, setType] = useState('');
  var [value, setValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  var radio_props = [
    { label: strings("FeedBack.lbl_comment"), value: 0 },
    { label: strings("FeedBack.lbl_suggestion"), value: 1 },
    { label: strings("FeedBack.lbl_question"), value: 2 },
  ];

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  const submitFeedback = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    if (comment == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("FeedBack.lbl_write_your_msg"));
      return;
    }
    if (firstName == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("FeedBack.msg_enter_fullname"));
      return;
    }
    if (email == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("FeedBack.msg_enter_email"));
      return;
    }

    // setLoader(true);

    if (value === 0) {
      const commentType = "comment"
      const sendFeedData = await dispatch(
        SendFeedBackData(
          Token,
          commentType,
          comment,
          firstName,
          email,
        ),
      );
      if (sendFeedData.status == 200) {
        // setLoader(false)
        setEmail(''),
          setFirstName(''),
          setComment(''),
          dropDownAlertRef.alertWithType('success', 'DCRA', strings("FeedBack.msg_feedback_submitted"));
        // navigation.navigate('Dashboard');
      } else {
        setEmail(''),
          setFirstName(''),
          setComment(''),
          // setLoader(false)
          dropDownAlertRef.alertWithType('error', 'Error', sendFeedData.message);
      }
    }
    if (value === 1) {
      const commentType = "suggestion"
      const sendFeedData = await dispatch(
        SendFeedBackData(
          Token,
          commentType,
          comment,
          firstName,
          email,
        ),
      );
      if (sendFeedData.status == 200) {
        setEmail(''),
          setFirstName(''),
          setComment(''),
          setLoader(false)
        dropDownAlertRef.alertWithType('success', 'DCRA', strings("FeedBack.msg_feedback_submitted"));
        // navigation.navigate('Dashboard');
      } else {
        setEmail(''),
          setFirstName(''),
          setComment(''),
          setLoader(false)
        dropDownAlertRef.alertWithType('error', 'Error', sendFeedData.message);
      }
    }
    if (value === 2) {
      const commentType = "question"
      const sendFeedData = await dispatch(
        SendFeedBackData(
          Token,
          commentType,
          comment,
          firstName,
          email,
        ),
      );
      if (sendFeedData.status == 200) {
        setEmail(''),
          setFirstName(''),
          setComment(''),
          setLoader(false)
        dropDownAlertRef.alertWithType('success', 'DCRA', strings("FeedBack.msg_feedback_submitted"));
        // navigation.navigate('Dashboard');
      } else {
        setEmail(''),
          setFirstName(''),
          setComment(''),
          setLoader(false)
        console.log('errorerrorerrorerrorerrorerror::::::::::', error);
        dropDownAlertRef.alertWithType('error', 'Error', sendFeedData.message);
      }
    }
  }

  const selectGalleryImage = async () => {
    try {

      const pickedImage = await ImagePicker.openPicker({ mediaType: "photo" })

      console.log("Source", pickedImage);
      setSelectedImage({
        uri: pickedImage.path,
        name: pickedImage.filename,
        type: pickedImage.mime
      });
    } catch (error) {
    }
  };

  const removeImg = () => {
    setSelectedImage(null)
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
            {/* <Header> */}
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
                onPress={() => navigation.navigate('Dashboard')}
                style={{ width: '10%' }}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: "80%" }}>
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
                  {strings("FeedBack.lbl_feedback")}
                </CustomText>
              </View>

              <View style={styles.bell}></View>
            </View>

            {/* </Header> */}
          </View>
        </LinearGradient>
        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <CustomText
              fontSize={16}
              regular
              style={{
                textAlign: 'center',
                // fontFamily: 'OpenSans-Regular',
                // fontSize: 16,
                color: '#000',
                fontWeight: '700',
              }}>
              {strings("FeedBack.lbl_hear_your_thoughts")}
            </CustomText>
          </View>
          <View>
            <CustomText
              fontSize={16}
              regular
              style={{
                // fontFamily: 'OpenSans-Regular',
                // fontSize: 16,
                color: '#000',
                fontWeight: '600',
              }}>
              {strings("FeedBack.lbl_feedback_type")}
            </CustomText>
          </View>
          <View style={{ marginVertical: 10 }}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              labelStyle={{ marginRight: 5, fontSize: 14, fontFamily: 'OpenSans-Regular' }}
              // style={{marginHorizontal: 5}}
              formHorizontal={true}
              buttonColor={"rgba(0, 0, 0, 0.3)"}
              buttonSize={15}
              onPress={value => setValue(value)}
            // onPress={value => console.log(value, "=----======----------===")}
            />
          </View>
          <View>
            <View
              style={{
                borderWidth: 1,
                marginVertical: 10,
                borderRadius: 15,
                padding: 10,
                // height: 450,
                justifyContent: 'flex-start'
              }}>
              {/* <TextInput
                placeholder={'Write here...'}
                style={{
                  justifyContent: "flex-start"
               }}
                multiline={true}
                // numberOfLines={4}
                value={comment}
                // style={{
                //   paddingHorizontal: 10,
                //   fontSize: 17,
                //   fontFamily: 'OpenSans-Regular',
                //   fontWeight: '600',
                //   color: '#0D2451',
                // }}
                onChangeText={comment => setComment(comment)}
              /> */}
              <AutoGrowingTextInput
                style={[styles.textInput, { color: '#0D2451', }]}
                placeholder={strings("CreatePost.hint_your_message")}
                value={comment}
                onChangeText={comment => setComment(comment)}
              />

            </View>
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
              {strings("Registration.lbl_fullname")} <CustomText style={{ color: 'red' }}>*</CustomText>
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
              value={email}
              keyboardType='email-address'
              style={{
                paddingHorizontal: 10,
                fontSize: 17,
                fontFamily: 'OpenSans-Regular',
                fontWeight: '600',
                color: '#0D2451',
              }}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={{ marginTop: '5%' }}>
            <CustomText
              fontSize={14}
              regular
              style={{
                color: '#000000',
                fontWeight: '400',
              }}>
              {strings("FeedBack.lbl_upload_image")}
            </CustomText>
            <TouchableOpacity onPress={selectGalleryImage} style={{ marginTop: 20 }}>
              <Image style={{ height: 24, width: 24 }} source={require('../../../../assets/upload.png')} />
            </TouchableOpacity>
            {selectedImage &&
              <View style={{ width: 150 }}>
                <Image source={{ uri: selectedImage.uri }} style={{ height: 150, width: 150, marginTop: 10 }} />
                <TouchableOpacity onPress={() => { removeImg() }} style={{ position: 'absolute', top: 2, right: 0, }}>
                  <Image source={require('../../../../assets/Cross.png')} style={{ height: 20, width: 20, borderRadius: 10 }} />
                </TouchableOpacity>
              </View>
            }
          </View>
          <TouchableOpacity
            onPress={() => submitFeedback()}
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
              marginHorizontal: 10,
            }}>
            {/* <View style={{ width: 10 }}></View> */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
                width: "85%"
              }}>
              <CustomText
                numberOfLines={1}
                fontSize={18}
                regular
                style={{
                  // fontSize: 18,
                  color: '#fff',
                  // fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                }}>
                {strings("Common.button_submit")}

              </CustomText>
            </View>
            <View>
              <Image
                source={require('../../../../assets/Login_Arrow.png')}
                style={{ width: 27.5, height: 26.7 }}
              />
            </View>
          </TouchableOpacity>
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
  } else {
    return <ActivityIndicator style={{ justifyContent: 'center', flex: 1 }} />
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 9,
  },
  alertMessage: {
    borderRadius: 25,
    width: 80,
    backgroundColor: '#FB7429',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    marginBottom: 6,
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 2,
    borderRadius: 10,
    marginBottom: 20,
    // marginVertical: 5,
    marginHorizontal: 16,
    // flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 12,
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
  searchBar: {
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '85%',
  },
  filterText: {
    fontSize: 9,
    color: '#3877F1',
    fontFamily: 'OpenSans-Regular',
    fontWeight: '600',
  },
  info: {
    fontSize: 9,
    fontFamily: 'OpenSans-Regular',
    color: '#000',
    marginTop: 3,
  },
  bottomSheetTitleText: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#000',
  },
  resetFilter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resetFilterText: {
    color: '#EB4335',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  TabsFont: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 12,
    color: '#000',
  },
});

export default FeedBack;
