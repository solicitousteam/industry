import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
        color: '#0D2451',
    },
    bell: {
        alignItems: 'flex-end',
        padding: 5,
        width: '15%',
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
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        marginTop: 3,
    },
    text: {
        // fontFamily: 'OpenSans-Semibold',
        fontWeight: '600',
        color: '#000',
        // fontSize: 17,
    },
    textTitle: {
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '400',
        // fontSize: 14,
    },
    deleteView: {
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteText: {
        width: '60%',
        textAlign: 'center'
    },
    deleteBtnView: {
        marginTop: '5%',
        marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    deleteBtn: {
        marginTop: 20,
        borderRadius: 48,
        paddingVertical: 16,
        width: '25%'
    },
    deleteBtnViewTxt: {
        justifyContent: 'center',
        alignItems: 'center',

    }, deleteBtnText: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
    }, deleteBtnPressYes: {
        marginTop: 20,
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
        elevation: 5,
        width: '25%'
    },
    deleteBtnYesTxt: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
    }
});
export { styles }