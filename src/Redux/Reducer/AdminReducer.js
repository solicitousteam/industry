
export const GET_STATE_USER = 'GET_STATE_USER';
export const GET_DISASTER_USER = 'GET_DISASTER_USER';
export const ADD_DISASTER_USER = 'ADD_DISASTER_USER';
export const ADD_STATE_USER = 'ADD_STATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_VERIFICATION_REQUEST_DATA = 'GET_VERIFICATION_REQUEST_DATA';
export const APPROVED_VERIFICATION_REQUEST_DATA = 'APPROVED_VERIFICATION_REQUEST_DATA';
export const SEND_FEEDBACK = 'SEND_FEEDBACK';
export const GET_FEED = 'GET_FEED';
export const CREATE_FEED = 'CREATE_FEED';
export const COMMENT_LIST = 'COMMENT_LIST';
export const ADD_EDIT_COMMENT = 'ADD_EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SAFE_OR_NOT_SAFE = 'SAFE_OR_NOT_SAFE';
export const CROUD_SOURCING = 'CROUD_SOURCING';
export const DELETE_FEED = 'DELETE_FEED';
export const CROUD_SOURCING_DETAILS = 'CROUD_SOURCING_DETAILS'
export const GET_PROFILE = "GET_PROFILE"
export const EDIT_PROFILE = "EDIT_PROFILE";
export const NOTIFICATION = "NOTIFICATION";
export const GET_FEED_INFO = "GET_FEED_INFO";
export const GET_NOTIFICATION_COUNTS = "GET_NOTIFICATION_COUNTS"
export const GET_MAP_CLICK = "GET_MAP_CLICK"

const initialState = {
  getUserResponse:'',
  getDisasterUserResponse: '',
  getAddDisasterUserResponse: '',
  getAddStateUserResponse: '',
  getDeleteUserResponse: '',
  getVerificationRequestResponse:'',
  approvedVerificationRequestResponse:'',
  sendFeedbackResponse: '',
  getFeedResponse: '',
  createFeedResponse: '',
  commentListResponse: '',
  addEditCommentResponse: '',
  deleteCommentResponse: '',
  safe_or_not_safeAPIResponse: '',
  create_crowd_sourcingAPIResponse: '',
  delete_feedAPIResponse: '',
  croudSourcingDetailResponse: '',
  getProfileResponse:'',
  editProfileResponse:'',
  notificationResponse: '',
  getFeedInfoResponse: '',
  getNotificationCountsResponse: '',
  getMapDetail:''
}

const AdminReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_STATE_USER:
        return {...state, getUserResponse: action.getUserResponse}
      case GET_DISASTER_USER:
        return {...state, getDisasterUserResponse: action.getDisasterUserResponse}
      case ADD_DISASTER_USER:
        return {...state, getAddDisasterUserResponse: action.getAddDisasterUserResponse}
      case ADD_STATE_USER:
        return {...state, getAddStateUserResponse: action.getAddStateUserResponse}
      case DELETE_USER:
        return {...state, getDeleteUserResponse: action.getDeleteUserResponse}
      case GET_VERIFICATION_REQUEST_DATA:
        return {...state, getVerificationRequestResponse: action.getVerificationRequestResponse}
      case APPROVED_VERIFICATION_REQUEST_DATA:
        return {...state, approvedVerificationRequestResponse: action.approvedVerificationRequestResponse}
      case SEND_FEEDBACK:
        return {...state, sendFeedbackResponse: action.sendFeedbackResponse}
      case GET_FEED:
        return {...state, getFeedResponse: action.getFeedResponse}
      case CREATE_FEED:
        return {...state, createFeedResponse: action.createFeedResponse}
      case COMMENT_LIST:
        return {...state, commentListResponse: action.commentListResponse}
      case ADD_EDIT_COMMENT:
        return {...state, addEditCommentResponse: action.addEditCommentResponse}
      case DELETE_COMMENT:
        return {...state, deleteCommentResponse: action.deleteCommentResponse}
      case SAFE_OR_NOT_SAFE:
        return {...state, safe_or_not_safeAPIResponse: action.safe_or_not_safeAPIResponse}
      case CROUD_SOURCING:
        return {...state, create_crowd_sourcingAPIResponse: action.create_crowd_sourcingAPIResponse}
      case DELETE_FEED:
        return {...state, delete_feedAPIResponse: action.delete_feedAPIResponse}
      case CROUD_SOURCING_DETAILS:
        return {...state, croudSourcingDetailResponse: action.croudSourcingDetailResponse}
      case GET_PROFILE:
        return {...state, getProfileResponse: action.getProfileResponse}
      case EDIT_PROFILE:
        return {...state, editProfileResponse: action.editProfileResponse}
      case NOTIFICATION:
        return {...state, notificationResponse: action.notificationResponse}
      case GET_FEED_INFO:
        return {...state, getFeedInfoResponse: action.getFeedInfoResponse}
      case GET_NOTIFICATION_COUNTS:
        return {...state, getNotificationCountsResponse: action.getNotificationCountsResponse}
        case GET_MAP_CLICK:
          return {...state, getMapDetail: action.getMapDetail}
    //case REMOVE_FROM_CART:
      //return state.filter(cartItem => cartItem.id !== action.payload.id)
     
    }
    return state
}
  
export default AdminReducer
