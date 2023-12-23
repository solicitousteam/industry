import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainView: {
        ...Platform.select({
            android: {
                paddingHorizontal: 30,
                flex: 1,
                justifyContent: 'center',
                // marginTop: "20%",
            },
            ios: {
                paddingHorizontal: 30,
                flex: 1,
                justifyContent: 'center',
                marginTop: '20%',
            },
        }),
    },
    goldImage: {
        ...Platform.select({
            android: {
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingHorizontal: '25%',
            },
            ios: {
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingHorizontal: '18%',
            },
        }),
    },
    title: {
        marginTop: 20,
        // fontWeight: "bold",
        // fontSize: 14,
        // fontFamily: 'Metropolis_SemiBold',
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
        marginTop: 22,
        // backgroundColor: "#FE8312",
        borderRadius: 52,
        paddingVertical: 20,
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
    signupText: {
        marginTop: 36,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    // new
    statusbarAlign: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarText: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    statusbarTextStyle: {
        color: '#fff',
        // fontSize: 16,
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: "center"
    },
    textStyle: {
        // fontSize: 14,
        color: '#000000',
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '400',
    },
    fieldViewStyle: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#DFDFDF',
        marginTop: 5
    },
    textFieldStyle: {
        paddingHorizontal: 10,
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        fontWeight: '600',
        color: '#0D2451',
    },
    viewStyle: {
        marginTop: "5%"
    },
    collapseStyle: {
        borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF'
    },
    collapseHeaderStyle: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 17,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    collapseBody: {
        paddingVertical: 10
    },
    btnStyle: {
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
    },
    btnViewStyle: {
        width: 10
    }, btnBackgroundStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    btnTextStyle: {
        // fontSize: 18,
        color: '#fff',
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
    }

});

export { styles }