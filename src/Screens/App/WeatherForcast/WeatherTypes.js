import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomText } from '../../../Component/Text';
import { strings } from '../../../localization/i18n';



const Item = ({ item, onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: "15%", }}>
          <Image style={{ width: 30, height: 25, resizeMode: 'center', }} source={item.uri} />
        </View>
        <View style={{ marginLeft: 13, width: "70%" }}>
          <CustomText regular fontSize={17} numberOfLines={2} style={styles.title}>{item.title}</CustomText>
        </View>
      </View>
      <View style={{ width: "15%" }}>
        <Image style={{ width: 30, height: 30 }} source={require('../../../../assets/Gray_Right.png')} />
      </View>
    </TouchableOpacity>
  </View>
);

const WeatherTypes = ({ route, navigation }) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: strings("CrowdSourcingSecond.lbl_rainfall"),
      uri: require('../../../../assets/RainIcon.png'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: strings("MapsTypesWeather.lbl_temprature"),
      uri: require('../../../../assets/TempratureIcon.png'),
    },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Humidity',
    //   uri: require('../../../../assets/Humidity.png'),
    // },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: strings("MapsTypesWeather.lbl_wind"),
      uri: require('../../../../assets/Wind_Blue.png'),
    },
  ];
  const [selectedId, setSelectedId] = useState(null);
  const [response, setResponse] = React.useState('');

  useEffect(() => {
    // setVisible(true)
    const Data = route.params;
    setResponse(Data);
    // setVisible(false)
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }


  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        // onPress={() => setSelectedId(item.id)}
        onPress={() => navigation.navigate('MapsTypes_Weather', { WeatherName: item.title })}
      // backgroundColor={{backgroundColor}}
      // textColor={{color}}
      />
    );
  };

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
              style={{ width: '20%' }}>
              <View>
                <Image
                  source={require('../../../../assets/Back_Arrow_White.png')}
                />
              </View>
            </TouchableOpacity>
            <View style={{ width: "70%" }}>
              <CustomText
                numberOfLines={1}
                regular
                fontSize={16}
                style={{
                  color: '#fff',
                  // fontSize: 16,
                  // fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                  textAlign: "center"
                }}>
                {strings("VerificationRequests.lbl_weather_forecast_caps")}
              </CustomText>
            </View>
            <View style={styles.bell}></View>
          </View>
          {/* </Header> */}
        </View>
      </LinearGradient>

      <FlatList
        style={{ paddingTop: 20 }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
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
    borderRadius: 40,
    marginBottom: 20,
    // marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 9,
  },
  title: {
    // fontSize: 17,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#0D2451',
  },
  bell: {
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
});

export default WeatherTypes;
