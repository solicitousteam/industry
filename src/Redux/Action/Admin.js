export const GET_STATE_USER = 'GET_STATE_USER';
export const GET_DISASTER_USER = 'GET_DISASTER_USER';
export const ADD_DISASTER_USER = 'ADD_DISASTER_USER';
export const ADD_STATE_USER = 'ADD_STATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_VERIFICATION_REQUEST_DATA = 'GET_VERIFICATION_REQUEST_DATA';
export const APPROVED_VERIFICATION_REQUEST_DATA =
  'APPROVED_VERIFICATION_REQUEST_DATA';
export const SEND_FEEDBACK = 'SEND_FEEDBACK';
export const GET_FEED = 'GET_FEED';
export const CREATE_FEED = 'CREATE_FEED';
export const COMMENT_LIST = 'COMMENT_LIST';
export const ADD_EDIT_COMMENT = 'ADD_EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SAFE_OR_NOT_SAFE = 'SAFE_OR_NOT_SAFE';
export const CROUD_SOURCING = 'CROUD_SOURCING';
export const DELETE_FEED = 'DELETE_FEED';
export const CROUD_SOURCING_DETAILS = 'CROUD_SOURCING_DETAILS';
export const GET_PROFILE = "GET_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const NOTIFICATION = "NOTIFICATION";
export const GET_FEED_INFO = "GET_FEED_INFO";
export const GET_NOTIFICATION_COUNTS = "GET_NOTIFICATION_COUNTS"
export const GET_MAP_CLICK = "GET_MAP_CLICK";
import {
  getUserAPI,
  getDisasterAPI,
  addDisasterUserAPI,
  addStateUserAPI,
  deleteUserAPI,
  getVerificationRequestAPI,
  approvedVerificationRequestAPI,
  sendFeedbackAPI,
  getFeedListAPI,
  createFeedAPI,
  commentListAPI,
  add_Edit_CommentAPI,
  delete_CommentAPI,
  safe_or_not_safeAPI,
  create_crowd_sourcingAPI,
  delete_feedAPI,
  croudSourcingDetailAPI,
  get_ProfileAPI,
  edit_profileAPI,
  notificationAPI,
  getFeedInfoAPI,
  // getNotificationCountsAPI,
  
} from '../../Networking/Manager/StateAPIManager';
export const getMapData = getMapResponse => {
  return {
    type: GET_MAP_CLICK,
    getMapResponse,
  };
};
export const getUserSuccess = getUserResponse => {
  return {
    type: GET_STATE_USER,
    getUserResponse,
  };
};
export const getDisasterUserSuccess = getDisasterUserResponse => {
  return {
    type: GET_DISASTER_USER,
    getDisasterUserResponse,
  };
};
export const getAddDisasterUserSuccess = getAddDisasterUserResponse => {
  return {
    type: ADD_DISASTER_USER,
    getAddDisasterUserResponse,
  };
};
export const getAddStateUserSuccess = getAddStateUserResponse => {
  return {
    type: ADD_STATE_USER,
    getAddStateUserResponse,
  };
};
export const getDeleteUserSuccess = getdeleteUserResponse => {
  return {
    type: DELETE_USER,
    getdeleteUserResponse,
  };
};
export const getVerificationRequestSuccess = getVerificationRequestResponse => {
  return {
    type: GET_VERIFICATION_REQUEST_DATA,
    getVerificationRequestResponse,
  };
};
export const approvedVerificationRequestSuccess =
  approvedVerificationRequestResponse => {
    return {
      type: APPROVED_VERIFICATION_REQUEST_DATA,
      approvedVerificationRequestResponse,
    };
  };
export const sendFeedbackSuccess = sendFeedbackResponse => {
  return {
    type: SEND_FEEDBACK,
    sendFeedbackResponse,
  };
};
export const getFeedSuccess = getFeedResponse => {
  return {
    type: GET_FEED,
    getFeedResponse,
  };
};
export const createFeedSuccess = createFeedResponse => {
  return {
    type: CREATE_FEED,
    createFeedResponse,
  };
};
export const commentListSuccess = commentListResponse => {
  return {
    type: COMMENT_LIST,
    commentListResponse,
  };
};
export const addEditCommentSuccess = addEditCommentResponse => {
  return {
    type: ADD_EDIT_COMMENT,
    addEditCommentResponse,
  };
};
export const deleteCommentSuccess = deleteCommentResponse => {
  return {
    type: DELETE_COMMENT,
    deleteCommentResponse,
  };
};
export const safe_or_not_safeSuccess = safe_or_not_safeAPIResponse => {
  return {
    type: SAFE_OR_NOT_SAFE,
    safe_or_not_safeAPIResponse,
  };
};
export const create_crowd_sourcingSuccess =
  create_crowd_sourcingAPIResponse => {
    return {
      type: CROUD_SOURCING,
      create_crowd_sourcingAPIResponse,
    };
  };
