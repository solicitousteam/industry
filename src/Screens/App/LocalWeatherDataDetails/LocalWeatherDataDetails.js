import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../../localization/i18n';
import { DataTable } from 'react-native-paper';
import moment from 'moment';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function LocalWeatherDataDetails({navigation, route}) {
  const stationData = route.params.stationData;
  const getGifImage = (forecast) => {
    if (forecast === 'NA') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/0.gif')} />
    }
    if (forecast === 'Sunny Day' || forecast === 'Clear sky') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/1.gif')} />
    }
    if (forecast === 'Mainly Clear sky') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/2.gif')} />
    }
    if (forecast === 'Partly cloudy sky' || forecast === 'Partly cloudy sky towards afternoon or evening' || forecast == 'Mainly clear sky becoming partly cloudy towards afternoon or evening' || forecast === 'Mainly clear sky becoming partly cloudy towards evening or night' || forecast === 'Partly cloudy sky with haze') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/3.gif')} />
    }
    if (forecast === 'Generally cloudy sky' || forecast === 'Partly cloudy sky becoming generally cloudy towards afternoon or evening or night' || forecast === 'Generally cloudy sky towards afternoon or evening' || forecast === 'Generally cloudy sky with haze') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/4.gif')} />
    }
    if (forecast === 'Overcast sky') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/5.gif')} />
    }
    if (forecast === 'Partly cloudy sky with possibility of development of thunder lightning' || forecast === 'Dust storm or Thunderstorm' || forecast === 'Partly cloudy sky with Thundery development' || forecast === 'Dust storm') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/6.gif')} />
    }
    if (forecast === 'Generally cloudy sky with possibility of development of thunder or lightning' || forecast === 'Generally cloudy sky with Thundery development') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/7.gif')} />
    }
    if (forecast === 'Partly cloudy sky with possibility of rain or Thunderstorm or Duststorm' || forecast === 'Generally cloudy sky with possibility of rain or Thunderstorm' || forecast === 'Partly cloudy sky with possibility of rain or Thunderstorm') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/8.gif')} />
    }
    if (forecast === 'Generally cloudy sky with possibility of rain or Thunderstorm or Duststorm') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/9.gif')} />
    }
    if (forecast === 'Thunderstorm') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/10.gif')} />
    }
    if (forecast === 'Thunderstorm with rain' || forecast === 'Rain or Thundershowers') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/11.gif')} />
    }
    if (forecast === 'Thunderstorm with squall' || forecast === 'Thunderstorm with hail' || forecast === 'Partly cloudy sky in the morning hours becoming generally cloudy sky towards evening or night with possibility of rain or thundershowers accompanied with squall' || forecast === 'Partly cloudy sky in the morning hours becoming generally cloudy sky towards evening or night with possibility of rain or thundershowers accompanied with squall or hail' || forecast === 'Duststorm or Thunderstorm with squall or hail' || forecast === 'Partly cloudy sky in the morning hours becoming generally cloudy sky towards afternoon or evening with possibility of rain or thundershowers accompanied by squall or hail' || forecast === 'Partly cloudy sky in the morning hours becoming generally cloudy sky towards afternoon or evening with possibility of rain or thundershowers accompanied with squall' || forecast === 'Thunderstorm with squall or hail') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/12.gif')} />
    }
    if (forecast === 'Generally cloudy sky with Light rain' || forecast == 'Generally cloudy sky with Light Rain or Drizzle' || forecast === 'Rain or thundershowers would occur towards afternoon or evening' || forecast === 'Rain or thundershowers would occur towards evening or night' || forecast == 'Rain or Thundershowers with strong gusty winds' || forecast == 'Partly cloudy sky with one or two spells of rain or thundershowers' || forecast === 'Rain') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/13.gif')} />
    }
    if (forecast === 'Generally cloudy sky with moderate rain' || forecast == 'Partly cloudy sky with possibility of moderate rain or Thunderstorm' || forecast === 'Generally cloudy sky with one or two spells of rain or thundershowers' || forecast === 'Generally cloudy sky with intermittent rain') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/14.gif')} />
    }
    if (forecast === 'Generally cloudy sky with Heavy rain' || forecast == 'Partly cloudy sky with possibility of heavy rain or Thunderstorm' || forecast === 'Generally cloudy sky with a few spells of rain or thundershowers' || forecast === 'Generally cloudy sky with continuous rain') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/15.gif')} />
    }
    if (forecast === 'Rain or Snow') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/16.gif')} />
    }
    if (forecast === 'Light snow' || forecast === 'Snow') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/17.gif')} />
    }
    if (forecast === 'Moderate snow') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/18.gif')} />
    }
    if (forecast === 'Heavy snow') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/19.gif')} />
    }
    if (forecast === 'Shallow Fog' || forecast === 'Fog or Mist would occur in early morning' || forecast === 'Moderate Fog' || forecast == 'Dense Fog' || forecast == 'Very Dense Fog' || forecast == 'Fog/mist in the morning and mainly clear sky later' || forecast == 'Fog/mist in the morning and partly cloudy sky later' || forecast === 'Fog or Mist' || forecast === 'Fog') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/20.gif')} />
    }
    if (forecast === 'Haze') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/21.gif')} />
    }
    if (forecast === 'Mist') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/22.gif')} />
    }
    if (forecast === 'Heat Wave' || forecast === 'Warm Night' || forecast === 'Heat Wave and warm night' || forecast === 'Hot & Humid day' || forecast === 'Hot day and warm night') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/23.gif')} />
    }
    if (forecast === 'Cold Wave' || forecast === 'Cold Day' || forecast === 'Cold Wave or Cold day') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/24.gif')} />
    }
    if (forecast === 'Dense or Very Dense Fog with cold day conditions') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/25.gif')} />
    }
    if (forecast === 'Strong surface winds during day time') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/26.gif')} />
    }
    if (forecast === 'Chilly winds during day time') {
      return <Image style={{height: 50, width: 50, resizeMode: 'contain', backgroundColor: 'red'}} source={require('../../../../assets/forecast_images/27.gif')} />
    }
    return null;
  }
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
      <ScrollView>
        <Text style={{marginLeft: 15, marginTop: 20, fontSize: 16, fontWeight: '600'}}>Last 24 hours weather data</Text>
        {!!stationData && (
          <View style={{borderBottomWidth: 1, paddingVertical: 5, paddingHorizontal: 15, borderBottomColor: 'grey'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>Station Name: </Text><Text>{stationData.Station_Name}</Text></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>Previous Day Max temp: </Text><Text>{stationData.Previous_Day_Max_temp}</Text></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>Previous Day Max Departure from Normal: </Text><Text>{stationData.Previous_Day_Max_Departure_from_Normal}</Text></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}><Text>Previous Day Relative Humidity at 1730: </Text><Text>{stationData.Previous_Day_Relative_Humidity_at_1730}</Text></View>
          </View>
        )}

        <Text style={{marginLeft: 15, marginTop: 20, fontSize: 16, fontWeight: '600'}}>7 days forcast</Text>
        <DataTable style={styles.tableContainer}>
          <ScrollView horizontal>
            <View>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title numberOfLines={2} style={{ width: 100 }}>
                  Date
                </DataTable.Title>
                <DataTable.Title numberOfLines={2} style={{ width: 100 }}>
                  Min Temp
                </DataTable.Title>
                <DataTable.Title numberOfLines={2} style={{ width: 100 }}>
                  Max Temp
                </DataTable.Title>
                <DataTable.Title numberOfLines={2} style={{ width: 100 }}>
                  {''}
                </DataTable.Title>
                <DataTable.Title numberOfLines={2} style={{ width: 100 }}>
                  Weather
                </DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Title style={{ borderWidth: 0, width: 100}}>
                  {moment().format('DD-MMM')}
                </DataTable.Title>
                
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Title style={{ borderWidth: 0, width: 100}}>
                  {moment().add(1, 'day').format('DD-MMM')}
                </DataTable.Title>
                
              </DataTable.Row>
              
              <DataTable.Row>
                <DataTable.Title style={{ borderWidth: 0, width: 100}}>
                  {moment().add(2, 'day').format('DD-MMM')}
                </DataTable.Title>
                
              </DataTable.Row>
              
              <DataTable.Row>
                <DataTable.Title style={{ borderWidth: 0, width: 100}}>
                  {moment().add(3, 'day').format('DD-MMM')}
                </DataTable.Title>
                
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Title style={{ borderWidth: 0, width: 100}}>
                  {moment().add(4, 'day').format('DD-MMM')}
                </DataTable.Title>
                
              </DataTable.Row>
              
              <DataTable.Row>
                <DataTable.Title style={{ borderWidth: 0, width: 100}}>
                  {moment().add(5, 'day').format('DD-MMM')}
                </DataTable.Title>
                
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Title style={{ borderWidth: 0, width: 100}}>
                  {moment().add(6, 'day').format('DD-MMM')}
                </DataTable.Title>
                
              </DataTable.Row>
            </View>
          </ScrollView>
        </DataTable>

        <Text style={{marginLeft: 15, marginTop: 20, fontSize: 16, fontWeight: '600'}}>Weekly Variation Temp for: {stationData.Station_Name}</Text>
        <LineChart
          data={{
            labels: [
              moment().format('DD-MMM'),
              moment().add(1, 'day').format('DD-MMM'),
              moment().add(2, 'day').format('DD-MMM'),
              moment().add(3, 'day').format('DD-MMM'),
              moment().add(4, 'day').format('DD-MMM'),
              moment().add(5, 'day').format('DD-MMM'),
              moment().add(6, 'day').format('DD-MMM'),
            ],
            datasets: [
              // {
              //   data: [-50, -20, -2, 86, 71, 200],
              //   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
              // },
              // {
              //   data: [20, 10, 4, 56, 87, 90],
              //   color: (opacity = 1) => `rgba(240, 2, 2, ${opacity})`
              // },
              {
                data: [stationData.Today_Max_temp || 0, stationData.Day_2_Max_Temp || 0, stationData.Day_3_Max_Temp || 0, stationData.Day_4_Max_Temp || 0, stationData.Day_5_Max_Temp || 0, stationData.Day_6_Max_Temp || 0, stationData.Day_7_Max_Temp || 0],
                color: (opacity = 1) => `rgba(42, 240, 2, ${opacity})`,
              },
              {
                data: [stationData.Today_Min_temp || 0, stationData.Day_2_Min_temp || 0, stationData.Day_3_Min_temp || 0, stationData.Day_4_Min_temp || 0, stationData.Day_5_Min_temp || 0, stationData.Day_6_Min_temp || 0, stationData.Day_7_Min_temp || 0],
                color: (opacity = 1) => `rgba(2, 6, 240, ${opacity})`
              }
            ],
            legend: [/* "Normal Max", "Normal Min", */ "Max Temps", "Min Temp"]
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            },
          }}
          bezier
          style={{
            marginVertical: 16,
            borderRadius: 16,
            marginHorizontal: 20,
          }}
        />
      </ScrollView>
    </View>
  )
}

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