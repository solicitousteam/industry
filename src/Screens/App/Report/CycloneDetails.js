import React, { useState, useEffect } from 'react';
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
import { strings } from "../../../localization/i18n"
import { CustomText } from "../../../Component/Text";
const DATA = [
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: strings("AddManpowerResources.lbl_name"),
    Subtitle: strings("CycloneDetails.lbl_cyclone_jawad"),
    color: '#DC143C',
    uri: require('../../../../assets/Cyclonic.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: strings("Map.lbl_category"),
    Subtitle: strings("CycloneDetails.lbl_deep_depression"),
    color: '#00BFFF',
    uri: require('../../../../assets/Cyclonic.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: strings("CycloneDetails.lbl_likely_landfall_state"),
    Subtitle: strings("CountryState.lbl_andhra_pradesh"),
    color: '#3CB371',
    uri: require('../../../../assets/Cyclonic.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: strings("Map.lbl_location"),
    color: '#7B68EE',
    Subtitle: '',
    uri: require('../../../../assets/Cyclonic.png'),
  }
];

const EvenDATA = [
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: strings("CycloneDetails.lbl_wind_speed_range"),
    Subtitle: '51.00 km/h',
    color: '#DC143C',
    uri: require('../../../../assets/Cyclonic.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: strings("CycloneDetails.lbl_flooe_depth_range"),
    Subtitle: '0-2.48 m',
    color: '#00BFFF',
    uri: require('../../../../assets/Cyclonic.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: strings("CycloneDetails.lbl_surge_height_range"),
    Subtitle: '0-0.00 m',
    color: '#3CB371',
    uri: require('../../../../assets/Cyclonic.png'),
  }
];

const EventItem = ({ item, onPress }) => (
  <View >
    <View onPress={onPress} style={[styles.itemdetail]}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: "center" }}>
          <Image style={{ width: 30, height: 30 }} source={item.uri} />
        </View>
        <View style={{ marginLeft: 13 }}>
          <CustomText style={styles.detailtitle}>{item.title}</CustomText>

        </View>
      </View>
      <View>
        <CustomText style={styles.detailtitle}>{item.Subtitle}</CustomText>
      </View>
    </View>
  </View>
);

const Item = ({ item, onPress }) => (
  <View >
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor: item.color }]}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: "center" }}>
          <Image style={{ width: 30, height: 30 }} source={item.uri} />
        </View>
        <View style={{ marginLeft: 13 }}>
          <CustomText style={styles.subtitle}>{item.title}</CustomText>
          <CustomText style={styles.title}>{item.Subtitle}</CustomText>
        </View>
      </View>
      <View>
        {/* <Image source={require('../../../../assets/Gray_Right.png')} /> */}
      </View>
    </TouchableOpacity>
  </View>
);

const CycloneDetails = ({ route, navigation }) => {
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
        onPress={() => {
          if (item.title === strings("CycloneDetails.lbl_risk_analysis_report")) {
            navigation.navigate('RiskReport');
          }
          if (item.title === strings("CycloneDetails.lbl_state_combined_report")) {
            navigation.navigate('StateComReport');
          }

          //  alert(item.title)
        }

          // navigation.navigate('MapsTypes', { WeatherName: item.title })

        }
      // backgroundColor={{backgroundColor}}
      // textColor={{color}}
      />
    );
  };

  const renderItemDetail = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <EventItem
        item={item}
        // onPress={() => setSelectedId(item.id)}
        onPress={() => {
          if (item.title === strings("CycloneDetails.lbl_risk_analysis_report")) {
            navigation.navigate('RiskReport');
          }
          if (item.title === strings("CycloneDetails.lbl_state_combined_report")) {
            navigation.navigate('StateComReport');
          }

          //  alert(item.title)
        }

          // navigation.navigate('MapsTypes', { WeatherName: item.title })

        }
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
              onPress={() => navigation.goBack()}
              style={{ width: '20%' }}>
              <View>
                <Image
                  source={require('../../../../assets/Back_Arrow_White.png')}
                />
              </View>
            </TouchableOpacity>
            <View style={{ width: "80%", paddingRight: "10%" }}>
              <CustomText
                numberOfLines={1}
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                  textAlign: "center"
                }}>

                {strings("CycloneDetails.lbl_cyclone_details_caps")}
              </CustomText>
            </View>
            <View style={styles.bell}></View>
          </View>
          {/* </Header> */}
        </View>
      </LinearGradient>

      <FlatList
        // style={{ paddingTop: 20 }}
        style={{ marginTop: '3%', marginBottom: '5%' }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center', height: 30, backgroundColor: '#6495ED' }}>
        <CustomText style={styles.title}>{strings("CycloneDetails.lbl_event_info_caps")}</CustomText>

      </View>
      <FlatList
        style={{ paddingTop: 20 }}
        data={EvenDATA}
        renderItem={renderItemDetail}
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
  }, itemdetail: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 2,
    borderRadius: 40,
    marginBottom: 20,
    // marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // }
  },
  item: {
    // backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 2,
    borderRadius: 40,
    marginBottom: 10,
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
  }, detailsubtitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '300',
    color: '#E5E5E5',
  },
  detailtitle: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#0D2451',
  }, subtitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '300',
    color: '#FFF',
  },
  title: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#FFF',
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

export default CycloneDetails;
