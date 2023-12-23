export const SUBMIT_REGISTRATION_DATA = 'SUBMIT_REGISTRATION_DATA'
export const SUBMIT_LOGIN_DATA = 'SUBMIT_LOGIN_DATA'
export const SUBMIT_SETMPIN_DATA = 'SUBMIT_SETMPIN_DATA'
export const SUBMIT_FORGOTPASSWORD_DATA = 'SUBMIT_FORGOTPASSWORD_DATA'
export const SUBMIT_LOGINMPIN_DATA = 'SUBMIT_LOGINMPIN_DATA'
export const LOGOUT = 'LOGOUT'
export const SOCIAL_REGISTRATION = 'SOCIAL_REGISTRATION'
export const SOCIAL_LOGIN = 'SOCIAL_LOGIN';

const initialState = {
  registerResponse: '',
  loginResponse: '',
  setMpinResponse: '',
  forgotPasswordResponse: '',
  loginMpinResponse: '',
  logoutResponse: '',
  socialRegistrationResponse:'',
  socialLoginResponse:''
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case SUBMIT_REGISTRATION_DATA:
        return {...state, registerResponse: action.registerResponse}
    //case REMOVE_FROM_CART:
      //return state.filter(cartItem => cartItem.id !== action.payload.id)
      case SUBMIT_LOGIN_DATA:
        return {...state, loginResponse: action.loginResponse}
      case SUBMIT_SETMPIN_DATA:
        return {...state, setMpinResponse: action.setMpinResponse}
      case SUBMIT_FORGOTPASSWORD_DATA:
        return {...state, forgotPasswordResponse: action.forgotPasswordResponse}
      case SUBMIT_LOGINMPIN_DATA:
        return {...state, loginMpinResponse: action.loginMpinResponse}
      case LOGOUT:
        return {...state, logoutResponse: action.logoutResponse}
      case SOCIAL_REGISTRATION:
        return {...state, socialRegistrationResponse: action.socialRegistrationResponse}
      case SOCIAL_LOGIN:
        return {...state, socialLoginResponse: action.socialLoginResponse}
    }
    return state
}
  
export default AuthReducer
