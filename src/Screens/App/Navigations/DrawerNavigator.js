import React from "react";
// import { ContactStackNavigator } from "../Navigations/StackNavigator";
// import TabNavigator from "../Navigations/TabNavigator";
import Map from "../Map/Map";
import CustomDrawer from "./CustomDrawer";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    // <NavigationContainer>

    <Drawer.Navigator
    
      initialRouteName="Map"
      drawerContentOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
        drawerPosition: 'right'
      }}
      screenOptions={{
        headerShown: false
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      
    >
      <Drawer.Screen name="Map" component={Map} />
      {/* <Drawer.Screen name="Contact" component={ContactStackNavigator} /> */}
    </Drawer.Navigator>
    // </NavigationContainer>

  );
};

export default DrawerNavigator;
