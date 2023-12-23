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
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateFeedBackData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import DropdownAlert from 'react-native-dropdownalert';
import { strings } from '../../../localization/i18n';

const CreatePost = ({ navigation, route }) => {
  let dropDownAlertRef = useRef();
  const dispatch = useDispatch();
  let [loader, setLoader] = useState(false);
  const [feedID, setFeedID] = useState('');
  const [stateName, setStateName] = useState(strings("CrowdSourcingFirst.lbl_select_state"));
  const [districtName, setdistrictName] = useState(strings("CrowdSourcingFirst.lbl_select_district"));
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [feed_text, setFeedText] = useState('');
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
    if (route.params) {
      getFeedData();
    }
  }, []);

  const getFeedData = () => {
    setLoader(true);
    const Data = route.params;

    console.log('+++++++++++++++++++++++++++');
    console.log(Data.FeedData);
    setFeedText(Data.FeedData.feed_text);
    setStateName(Data.FeedData.state);
    setdistrictName(Data.FeedData.district);
    setFeedID(Data.FeedData.id);
    console.log('+++++++++++++++++++++++++++');
    setLoader(false);
  };

  const Item = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 13 }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(moment(currentDate).format('DD-MM-YYYY'), '======');
    setShow(Platform.OS === 'ios');
    setDOB(moment(currentDate).format('DD/MM/YYYY'));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onToggle = item => {
    setStateName(item.title);
    setStateToggle(false);
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

  const submitFeed = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    // const id = await AsyncStorage.getItem('loginID');

    if (feed_text == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CreatePost.msg_write_your_msg"));
      return;
    }
    if (stateName == strings("CrowdSourcingFirst.lbl_select_state")) {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.lbl_select_state"));
      return;
    }
    if (districtName == strings("CrowdSourcingFirst.lbl_select_district")) {
      dropDownAlertRef.alertWithType('error', 'DCRA', strings("CrowdSourcingFirst.lbl_select_district"));
      return;
    }

    setLoader(true);

    const sendFeedData = await dispatch(
      CreateFeedBackData(Token, feedID, feed_text, stateName, districtName),
    );
    if (sendFeedData.status == 200) {
      setFeedText(''), setStateName(''), setdistrictName(''), setLoader(false);
      navigation.navigate('FeedTabs');
    } else {
      setFeedText(''), setStateName(''), setdistrictName(''), setLoader(false);
      dropDownAlertRef.alertWithType('error', 'Error', sendFeedData.message);
    }
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
              alignItems: 'center'
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FeedTabs')}
              style={{ width: '10%' }}>
              <Image
                source={require('../../../../assets/Back_Arrow_White.png')}
              />
            </TouchableOpacity>
            <View style={{ width: "90%" }}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                  textAlign: "center"
                }}>
                {strings("CreatePost.lbl_write_post_caps")}
              </Text>
            </View>

            <View style={styles.bell}></View>
          </View>

          {/* </Header> */}
        </View>
      </LinearGradient>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: '3%' }}>
          <View
            style={{
              borderWidth: 1,
              marginVertical: 10,
              borderRadius: 15,
              padding: 10,
              // height: 250,
            }}>
            <AutoGrowingTextInput
              style={[styles.textInput, { color: '#0D2451', }]}
              placeholder={strings("CreatePost.hint_your_message")}
              value={feed_text}
              // height={400}
              onChangeText={feedText => setFeedText(feedText)}
            />
          </View>
          <View style={{ marginTop: '5%' }}>
            <Text
              style={{
                fontSize: 14,
                color: '#000000',
                fontFamily: 'OpenSans-Regular',
                fontWeight: '400',
              }}>
              {strings("CrowdSourcingFile.lbl_state")} <Text style={{ color: 'red' }}>*</Text>
            </Text>
          </View>
          <Collapse
            style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
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
                style={{ paddingVertical: 10 }}
                data={contryState}
                renderItem={stateRenderItem}
                keyExtractor={item => item.id}
              />
            </CollapseBody>
          </Collapse>
          {/* </View> */}
          <View style={{ marginTop: '5%' }}>
            <Text
              style={{
                fontSize: 14,
                color: '#000000',
                fontFamily: 'OpenSans-Regular',
                fontWeight: '400',
              }}>
              {strings("CrowdSourcingFile.lbl_district")} <Text style={{ color: 'red' }}>*</Text>
            </Text>
          </View>
          {stateName === strings("CountryState.lbl_gujarat") ? (
            <Collapse
              style={{
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '#DFDFDF',
              }}
              isExpanded={districtToggle}
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
                  <Text>{districtName}</Text>
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
                  <Text>{districtName}</Text>
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
                                                  keyExtractor={item => item.id}
                                                />
                                              ) : (
                                                <View>
                                                  {stateName ===
                                                    strings("CountryState.lbl_puducherry") ? (
                                                    <FlatList
                                                      style={{
                                                        paddingVertical: 10,
                                                      }}
                                                      data={Puducherry_District}
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
                                                          {stateName ===
                                                            strings("CountryState.lbl_west_bengal") ? (
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
                                                              {/* <FlatList
                                                              style={{
                                                                paddingVertical: 10,
                                                              }}
                                                              data={
                                                                Lakshadweep_District
                                                              }
                                                              renderItem={
                                                                districtRenderItem
                                                              }
                                                              keyExtractor={item =>
                                                                item.id
                                                              }
                                                            /> */}
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
        </View>
        <TouchableOpacity
          onPress={() => submitFeed()}
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
          <View style={{ width: 10 }}></View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
                fontFamily: 'OpenSans-Regular',
                fontWeight: '700',
              }}>
              {strings("Common.button_submit")}
            </Text>
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
    marginTop: 20,
    // fontWeight: "bold",
    fontSize: 14,
    fontFamily: 'Metropolis_SemiBold',
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

export default CreatePost;