export const delete_feedSuccess =
  delete_feedAPIResponse => {
    return {
      type: DELETE_FEED,
      delete_feedAPIResponse,
    };
  };

export const croudSourcingDetailSuccess =
  croudSourcingDetailResponse => {
    return {
      type: CROUD_SOURCING_DETAILS,
      croudSourcingDetailResponse,
    };
  };

export const getProfileSuccess =
  getProfileResponse => {
    return {
      type: GET_PROFILE,
      getProfileResponse,
    };
  };
export const editProfileSuccess =
  editProfileResponse => {
    return {
      type: EDIT_PROFILE,
      editProfileResponse,
    };
  };

export const notificationSuccess =
  notificationResponse => {
    return {
      type: NOTIFICATION,
      notificationResponse,
    };
  };

export const getFeedInfoSuccess =
  getFeedInfoResponse => {
    return {
      type: GET_FEED_INFO,
      getFeedInfoResponse,
    };
  };

export const getNotificationCountsSuccess =
  getNotificationCountsResponse => {
    return {
      type: GET_NOTIFICATION_COUNTS,
      getNotificationCountsResponse,
    };
  };
  export const GetMapDetails = (Url) => {
    return async dispatch => {
      try {
       console.log(">>>>>>>>>>",Url)
  
      } catch (e) {
       
      }
    };
  };
  

export const GetUser = (Token, offset) => {
  return async dispatch => {
    try {
      const getUserResponseData = await getUserAPI(Token, offset);
      console.log('getUserResponseData==success==', getUserResponseData);

      if (getUserResponseData) {
        const data = getUserResponseData ? getUserResponseData : '';
        if (data.status) {
          let getUserResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('getUserSuccess=30==', getUserResponse);
          dispatch(getUserSuccess(getUserResponse));
          return getUserResponse;
        } else {
          console.log('getUserSuccess=30=else s=', data);

          let getUserResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return getUserResponse;
        }
      }
    } catch (e) {
      console.log('getUserResponse==error==', e);
      let getUserResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return getUserResponse;
    }
  };
};

// Get Disaster User
export const GetDisasterUser = (Token, offset) => {
  return async dispatch => {
    try {
      const getDisasterUserResponse = await getDisasterAPI(Token, offset);
      console.log(
        'getDisasterUserResponse==success==',
        getDisasterUserResponse,
      );

      if (getDisasterUserResponse) {
        const data = getDisasterUserResponse ? getDisasterUserResponse : '';
        if (data.status) {
          let getDisasterUserResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('getDisasterUserSuccess=30==', getDisasterUserResponse);
          dispatch(getDisasterUserSuccess(getDisasterUserResponse));
          return getDisasterUserResponse;
        } else {
          console.log('getDisasterUserSuccess=30=else s=', data);

          let getDisasterUserResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return getDisasterUserResponse;
        }
      }
    } catch (e) {
      console.log('getDisasterUserResponse==error==', e);
      let getDisasterUserResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return getDisasterUserResponse;
    }
  };
};

