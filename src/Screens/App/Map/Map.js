import React, {useState, useEffect, useRef,createRef} from 'react';
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
  ScrollView,Button,Alert,
  BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MapView, {
  PROVIDER_GOOGLE,
  UrlTile,
  Marker,
  Polygon,
} from "react-native-maps";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ReactNativeOpenlayers, { ReactNativeOpenlayersRef } from '../../../../lib';
import webview from 'react-native-webview'
import { useDispatch, useSelector } from 'react-redux';
import {strings} from "../../../localization/i18n"

import { GetMapDetails} from '../../../Redux/Action/Admin';
var value = ''
const Map = ({navigation, route}) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
  const [stateToggle, setStateToggle] = useState(false);
  const [titleName, setTitleName] = useState('');

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const reactNativeOpenlayers = useRef<ReactNativeOpenlayersRef>(null);
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
  useEffect(()=>{
 
  },[])
  const Item = ({item, onPress}) => (
    <View>
      <TouchableOpacity onPress={onPress} style={{marginVertical: 5}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: 13}}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const stateRenderItem = ({item}) => {
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



  
  const renderMap = () => {
    const map = new window.ol.Map({
      target: 'map',
      layers: [

        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
        new window.ol.layer.Tile({
          source: new window.ol.source.TileWMS({
            url: 'http://13.126.94.175:8080/geoserver/privatedss/wms',
            // params: {'LAYERS': 'topp:states', 'TILED': true},
            params: {'layers': 'privatedss:Roads', 'TILED': true},
            serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0,
  })
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4,
      }),
    });
   map.on('click', evt=>{
      
      var lonlat =  window.ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
      var lon = lonlat[0];
      var lat = lonlat[1];
    //  alert("You clicked near lat lon: "+ lon.toFixed(6) + "  " + lat.toFixed(6));
      // console.log(">>>>>>>>>")
 const viewResolution =  new window.ol.View({
  center: window.ol.proj.fromLonLat([lon, lat]),
  zoom: 4,
})
// console.log(">>>>>>>>>",viewResolution)
 var tileWMSSouce =  new window.ol.layer.Tile({
  source: new window.ol.source.TileWMS({
    url: 'http://13.126.94.175:8080/geoserver/privatedss/wms',
    // params: {'LAYERS': 'topp:states', 'TILED': true},
    params: {'layers': 'privatedss:Roads', 'TILED': true},
    serverType: 'geoserver',
// Countries have transparency, so do not fade tiles:
transition: 0,
})
})
var url =  tileWMSSouce.getSource().getFeatureInfoUrl( evt.coordinate,  viewResolution.getResolution(), viewResolution.getProjection(), {'INFO_FORMAT': 'application/json'})



// var url =  tileWMSSouce.getSource().getGetFeatureInfoUrl(
//   evt.coordinate, viewResolution.getResolution(), viewResolution.getProjection(),
//   {'INFO_FORMAT': 'application/json', 'propertyName': 'nam'});
 
// dataInfo(url)

// if (url) {
//   fetch(url)
//     .then((response) => response.json())
//     .then((html) => {
     
//     });
// }
    });
    
    return map;
  };

 

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3877F1" />
      <LinearGradient
        colors={['#3877F1', '#215ACA']}
        style={styles.linearGradient}>
        <View
          style={{
            //   backgroundColor: '#5B4CDF',
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
              style={{width: '20%'}}>
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

            <View style={styles.bell}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Image source={require('../../../../assets/Info.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image source={require('../../../../assets/LayerMenu.png')} />
              </TouchableOpacity>
            </View>
          </View>

          {/* </Header> */}
        </View>
      </LinearGradient>

      <Collapse
        style={{
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#DFDFDF',
          marginHorizontal: '5%',
          marginVertical: 20,
        }}
        isExpanded={stateToggle}
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
            <Text>{stateName}</Text>
          </View>
          <Image
            source={require('../../../../assets/DownArrow.png')}
            //   style={{width: 22, height: 20}}
            // resizeMode={'stretch'}
          />
        </CollapseHeader>
        <CollapseBody>
          <FlatList
            style={{paddingVertical: 10}}
            data={contryState}
            renderItem={stateRenderItem}
            keyExtractor={item => item.id}
          />
        </CollapseBody>
      </Collapse>
      {/* <MapView
        style={{flex: 1}}
        // //   provider={PROVIDER_GOOGLE}
        // initialRegion={{
        //   latitude: 20.5937,
        //   longitude: 78.9629,
        //   latitudeDelta: 5.0922,
        //   longitudeDelta: 5.0421,
        // }}
      >
        <UrlTile
    urlTemplate="http://tile.stamen.com/terrain/%7Bz%7D/%7Bx%7D/%7By%7D.jpg"
    maximumZ={19}
    zIndex={99}
  />
        </MapView> */}
    <View style={{flex:1}}>
    <Button title="Action" onPress={()=>alert(value)} />
      <ReactNativeOpenlayers ref={reactNativeOpenlayers} id="map" render={renderMap} />
    </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        // closeOnPressMask={false}
        height={570}
        dragFromTopOnly={true}
        customStyles={{
          container: {borderRadius: 20},
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{marginVertical: 20, paddingHorizontal: 20}}>
          <Text style={styles.bottomSheetTitleText}>{strings("CountryState.lbl_gujarat")}</Text>
        </View>
        <View style={{borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.3)"}}>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <View style={{backgroundColor: 'rgba(230, 71, 89, 0.1)', width: "50%", padding:20, justifyContent:'center'}}>
              <Text style={{color:"#E64759", fontSize: 14, fontFamily:'OpenSans-Regular'}}>{strings("AddManpowerResources.lbl_name")}</Text>
              <Text style={{color:"#E64759", fontSize: 17, fontFamily:'OpenSans-Semibold'}}>{strings("Map.lbl_cyclone_gulab")}</Text>
            </View>
            <View style={{backgroundColor: 'rgba(11, 129, 170, 0.1)', width: "50%", padding:20, justifyContent:'center'}}>
              <Text style={{color:"#0B81AA", fontSize: 14, fontFamily:'OpenSans-Regular'}}>{strings("Map.lbl_category")}</Text>
              <Text style={{color:"#0B81AA", fontSize: 17, fontFamily:'OpenSans-Semibold'}}>{strings("Map.lbl_cyclone_storm")}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <View style={{backgroundColor: 'rgba(10, 154, 105, 0.1)', width: "50%", padding:20, justifyContent:'center'}}>
              <Text style={{color:"#0A9A69", fontSize: 14, fontFamily:'OpenSans-Regular'}}>{strings("Map.lbl_likely_landfall_state")}</Text>
              <Text style={{color:"#0A9A69", fontSize: 17, fontFamily:'OpenSans-Semibold'}}>{strings("CountryState.lbl_andhra_pradesh")}</Text>
            </View>
            <View style={{backgroundColor: 'rgba(105, 90, 215, 0.1)', width: "50%", padding:20, justifyContent:'center'}}>
              <Text style={{color:"#695AD7", fontSize: 14, fontFamily:'OpenSans-Regular'}}>{strings("Map.lbl_location")}</Text>
              <Text style={{color:"#695AD7", fontSize: 17, fontFamily:'OpenSans-Semibold'}}>{strings("Map.lbl_north_coastal_andhra_pradesh")}</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', padding: 20, borderWidth:1, borderColor: "rgba(0, 0, 0, 0.3)" }}>
            <View style={{opacity: 0.5, width: "20%"}}>
                <Image source={require('../../../../assets/WindIcon.png')} />
            </View>
            <View>
                <Text style={{fontSize: 14, fontFamily:'OpenSans-Regular'}}>{strings("Map.lbl_wind_speed")}</Text>
                <Text style={{color:"#000", fontSize: 23, fontFamily:'OpenSans-Semibold', fontWeight: "700"}}>83.18 km/hr</Text>
            </View>    
        </View>
        <View style={{flexDirection:'row', alignItems:'center', padding: 20, borderWidth:1, borderColor: "rgba(0, 0, 0, 0.3)" }}>
            <View style={{width: "20%"}}>
                <Image source={require('../../../../assets/FloodIcon.png')} />
            </View>
            <View>
                <Text style={{fontSize: 14, fontFamily:'OpenSans-Regular'}}>{strings("Map.lbl_flood_depth")}</Text>
                <Text style={{color:"#000", fontSize: 23, fontFamily:'OpenSans-Semibold', fontWeight: "700"}}>0-2.95 m</Text>
            </View>    
        </View>
        <View style={{flexDirection:'row', alignItems:'center', padding: 20}}>
            <View style={{width: "20%"}}>
                <Image source={require('../../../../assets/SurgeIcon.png')} />
            </View>
            <View>
                <Text style={{fontSize: 14, fontFamily:'OpenSans-Regular'}}>{strings("Map.lbl_surge_height")}</Text>
                <Text style={{color:"#000", fontSize: 23, fontFamily:'OpenSans-Semibold', fontWeight: "700"}}>0-2.0 m</Text>
            </View>    
        </View>
        {/* <View style={styles.bottomSheetSubTitleView}>

          <View>
              <Text style={styles.bottomSheetLeftText}>State ID</Text>
              <Text style={styles.bottomSheetLeftText}>State Name</Text>
              <Text style={styles.bottomSheetLeftText}>District ID</Text>
              <Text style={styles.bottomSheetLeftText}>District Name</Text>
              <Text style={styles.bottomSheetLeftText}>Rainfall Count</Text>
              <Text style={styles.bottomSheetLeftText}>Wind Speed</Text>
              <Text style={styles.bottomSheetLeftText}>Flood Depth</Text>
            </View>
          <View>
              <Text style={styles.bottomSheetRightText}>Gj01</Text>
              <Text style={styles.bottomSheetRightText}>Gujarat</Text>
              <Text style={styles.bottomSheetRightText}>D1</Text>
              <Text style={styles.bottomSheetRightText}>Junagadh</Text>
              <Text style={styles.bottomSheetRightText}>20</Text>
              <Text style={styles.bottomSheetRightText}>83.18 km/hr</Text>
              <Text style={styles.bottomSheetRightText}>0-2.95 m</Text>
            </View>
        </View> */}
      </RBSheet>
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

export default Map;
