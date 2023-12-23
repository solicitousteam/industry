import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { strings } from "../../../localization/i18n"
import CheckBox from '@react-native-community/checkbox';

const CustomDrawer = ({ navigation }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              fontFamily: 'OpenSans-Regular',
            }}>
            {strings("CustomDrawer.lbl_layers")}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <View>
            <Image source={require('../../../../assets/Cross_Black.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_cone_of_uncertainity")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_observed_track")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_tehsil_boundary")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_flood_hazard_500yr")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_district_boundary")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_tehsil_boundary")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_village_boundary")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_surge_hazard")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_flood_hazard")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_wind_hazard")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_affected_population")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_affected_population_density")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CustomDrawer.lbl_state_boundary")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'OpenSans-Semibold',
              fontSize: 14,
            }}>
            {strings("CrowdSourcingSecond.lbl_rainfall")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 40,
    // alignItems: "center",
    // paddingHorizontal: 30,
    // justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainView: {
    ...Platform.select({
      android: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'center',
        marginTop: '22.2%',
      },
      ios: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'center',
        marginTop: '5%',
      },
    }),
  },
  goldImage: {
    ...Platform.select({
      android: {
        position: 'absolute',
        alignSelf: 'flex-end',
        marginHorizontal: '26%',
        // justifyContent:'center'
      },
      ios: {
        position: 'absolute',
        alignSelf: 'flex-end',
        // paddingHorizontal: "18%",
        marginHorizontal: '25%',
      },
    }),
  },
  title: {
    marginTop: 20,
    // fontWeight: "bold",
    fontSize: 20,
    fontFamily: 'Metropolis_SemiBold',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'Metropolis_Regular',
    color: '#000',
    opacity: 0.5,
  },
  textInput: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 14,
    padding: 15,
    borderColor: '#F0F0F0',
    backgroundColor: '#F0F0F0',
    fontFamily: 'Poppins_Regular',
  },
  forgotPassword: {
    marginTop: 30,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Metropolis_Regular',
    color: '#000',
  },
  loginButton: {
    ...Platform.select({
      ios: {
        marginTop: 22,
        // backgroundColor: "#FE8312",
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',

        shadowColor: '#FE8312',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 20,
      },
      android: {
        marginTop: 22,
        // backgroundColor: "#FE8312",
        borderRadius: 52,
        paddingVertical: 15,
        alignItems: 'center',

        shadowColor: '#FE8312',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 20,
      },
    }),
  },
  signupText: {
    marginTop: 36,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default CustomDrawer;