// Add Disaster User
export const AddDisasterUser = (
  Token,
  userId,
  userName,
  mobileNumber,
  stateName,
) => {
  return async dispatch => {
    try {
      const getAddDisasterUserResponse = await addDisasterUserAPI(
        Token,
        userId,
        userName,
        mobileNumber,
        stateName,
      );
      console.log(
        'getAddDisasterUserResponse==success==',
        getAddDisasterUserResponse,
      );

      if (getAddDisasterUserResponse) {
        const data = getAddDisasterUserResponse
          ? getAddDisasterUserResponse
          : '';
        if (data.status) {
          let getAddDisasterUserResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log(
            'getAddDisasterUserSuccess=30==',
            getAddDisasterUserResponse,
          );
          dispatch(getAddDisasterUserSuccess(getAddDisasterUserResponse));
          return getAddDisasterUserResponse;
        } else {
          console.log('getDisasterUserSuccess=30=else s=', data);

          let getAddDisasterUserResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return getAddDisasterUserResponse;
        }
      }
    } catch (e) {
      console.log('getAddDisasterUserResponse==error==', e);
      let getAddDisasterUserResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return getAddDisasterUserResponse;
    }
  };
};
export const AddStateUserData = (
  Token,
  userId,
  firstName,
  userName,
  mobileNumber,
  DOB,
  password,
  stateName,
  districtName,
  relative1MobileNumber,
  relative2MobileNumber,
  relative3MobileNumber,
  relative4MobileNumber,
  relative5MobileNumber,
) => {
  return async dispatch => {
    try {
      const getAddStateUserResponse = await addStateUserAPI(
        Token,
        userId,
        firstName,
        userName,
        mobileNumber,
        DOB,
        password,
        stateName,
        districtName,
        relative1MobileNumber,
        relative2MobileNumber,
        relative3MobileNumber,
        relative4MobileNumber,
        relative5MobileNumber,
      );
      console.log(
        'getAddStateUserResponse==success==',
        getAddStateUserResponse,
      );

      if (getAddStateUserResponse) {
        const data = getAddStateUserResponse ? getAddStateUserResponse : '';
        if (data.status) {
          let getAddStateUserResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('getAddStateUserSuccess=30==', getAddStateUserResponse);
          dispatch(getAddStateUserSuccess(getAddStateUserResponse));
          return getAddStateUserResponse;
        } else {
          console.log('getAddStateUserSuccess=30=else s=', data);

          let getAddStateUserResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return getAddStateUserResponse;
        }
      }
    } catch (e) {
      console.log('getAddStateUserResponse==error==', e);
      let getAddStateUserResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return getAddStateUserResponse;
    }
  };
};
export const deleteUserData = (Token, id) => {
  return async dispatch => {
    try {
      const getdeleteUserResponse = await deleteUserAPI(Token, id);
      console.log('getdeleteUserResponse==success==', getdeleteUserResponse);

      if (getdeleteUserResponse) {
        const data = getdeleteUserResponse ? getdeleteUserResponse : '';
        if (data.status) {
          let getdeleteUserResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('getDeleteUserSuccess=30==', getdeleteUserResponse);
          dispatch(getDeleteUserSuccess(getdeleteUserResponse));
          return getdeleteUserResponse;
        } else {
          console.log('getDeleteUserSuccess=30=else s=', data);

          let getdeleteUserResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return getdeleteUserResponse;
        }
      }
    } catch (e) {
      console.log('getAddStateUserResponse==error==', e);
      let getdeleteUserResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return getdeleteUserResponse;
    }
  };
};
export const VerificationRequestData = Token => {
  return async dispatch => {
    try {
      const getVerificationRequestResponse = await getVerificationRequestAPI(
        Token,
      );
      console.log(
        'getVerificationRequestResponse==success==',
        getVerificationRequestResponse,
      );

      if (getVerificationRequestResponse) {
        const data = getVerificationRequestResponse
          ? getVerificationRequestResponse
          : '';
        if (data.status) {
          let getVerificationRequestResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log(
            'getDeleteUserSuccess=30==',
            getVerificationRequestResponse,
          );
          dispatch(
            getVerificationRequestSuccess(getVerificationRequestResponse),
          );
          return getVerificationRequestResponse;
        } else {
          console.log('getDeleteUserSuccess=30=else s=', data);

          let getVerificationRequestResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return getVerificationRequestResponse;
        }
      }
    } catch (e) {
      console.log('getVerificationRequestResponse==error==', e);
      let getVerificationRequestResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return getVerificationRequestResponse;
    }
  };
};
export const ApprovedVerificationRequestData = (Token, Id, is_approved) => {
  return async dispatch => {
    try {
      const approvedVerificationRequestResponse =
        await approvedVerificationRequestAPI(Token, Id, is_approved);
      console.log(
        'approvedVerificationRequestResponse==success==',
        approvedVerificationRequestResponse,
      );

      if (approvedVerificationRequestResponse) {
        const data = approvedVerificationRequestResponse
          ? approvedVerificationRequestResponse
          : '';
        if (data.status) {
          let approvedVerificationRequestResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log(
            'approvedVerificationRequestSuccess=30==',
            approvedVerificationRequestResponse,
          );
          dispatch(
            approvedVerificationRequestSuccess(
              approvedVerificationRequestResponse,
            ),
          );
          return approvedVerificationRequestResponse;
        } else {
          console.log('approvedVerificationRequestSuccess=30=else s=', data);

          let approvedVerificationRequestResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return approvedVerificationRequestResponse;
        }
      }
    } catch (e) {
      console.log('approvedVerificationRequestResponse==error==', e);
      let approvedVerificationRequestResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return approvedVerificationRequestResponse;
    }
  };
};
export const NotificationData = (Token, offset) => {
  return async dispatch => {
    try {
      const notificationResponse = await notificationAPI(
        Token,
        offset
      );
      console.log(
        'notificationResponse==success==',
        notificationResponse,
      );

      if (notificationResponse) {
        const data = notificationResponse
          ? notificationResponse
          : '';
        if (data.status) {
          let notificationResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log(
            'notificationSuccess=30==',
            notificationResponse,
          );
          dispatch(
            notificationSuccess(notificationResponse),
          );
          return notificationResponse;
        } else {
          console.log('notificationSuccess=30=else s=', data);

          let notificationResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return notificationResponse;
        }
      }
    } catch (e) {
      console.log('notificationResponse==error==', e);
      let notificationResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return notificationResponse;
    }
  };
};
// export const getNotificationCountsData = (Token) => {

