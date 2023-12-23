import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import LoginScreen from "../Auth/LoginScreen";
// import ForgotPasswordScreen from "../Auth/ForgotPasswordScreen";
// import CreateAccount from "../Auth/CreateAccount";
import UserRating from "../App/UserRating";
import News from "../App/News";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="UserRating" component={UserRating} />
      <Stack.Screen name="News" component={News} />
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="News" component={News} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator };