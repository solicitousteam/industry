import React, { useState, useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomText } from '../../Component/Text';
import { moderateScale } from 'react-native-size-matters';
import { strings } from '../../localization/i18n';

const LocationSpecipi = ({ route, navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#3877F1" />
            <LinearGradient
                colors={['#3877F1', '#215ACA']}
                style={styles.linearGradient}>
                <Image source={require('../../../assets/Ellipse_Head.png')} />
                {/* <Header> */}
                <View
                    style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        width: '100%',
                    }}>
                    <View
                        style={{
                            marginTop: '5%',
                            marginLeft: '15%',
                            width: '65%',
                            alignItems: 'center',
                        }}>
                        <CustomText
                            onPress={() => { navigation.goBack() }}
                            semibold
                            numberOfLines={1}
                            style={{ color: '#fff', fontSize: moderateScale(16) }}>
                            {strings('Dashboard.lbl_location_specific_details')}
                        </CustomText>
                    </View>
                </View>
            </LinearGradient>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate('LocationSpecificDetails', { current: 'current' }) }} style={[styles.viewStyle, { backgroundColor: '#e5eefe', }]}>
                    <Image
                        style={styles.iconStyle}
                        source={require('../../../assets/location_1.png')}
                    />
                    <Text style={styles.txtStyle}>Your Current{'\n'} Location</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate('LocationSpecificDetails', { current: 'other' }) }} style={[styles.viewStyle, { backgroundColor: '#FFF', }]}>
                    <Image
                        style={styles.iconStyle}
                        source={require('../../../assets/location_2.png')}
                    />
                    <Text style={styles.txtStyle}>Other{'\n'} Location</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    viewStyle: {
        flex: 0.47,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 9,
        alignItems: 'center',
        height: 200,
        borderRadius: 10
    },
    iconStyle: { resizeMode: 'contain', height: 80, width: 80, marginTop: '10%' },
    txtStyle: { textAlign: 'center', marginTop: 10, color: '#000000', fontSize: moderateScale(15) }
});

export default LocationSpecipi;
