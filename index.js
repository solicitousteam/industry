/**
 * @format
 */

 import { AppRegistry, Platform, LogBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import { notificationHandler } from './notificationHandler';
import PushNotification from 'react-native-push-notification'
import messaging from '@react-native-firebase/messaging';
PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: notification => {
      console.log(notification);
      alert('3')
      if (notification.action === "Take") {
          alert('0')
        //do something here
      } else if (notification.action === "Skip") {
        alert('1')
        //do something here
      } else if (notification.action === "Snooze") {
        alert('2')
        //do something here
      }
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
  });

AppRegistry.registerComponent(appName, () => App);