//   return async dispatch => {
//     try {
//       const getNotificationCountsResponse = await getNotificationCountsAPI(
//         Token,
//       );
//       console.log(
//         'getNotificationCountsResponse==success==',
//         getNotificationCountsResponse,
//       );

//       if (getNotificationCountsResponse) {
//         const data = getNotificationCountsResponse
//           ? getNotificationCountsResponse
//           : '';
//         if (data.status) {
//           let getNotificationCountsResponse = {
//             msg: data.message,
//             data: data.data,
//             status: data.status,
//           };
//           console.log(
//             'getNotificationCountsSuccess=30==',
//             getNotificationCountsResponse,
//           );
//           dispatch(
//             getNotificationCountsSuccess(getNotificationCountsResponse),
//           );
//           return getNotificationCountsResponse;
//         } else {
//           console.log('getNotificationCountsSuccess=30=else s=', data);

//           let getNotificationCountsResponse = {
//             msg: data.message,
//             status: data.status,
//             data: data ? data : [],
//             error: data?.error ? data?.error : '',
//           };
//           return getNotificationCountsResponse;
//         }
//       }
//     } catch (e) {
//       console.log('getNotificationCountsResponse==error==', e);
//       let getNotificationCountsResponse = {
//         msg: 'Something went wrong!',
//         status: 0,
//       };
//       return getNotificationCountsResponse;
//     }
//   };
// };
export const SendFeedBackData = (
  Token,
  commentType,
  comment,
  firstName,
  email,
) => {
  console.log(email, '^^^^^^^^^^^^^^^^^^^^^^^^^^^^%%%%%%%%%%%%%%%%%%%%%');
  return async dispatch => {
    try {
      const sendFeedbackResponse = await sendFeedbackAPI(
        Token,
        commentType,
        comment,
        firstName,
        email,
      );
      console.log('sendFeedbackResponse==success==', sendFeedbackResponse);

      if (sendFeedbackResponse) {
        const data = sendFeedbackResponse ? sendFeedbackResponse : '';
        if (data.status) {
          let sendFeedbackResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('sendFeedbackSuccess=30==', sendFeedbackResponse);
          dispatch(sendFeedbackSuccess(sendFeedbackResponse));
          return sendFeedbackResponse;
        } else {
          console.log('sendFeedbackSuccess=30=else s=', data);

          let sendFeedbackResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return sendFeedbackResponse;
        }
      }
    } catch (e) {
      console.log('sendFeedbackResponse==error==', e);
      let sendFeedbackResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return sendFeedbackResponse;
    }
  };
};
export const GetFeedListData = (Token, feedDataType, offset) => {
  console.log(
    offset,
    'offset',
  );
  // return
  return async dispatch => {
    try {
      const getFeedResponse = await getFeedListAPI(Token, feedDataType, offset);
      console.log('getFeedResponse==success==', getFeedResponse);

      if (getFeedResponse) {
        const data = getFeedResponse ? getFeedResponse : '';
        if (data.status) {
          let getFeedResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('getFeedSuccess=30==', getFeedResponse);
          dispatch(getFeedSuccess(getFeedResponse));
          return getFeedResponse;
        } else {
          console.log('getFeedResponse=30=else s=', data);

          let getFeedResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return getFeedResponse;
        }
      }
    } catch (e) {
      console.log('getFeedResponse==error==', e);
      let getFeedResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return getFeedResponse;
    }
  };
};
export const CreateFeedBackData = (
  Token,
  feedID,
  feed_text,
  stateName,
  districtName,
) => {

  return async dispatch => {
    try {
      const createFeedResponse = await createFeedAPI(
        Token,
        feedID,
        feed_text,
        stateName,
        districtName,
      );
      console.log('createFeedResponse==success==', createFeedResponse);

      if (createFeedResponse) {
        const data = createFeedResponse ? createFeedResponse : '';
        if (data.status) {
          let createFeedResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('createFeedSuccess=30==', createFeedResponse);
          dispatch(createFeedSuccess(createFeedResponse));
          return createFeedResponse;
        } else {
          console.log('createFeedSuccess=30=else s=', data);

          let createFeedResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return createFeedResponse;
        }
      }
    } catch (e) {
      console.log('createFeedResponse==error==', e);
      let createFeedResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return createFeedResponse;
    }
  };
};
export const CommentListData = (Token, feedId) => {
  return async dispatch => {
    try {
      const commentListResponse = await commentListAPI(Token, feedId);
      console.log('commentListResponse==success==', commentListResponse);

      if (commentListResponse) {
        const data = commentListResponse ? commentListResponse : '';
        if (data.status) {
          let commentListResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('commentListSuccess=30==', commentListResponse);
          dispatch(commentListSuccess(commentListResponse));
          return commentListResponse;
        } else {
          console.log('commentListSuccess=30=else s=', data);

          let commentListResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return commentListResponse;
        }
      }
    } catch (e) {
      console.log('commentListResponse==error==', e);
      let commentListResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return commentListResponse;
    }
  };
};

