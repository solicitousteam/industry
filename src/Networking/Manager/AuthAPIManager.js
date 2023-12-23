import Config from '../Config';
import APIConstants from '../APIConstants';
import {getAPI, patchAPI, deleteAPI, postAPI, putAPI} from './../Request';

const registretionAPI = (
  name,
  mobileNumber,
  DOB,
  userName,
  password,
  confirmPassword,
  email,
  address,
  gender,
  relative1Name,
  relative1MobileNumber,
  relative2Name,
  relative2MobileNumber,
  mobileNumber2,
  isCheckBoxSelect,
  deviceID,
  deviceName,
  FCM_Token,
) => {
  // console.log(deviceName, '0000000000000-----------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const data = {
    name: name,
    country_code: '+91',
    mobile: mobileNumber,
    date_of_birth: DOB,
    username: userName,
    password: password,
    email: email,
    Addr: address,
    gender,
    // relative1Name,
    relative_mobile_number_1: relative1MobileNumber,
    // relative2Name,
    relative_mobile_number_2: relative2MobileNumber,
    // mobileNumber2,
    // relative3MobileNumber: this.state.relative3MobileNumber,
    // relative4MobileNumber: this.state.relative4MobileNumber,
    // relative5MobileNumber: this.state.relative5MobileNumber,
    isCheckBoxSelect,
    device_id: deviceID,
    device_type: 'android',
    push_token: FCM_Token,
  };
  console.log('url====', Config.baseUrl + APIConstants.register, '=\n=', data);
  return postAPI(
    Config.baseUrl + APIConstants.register,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    data,
  )
    .then(function (response) {
      // handle success
      const registerAPI = response;
      //   console.log('registretionAPI=15=', registerAPI);
      return registerAPI;
    })
    .catch(function (error) {
      // handle error
      const registerAPI = error?.response?.data ? error.response.data : error;
      //   console.log('register==', registerAPI);
      return registerAPI;
    })
    .finally(function () {
      // always executed
      //   console.log('register=finally=');
    });
};
const socialRegistretionAPI = (
  firstName,
  userName,
  mobileNumber,
  DOB,
  password,
  confirmPassword,
  email,
  relative1MobileNumber,
  relative2MobileNumber,
  relative3MobileNumber,
  relative4MobileNumber,
  relative5MobileNumber,
  isCheckBoxSelect,
  deviceID,
  deviceName,
  FCM_Token,
  type,
  social_id,
) => {
  console.log(deviceName, '0000000000000-----------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const data = {
    type: type,
    social_id: social_id,
    username: userName,
    name: firstName,
    password: password,
    mobile: mobileNumber,
    date_of_birth: DOB,
    email: email,
    country_code: '+91',
    relative_mobile_number_1: relative1MobileNumber,
    relative_mobile_number_2: relative2MobileNumber,
    relative_mobile_number_3: relative3MobileNumber,
    relative_mobile_number_4: relative4MobileNumber,
    relative_mobile_number_5: relative5MobileNumber,
    relative_mobile_number_3: relative3MobileNumber,
    device_id: deviceID,
    device_type: 'android',
    push_token: FCM_Token,
  };
  console.log('url====', Config.baseUrl + APIConstants.register, '=\n=', data);
  return postAPI(
    Config.baseUrl + APIConstants.social_Login_Registration,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    data,
  )
    .then(function (response) {
      // handle success
      const socialRegistretionAPI = response;
      //   console.log('registretionAPI=15=', registerAPI);
      return socialRegistretionAPI;
    })
    .catch(function (error) {
      // handle error
      const socialRegistretionAPI = error?.response?.data
        ? error.response.data
        : error;
      //   console.log('register==', registerAPI);
      return socialRegistretionAPI;
    })
    .finally(function () {
      // always executed
      //   console.log('register=finally=');
    });
};
const loginAPI = (userName, password, deviceID, deviceName, FCM_Token) => {
  console.log(FCM_Token, '<<<<<<<<<FCM');
  // let responseObj = { error: 1, msg: '', result: '' };
  const data = {
    username: userName,
    password: password,
    device_id: deviceID,
    device_type: deviceName,
    push_token: FCM_Token,
  };
  console.log('url====', Config.baseUrl + APIConstants.login, '=\n=', data);
  return postAPI(
    Config.baseUrl + APIConstants.login,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    data,
  )
    .then(function (response) {
      // handle success
      const loginAPI = response;
      console.log('loginAPI=15=', loginAPI);
      return loginAPI;
    })
    .catch(function (error) {
      // handle error
      const loginAPI = error?.response?.data ? error.response.data : error;
      console.log('login==', error);
      return registerAPI;
    })
    .finally(function () {
      // always executed
      console.log('login=finally=');
    });
};
const socialLoginAPI = (
  deviceID,
  deviceName,
  FCM_Token,
  type,
  social_id,
  email,
) => {
  console.log(FCM_Token, '<<<<<<<<<FCM');
  // let responseObj = { error: 1, msg: '', result: '' };
  const data = {
    device_id: deviceID,
    device_type: deviceName,
    push_token: FCM_Token,
    type: type,
    social_id: social_id,
    email: email,
  };
  console.log(
    'url====',
    Config.baseUrl + APIConstants.social_Login,
    '=\n=',
    data,
  );
  return postAPI(
    Config.baseUrl + APIConstants.social_Login,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    data,
  )
    .then(function (response) {
      // handle success
      const socialLoginAPI = response;
      console.log('socialLoginAPI=15=', socialLoginAPI);
      return socialLoginAPI;
    })
    .catch(function (error) {
      // handle error
      const socialLoginAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('login==', socialLoginAPI);
      return socialLoginAPI;
    })
    .finally(function () {
      // always executed
      console.log('login=finally=');
    });
};
const setMpinAPI = (token, mpin, confirm_mpin) => {
  console.log(token, '________________________________________');
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  console.log(headers, '*********************');
  // let responseObj = { error: 1, msg: '', result: '' };
  const data = {
    mpin: mpin,
    confirm_mpin: confirm_mpin,
  };
  console.log('url====', Config.baseUrl + APIConstants.setMpin, headers, data);
  return postAPI(Config.baseUrl + APIConstants.setMpin, headers, data)
    .then(function (response) {
      // handle success
      const setMpinAPI = response;
      console.log('setMpinAPI=15=', setMpinAPI);
      return setMpinAPI;
    })
    .catch(function (error) {
      // handle error
      const setMpinAPI = error?.response?.data ? error.response.data : error;
      console.log('setMpin==', setMpinAPI);
      return setMpinAPI;
    })
    .finally(function () {
      // always executed
      console.log('setMpin=finally=');
    });
};
const loginMpinAPI = (token, mpin) => {
  console.log(token, '________________________________________');
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  console.log(headers, '*********************');
  // let responseObj = { error: 1, msg: '', result: '' };
  const data = {
    mpin,
  };
  console.log(
    'url====',
    Config.baseUrl + APIConstants.loginMpin,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.loginMpin, headers, data)
    .then(function (response) {
      // handle success
      const loginMpinAPI = response;
      console.log('setMpinAPI=15=', loginMpinAPI);
      return loginMpinAPI;
    })
    .catch(function (error) {
      // handle error
      const loginMpinAPI = error?.response?.data ? error.response.data : error;
      console.log('setMpin==', loginMpinAPI);
      return loginMpinAPI;
    })
    .finally(function () {
      // always executed
      console.log('setMpin=finally=');
    });
};
const forgotPasswordAPI = (token, id, password, confirm_password) => {
  const headers = {
    Authorization: token,
    'Content-Type': 'application/json',
  };
  // let responseObj = { error: 1, msg: '', result: '' };
  const data = {
    id,
    password,
    confirm_password,
  };
  console.log(
    'url====',
    Config.baseUrl + APIConstants.forgotPassword,
    '=\n=',
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.forgotPassword, headers, data)
    .then(function (response) {
      // handle success
      const forgotPasswordAPI = response;
      console.log('forgotPasswordAPI=15=', forgotPasswordAPI);
      return forgotPasswordAPI;
    })
    .catch(function (error) {
      // handle error
      const forgotPasswordAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('forgotPasswordAPI==', forgotPasswordAPI);
      return forgotPasswordAPI;
    })
    .finally(function () {
      // always executed
      console.log('forgotPasswordAPI=finally=');
    });
};

const logoutAPI = Token => {
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  console.log(headers, '*********************');
  console.log('url====', Config.baseUrl + APIConstants.logout, '=\n=', headers);
  return getAPI(Config.baseUrl + APIConstants.logout, headers)
    .then(function (response) {
      // handle success
      const logoutAPI = response;
      console.log('getUserAPI=15=', logoutAPI);
      return logoutAPI;
    })
    .catch(function (error) {
      // handle error
      const logoutAPI = error?.response?.data ? error.response.data : error;
      console.log('logoutAPI==', logoutAPI);
      return logoutAPI;
    })
    .finally(function () {
      // always executed
      console.log('logoutAPI=finally=');
    });
};

export {
  //auth-stable
  registretionAPI,
  loginAPI,
  setMpinAPI,
  forgotPasswordAPI,
  loginMpinAPI,
  logoutAPI,
  socialRegistretionAPI,
  socialLoginAPI,
};
