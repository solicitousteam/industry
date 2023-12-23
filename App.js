import React, {useState, useRef, useEffect} from 'react';
import {LogBox,View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import reducers from './src/Redux/Reducer/MainReducer';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import MainStackNavigator from './src/Navigation/MainStackNavigator';
import {createStore, applyMiddleware} from 'redux';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'react-native-i18n';

const middleWare = applyMiddleware(thunkMiddleware);

const store = createStore(reducers, middleWare);

LogBox.ignoreAllLogs(true)
const {Navigator, Screen} = createNativeStackNavigator();

function App() {
  useEffect(() => {
   

    
 
  }, []);

  AsyncStorage.getItem("selected_lang_code").then((value)=>{
    if(value){
      I18n.locale = value
    }else{
      I18n.locale = "en"
    }
  })
  
    return (
      <Provider store={store}>
        <MainStackNavigator />
      </Provider>
    );
  // }
  // return (
  //   <NavigationContainer>
  //     <AppStack />
  //   </NavigationContainer>
  // );
}
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
export default App;