export const getFeedInfoData = (Token, feedId) => {
  return async dispatch => {
    try {
      console.log('getFeedInfoResponse=>>test==', Token, feedId );
      const getFeedInfoResponse = await getFeedInfoAPI(Token, feedId);
      console.log('getFeedInfoResponse==success==', getFeedInfoResponse);

      if (getFeedInfoResponse) {
        const data = getFeedInfoResponse ? getFeedInfoResponse : '';
        if (data.status) {
          let getFeedInfoResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('getFeedInfoSuccess=30==', getFeedInfoResponse);
          dispatch(getFeedInfoSuccess(getFeedInfoResponse));
          return getFeedInfoResponse;
        } else {
          console.log('getFeedInfoResponse=30=else s=', data);

          let getFeedInfoResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return getFeedInfoResponse;
        }
      }
    } catch (e) {
      console.log('getFeedInfoResponse==error==', e);
      let getFeedInfoResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return getFeedInfoResponse;
    }
  };
};

export const AddEditCommentData = (Token, feedId, comment_text, commentId) => {
  return async dispatch => {
    try {
      const addEditCommentResponse = await add_Edit_CommentAPI(
        Token,
        feedId,
        comment_text,
        commentId,
      );
      console.log('addEditCommentResponse==success==', addEditCommentResponse);

      if (addEditCommentResponse) {
        const data = addEditCommentResponse ? addEditCommentResponse : '';
        if (data.status) {
          let addEditCommentResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('addEditCommentSuccess=30==', addEditCommentResponse);
          dispatch(addEditCommentSuccess(addEditCommentResponse));
          return addEditCommentResponse;
        } else {
          console.log('addEditCommentSuccess=30=else s=', data);

          let addEditCommentResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return addEditCommentResponse;
        }
      }
    } catch (e) {
      console.log('addEditCommentResponse==error==', e);
      let addEditCommentResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return addEditCommentResponse;
    }
  };
};
export const DeleteComment = (Token, comment_Id) => {
  return async dispatch => {
    try {
      const deleteCommentResponse = await delete_CommentAPI(Token, comment_Id);
      console.log('deleteCommentResponse==success==', deleteCommentResponse);

      if (deleteCommentResponse) {
        const data = deleteCommentResponse ? deleteCommentResponse : '';
        if (data.status) {
          let deleteCommentResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('deleteCommentSuccess=30==', deleteCommentResponse);
          dispatch(deleteCommentSuccess(deleteCommentResponse));
          return deleteCommentResponse;
        } else {
          console.log('deleteCommentSuccess=30=else s=', data);

          let deleteCommentResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return deleteCommentResponse;
        }
      }
    } catch (e) {
      console.log('deleteCommentResponse==error==', e);
      let deleteCommentResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return deleteCommentResponse;
    }
  };
};
export const DeleteFeed = (Token, feed_Id) => {
  return async dispatch => {
    try {
      const delete_feedAPIResponse = await delete_feedAPI(Token, feed_Id);
      console.log('delete_feedAPIResponse==success==', delete_feedAPIResponse);

      if (delete_feedAPIResponse) {
        const data = delete_feedAPIResponse ? delete_feedAPIResponse : '';
        if (data.status) {
          let delete_feedAPIResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('delete_feedSuccess=30==', delete_feedAPIResponse);
          dispatch(delete_feedSuccess(delete_feedAPIResponse));
          return delete_feedAPIResponse;
        } else {
          console.log('delete_feedSuccess=30=else s=', data);

          let delete_feedAPIResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return delete_feedAPIResponse;
        }
      }
    } catch (e) {
      console.log('delete_feedAPIResponse==error==', e);
      let delete_feedAPIResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return delete_feedAPIResponse;
    }
  };
};
export const safe_or_not_safe = (Token, is_safe, lat, lng) => {
  return async dispatch => {
    try {
      const safe_or_not_safeAPIResponse = await safe_or_not_safeAPI(
        Token,
        is_safe,
        lat,
        lng,
      );
      console.log(
        'safe_or_not_safeAPIResponse==success==',
        safe_or_not_safeAPIResponse,
      );

      if (safe_or_not_safeAPIResponse) {
        const data = safe_or_not_safeAPIResponse
          ? safe_or_not_safeAPIResponse
          : '';
        if (data.status) {
          let safe_or_not_safeAPIResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log(
            'safe_or_not_safeSuccess=30==',
            safe_or_not_safeAPIResponse,
          );
          dispatch(safe_or_not_safeSuccess(safe_or_not_safeAPIResponse));
          return safe_or_not_safeAPIResponse;
        } else {
          console.log('safe_or_not_safeSuccess=30=else s=', data);

          let safe_or_not_safeAPIResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return safe_or_not_safeAPIResponse;
        }
      }
    } catch (e) {
      console.log('safe_or_not_safeAPIResponse==error==', e);
      let safe_or_not_safeAPIResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return safe_or_not_safeAPIResponse;
    }
  };
};
export const create_crowd_sourcing = (
  Token,
  croudSourcingID,
  cyclone_name,
  stateName,
  districtName,
  DOB,
  time,
  weather_phenomena_List,
  weather_phenomena_commnet,
  flood_Reason_List,
  flood_reason_comment,
  additional_damage_details,
  questions_to_manager,
  imageSource,
  damge_video,
  damageCause_List,
  damageCauseComment,
) => {
  return async dispatch => {
    try {
      const create_crowd_sourcingAPIResponse = await create_crowd_sourcingAPI(
        Token,
        croudSourcingID,
        cyclone_name,
        stateName,
        districtName,
        DOB,
        time,
        weather_phenomena_List,
        weather_phenomena_commnet,
        flood_Reason_List,
        flood_reason_comment,
        additional_damage_details,
        questions_to_manager,
        imageSource,
        damge_video,
        damageCause_List,
        damageCauseComment,
      );
      console.log(
        'create_crowd_sourcingAPIResponse==success==',
        create_crowd_sourcingAPIResponse,
      );

      if (create_crowd_sourcingAPIResponse) {
        const data = create_crowd_sourcingAPIResponse
          ? create_crowd_sourcingAPIResponse
          : '';
        if (data.status) {
          let create_crowd_sourcingAPIResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log(
            'create_crowd_sourcingSuccess=30==',
            create_crowd_sourcingAPIResponse,
          );
          dispatch(
            create_crowd_sourcingSuccess(create_crowd_sourcingAPIResponse),
          );
          return create_crowd_sourcingAPIResponse;
        } else {
          console.log('create_crowd_sourcingSuccess=30=else s=', data);

          let create_crowd_sourcingAPIResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return create_crowd_sourcingAPIResponse;
        }
      }
    } catch (e) {
      console.log('create_crowd_sourcingAPIResponse==error==', e);
      let create_crowd_sourcingAPIResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return create_crowd_sourcingAPIResponse;
    }
  };
};
export const croudSourcingDetails = (Token, getCroudSourcingID) => {
  return async dispatch => {
    try {
      const croudSourcingDetailsResponse = await croudSourcingDetailAPI(Token, getCroudSourcingID);
      console.log('croudSourcingDetailsResponse==success==', croudSourcingDetailsResponse);

      if (croudSourcingDetailsResponse) {
        const data = croudSourcingDetailsResponse ? croudSourcingDetailsResponse : '';
        if (data.status) {
          let croudSourcingDetailsResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('croudSourcingDetailSuccess=30==', croudSourcingDetailsResponse);
          dispatch(croudSourcingDetailSuccess(croudSourcingDetailsResponse));
          return croudSourcingDetailsResponse;
        } else {
          console.log('croudSourcingDetailSuccess=30=else s=', data);

          let croudSourcingDetailsResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return croudSourcingDetailsResponse;
        }
      }
    } catch (e) {
      console.log('croudSourcingDetailsResponse==error==', e);
      let croudSourcingDetailsResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return croudSourcingDetailsResponse;
    }
  };
};

