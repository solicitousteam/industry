import React, { useState, useEffect, useRef, createRef } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
  Image,
  TextInput,
  ScrollView, Button, Alert,
  BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {strings} from "../../../localization/i18n"

import WebView from 'react-native-webview'
import { useDispatch, useSelector } from 'react-redux';

var value = ''
const MapWebview = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
  const [stateToggle, setStateToggle] = useState(false);
  const [titleName, setTitleName] = useState('');
  const INJECTEDJAVASCRIPT = 'const meta = document.createElement(\'meta\'); meta.setAttribute(\'content\', \'width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0\'); meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta); '


  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [contryState, setContryState] = useState([
    {
      id: '1',
      title: strings("CountryState.lbl_gujarat"),
    },
    {
      id: '2',
      title: strings("CountryState.lbl_rajasthan"),
    },
    {
      id: '3',
      title: strings("CountryState.lbl_maharastra"),
    },
    {
      id: '4',
      title: strings("CountryState.lbl_uttarpradesh"),
    },
  ]);
  useEffect(() => {

  }, [])
  const Item = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={{ marginVertical: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 13 }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const stateRenderItem = ({ item }) => {
    return <Item item={item} onPress={() => onToggle(item)} />;
  };

  const onToggle = item => {
    setStateName(item.title);
    setStateToggle(false);
  };

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }




  ;



  useEffect(() => {

    console.log("https://legends.d2mfv70y319he4.amplifyapp.com/location:" + route.params.Mapid)
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };

  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3877F1" />

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: 999,
          height: 50,
          width: 50,
          justifyContent: 'center',
        }}>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Dashboard')}
            style={{ width: '20%' }}>
            <View>
              <Image
                source={require('../../../../assets/Back_Arrow_White.png')}
              />
            </View>
          </TouchableOpacity>

        </View>

        {/* </Header> */}
      </View>


      <View style={{ flex: 1 }}>
        <WebView
          cacheEnabled={false}
          scrollEnabled={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          
          injectedJavaScript={INJECTEDJAVASCRIPT}
          // source={{ uri: "http://18.231.153.96:3000/" }}
          // source={{ uri: "https://legends.d2mfv70y319he4.amplifyapp.com/location:" + route.params.Mapid }}
          source={{ uri: "http://89.233.108.250:3000/location:" + route.params.Mapid}}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    padding: 5,
    width: '21%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 9,
    fontFamily: 'OpenSans-Regular',
    color: '#000',
    marginTop: 3,
  },
  bottomSheetTitleText: {
    fontSize: 27,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#000',
  },
  bottomSheetSubTitleView: {
    marginRight: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  bottomSheetLeftText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 5,
  },
  bottomSheetRightText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'left',
    marginVertical: 5,
  },
});

export default MapWebview;
