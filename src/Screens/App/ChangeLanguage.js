import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import I18n from 'react-native-i18n';
import CheckBox from '@react-native-community/checkbox';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomText} from '../../Component/Text';
import {moderateScale} from 'react-native-size-matters';
import {strings} from '../../localization/i18n';

const ChangeLanguage = ({route, navigation}) => {
  const [response, setResponse] = useState('');
  const [languageList, setLanguageList] = useState([
    {
      id: 1,
      language: strings('ChangeLanguage.lbl_english'),
      isSelect: 0,
      code: 'en',
    },
    {
      id: 2,
      language: strings('ChangeLanguage.lbl_hindi'),
      isSelect: 0,
      code: 'hi',
    },
    {
      id: 3,
      language: strings('ChangeLanguage.lbl_bengali'),
      isSelect: 0,
      code: 'bn',
    },
    {
      id: 4,
      language: strings('ChangeLanguage.lbl_odiya'),
      isSelect: 0,
      code: 'or',
    },
    {
      id: 5,
      language: strings('ChangeLanguage.lbl_telugu'),
      isSelect: 0,
      code: 'te',
    },
    {
      id: 6,
      language: strings('ChangeLanguage.lbl_tamil'),
      isSelect: 0,
      code: 'ta',
    },
    {
      id: 7,
      language: strings('ChangeLanguage.lbl_malayalam'),
      isSelect: 0,
      code: 'ml',
    },
    {
      id: 8,
      language: strings('ChangeLanguage.lbl_marathi'),
      isSelect: 0,
      code: 'mr',
    },
    {
      id: 9,
      language: strings('ChangeLanguage.lbl_gujarati'),
      isSelect: 0,
      code: 'gu',
    },
    {
      id: 10,
      language: strings('ChangeLanguage.lbl_kannada'),
      isSelect: 0,
      code: 'kn',
    },
    {
      id: 11,
      language: strings('ChangeLanguage.lbl_konkani'),
      isSelect: 0,
      code: 'kok',
    },
  ]);
  const [languageData, setlanguageData] = useState('');
  useEffect(() => {
    console.log('current_lan', I18n.currentLocale());
    if (I18n.currentLocale === 'en-GB') {
      var datum = languageList[0];
      var newNum = 'isSelect';
      var newVal = 1;
      datum[newNum] = newVal;
    } else {
      for (let i = 0; i < languageList.length; i++) {
        if (I18n.currentLocale() == languageList[i].code) {
          var datum = languageList[i];
          var newNum = 'isSelect';
          var newVal = 1;
          datum[newNum] = newVal;
        }
      }
    }

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

  function onPressLanguage(newValue, item, index) {
    let arr = [...languageList];
    let marker = [...languageList];
    if (newValue) {
      marker = languageList.map(el =>
        el.id === item.id ? {...el, isSelect: 1} : {...el, isSelect: 0},
      );
      setLanguageList(marker);
    } else {
      arr[index] = {...arr[index], isSelect: 0};
      setLanguageList(arr);
    }
    setlanguageData(item);
  }

  function submit() {
    I18n.locale = languageData.code;

    // saved language code here in local storage and then only allow next line to execute like pop .. also setted selected language in App.js
    AsyncStorage.setItem('selected_lang_code', languageData.code).then(() => {
      // navigation.pop()
      RNRestart.Restart();
    });

    // navigation.pop()
  }
  const renderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <CheckBox
            value={item.isSelect == 0 ? false : true}
            onValueChange={newValue => {
              onPressLanguage(newValue, item, index);
            }}
            tintColors
          />
          <CustomText
            semibold
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: item.isSelect == 0 ? '#000' : '#3877F1',
              fontSize: moderateScale(14),
              paddingLeft: 10,
            }}>
            {item.language}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3877F1" />
      <LinearGradient
        colors={['#3877F1', '#215ACA']}
        style={styles.linearGradient}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image source={require('../../../assets/Ellipse_Head.png')} />
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
              onPress={() => navigation.pop()}
              style={{width: '20%'}}>
              <Image source={require('../../../assets/Back_Arrow_White.png')} />
            </TouchableOpacity>
            <View>
              <CustomText
                semibold
                style={{
                  color: '#fff',
                  fontSize: moderateScale(16),
                  textTransform: 'uppercase',
                }}>
                {strings('Dashboard.lbl_change_lang')}
              </CustomText>
            </View>
            <View style={styles.bell}></View>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        style={{paddingTop: 5, width: '100%', paddingHorizontal: 15}}
        data={languageList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <View height={20} />
      <TouchableOpacity
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
          width: '90%',
          alignSelf: 'center',
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 9,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <View style={{width: 10}}></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
          }}>
          <CustomText
            semibold
            style={{fontSize: moderateScale(17), color: '#fff'}}>
            {strings('Common.button_submit')}
          </CustomText>
        </View>
        <View>
          <Image
            source={require('../../../assets/Login_Arrow.png')}
            style={{width: 27.5, height: 26.7}}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
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

export default ChangeLanguage;
