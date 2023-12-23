import React, { useState, useEffect } from 'react';
import { View, Text,StatusBar ,StyleSheet,Image,TouchableOpacity, ActivityIndicator} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from "../../../localization/i18n"
import data from './data.json';
import axios from 'axios';

const LocalWeatherData = ({navigation}) => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const newStates = [...new Set(data.map(item => item.states))];
    setStates(newStates);
  }, []);

  useEffect(() => {
    const stateStations = data.filter(item => item.states === selectedState)
      .map(item => item.station);
    setStations(stateStations);
    setSelectedStation(stateStations[0])
    // console.log('stateStations: ', stateStations);
  }, [selectedState]);

  useEffect(() => {
   fetchData();
  },[])

  const fetchData = async () => {
    try {
      const {data} = await axios({
        url: 'http://103.215.208.96:8100/api/city_weather_api/',
        method: 'GET',
      });
      setWeatherData(JSON.parse(data));
      setLoading(false);
    } catch (error) {
      console.log('get local data error: ', error);
      alert('Server error. Please try again later.');
      navigation.goBack();
    }
  };

  return (
    <View style={{flex: 1}}>
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
              onPress={() => navigation.goBack('Dashboard')}
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
                {strings("Dashboard.lbl_local_weather_data")}
              </Text>
            </View>
            <View style={{ width: 70 }} />
          </View>
        </View>
      </LinearGradient>

      <Text style={styles.labelStyle}>State</Text>
      <Picker
        selectedValue={selectedState}
        onValueChange={value => setSelectedState(value)}
        style={styles.pickerStyle}
      >
        {states.map(state => (
          <Picker.Item key={state} label={state} value={state} style={styles.itemStyle} />
        ))}
      </Picker>
      <Text style={styles.labelStyle}>Station</Text>
      <Picker
        selectedValue={selectedStation}
        onValueChange={value => setSelectedStation(value)}
        style={styles.pickerStyle}
      >
        {stations.map(station => (
          <Picker.Item key={station} label={station} value={station} />
        ))}
      </Picker>
      <TouchableOpacity onPress={() => {
        const stationData = weatherData.find((res) => res.Station_Name == selectedStation)
        navigation.navigate('LocalWeatherDataDetails', {stationData})
      }}>
      <Text style={styles.buttonStyle}>GET DATA</Text>
      </TouchableOpacity>
      {loading && (
        <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'white'} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
labelStyle:{
  marginTop:20,
  marginHorizontal:15,
  fontSize:17,
  fontWeight:'bold',
  color:'black'
},
pickerStyle:{
  marginHorizontal:10, 
},
buttonStyle:{
  backgroundColor:'#adb591',
  padding:12,
  fontSize:18,
  fontWeight:'bold',
  textAlign:"center",
  marginHorizontal:15,
  borderRadius:6,
  marginTop:20
},
})
export default LocalWeatherData;