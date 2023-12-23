import React, { useState, useRef, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';

import MapsTypes_Weather from '../Screens/App/MapsTypes_Weather/MapsTypes_Weather';
import StartScreen from '../Screens/Auth/StartScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegistrationScreen from '../Screens/Auth/RegistrationScreen';
import MpinScreen from '../Screens/Auth/MpinScreen';
import forgotPasswordScreen from '../Screens/Auth/ForgotPasswordScreen';
import OTPVerification from '../Screens/Auth/OTPVerification';
import OTPVerificationPhone from '../Screens/Auth/OTPVerificationPhone';
import SetNewPassword from '../Screens/Auth/SetNewPassword';
import ThankYou from '../Screens/Auth/ThankYou';
import MpinLogin from '../Screens/App/MpinLogin';
import Dashboard from '../Screens/App/Dashboard';
import ChangeLanguage from '../Screens/App/ChangeLanguage';
import DeleteAccount from '../Screens/App/DeleteAccount';

import WeatherTypes from '../Screens/App/WeatherForcast/WeatherTypes';
import StateUsers from '../Screens/App/StateUser/StateUsers';
import AddStateUser from '../Screens/App/StateUser/AddStateUser';
import StateUserInfo from '../Screens/App/StateUser/StateUserInfo';
import DisasterManagers from '../Screens/App/DisasterManager/DisasterManagers';
import AddDisasterManager from '../Screens/App/DisasterManager/AddDisasterManager';
import DisasterManagerInfo from '../Screens/App/DisasterManager/DisasterManagerInfo';
import VerificationRequests from '../Screens/App/VerificationRequests/VerificationRequests';
import VerificationRequestInfo from '../Screens/App/VerificationRequests/VerificationRequestInfo';
import CrowdSourcingFirst from '../Screens/App/CrowdSourcing/CrowdSourcingFirst';
import CrowdSourcingfile from '../Screens/App/CrowdSourcing/CrowdSourcingfile';

import CrowdSourcingSecond from '../Screens/App/CrowdSourcing/CrowdSourcingSecond';
import CrowdSourcingThird from '../Screens/App/CrowdSourcing/CrowdSourcingThird';
import CrowdSourcingFourth from '../Screens/App/CrowdSourcing/CrowdSourcingFourth';
import ReviewFormInfo from '../Screens/App/CrowdSourcing/ReviewFormInfo';
import ThankYouCrowdSourcing from '../Screens/App/CrowdSourcing/ThankYouCrowdSourcing';
import FeedTabs from '../Screens/App/Feed/FeedTabs';
import FeedPost from '../Screens/App/Feed/FeedPost';
import CreatePost from '../Screens/App/Feed/CreatePost';
import FeedBack from '../Screens/App/FeedBack/FeedBack';
import MapsTypes from '../Screens/App/MapsTypes/MapsTypes';
import Map from '../Screens/App/Map/Map';
import MapWebview from '../Screens/App/Map/MapWebview';
import Notification from '../Screens/App/Notification/Notification';
import DrawerNavigator from '../Screens/App/Navigations/DrawerNavigator';
import HydrometHazard from '../Screens/App/HydrometHazard/HydrometHazard';
import Report from '../Screens/App/Report/Report';
import RiskReport from '../Screens/App/Report/RiskReport';
import StateComReport from '../Screens/App/Report/StateComReport';
import CycloneDetails from '../Screens/App/Report/CycloneDetails';

import Profile from '../Screens/App/Profile/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import SplashScreen from 'react-native-splash-screen';
import ResourceAllocation from '../Screens/App/ResourceAllocation/ResourceAllocation';
import ImdCyclone from '../Screens/App/Report/ImdCyclone';
import AddManpowerResources from '../Screens/App/ManpowerResources/AddManpowerResources';
import ManpowerResources from '../Screens/App/ManpowerResources/ManpowerResources';
import ManpowerResourcesInfo from '../Screens/App/ManpowerResources/ManpowerResourcesInfo';

import AddEquipmentAvailability from '../Screens/App/EquipmentAvailability/AddEquipmentAvailability';
import EquipmentAvailability from '../Screens/App/EquipmentAvailability/EquipmentAvailability';
import EquipmentAvailabilityInfo from '../Screens/App/EquipmentAvailability/EquipmentAvailabilityInfo';
import LocationSpecificDetails from '../Screens/App/LocationSpecificDetails';
import LocalWeatherData from '../Screens/App/LocalWeatherData/LocalWeatherData';
import LocalWeatherDataDetails from '../Screens/App/LocalWeatherDataDetails/LocalWeatherDataDetails';
import LocationSpecipi from '../Screens/Auth/LocationSpecipi';
const { Navigator, Screen } = createNativeStackNavigator();

// useEffect(() => {
//   const Data = route.params;
//   setResponse(Data);
// }, []);

// const CheckUserVerifyStatus = () => {
//   return fetch('https://reactnative.dev/movies.json')
//     .then(response => response.json())
//     .then(json => {
//       return json.movies;
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };

