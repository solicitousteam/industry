import React, { useState, useRef, useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    ActivityIndicator,
    ScrollView,
    BackHandler,
    Alert,
    RefreshControl
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'react-native-reanimated';
import DisasterManagerInfo from '../DisasterManager/DisasterManagerInfo';
import { strings } from '../../../localization/i18n';


const Notification = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [notificationList, setNotificationList] = useState([])
    const [offset, setOffset] = useState(0)
    const [notificationTemp, setNotificationTemp] = useState([])
    const [flatListLoader, setFlatListLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        getNotifications();
        // // if (flag === true)
        // //   getData();
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);

    const onRefresh = async () => {
        setLoader(true)
        setOffset(0);
        setNotificationTemp([])
        const refreshOffSet = 0
        const Token = await AsyncStorage.getItem('loginToken');
        const get_notification_Data = await dispatch(
            NotificationData(Token, refreshOffSet),
        );
        setNotificationList(get_notification_Data.data);
        setNotificationTemp(get_notification_Data.data)
        // setOffset(offset + get_notification_Data.data.length)
        // getNotifications();
        setLoader(false);

    };
    const getNotifications = async () => {
        // setLoader(true);
        // this.setState({isAPILoading: true});
        console.log(offset, "LLLLLL")
        // return
        const Token = await AsyncStorage.getItem('loginToken');

        console.log(offset, "OOOOOOOOOOO")
        const get_notification_Data = await dispatch(
            NotificationData(Token, offset),
        );
        setNotificationList(get_notification_Data.data);
        setNotificationTemp(get_notification_Data.data)
        // setOffset(offset + get_notification_Data.data.length)
        setLoader(false);
        return
    }

    const loadNotification = async () => {
        setFlatListLoader(true);

        const offsetLength = notificationTemp.length;
        console.log(offsetLength, "lemdt")

        const Token = await AsyncStorage.getItem('loginToken')
        const get_notification_Data = await dispatch(
            NotificationData(Token, offsetLength),
        );

        console.log(get_notification_Data.data, "notification data")

        if (get_notification_Data.status == 200) {
            const Addition = offsetLength + get_notification_Data.data.length
            notificationTemp.push(...get_notification_Data.data)
            setNotificationList(get_notification_Data.data)
            setOffset(Addition);
            console.log(offset, "OFFSET")
            setFlatListLoader(false);
            return
        } else {
            setFlatListLoader(false);
            Alert.alert(get_notification_Data.msg);
            return
        }
    }
    // const renderFooterPublic = () => {
    //     return (
    //         //Footer View with Load More button
    //         flatListLoader ?
    //             <View style={styles.footer}>
    //                 <ActivityIndicator size={"large"} />
    //             </View>
    //             : null
    //     );
    // };


    const renderItemSelection = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity disabled style={styles.item}
                    onPress={() =>
                        navigation.navigate('FeedPost', {
                            feedInfo: item, screen: "Notification"
                        })
                    }
                >
                    <View style={{ flexDirection: 'row', width: '70%' }}>
                        <View style={{ marginLeft: 13 }}>
                            <Text style={styles.title} numberOfLines={2}>
                                {item.title}
                            </Text>
                            <Text style={styles.info}>{item.message}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <View style={{ paddingRight: 10, justifyContent: 'flex-end' }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#000',
                                    fontFamily: 'OpenSans-Regular',
                                }}>
                                {/* 2 Jan 2021 */}
                                {moment(item.created_at).format('ll')}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );

    };
    const renderFooterMy = () => {
        return (
            //Footer View with Load More button
            <View style={styles.footer}>
                {flatListLoader ? (
                    <ActivityIndicator
                        color="#3877F1"
                        style={{ marginLeft: 8 }} />
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => loadNotification()}
                        //On Click of button load more data
                        style={styles.loadMoreBtn}>
                        <Text style={styles.btnText}>{strings("Common.lbl_load_more")}</Text>

                    </TouchableOpacity>
                )}

            </View>
        );
    };

    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    const submit = async () => {

    }

    if (!loader) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#3877F1" />
                <LinearGradient
                    colors={['#3877F1', '#215ACA']}
                    style={styles.linearGradient}>
                    <View
                        style={{
                            //   backgroundColor: '#5B4CDF',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image source={require('../../../../assets/Ellipse_Head.png')} />
                        <View
                            style={{
                                position: 'absolute',
                                flexDirection: 'row',
                                width: '100%',
                                paddingHorizontal: 20,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ width: '20%' }}>
                                <View>
                                    <Image
                                        source={require('../../../../assets/Back_Arrow_White.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 16,
                                        fontFamily: 'OpenSans-Regular',
                                        fontWeight: '700',
                                    }}>
                                    {strings("Notification.lbl_notification")}
                                </Text>
                            </View>
                            <View style={(styles.bell, [{ flexDirection: 'row', width: "20%", justifyContent: 'flex-end' }])}>

                            </View>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{ marginTop: 10 }}>
                    {notificationList.length < 10 || notificationList.length === 0 ? (
                        <FlatList
                            style={{ marginBottom: "20%" }}
                            data={notificationTemp}
                            renderItem={renderItemSelection}
                            ListEmptyComponent={
                                <View
                                    style={{
                                        marginTop: '50%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text>{strings("Common.lbl_result_not_found")}</Text>
                                </View>
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={loader}
                                    onRefresh={() => onRefresh()}
                                // colors={[Colors.darkorange]}
                                />
                            }
                        // onEndReached={loadPublicFeed}
                        // ListFooterComponent={renderFooterPublic}
                        />
                    ) : (

                        <FlatList
                            style={{ marginBottom: "20%" }}
                            data={notificationTemp}
                            renderItem={renderItemSelection}
                            ListEmptyComponent={
                                <View
                                    style={{
                                        marginTop: '50%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text>{strings("Common.lbl_result_not_found")}</Text>
                                </View>
                            }
                            // onEndReached={() => loadNotification()}
                            // ListFooterComponent={renderFooterMy}
                            // onEndReached={({ distanceFromEnd }) => {
                            //     console.log(distanceFromEnd)
                            //     if (distanceFromEnd >= 50) {
                            //         loadNotification()
                            //     }
                            // }}
                            // onEndReachedThreshold={0.8}
                            // ListFooterComponent={() => renderFooterPublic()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={loader}
                                    onRefresh={() => onRefresh()}
                                // colors={[Colors.darkorange]}
                                />
                            }
                        />
                    )}
                    {/* <FlatList
                            style={{ marginBottom: 90 }}
                            data={notificationList}
                            renderItem={renderItemSelection}
                            ListEmptyComponent={
                                <View
                                    style={{
                                        marginTop: '50%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text>Result Not Found</Text>
                                </View>
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={loader}
                                    onRefresh={() => onRefresh()}
                                // colors={[Colors.darkorange]}
                                />
                            }
                        // onEndReached={loadPublicFeed}
                        // ListFooterComponent={renderFooterPublic}
                        /> */}
                </View>


            </SafeAreaView >
        );
    } else {
        return <ActivityIndicator style={{ justifyContent: 'center', flex: 1 }} />;
    }
};

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
        width: '20%',
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
        fontFamily: 'OpenSans-Semibold',
        fontWeight: '600',
        color: '#000',
        fontSize: 17,
    },
    textTitle: {
        fontFamily: 'OpenSans-Regular',
        fontWeight: '400',
        fontSize: 14,
    },
    item: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: 15,
        // marginTop: 2,
        borderRadius: 10,
        marginBottom: 20,
        // marginVertical: 5,
        marginHorizontal: 16,
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
    // title: {
    //     marginTop: 20,
    //     // fontWeight: "bold",
    //     fontSize: 14,
    //     fontFamily: 'Metropolis_SemiBold',
    // },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#3877F1',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
});

export default Notification;