export const GetProfile = (token) => {
  return async (dispatch) => {
    try {
      const getProfileResponse = await get_ProfileAPI(token);
      if (getProfileResponse) {
        const data = getProfileResponse ? getProfileResponse : '';
        if (data.status) {
          let getProfileResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('getProfileResponse=30==', getProfileResponse);
          dispatch(getProfileSuccess(getProfileResponse));
          return getProfileResponse;
        } else {
          let getProfileResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
          };
          return getProfileResponse;
        }
      }
    } catch (e) {
      console.log('getProfileResponse==error==', e);
      let getProfileResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return getProfileResponse;
    }
  };
};
export const EditProfile = (
  Token,
  // userId,
  firstName,
  userName,
  email,
  mobileNumber,
  DOB,
  stateName,
  districtName,
  relative1MobileNumber,
  relative2MobileNumber,
  relative3MobileNumber,
  relative4MobileNumber,
  relative5MobileNumber,
) => {
  return async dispatch => {
    try {
      const editProfileResponse = await edit_profileAPI(
        Token,
        // userId,
        firstName,
        userName,
        email,
        mobileNumber,
        DOB,
        stateName,
        districtName,
        relative1MobileNumber,
        relative2MobileNumber,
        relative3MobileNumber,
        relative4MobileNumber,
        relative5MobileNumber,
      );
      console.log(
        'editProfileResponse==success==',
        editProfileResponse,
      );

      if (editProfileResponse) {
        const data = editProfileResponse ? editProfileResponse : '';
        if (data.status) {
          let editProfileResponse = {
            msg: data.message,
            data: data.data,
            status: data.status,
          };
          console.log('editProfileResponse=30==', editProfileResponse);
          dispatch(editProfileSuccess(editProfileResponse));
          return editProfileResponse;
        } else {
          console.log('editProfileSuccess=30=else s=', data);

          let editProfileResponse = {
            msg: data.message,
            status: data.status,
            data: data ? data : [],
            error: data?.error ? data?.error : '',
          };
          return editProfileResponse;
        }
      }
    } catch (e) {
      console.log('editProfileResponse==error==', e);
      let editProfileResponse = {
        msg: 'Something went wrong!',
        status: 0,
      };
      return editProfileResponse;
    }
  };
};
