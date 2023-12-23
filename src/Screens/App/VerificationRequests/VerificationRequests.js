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
	ScrollView,
	BackHandler,
	Alert,
	ActivityIndicator,
	RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownAlert from 'react-native-dropdownalert';
import { strings } from '../../../localization/i18n';
import {
	VerificationRequestData,
	ApprovedVerificationRequestData,
} from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CustomText } from '../../../Component/Text';

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Rajesh Patel',
		username: 'Rajeshpatel009',
		number: '92193 84854',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Rajesh Patel',
		username: 'Rajeshpatel009',
		number: '92193 84854',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Rajesh Patel',
		username: 'Rajeshpatel009',
		number: '92193 84854',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Rajesh Patel',
		username: 'Rajeshpatel009',
		number: '92193 84854',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Rajesh Patel',
		username: 'Rajeshpatel009',
		number: '92193 84854',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Rajesh Patel',
		username: 'Rajeshpatel009',
		number: '92193 84854',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Rajesh Patel',
		username: 'Rajeshpatel009',
		number: '92193 84854',
	},
];

// const AccordianItem = ({item, onPress}) => (
//   <View>
//     <TouchableOpacity onPress={onPress} style={{margin: 5}}>
//       <View style={{flexDirection: 'row'}}>
//         <View style={{marginLeft: 13}}>
//           <Text style={styles.title}>{item.title}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   </View>
// );

