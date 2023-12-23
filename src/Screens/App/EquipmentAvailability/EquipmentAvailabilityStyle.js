import { StyleSheet } from 'react-native';


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
        // backgroundColor: "red",
        // justifyContent: 'space-between',
        // padding: 15,
        // marginTop: 2,
        borderRadius: 10,
        marginBottom: '4%',
        // marginVertical: 5,
        marginHorizontal: "4%",
        flexDirection: 'row',
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
    flatListViewText: {
        padding: "5%",
        // backgroundColor: "green", 
        width: "75%"
    },
    flatListViewBtn: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '25%',
        //  backgroundColor: "pink"
    },
    title: {
        // fontSize: 17,
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
        color: '#0D2451',
    },
    AccordianTitle: {
        marginTop: 20,
        // fontWeight: "bold",
        // fontSize: 14,
        // fontFamily: 'Metropolis_SemiBold',
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
        // fontSize: 12,
        // fontFamily: 'OpenSans-Regular',
        color: '#000',
        marginTop: 3,
    }, WarningTitleText: {
        // fontSize: 18,
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
        color: '#000',
    },
    bottomSheetTitleText: {
        // fontSize: 15,
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
        color: '#000',
    },
    resetFilter: {
        alignItems: 'center',
        marginVertical: 20,
    },
    resetFilterText: {
        color: '#EB4335',
        // fontFamily: 'OpenSans-Bold',
        // fontSize: 18,
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#3877F1',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerView: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    touchableStyle: {
        width: '15%',
    },
    headerTextStyle: {
        color: '#fff',
        // fontSize: 16,
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: "center"
    },
    serachView: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        flexDirection: 'row',
    },
    searchText: { fontSize: 15, color: '#000' },
    searchImage: { width: 25, height: 25 },
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
        // fontSize: 18,
        color: '#000',
        // fontFamily: 'OpenSans-Regular',
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
        // fontSize: 18,
        color: '#fff',
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
    },
    filterView: {
        marginTop: '5%'
    },
    filterText: {
        // fontSize: 14,
        color: '#3877F1',
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '400',
    },
    collapseStyle: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#DFDFDF',
    },
    collapseHeader: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 17,
        paddingHorizontal: 10,
        alignItems: 'center',

    }, collapseBody: {
        paddingVertical: 10
    },
    filterApplyBtn: {
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    filterApplyView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    filterApplyText: {
        // fontSize: 18,
        color: '#fff',
        // fontFamily: 'OpenSans-Regular',
        fontWeight: '700',
    },
    noResultView: {
        marginTop: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    }



});
export { styles }