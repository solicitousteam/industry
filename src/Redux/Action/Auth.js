export const LOGIN = 'LOGIN';
export const LGOUT = 'LGOUT';
export const REGISTER = 'REGISTER';
export const SETMPIN = 'SETMPIN';
export const LOGINMPIN = 'LOGINMPIN';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const SOCIAL_REGISTRATION = 'SOCIAL_REGISTRATION';
export const SOCIAL_LOGIN = 'SOCIAL_LOGIN';

import {
  registretionAPI,
  loginAPI,
  setMpinAPI,
  forgotPasswordAPI,
  loginMpinAPI,
  logoutAPI,
  socialRegistretionAPI,
  socialLoginAPI,
} from '../../Networking/Manager/AuthAPIManager';

//onRegister response
export const registerSuccess = registerResponse => {
  return {
    type: REGISTER,
    registerResponse,
  };
};
export const loginSuccess = loginResponse => {
  return {
    type: LOGIN,
    loginResponse,
  };
};
export const setMpinSuccess = setMpinResponse => {
  return {
    type: SETMPIN,
    setMpinResponse,
  };
};
export const forgotPasswordSuccess = forgotPasswordResponse => {
  return {
    type: FORGOT_PASSWORD,
    forgotPasswordResponse,
  };
};
export const loginMpinSuccess = loginMpinResponse => {
  return {
    type: LOGINMPIN,
    loginMpinResponse,
  };
};
export const logoutSuccess = logoutResponse => {
  return {
    type: LGOUT,
    logoutResponse,
  };
};
export const socialRegistrationSuccess = socialRegistrationResponse => {
  return {
    type: SOCIAL_REGISTRATION,
    socialRegistrationResponse,
  };
};
export const socialLoginSuccess = socialLoginResponse => {
  return {
    type: SOCIAL_LOGIN,
    socialLoginResponse,
  };
};
export const Registration = (
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
  mobileNumber2,
  relative2MobileNumber,
  isCheckBoxSelect,
  deviceID,
  deviceName,
  FCM_Token,
) => {
  return async dispatch => {
    try {
      const registerResponseData = await registretionAPI(
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
        mobileNumber2,
        relative2MobileNumber,
        isCheckBoxSelect,
        deviceID,
        deviceName,
        FCM_Token,
      );
      // console.log('registerResponseData==success==', registerResponseData);

      if (registerResponseData) {
        const data = registerResponseData ? registerResponseData : '';
        if (data.status) {
          let registerResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('registerResponse=30==', registerResponse);
          dispatch(registerSuccess(registerResponse));
          return registerResponse;
        } else {
          console.log('registerResponse=30=else s=', data);

          let registerResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return registerResponse;
        }
      }
    } catch (e) {
      console.log('registerResponse==error==', e);
      let registerResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return registerResponse;
    }
  };
};
export const SocialRegistration = (
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
  return async dispatch => {
    try {
      const socialRegistrationResponseData = await socialRegistretionAPI(
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
      );
      console.log(
        'socialRegistrationResponseData==success==',
        socialRegistrationResponseData,
      );

      if (socialRegistrationResponseData) {
        const data = socialRegistrationResponseData
          ? socialRegistrationResponseData
          : '';
        if (data.status) {
          let socialRegistrationResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log(
            'socialRegistrationResponse=30==',
            socialRegistrationResponse,
          );
          dispatch(socialRegistrationSuccess(socialRegistrationResponse));
          return socialRegistrationResponse;
        } else {
          console.log('socialRegistrationResponse=30=else s=', data);

          let socialRegistrationResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return socialRegistrationResponse;
        }
      }
    } catch (e) {
      console.log('socialRegistrationResponse==error==', e);
      let socialRegistrationResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return socialRegistrationResponse;
    }
  };
};
export const Login = (userName, password, deviceID, deviceName, FCM_Token) => {
  return async dispatch => {
    try {
      const loginResponseData = await loginAPI(
        userName,
        password,
        deviceID,
        deviceName,
        FCM_Token,
      );
      console.log('loginResponseData==success==', loginResponseData);

      if (loginResponseData) {
        const data = loginResponseData ? loginResponseData : '';
        if (data.status) {
          let loginResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('loginResponse=30==', loginResponse);
          dispatch(loginSuccess(loginResponse));
          return loginResponse;
        } else {
          console.log('loginResponse=30=else s=', data);

          let loginResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return loginResponse;
        }
      }
    } catch (e) {
      console.log('loginResponse==error==', e);
      let loginResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return loginResponse;
    }
  };
};
export const socialLogin = (
  deviceID,
  deviceName,
  FCM_Token,
  type,
  social_id,
  email,
) => {
  console.log('SOCIAL LOGIN');
  return async dispatch => {
    try {
      const socialLoginResponseData = await socialLoginAPI(
        deviceID,
        deviceName,
        FCM_Token,
        type,
        social_id,
        email,
      );
      console.log(
        'socialLoginResponseData==success==',
        socialLoginResponseData,
      );

      if (socialLoginResponseData) {
        const data = socialLoginResponseData ? socialLoginResponseData : '';
        if (data.status) {
          let socialLoginResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('socialLoginResponse=30==', socialLoginResponse);
          dispatch(socialLoginSuccess(socialLoginResponse));
          return socialLoginResponse;
        } else {
          console.log('socialLoginResponse=30=else s=', data);

          let socialLoginResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return socialLoginResponse;
        }
      }
    } catch (e) {
      console.log('socialLoginResponse==error==', e);
      let socialLoginResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return socialLoginResponse;
    }
  };
};
export const SetMpin = (token, mpin, confirm_mpin) => {
  // return
  return async dispatch => {
    try {
      const setMpinResponseData = await setMpinAPI(token, mpin, confirm_mpin);
      console.log('setMpinResponseData==success==', setMpinResponseData);

      if (setMpinResponseData) {
        const data = setMpinResponseData ? setMpinResponseData : '';
        if (data.status) {
          let setMpinResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('setMpinResponse=30==', setMpinResponse);
          dispatch(setMpinSuccess(setMpinResponse));
          return setMpinResponse;
        } else {
          console.log('setMpinResponse=30=elses=', data);
          let setMpinResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return setMpinResponse;
        }
      }
    } catch (e) {
      console.log('setMpinResponse==error==', e);
      let setMpinResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return setMpinResponse;
    }
  };
};
export const LoginMpin = (token, otp) => {
  return async dispatch => {
    try {
      const loginMpinResponseData = await loginMpinAPI(token, otp);
      console.log('loginMpinResponseData==success==', loginMpinResponseData);

      if (loginMpinResponseData) {
        const data = loginMpinResponseData ? loginMpinResponseData : '';
        if (data.status) {
          let loginMpinResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('loginMpinResponse=30==', loginMpinResponse);
          dispatch(loginMpinSuccess(loginMpinResponse));
          return loginMpinResponse;
        } else {
          console.log('loginMpinResponse=30=else s=', data);

          let loginMpinResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return loginMpinResponse;
        }
      }
    } catch (e) {
      console.log('loginMpinResponse==error==', e);
      let loginMpinResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return loginMpinResponse;
    }
  };
};
export const ForgotPassword = (token, id, password, confirm_password) => {
  return async dispatch => {
    try {
      const forgotPasswordResponseData = await forgotPasswordAPI(
        token,
        id,
        password,
        confirm_password,
      );
      console.log(
        'forgotPasswordResponseData==success==',
        forgotPasswordResponseData,
      );

      if (forgotPasswordResponseData) {
        const data = forgotPasswordResponseData
          ? forgotPasswordResponseData
          : '';
        if (data.status) {
          let forgotPasswordResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('forgotPasswordResponse=30==', forgotPasswordResponse);
          dispatch(forgotPasswordSuccess(forgotPasswordResponse));
          return forgotPasswordResponse;
        } else {
          console.log('forgotPasswordResponse=30=else s=', data);

          let forgotPasswordResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return forgotPasswordResponse;
        }
      }
    } catch (e) {
      console.log('forgotPasswordResponse==error==', e);
      let forgotPasswordResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return forgotPasswordResponse;
    }
  };
};
export const Logout = token => {
  return async dispatch => {
    try {
      const logoutResponseData = await logoutAPI(token);
      if (logoutResponseData) {
        const data = logoutResponseData ? logoutResponseData : '';
        if (data.status) {
          let logoutResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('lgoutResponse=30==', logoutResponse);
          dispatch(logoutSuccess(logoutResponse));
          return logoutResponse;
        } else {
          let logoutResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
          };
          return logoutResponse;
        }
      }
    } catch (e) {
      console.log('logoutResponse==error==', e);
      let logoutResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return logoutResponse;
    }
  };
};
