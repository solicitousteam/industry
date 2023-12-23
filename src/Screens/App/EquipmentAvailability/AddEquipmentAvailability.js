import React, { useRef, useState, useEffect } from 'react';
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
	FlatList,
	ActivityIndicator,
	BackHandler
} from 'react-native';
import { strings } from "../../../localization/i18n"
import * as constants from "../../../Util/Constants"
import { styles } from "./AddEquipmentAvailabilityStyle";
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddStateUserData } from '../../../Redux/Action/Admin';
import {
	Collapse,
	CollapseHeader,
	CollapseBody,
	AccordionList,
} from 'accordion-collapse-react-native';
import { equipmentData, departmentTypeData, departmentNameData } from "../../../Util/Common";
import Config from '../../../Networking/Config';
import APIConstants from '../../../Networking/APIConstants';
import { postAPI } from '../../../Networking/Request';
import { CustomText } from '../../../Component/Text';

const Item = ({ item, onPress }) => (
	<View>
		<TouchableOpacity onPress={onPress} style={styles.item}>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ marginLeft: 13 }}>
					<CustomText fontSize={14} regular style={styles.title}>{item.title}</CustomText>
				</View>
			</View>
		</TouchableOpacity>
	</View>
);
const AddEquipmentAvailability = ({ navigation, route }) => {
	let dropDownAlertRef = useRef();
	const dispatch = useDispatch();

	const [equipmentName, setEquipmentName] = useState('Select Equipment Name')
	const [equipmentNameToggle, setEquipmentNameToggle] = useState(false)
	const [departmentType, setDepartmentType] = useState(strings("AddManpowerResources.lbl_select_department_type"))
	const [departmentTypeToggle, setDepartmentTypeToggle] = useState(false);
	const [departmentName, setDepartmentName] = useState(strings("AddEquipmentAvailability.lbl_select_departmant_name"))
	const [departmentNameToggle, setDepartmentNameToggle] = useState(false)
	// const [equipmentType, setEquipmentType] = useState('Select Equipment Type')
	const [equipmentType, setEquipmentType] = useState('')
	// const [equipmentTypeToggle, setEquipmentTypeToggle] = useState(false)
	// const [equipmentCategory, setEquipmentCategory] = useState('Select Equipment Category')
	const [equipmentCategory, setEquipmentCategory] = useState('')
	// const [equipmentCategoryToggle, setEquipmentCategoryToggle] = useState(false)
	const [condition, setCondition] = useState('')
	const [year, setYear] = useState('')
	const [remarks, setRemarks] = useState('')
	const [equipmentDataSet, SetEqipmentDataSet] = useState([])
	const [departmentDataSet, SetDepartmentDataSet] = useState([])
	const [departmentNameSet, setDepartmentNameSet] = useState([])

	let [loader, setLoader] = useState(false);
	const [headerTitle, setHeaderTitle] = useState('');
	const [userId, setUserId] = useState('');




	function handleBackButtonClick() {
		navigation.goBack();
		return true;
	}

	useEffect(() => {
		setLoader(true);
		SetEqipmentDataSet(equipmentData)
		SetDepartmentDataSet(departmentTypeData)
		setDepartmentNameSet(departmentNameData)
		const Data = route.params;
		const Header = Data.flag;
		console.log(Data);
		setHeaderTitle(Header);

		if (Header === "") {
			setEquipmentName(strings("AddEquipmentAvailability.lbl_select_equipment_name"));
			setDepartmentType(strings("AddManpowerResources.lbl_select_department_type"))
			setDepartmentName(strings("AddEquipmentAvailability.lbl_select_departmant_name"))

		} else {
			setEquipmentName(Data?.userInfo?.name);
			setDepartmentType(Data?.userInfo?.department_type)
			setDepartmentName(Data?.userInfo?.department_name)
		}
		setEquipmentType(Data?.userInfo?.type)
		setEquipmentCategory(Data?.userInfo?.category)
		setCondition(Data?.userInfo?.condition)
		setYear(Data?.userInfo?.year)
		setRemarks(Data?.userInfo?.remark)
		setUserId(Data.userInfo.id);
		setLoader(false);
		BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
		return () => {
			BackHandler.removeEventListener(
				'hardwareBackPress',
				handleBackButtonClick,
			);
		};
	}, []);


	const renderItems = (item, type) => {
		return <Item item={item?.item} onPress={() => { onToggleClick(item, type) }} />;
	};

	const onToggleClick = (item, type) => {
		switch (type) {
			case constants.EQUIPMENT_NAME:
				console.log("callequipment", item.item.title);
				setEquipmentName(item.item.title)
				setEquipmentNameToggle(false)
				break;

			case constants.DEPARTMENT_TYPE:
				console.log("callequipment", item.item.title);
				setDepartmentType(item.item.title)
				setDepartmentTypeToggle(false)
				break;

			case constants.DEPARTMENT_NAME:
				console.log("callequipment", item.item.title);
				setDepartmentName(item.item.title)
				setDepartmentNameToggle(false)
				break;

			// case constants.EQUIPMENT_TYPE:
			// 	console.log("callequipment", item.item.title);
			// 	setEquipmentType(item.item.title)
			// 	setEquipmentTypeToggle(false)
			// 	break;

			// case constants.EQUIPMENT_CATEGORY:
			// 	console.log("callequipment", item.item.title);
			// 	setEquipmentCategory(item.item.title)
			// 	setEquipmentCategoryToggle(false)
			// 	break;
			default:
				break;
		}

	};




	const addEquipmentData = async () => {
		const Token = await AsyncStorage.getItem('loginToken');

		if (headerTitle === 'editUser') {
			if (equipmentName === strings("AddEquipmentAvailability.lbl_select_equipment_name") || equipmentName === undefined) {
				dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.lbl_equipment_name_required"));
				return;
			}
			if (departmentType === strings("AddManpowerResources.lbl_select_department_type") || departmentType === undefined) {
				dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_department_type_required"));
				return;
			}
			if (departmentName === strings("AddEquipmentAvailability.lbl_select_departmant_name") || departmentName === undefined) {
				dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddManpowerResources.lbl_department_name_required"));
				return;
			}
		} else {

			if (equipmentName === strings("AddEquipmentAvailability.lbl_select_equipment_name") || equipmentName === undefined) {
				dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.lbl_equipment_name_required"));
				return;
			}
			if (departmentType === strings("AddManpowerResources.lbl_select_department_type") || departmentType === undefined) {
				dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddEquipmentAvailability.msg_department_type_required"));
				return;
			}
			if (departmentName === strings("AddEquipmentAvailability.lbl_select_departmant_name") || departmentName === undefined) {
				dropDownAlertRef.alertWithType('error', 'DCRA', strings("AddManpowerResources.lbl_department_name_required"));
				return;
			}
		}

		setLoader(true);
		const headers = {
			Accept: 'application/json',
			Authorization: 'Bearer ' + Token,
			'Content-Type': 'multipart/form-data',
		};
		let formData = new FormData()
		console.log(userId, "userId");

		userId !== '' && userId !== undefined && formData.append("id", userId)
		formData.append("name", equipmentName)
		formData.append("department_type", departmentType)
		formData.append("department_name", departmentName)
		formData.append("type", equipmentType)
		formData.append("category", equipmentCategory)
		formData.append("condition", condition)
		formData.append("year", year)
		formData.append("remark", remarks)

		console.log(
			'url====ADD_EDIT_EQUIPMENT==',
			Config.baseUrl + APIConstants.ADD_EDIT_EQUIPMENT,
			headers,
			formData,
		);

		return postAPI(Config.baseUrl + APIConstants.ADD_EDIT_EQUIPMENT, headers, formData)
			.then(function (response) {
				setLoader(false)

				console.log('Equipment Res:', response);
				if (response.status === 200) {

					dropDownAlertRef.alertWithType('success', 'DERA', response.message);
					navigation.navigate('EquipmentAvailability');
				}
			})
			.catch(function (error) {
				setLoader(false)
				const ErrorData = error?.response?.data
					? error.response.data
					: error;
				setLoader(false);
				// console.log("error", error);
				dropDownAlertRef.alertWithType('DCRA', 'error', ErrorData);
			})
			.finally(function () {
				setLoader(false)
			});

	};

	if (!loader) {
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar backgroundColor="#3877F1" />
				<LinearGradient
					colors={['#3877F1', '#215ACA']}
					style={styles.linearGradient}>
					<View
						style={styles.statusbarAlign}>
						<Image source={require('../../../../assets/Ellipse_Head.png')} />
						{/* <Header> */}
						<View
							style={styles.statusBarText}>
							<TouchableOpacity
								onPress={() => navigation.navigate('EquipmentAvailability')}
								style={{ width: '10%' }}>
								<Image
									source={require('../../../../assets/Back_Arrow_White.png')}
								/>
							</TouchableOpacity>
							<View style={{ width: "90%" }}>
								{/* {headerTitle === 'editUser' ? (
									<CustomText
										style={{
											backgroundColor: "red",
											color: '#fff',
											fontSize: 16,
											fontFamily: 'OpenSans-Regular',
											fontWeight: '700',
											textTransform: 'uppercase'
										}}>
										Equipment Availability
									</CustomText>
								) : ( */}
								<CustomText
									fontSize={16}
									regular
									numberOfLines={1}
									style={styles.statusbarTextStyle}>
									{strings("AddEquipmentAvailability.lbl_equipment_availability")}
								</CustomText>
								{/* )} */}
							</View>
							<View style={{ width: '20%' }}></View>
						</View>
						{/* </Header> */}
					</View>
				</LinearGradient>
				<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
					<View style={{ paddingHorizontal: 10 }}>
						<View style={{ paddingHorizontal: 10, marginTop: 40 }}>
							<View style={styles.viewStyle}>
								<CustomText regular fontSize={14} style={styles.textStyle}>
									{strings("AddEquipmentAvailability.lbl_equipment_name")}
								</CustomText>
							</View>
							{/* <View
								style={styles.fieldViewStyle}>
								<TextInput
									maxLength={20}
									value={firstName}
									style={styles.textFieldStyle}
									onChangeText={equipmentName => setEquipmentName(equipmentName)}
								/>
							</View> */}
							<Collapse
								style={styles.collapseStyle}
								isExpanded={equipmentNameToggle}
								onToggle={isExpanded => setEquipmentNameToggle(isExpanded)}>
								<CollapseHeader
									style={styles.collapseHeaderStyle}>
									<View>
										<CustomText>{equipmentName}</CustomText>
									</View>
									<Image
										source={require('../../../../assets/DownArrow.png')}
									/>
								</CollapseHeader>
								<CollapseBody>
									<FlatList
										style={styles.collapseBody}
										data={equipmentDataSet}
										renderItem={(e) => renderItems(e, constants.EQUIPMENT_NAME)}
										keyExtractor={item => item.id}
									/>
								</CollapseBody>
							</Collapse>

							<View style={styles.viewStyle}>
								<CustomText
									fontSize={14}
									regular
									style={styles.textStyle}>
									{strings("AddEquipmentAvailability.lbl_department_type")}
								</CustomText>
							</View>
							<Collapse
								style={styles.collapseStyle}
								isExpanded={departmentTypeToggle}
								onToggle={isExpanded => setDepartmentTypeToggle(isExpanded)}>
								<CollapseHeader
									style={styles.collapseHeaderStyle}>
									<View>
										<CustomText>{departmentType}</CustomText>
									</View>
									<Image
										source={require('../../../../assets/DownArrow.png')}
									//   style={{width: 22, height: 20}}
									// resizeMode={'stretch'}
									/>
								</CollapseHeader>
								<CollapseBody>
									<FlatList
										style={styles.collapseBody}
										data={departmentDataSet}
										renderItem={(e) => renderItems(e, constants.DEPARTMENT_TYPE)}
										keyExtractor={item => item.id}
									/>
								</CollapseBody>
							</Collapse>
							<View style={styles.viewStyle}>
								<CustomText regular fontSize={14} style={styles.textStyle}>
									{strings("AddEquipmentAvailability.lbl_department_name")}
								</CustomText>
							</View>
							<Collapse
								style={styles.collapseStyle}
								isExpanded={departmentNameToggle}
								onToggle={isExpanded => setDepartmentNameToggle(isExpanded)}>
								<CollapseHeader
									style={styles.collapseHeaderStyle}>
									<View>
										<CustomText>{departmentName}</CustomText>
									</View>
									<Image source={require('../../../../assets/DownArrow.png')} />
								</CollapseHeader>
								<CollapseBody>
									<FlatList
										style={styles.collapseBody}
										data={departmentNameSet}
										renderItem={(e) => renderItems(e, constants.DEPARTMENT_NAME)}
										keyExtractor={item => item.id}
									/>
								</CollapseBody>
							</Collapse>
							<View style={styles.viewStyle}>
								<CustomText fontSize={14} regular style={styles.textStyle}>
									{strings("AddEquipmentAvailability.lbl_equipment_type")}
								</CustomText>
							</View>
							<View
								style={styles.fieldViewStyle}>
								<TextInput
									maxLength={20}
									value={equipmentType}
									style={styles.textFieldStyle}
									onChangeText={equipment => setEquipmentType(equipment)}
								/>
							</View>
							{/* <Collapse
								style={styles.collapseStyle}
								isExpanded={equipmentTypeToggle}
								onToggle={isExpanded => setEquipmentTypeToggle(isExpanded)}>
								<CollapseHeader
									style={styles.collapseHeaderStyle}>
									<View>
										<CustomText>{equipmentType}</CustomText>
									</View>
									<Image
										source={require('../../../../assets/DownArrow.png')}
									//   style={{width: 22, height: 20}}
									// resizeMode={'stretch'}
									/>
								</CollapseHeader>
								<CollapseBody>
									<FlatList
										style={styles.collapseBody}
										data={departmentname}
										renderItem={(e) => renderItems(e, constants.EQUIPMENT_TYPE)}
										keyExtractor={item => item.id}
									/>
								</CollapseBody>
							</Collapse> */}
							<View style={styles.viewStyle}>
								<CustomText regular fontSize={14} style={styles.textStyle}>
									{strings("AddEquipmentAvailability.lbl_equipment_category")}
								</CustomText>
							</View>
							<View
								style={styles.fieldViewStyle}>
								<TextInput
									maxLength={20}
									value={equipmentCategory}
									style={styles.textFieldStyle}
									onChangeText={equipment => setEquipmentCategory(equipment)}
								/>
							</View>
							{/* <Collapse
								style={styles.collapseStyle}
								isExpanded={equipmentCategoryToggle}
								onToggle={isExpanded => setEquipmentCategoryToggle(isExpanded)}>
								<CollapseHeader
									style={styles.collapseHeaderStyle}>
									<View>
										<CustomText>{equipmentCategory}</CustomText>
									</View>
									<Image
										source={require('../../../../assets/DownArrow.png')}
									//   style={{width: 22, height: 20}}
									// resizeMode={'stretch'}
									/>
								</CollapseHeader>
								<CollapseBody>
									<FlatList
										style={styles.collapseBody}
										data={departmentname}
										renderItem={(e) => renderItems(e, constants.EQUIPMENT_CATEGORY)}
										keyExtractor={item => item.id}
									/>
								</CollapseBody>
							</Collapse> */}


							<View style={styles.viewStyle}>
								<CustomText regular fontSize={14} style={styles.textStyle}>
									{strings("AddEquipmentAvailability.lbl_condition")}
								</CustomText>
							</View>
							<View
								style={styles.fieldViewStyle}>
								<TextInput
									maxLength={10}
									value={condition}
									style={styles.textFieldStyle}
									onChangeText={condition =>
										setCondition(condition)
									}
								/>
							</View>
							<View style={styles.viewStyle}>
								<CustomText regular fontSize={14} style={styles.textStyle}>
									{strings("AddEquipmentAvailability.lbl_year")}
								</CustomText>
							</View>
							<View
								style={styles.fieldViewStyle}>
								<TextInput
									maxLength={10}
									keyboardType={'numeric'}
									value={year}
									style={styles.textFieldStyle}
									onChangeText={year =>
										setYear(year)
									}
								/>
							</View>

							<View style={styles.viewStyle}>
								<CustomText regular fontSize={14} style={styles.textStyle}>
									{strings("AddEquipmentAvailability.lbl_remarks")}
								</CustomText>
							</View>
							<View
								style={styles.fieldViewStyle}>
								<TextInput
									maxLength={10}
									value={remarks}
									style={styles.textFieldStyle}
									onChangeText={remark =>
										setRemarks(remark)
									}
								/>
							</View>
							<TouchableOpacity
								// onPress={() => navigation.navigate('Dashboard')}
								onPress={() => addEquipmentData()}
								style={styles.btnStyle}>
								<View style={styles.btnViewStyle}></View>
								<View
									style={styles.btnBackgroundStyle}>
									<CustomText
										fontSize={18}
										regular
										style={styles.btnTextStyle}>
										{strings("Common.lbl_save")}
									</CustomText>
								</View>
								<View>

								</View>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
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

export default AddEquipmentAvailability;