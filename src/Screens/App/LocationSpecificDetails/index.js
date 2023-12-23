import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  Modal,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Linking, Platform,
  PermissionsAndroid
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from "../../../localization/i18n"
import axios from 'axios';

import MapView from "react-native-maps";
import { CustomText } from '../../../Component/Text';
import { getAPI, postAPI } from '../../../Networking/Request';
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

const LocationSpecificDetails = ({ route, navigation }) => {
  // alert(JSON.stringify(route.params.current))
  const refRBSheet = useRef();
  const mapRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
  });
  // props.route.params.current
  const [backProps, setBackProps] = useState(route.params.current)
  const [showLoactionOptions, setShowLoactionOptions] = useState(false);
  const [showLocationData, setShowLocationData] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [selectedType, setSelectedType] = useState('HAZARD_INFO');
  const [loading, setLoading] = useState(false);
  const [selectEsse, setSelectEsse] = useState('')
  const [nameChange, setNameChange] = useState('Weather forecast at your location')
  const [nameGet, setNameGet] = useState('Hazard information at your location')
  const [nameNear, setnameNear] = useState('Nearest essential facilities at your location')
  const [NewHZNear, setNewHZNear] = useState('RP Wise hazard at your location')
  const [RpData, setRpData] = useState([1, 2, 3, 4, 5, 6, 7])

  useEffect(() => {
    if (!selectedLocation) {
      return
    }
    onGetHazardInfoSelect()
  }, [selectedLocation])

  useEffect(() => {
    console.log('here');
    getCurrentLocation();
  }, [])

  function handleBackButtonClick() {
    navigation.navigate('LocationSpecipi');
    return true;
  };




  const openMap = () => {
    const latitude = 33.189368147027565; // latitude of your desire location
    const longitude = 73.35574341458842; // longitude of your desire location
    const latitudeto = 26.6938276960083; // latitude of your desire location
    const longitudeto = 74.09264545887709; // longitude of your desire location
    const scheme = Platform.select({
      ios: "maps:0,0?q=",  // if device is ios 
      android: "geo:0,0?q=", // if device is android 
    });
    const latLng = `${latitude},${longitude}`;
    const latLngTo = `${latitudeto},${longitudeto}`;
    const label = "your own label";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}${latLngTo}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };


  const getCurrentLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        position => {
          // position.coords
          console.log('current location: ', position);
          console.log('positionpositionposition___________', position),
            setTimeout(() => {
              mapRef?.current.animateToRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              });
            }, 300)
          setSelectedLocation(position.coords);
        },
        error => {
          console.log('getLocation error: ', error);
        },
        { enableHighAccuracy: true, timeout: 20000 },
      );
    } catch (error) {
      console.log('get location error: ', error);
    }
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const onGetHazardInfoSelect = async () => {
    try {
      setLoading(true);
      const Token = await AsyncStorageLib.getItem('loginToken');
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data',
      };

      const url = `http://103.215.208.96:8100/api/hazard_zonal_api/`

      const formData = new FormData();
      formData.append('lat', selectedLocation.latitude);
      formData.append('long', selectedLocation.longitude);
      const response = await axios({
        url,
        method: 'POST',
        data: formData,
        headers,
      });

      console.log('hazard info response: ', response.data);
      setTableData(response.data)
    } catch (error) {
      console.log('get hazard info error: ', error);
    } finally {
      setLoading(false);
    }
  }
  const onWeatherForecastSelect = async () => {
    try {
      setLoading(true);
      const Token = await AsyncStorageLib.getItem('loginToken');
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data',
      };
      const url = `http://103.215.208.96:8100/api/weather_zonal_api/`

      const formData = new FormData();

      formData.append('lat', selectedLocation.latitude);
      formData.append('long', selectedLocation.longitude);
      const response = await axios({
        url,
        method: 'POST',
        data: formData,
        headers,
      });

      console.log('weather info response: ', response.data);
      setTableData(response.data)
    } catch (error) {
      console.log('get weather info error: ', error);
    } finally {
      setLoading(false);
    }
  }
  const onNearestEssentialFacilitiesPress = async () => {
    try {
      setLoading(true);
      const Token = await AsyncStorageLib.getItem('loginToken');
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data',
      };

      const url = `http://103.215.208.96:8100/api/critical_facility_api/`

      const formData = new FormData();

      formData.append('lat', selectedLocation.latitude);
      formData.append('long', selectedLocation.longitude);
      const response = await axios({
        url,
        method: 'POST',
        data: formData,
        headers,
      });
      console.log('nearby info response: ', JSON.stringify(response.data[0]));
      setTableData(response.data)
    } catch (error) {
      console.log('get nearby info error: ', error);
    } finally {
      setLoading(false);
    }
  }

  const onTabRPWisw = async () => {
    try {
      setLoading(true);
      const Token = await AsyncStorageLib.getItem('loginToken');
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data',
      };

      const url = `http://103.215.208.96:8100/api/Rp_wise_hazard/`

      const formData = new FormData();

      formData.append('lat', selectedLocation.latitude);
      formData.append('long', selectedLocation.longitude);
      const response = await axios({
        url,
        method: 'POST',
        data: formData,
        headers,
      });
      console.log('nearby info response:ZIIAYAAAA ', JSON.stringify(response.data));
      setTableData(response.data)

    } catch (error) {
      console.log('get nearby info error: ', error);
    } finally {
      setLoading(false);
    }
  }

  const renderTable = (data, index) => {
    if (typeof data[Object.keys(data)[0]] === 'object') {
      return Object.keys(data).map((key1) => {
        return (
          <>
            <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 'bold', color: 'black' }}>{key1}</Text>
            <ScrollView key={key1}>
              <View>
                <View style={{}}>
                  <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 0.5 }}>
                      {index === 0 &&
                        Object.keys(data[key1][0]).map((key2) => {
                          return (
                            <Text
                              style={{ width: 100, fontSize: 16, fontWeight: 'bold', marginHorizontal: 3 }}
                              key={key2}
                            >
                              {key2}
                            </Text>
                          );
                        })
                      }
                      {
                        selectedType === 'NEAREST_ESS_INFO' &&
                        <Text style={{ width: 100, fontSize: 16, fontWeight: 'bold', marginHorizontal: 3 }}>Direction</Text>
                      }

                    </View>
                    <View style={{ flex: 0.5, alignItems: 'center', }}>
                      {Object.keys(data[key1][0]).map((key3) => {
                        console.log(JSON.stringify(data[key1][0]))
                        return (
                          <ScrollView horizontal={true}
                          // onPress={() =>
                          //   Linking.openURL(
                          //     Platform.OS === 'ios'
                          //       ? 'googleMaps://app?saddr=6.931970+79.857750&daddr=6.909877+79.848521'
                          //       : `google.navigation:q=${data[key1][0].lat}+${data[key1][0].lon}&daddr=${selectedLocation.latitude}+${selectedLocation.longitude}`,
                          //   )
                          // }
                          >
                            <Text numberOfLines={1} style={{ fontSize: 16, marginHorizontal: 3, }} key={key3}>
                              {data[key1][0][key3]}
                            </Text>
                          </ScrollView>
                        );
                      })}
                      {
                        selectedType === 'NEAREST_ESS_INFO' &&

                        <TouchableOpacity style={{ backgroundColor: '#3877F1', borderWidth: 1, borderRadius: 5, marginTop: 4 }} onPress={() => {
                          Linking.openURL(
                            Platform.OS === 'ios'
                              ? 'googleMaps://app?saddr=6.931970+79.857750&daddr=6.909877+79.848521'
                              : `google.navigation:q=${data[key1][0].lat}+${data[key1][0].lon}&daddr=${selectedLocation.latitude}+${selectedLocation.longitude}`,
                          )
                        }}>
                          <Text style={{ width: 100, fontSize: 16, marginHorizontal: 3, textAlign: 'center', color: 'white' }}>Click Here</Text>
                        </TouchableOpacity>
                      }
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </>
        );
      })
    }
    return (
      <ScrollView>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ flex: 0.7, }}>
            {index === 0 &&
              Object.keys(data).map((key) => {
                return (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', marginHorizontal: 3 }} key={key}>
                      {key}
                    </Text>
                  </ScrollView>
                );
              })
            }
          </View>
          <View style={{ flex: 0.3, }}>
            {Object.keys(data).map((key) => {
              return (
                <Text style={{ borderWidth: 0, width: 120, marginHorizontal: 3, textAlign: 'center', fontSize: 16 }} key={key} >
                  {data[key]}
                </Text>
              );
            })}
          </View>
        </View>

      </ScrollView>
    )
  }


  const RPWISEDATA = () => {
    return (
      <View>
        <Text>Hello22</Text>
      </View>
    )
  }

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
              onPress={() => { navigation.navigate('LocationSpecipi'); }}
              style={{ width: '20%' }}>
              <View>
                <Image
                  source={require('../../../../assets/Back_Arrow_White.png')}
                />
              </View>
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                }}>
                {strings("Map.lbl_map_caps")}
              </Text>
            </View>
            <View style={{ width: 70 }} />
          </View>
        </View>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        {
          backProps == 'current' ?
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              // //   provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 5.0922,
                longitudeDelta: 5.0421,

              }}

            // onPress={(e) => {
            //   setSelectedLocation(e.nativeEvent.coordinate);
            //   setNameChange('Weather forecast at choose location')
            //   setNameGet('Hazard information at choose location')
            //   setnameNear('Nearest essential facilities at choose location')
            //   setNewHZNear('RP Wise hazard at choose location')
            //   setSelectedType('HAZARD_INFO');
            //   setTimeout(() => { setShowLocationData(true) }, 300);
            // }}
            >
              {selectedLocation && (
                <MapView.Marker
                  coordinate={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                />
              )}
            </MapView>
            :
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              // //   provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 5.0922,
                longitudeDelta: 5.0421,

              }}

              onPress={(e) => {
                setSelectedLocation(e.nativeEvent.coordinate);
                setNameChange('Weather forecast at choose location')
                setNameGet('Hazard information at choose location')
                setnameNear('Nearest essential facilities at choose location')
                setNewHZNear('RP Wise hazard at choose location')
                setSelectedType('HAZARD_INFO');
                setTimeout(() => { setShowLocationData(true) }, 300);
              }}
            >
              {selectedLocation && (
                <MapView.Marker
                  coordinate={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                />
              )}
            </MapView>
        }

        <Modal visible={showLocationData} animationType='fade' transparent>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', }}>
            <TouchableOpacity onPress={() => setShowLocationData(false)} style={{ flex: 1 }} />
            <View style={{ backgroundColor: 'white', paddingBottom: 100, paddingHorizontal: 15, paddingTop: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
              <ScrollView horizontal contentContainerStyle={{ paddingBottom: 6 }} style={{ flexDirection: 'row', marginBottom: 16, marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    onGetHazardInfoSelect();
                    setSelectedType('HAZARD_INFO');
                  }}
                  style={[
                    {
                      alignItems: 'center',
                      backgroundColor: selectedType === 'HAZARD_INFO' ? '#3877F1' : 'transparent',
                      paddingVertical: 5,
                      paddingHorizontal: 8,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: 'white',
                    },
                    selectedType === 'HAZARD_INFO' && {
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 4,
                    }
                  ]}>
                  <CustomText style={{ color: selectedType === 'HAZARD_INFO' ? 'white' : 'black', fontSize: 14, fontFamily: 'Metropolis-Bold' }}>{strings("LocationSpecificDetails.lbl_get_hazard_information")}</CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onWeatherForecastSelect()
                    setSelectedType('WEATHER_INFO');
                  }}
                  style={[
                    {
                      alignItems: 'center',
                      backgroundColor: selectedType === 'WEATHER_INFO' ? '#3877F1' : 'transparent',
                      paddingVertical: 5,
                      paddingHorizontal: 8,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: 'white',
                    },
                    selectedType === 'WEATHER_INFO' && {
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }
                  ]}>
                  <CustomText style={{ color: selectedType === 'WEATHER_INFO' ? 'white' : 'black', fontSize: 14, fontFamily: 'Metropolis-Bold' }}>{strings("LocationSpecificDetails.lbl_weather_forecast")}</CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onNearestEssentialFacilitiesPress()
                    setSelectedType('NEAREST_ESS_INFO');
                  }}
                  style={[{
                    alignItems: 'center',
                    backgroundColor: selectedType === 'NEAREST_ESS_INFO' ? '#3877F1' : 'transparent',
                    paddingVertical: 5,
                    paddingHorizontal: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'white',
                  },
                  selectedType === 'NEAREST_ESS_INFO' && {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }
                  ]}>
                  <CustomText style={{ color: selectedType === 'NEAREST_ESS_INFO' ? 'white' : 'black', fontSize: 14, fontFamily: 'Metropolis-Bold' }}>{strings("LocationSpecificDetails.lbl_nearest_essential_facilities")}</CustomText>
                </TouchableOpacity>

              </ScrollView>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {selectedType === 'HAZARD_INFO' &&
                  <TouchableOpacity>
                    <CustomText bold>{nameGet}</CustomText>
                  </TouchableOpacity>
                }
                {selectedType === 'WEATHER_INFO' &&
                  <TouchableOpacity onPress={()=>{setShowLocationData(false),navigation.navigate('LocalWeatherData')}}>
                    <CustomText bold>{'Station wise local weather data'}</CustomText>
                  </TouchableOpacity>
                }
                {/* {selectedType === 'WEATHER_INFO' && <CustomText bold>{strings("LocationSpecificDetails.lbl_weather_forecast")}</CustomText>} */}
                {selectedType === 'NEAREST_ESS_INFO' && <CustomText bold>{nameNear}</CustomText>}
                {selectedType === 'ADDDESCRIPTION' && <CustomText bold>{NewHZNear}</CustomText>}
                <TouchableOpacity
                  onPress={() => {
                    onTabRPWisw()
                    setSelectedType('ADDDESCRIPTION');
                  }}
                  style={[{
                    alignItems: 'center',
                    backgroundColor: selectedType === 'ADDDESCRIPTION' ? '#3877F1' : 'transparent',
                    paddingVertical: 5,
                    paddingHorizontal: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'white',
                    width: '40%',
                    alignSelf: 'flex-end'
                  },
                  selectedType === 'ADDDESCRIPTION' && {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }
                  ]}>
                  <CustomText style={{ color: selectedType === 'ADDDESCRIPTION' ? 'white' : 'black', fontSize: 14, fontFamily: 'Metropolis-Bold' }}>RP Wise Hazard</CustomText>
                </TouchableOpacity>
              </View>
              {loading ? <ActivityIndicator size={'large'} style={{ marginTop: 26 }} /> : (
                <ScrollView>
                  <View style={styles.tableContainer}>
                    {tableData.map((data, index) => {
                      return renderTable(data, index);
                    })}
                  </View>
                  {/* {
                selectedType == 'ADDDESCRIPTION' ?
                  <FlatList
                    renderItem={RPWISEDATA}
                    data={RpData}
                  /> :
                  null
              } */}
                </ScrollView>
              )}

              <Pressable onPress={() => setShowLocationData(false)} hitSlop={{ top: 5, left: 5, right: 6 }} style={{ position: 'absolute', top: 16, right: 16 }}>
                <Image source={require('../../../../assets/Cross_Black.png')} />
              </Pressable>


            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  tableContainer: {
    paddingVertical: 15,
  },
  tableHeader: {
    // backgroundColor: '#DCDCDC',
    // borderTopWidth: 0,
    // paddingHorizontal: 0,
    // borderLeftWidth: 0,
    // borderColor: 'grey'
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

export default LocationSpecificDetails;