const VerificationRequests = ({ navigation, props }) => {
	let dropDownAlertRef = useRef();

	const refRBSheet = useRef();
	const dispatch = useDispatch();
	let [loader, setLoader] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [checkBox, setCheckBox] = useState(false);
	const [toggleCheckBox, setToggleCheckBox] = useState(false);
	const [selectedItem, setSelectedItem] = useState([]);
	const [verificationRequestDataList, setVerificationRequestDataList] =
		useState([]);
	const [
		approved_VerificationRequestResponse,
		set_Approved_VerificationRequestResponse,
	] = useState('');
	const [choosedList, setChoosedList] = useState([]);
	const [userId, setUserId] = useState([]);
	const [customList, setCustomList] = useState([]);
	const [dataList, setDataList] = useState(DATA);
	const [choosedAll, setChoosedAll] = useState(false);
	const [search, setSearch] = useState('');
	let [searchFilterList, setSearchFilterList] = useState([]);

	function handleBackButtonClick() {
		navigation.goBack();
		return true;
	}

	useEffect(() => {
		// setLoader(true);
		getVerificationRequest();
		// setLoader(false);
		BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
		return () => {
			BackHandler.removeEventListener(
				'hardwareBackPress',
				handleBackButtonClick,
			);
		};
	}, []);

	const searchUser = search => {
		setLoader(true);
		console.log(search, '||||||||||||||||||||||||||');
		var data = verificationRequestDataList.filter(listItem =>
			listItem.first_name
				.toLowerCase()
				.includes(search.toString().toLowerCase()),
		);
		setVerificationRequestDataList(data);
		// setSearchFilterList(data);
		setLoader(false);
	};

	const onPressItem = id => {
		let customListNow = DATA;
		for (const item in customListNow) {
			if (customListNow[item].id === id) {
				if (customListNow[item].checked === false) {
					customListNow[item].checked = true;
					let itemChoosed = customListNow[item];
					if ([...choosedList, itemChoosed].length === customListNow.length) {
						setChoosedAll(true);
					} else {
						setChoosedAll(false);
					}
					setChoosedList([...choosedList, itemChoosed]);
				} else {
					customListNow[item].checked = false;
					let choosedListNow = choosedList.filter(item => item.id !== id);
					if (choosedListNow.length === customListNow.length) {
						setChoosedAll(true);
					} else {
						setChoosedAll(false);
					}
					setChoosedList(choosedListNow);
				}
			}
		}
		setCustomList(customListNow);
	};

	const getVerificationRequest = async () => {
		setLoader(true);
		// this.setState({isAPILoading: true});
		const Token = await AsyncStorage.getItem('loginToken');
		const get_Verification_Request_Data = await dispatch(
			VerificationRequestData(Token),
		);
		setVerificationRequestDataList(get_Verification_Request_Data.data);
		setLoader(false);
	};

	const ApproveRequest = async Id => {
		const is_approved = 1;
		setLoader(true);
		const Token = await AsyncStorage.getItem('loginToken');
		// this.setState({isAPILoading: true});

		const Approved_Verification_User_Data_Response = await dispatch(
			ApprovedVerificationRequestData(Token, Id, is_approved),
		);
		set_Approved_VerificationRequestResponse(
			Approved_Verification_User_Data_Response.data,
		);
		if (Approved_Verification_User_Data_Response.status == 200) {
			getVerificationRequest();
			// setLoader(false);
		} else {
			setLoader(false);
			Alert.alert(approved_VerificationRequestResponse.msg);
		}
	};
	const RejectRequest = async Id => {
		const is_approved = 2;
		setLoader(true);
		const Token = await AsyncStorage.getItem('loginToken');
		// this.setState({isAPILoading: true});

		const Approved_Verification_User_Data_Response = await dispatch(
			ApprovedVerificationRequestData(Token, Id, is_approved),
		);
		set_Approved_VerificationRequestResponse(
			Approved_Verification_User_Data_Response.data,
		);
		if (Approved_Verification_User_Data_Response.status == 200) {
			getVerificationRequest();
			// setLoader(false);
		} else {
			setLoader(false);
			Alert.alert(approved_VerificationRequestResponse.msg);
		}
	};



	const checkBoxButton = () => {
		if (checkBox == false) {
			setCheckBox(true);
		} else {
			setCheckBox(false);
		}
		if (checkBox == true) {
			setCheckBox(false);
		} else {
			setCheckBox(true);
		}
	};

	const Item = ({ item, onPress }) => (
		// <View>
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('VerificationRequestInfo', {
					userInfo: item,
				})
			}
			style={styles.item}>
			<View style={{ width: '70%' }}>
				<View style={{ marginLeft: 13 }}>
					<CustomText numberOfLines={2} regular style={styles.title}>{item.first_name} </CustomText>

					<CustomText regular style={styles.info}>{item.username}</CustomText>
					<CustomText regular style={styles.info}>{item.mobile}</CustomText>
				</View>
			</View>
			<View>
				<View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
					<CustomText regular
						style={{
							fontSize: 14,
							color: '#000',
							// fontFamily: 'OpenSans-Regular',
						}}>
						{moment(item.created_at).format('ll')}
					</CustomText>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
					<TouchableOpacity onPress={() => RejectRequest(item.id)}>
						<View style={{ margin: 5 }}>
							<Image source={require('../../../../assets/Cross.png')} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => ApproveRequest(item.id)}>
						<View style={{ margin: 5 }}>
							<Image
								source={require('../../../../assets/Select-Green.png')}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
		// </View>
	);

	const renderItem = ({ item }) => {
		setUserId(item.id);

		return (
			<Item
				item={item}
			/>
		);
	};
	const ChackBoxChange = id => {
		let verifyList = verificationRequestDataList;


		let index = verifyList.map(x => {
			if (x.id === id)
				x.checked = !x.checked;
			return x;
		})

		setVerificationRequestDataList(index)
	};
	const renderItemSelection = ({ item, index }) => {
		return (
			<View>
				<TouchableOpacity style={styles.item}>
					<View style={{ flexDirection: 'row', width: '100%' }}>
						<CheckBox
							value={item.checked}
							// onValueChange={newValue => setToggleCheckBox(newValue, item.id)}
							onChange={() => ChackBoxChange(item.id)}
							tintColors
						/>
						<View style={{ marginLeft: "5%", width: "60%" }}>

							<CustomText style={styles.title} numberOfLines={2}>
								{item.first_name}


							</CustomText>
							<CustomText regular style={styles.info}>{item.username}</CustomText>
							<CustomText regular style={styles.info}>{item.mobile}</CustomText>
						</View>
						<View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
							<CustomText
								style={{
									fontSize: 14,
									color: '#000',
									// fontFamily: 'OpenSans-Regular',
								}}>
								{/* 2 Jan 2021 */}
								{moment(item.created_at).format('ll')}
							</CustomText>
						</View>
					</View>
					{/* <View>
						<View style={{ alignItems: 'flex-end', backgroundColor: "blue", paddingRight: 10 }}>
							<Text
								style={{
									fontSize: 14,
									color: '#000',
									fontFamily: 'OpenSans-Regular',
								}}>
								{/* 2 Jan 2021 */}
					{/* {moment(item.created_at).format('ll')}
							</Text>
						</View>
					</View> */}
				</TouchableOpacity>
			</View>
		);
		// })

		//   <ItemSelection
		//     item={item}
		//     onPress={() =>
		//       navigation.navigate('VerificationRequestInfo', {
		//         name: item.title,
		//         id: item.id,
		//       })
		//     }
		//     // backgroundColor={{backgroundColor}}
		//     // textColor={{color}}
		//   />
	};
	const onRefresh = () => {
		setSearch('');
		searchUser('');
		getVerificationRequest();
	};

	const SelectAll = (toggleCheckBox2) => {
		setToggleCheckBox(!toggleCheckBox)
		let verifyList = verificationRequestDataList;
		let selectedAll;

		if (toggleCheckBox2) {
			selectedAll = verifyList.map(x => {
				x.checked = true;
				return x;
			})
		} else {
			selectedAll = verifyList.map(x => {
				x.checked = false;
				return x;
			})
		}
		console.log("selectedAll---------------->", selectedAll)
		setVerificationRequestDataList(selectedAll)
	}

	const AcceptAll = async () => {



		let Id = verificationRequestDataList.filter(x => x.checked === true).map(x => x.id).toString()

		const is_approved = 1;

		if (Id.length === 0) {
			dropDownAlertRef.alertWithType('error', 'DCRA', strings("VerificationRequestInfo.msg_select_atleast_one"));
			return
		}

		setLoader(true);
		const Token = await AsyncStorage.getItem('loginToken');
		// this.setState({isAPILoading: true});

		const Approved_Verification_User_Data_Response = await dispatch(
			ApprovedVerificationRequestData(Token, Id, is_approved),
		);
		set_Approved_VerificationRequestResponse(
			Approved_Verification_User_Data_Response.data,
		);
		if (Approved_Verification_User_Data_Response.status == 200) {
			setCheckBox(false)
			getVerificationRequest();
			setToggleCheckBox(!toggleCheckBox)
			setLoader(false)
		} else {
			setLoader(false);
			setToggleCheckBox(!toggleCheckBox)
			setCheckBox(false)
			dropDownAlertRef.alertWithType('error', 'DCRA', Approved_Verification_User_Data_Response.msg);
		}
	}

	const DeleteAll = async () => {
		let Id = verificationRequestDataList.filter(x => x.checked === true).map(x => x.id).toString()
		if (Id.length === 0) {
			dropDownAlertRef.alertWithType('error', 'DCRA', strings("VerificationRequestInfo.msg_select_atleast_one"));
			return
		}
		const is_approved = 2;
		setLoader(true);
		const Token = await AsyncStorage.getItem('loginToken');
		// this.setState({isAPILoading: true});

		const Approved_Verification_User_Data_Response = await dispatch(
			ApprovedVerificationRequestData(Token, Id, is_approved),
		);
		set_Approved_VerificationRequestResponse(
			Approved_Verification_User_Data_Response.data,
		);
		if (Approved_Verification_User_Data_Response.status == 200) {
			setCheckBox(false)
			getVerificationRequest();
			setToggleCheckBox(!toggleCheckBox)
			setLoader(false);
		} else {
			setLoader(false);
			setCheckBox(false)
			setToggleCheckBox(!toggleCheckBox)
			Alert.alert(Approved_Verification_User_Data_Response.msg);
		}
	}

	const close = () => {
		setLoader(true);
		setSearch(''),
			searchUser('');
		getVerificationRequest();
		// setLoader(false);

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
						{/* <Header> */}
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
								onPress={() => navigation.navigate('Dashboard')}
								style={{ width: '20%' }}>
								<Image
									source={require('../../../../assets/Back_Arrow_White.png')}
								/>
							</TouchableOpacity>
							<View style={{ width: '63%' }}>
								<CustomText regular
									numberOfLines={1}
									style={{
										color: '#fff',
										fontSize: 16,
										// fontFamily: 'OpenSans-Regular',
										fontWeight: '700',
										textAlign: 'center'
									}}>
									{strings("VerificationRequestInfo.lbl_verification_requests_caps")}
								</CustomText>
							</View>
							{verificationRequestDataList.length === 0 ? (

								<View style={styles.bell} >
									<Image
										source={require('../../../../assets/Select-White.png')}
									/>
								</View>


							) : (
								<View style={styles.bell}>
									{checkBox == false ? (
										<TouchableOpacity
											onPress={e => checkBoxButton()}
											style={styles.bell}>
											<View>
												<Image
													source={require('../../../../assets/Select-White.png')}
												/>
											</View>
										</TouchableOpacity>
									) : (
										<TouchableOpacity
											onPress={e => checkBoxButton()}
											style={styles.bell}>
											<View>
												<Image
													source={require('../../../../assets/SelectedCheckMark.png')}
												/>
											</View>
										</TouchableOpacity>
									)}
								</View>
							)}

						</View>

						{/* </Header> */}
					</View>
				</LinearGradient>
				<View
					style={{
						backgroundColor: '#fff',
						//   paddingHorizontal: 20,
						justifyContent: 'space-between',
						alignItems: 'center',
						marginVertical: 20,
						//   flexDirection: 'row',
					}}>
					<View style={styles.searchBar}>
						<View style={{ width: '90%' }}>
							<TextInput
								style={{ fontSize: 15, color: '#000' }}
								placeholderTextColor={'#000'}
								placeholder={strings("Common.hint_search")}
								// keyboardType='email-address'
								value={search}
								onChangeText={event => setSearch(event)}
								returnKeyType="search"
								onSubmitEditing={() => searchUser(search)}
							/>
						</View>
						{search == null || search == '' ? (
							<TouchableOpacity
							// onPress={() => searchUser(search)}
							>
								<Image
									style={{ width: 25, height: 25 }}
									source={require('../../../../assets/Search.png')}
								/>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								onPress={() => {
									close();
								}}>
								<Image
									style={{ width: 25, height: 25 }}
									source={require('../../../../assets/Cross_Black.png')}
								/>
							</TouchableOpacity>
						)}
					</View>
				</View>
				{checkBox == true ? (
					<FlatList
						style={{ marginBottom: 90 }}
						data={verificationRequestDataList}
						renderItem={renderItemSelection}
						ListEmptyComponent={
							<View
								style={{
									marginTop: '50%',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<CustomText>{strings("Common.lbl_result_not_found")}</CustomText>
							</View>
						} refreshControl={
							<RefreshControl
								refreshing={loader}
								onRefresh={onRefresh}
							// colors={[Colors.darkorange]}
							/>
						}
					// extraData={selectedId}
					/>
				) : (
					<View>
						<FlatList
							// style={{paddingVertical: 20}}
							data={
								verificationRequestDataList.length > 0
									? verificationRequestDataList
									: searchFilterList
							}
							renderItem={renderItem}
							ListEmptyComponent={
								<View
									style={{
										marginTop: '50%',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<CustomText>{strings("Common.lbl_result_not_found")}</CustomText>
								</View>
							} extraData={selectedId}
							refreshControl={
								<RefreshControl
									refreshing={loader}
									onRefresh={onRefresh}
								// colors={[Colors.darkorange]}
								/>
							}
						/>
					</View>
				)}
				{/* {searchFilterList.length == 0 ? (
          <FlatList
            style={{flex: 1}}
            data={verificationRequestDataList}
            ListEmptyComponent={
              <View
                style={{
                  // marginTop: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Result Not Found</Text>
              </View>
            }
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            refreshControl={
              <RefreshControl
                refreshing={loader}
                onRefresh={onRefresh}
                // colors={[Colors.darkorange]}
              />
            }
          />
        ) : (
          <FlatList
            style={{flex: 1}}
            data={searchFilterList}
            ListEmptyComponent={
              <View
                style={{
                  // marginTop: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Result Not Found</Text>
              </View>
            }
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            refreshControl={
              <RefreshControl
                refreshing={loader}
                onRefresh={onRefresh}
                // colors={[Colors.darkorange]}
              />
            }
          />
        )} */}
				{checkBox === false ? (
					<View />
				) : (
					<View style={styles.buttonContainer}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<CheckBox
								value={toggleCheckBox}
								onValueChange={() => SelectAll(!toggleCheckBox)}
								tintColors
							/>
							<CustomText regular
								style={{
									fontSize: 14,
									// fontFamily: 'OpenSans-Regular',
									fontWeight: '400',
									color: '#000',
								}}>
								{strings("VerificationRequests.lbl_select_all")}
							</CustomText>
						</View>

						<TouchableOpacity onPress={() => DeleteAll()}>
							<View style={styles.declineButtons}>
								<View style={{ marginRight: 10 }}>
									<Image
										source={require('../../../../assets/Cross_White.png')}
									/>
								</View>
								<View>
									<CustomText
										style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
										{strings("VerificationRequests.lbl_decline_all")}
									</CustomText>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => AcceptAll()}>
							<View style={styles.AcceptButtons}>
								<View style={{ marginRight: 10 }}>
									<Image
										source={require('../../../../assets/Right_White.png')}
									/>
								</View>
								<View>
									<CustomText
										style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
										{strings("VerificationRequests.lbl_accept_all")}
									</CustomText>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				)}
				<DropdownAlert
					ref={ref => {
						if (ref) {
							dropDownAlertRef = ref;
						}
					}}
				/>
			</SafeAreaView>
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

	item: {
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		padding: 15,
		marginTop: 2,
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
	title: {
		fontSize: 17,
		// fontFamily: 'OpenSans-Regular',
		fontWeight: '700',
		color: '#0D2451',
	},
	bell: {
		alignItems: 'flex-end',
		padding: 5,
		width: '20%',
	},

	searchBar: {
		borderWidth: 1,
		borderColor: '#DFDFDF',
		borderRadius: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		marginHorizontal: 10,
		// width: '85%',
	},
	filterText: {
		fontSize: 9,
		color: '#3877F1',
		fontFamily: 'OpenSans-Regular',
		fontWeight: '600',
	},
	info: {
		fontSize: 12,
		// fontFamily: 'OpenSans-Regular',
		color: '#000',
		marginTop: 3,
	},
	bottomSheetTitleText: {
		fontSize: 15,
		fontFamily: 'OpenSans-Regular',
		fontWeight: '700',
		color: '#000',
	},
	resetFilter: {
		alignItems: 'center',
		marginVertical: 20,
	},
	resetFilterText: {
		color: '#EB4335',
		fontFamily: 'OpenSans-Bold',
		fontSize: 18,
	},
	buttonContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingHorizontal: '5%',
		// marginVertical: 20,
		bottom: 0,
		position: 'absolute',
		backgroundColor: '#fff',
		width: '100%',
		paddingBottom: 10,
	},
	declineButtons: {
		padding: 15,
		flexDirection: 'row',
		backgroundColor: '#EB4335',
		alignItems: 'center',
		borderRadius: 30,
		paddingHorizontal: 15,
	},
	AcceptButtons: {
		padding: 15,
		flexDirection: 'row',
		backgroundColor: '#37B34A',
		alignItems: 'center',
		borderRadius: 30,
		paddingHorizontal: 15,
	},
});

export default VerificationRequests;
