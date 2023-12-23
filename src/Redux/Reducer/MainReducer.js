import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import AdminReducer from './AdminReducer';

export default combineReducers({
    authReducer,
    AdminReducer
});