const MainStackNavigator = ({ navigation }) => {
  const [userID, setUserID] = useState('');
  const [userMpin, setUserMpin] = useState('');
  const [userName, setUserName] = useState('');
  const [initialRoute, setInitialRoute] = useState(AuthStack);
  const [feedid, setFeedId] = useState('');
  // const navigation = useNavigation();

  useEffect(() => {
    SplashScreen.hide();
    // getToken();
    // checkPermission();
    loginInfo();
  });

  const loginInfo = async () => {
    const userID = await AsyncStorage.getItem('loginID');
    setUserID(userID);
    const userMpin = await AsyncStorage.getItem('loginMpin');
    setUserMpin(userMpin);
    const userName = await AsyncStorage.getItem('loginUserName');
    setUserName(userName);
  };
  const AuthStack = () => (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Start" component={StartScreen} />
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Registration" component={RegistrationScreen} />
      <Screen name="Mpin" component={MpinScreen} />
      <Screen name="ChangeLanguage" component={ChangeLanguage} />
      <Screen name="ForgotPassword" component={forgotPasswordScreen} />
      <Screen name="OTPVerification" component={OTPVerification} />
      <Screen name="SetNewPassword" component={SetNewPassword} />
      <Screen name="OTPVerificationPhone" component={OTPVerificationPhone} />
      <Screen name="ThankYou" component={ThankYou} />
      <Screen name="Dashboard" component={AppStack} />
    </Navigator>
  );
  const AppStack = () => (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="MpinLogin" component={MpinLogin} />
      <Screen name ="LocationSpecipi" component={LocationSpecipi}/>
      <Screen name="WeatherTypes" component={WeatherTypes} />
      <Screen name="StateUsers" component={StateUsers} />
      <Screen name="AddStateUser" component={AddStateUser} />
      <Screen name="StateUserInfo" component={StateUserInfo} />
      <Screen name="DisasterManagers" component={DisasterManagers} />
      <Screen name="AddDisasterManager" component={AddDisasterManager} />
      <Screen name="DisasterManagerInfo" component={DisasterManagerInfo} />
      <Screen name="VerificationRequests" component={VerificationRequests} />
      <Screen name="ChangeLanguage" component={ChangeLanguage} />
      <Screen name="DeleteAccount" component={DeleteAccount} />
      <Screen name="LocalWeatherData" component={LocalWeatherData} />
      <Screen
        name="LocalWeatherDataDetails"
        component={LocalWeatherDataDetails}
      />
      <Screen
        name="VerificationRequestInfo"
        component={VerificationRequestInfo}
      />
      <Screen name="CrowdSourcingFirst" component={CrowdSourcingFirst} />
      <Screen name="CrowdSourcingfile" component={CrowdSourcingfile} />
      <Screen name="CrowdSourcingSecond" component={CrowdSourcingSecond} />
      <Screen name="CrowdSourcingThird" component={CrowdSourcingThird} />
      <Screen name="CrowdSourcingFourth" component={CrowdSourcingFourth} />
      <Screen name="ReviewFormInfo" component={ReviewFormInfo} />
      <Screen name="ThankYouCrowdSourcing" component={ThankYouCrowdSourcing} />
      <Screen name="FeedTabs" component={FeedTabs} />
      <Screen name="FeedPost" component={FeedPost} />
      <Screen name="CreatePost" component={CreatePost} />
      <Screen name="FeedBack" component={FeedBack} />
      <Screen name="Profile" component={Profile} />
      <Screen name="MapsTypes" component={MapsTypes} />
      <Screen name="MapsTypes_Weather" component={MapsTypes_Weather} />
      <Screen name="Map" component={DrawerNavigator} />
      <Screen name="MapWebview" component={MapWebview} />
      <Screen
        name="LocationSpecificDetails"
        component={LocationSpecificDetails}
      />
      <Screen name="ResourceAllocation" component={ResourceAllocation} />
      <Screen name="HydrometHazard" component={HydrometHazard} />
      <Screen name="OTPVerification" component={OTPVerification} />
      <Screen name="SetNewPassword" component={SetNewPassword} />
      <Screen name="AuthStack" component={AuthStack} />
      <Screen name="Notification" component={Notification} />
      <Screen name="Report" component={Report} />
      <Screen name="RiskReport" component={RiskReport} />
      <Screen name="StateComReport" component={StateComReport} />
      <Screen name="CycloneDetails" component={CycloneDetails} />
      <Screen name="ImdCyclone" component={ImdCyclone} />

      <Screen name="Mpin" component={MpinScreen} />
      <Screen name="AddManpowerResources" component={AddManpowerResources} />
      <Screen name="ManpowerResources" component={ManpowerResources} />
      <Screen name="ManpowerResourcesInfo" component={ManpowerResourcesInfo} />

      <Screen
        name="AddEquipmentAvailability"
        component={AddEquipmentAvailability}
      />
      <Screen name="EquipmentAvailability" component={EquipmentAvailability} />
      <Screen
        name="EquipmentAvailabilityInfo"
        component={EquipmentAvailabilityInfo}
      />
    </Navigator>
  );
  // if (!loaded) {
  //   return null;
  // }
  if (!userID) {
    return (
      <NavigationContainer>
        <AuthStack />
        {/* <AppStack/> */}
      </NavigationContainer>
    );
  } else if (feedid && userID) {
    return (
      <NavigationContainer initialRoute={'Notification'}>
        <AppStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  }
};
// if (!user) {
//   return (
//     <NavigationContainer>
//       <AuthStack />
//     </NavigationContainer>
//   );
// }

// return (
//   <NavigationContainer>
//     <AppStack />
//   </NavigationContainer>
// );
export default MainStackNavigator;
