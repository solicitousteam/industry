import Config from '../Config';
import APIConstants from '../APIConstants';
import {getAPI, patchAPI, deleteAPI, postAPI, putAPI} from './../Request';

// State user API
const getUserAPI = (Token, offset) => {
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    limit: "10",
    offset: offset
  };

  console.log(
    'url====',
    Config.baseUrl + APIConstants.getSateUser,
    '=\n=',
    headers,
    data
  );

  return postAPI(Config.baseUrl + APIConstants.getSateUser, headers, data)
    .then(function (response) {
      // handle success
      const getUserAPI = response;
      return getUserAPI;
    })
    .catch(function (error) {
      // handle error
      const getUserAPI = error?.response?.data ? error.response.data : error;
      console.log('getUserAPI==', getUserAPI);
      return getUserAPI;
    })
    .finally(function () {
      // always executed
      console.log('getUserAPI=finally=');
    });
};

// Disaster user API
const getDisasterAPI = (Token, offset) => {
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    limit: "10",
    offset: offset
  };
  
  return postAPI(Config.baseUrl + APIConstants.getDisasterUser, headers, data)
    .then(function (response) {
      // handle success
      const getDisasterAPI = response;
      console.log('getDisasterAPI=15=', getDisasterAPI);
      return getDisasterAPI;
    })
    .catch(function (error) {
      // handle error
      const getDisasterAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('getDisasterAPI==', getDisasterAPI);
      return getDisasterAPI;
    })
    .finally(function () {
      // always executed
      console.log('getDisasterAPI=finally=');
    });
};

const addDisasterUserAPI = (
  Token,
  userId,
  userName,
  mobileNumber,
  stateName,
) => {
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    id: userId,
    name: userName,
    mobile: mobileNumber,
    state: stateName,
  };
  console.log(
    'url====',
    Config.baseUrl + APIConstants.addDisasterUser,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.addDisasterUser, headers, data)
    .then(function (response) {
      // handle success
      const addDisasterUserAPI = response;
      console.log('loginAPI=15=', addDisasterUserAPI);
      return addDisasterUserAPI;
    })
    .catch(function (error) {
      // handle error
      const addDisasterUserAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('addDisasterUserAPI==', addDisasterUserAPI);
      return addDisasterUserAPI;
    })
    .finally(function () {
      // always executed
      console.log('addDisasterUserAPI=finally=');
    });
};
const addStateUserAPI = (
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
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    id: userId,
    name: firstName,
    username: userName,
    mobile: mobileNumber,
    date_of_birth: DOB,
    password: password,
    state: stateName,
    district: districtName,
    relative_mobile_number_1: relative1MobileNumber,
    relative_mobile_number_2: relative2MobileNumber,
    relative_mobile_number_3: relative3MobileNumber,
    relative_mobile_number_4: relative4MobileNumber,
    relative_mobile_number_5: relative5MobileNumber,
  };
  console.log(
    'url====',
    Config.baseUrl + APIConstants.addStateUser,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.addStateUser, headers, data)
    .then(function (response) {
      console.log(response,"PPPPPOPOOOOOOOOOOOOO")
      // return
      // handle success
      const addStateUserAPI = response;
      console.log('addStateUserAPI=15=', addStateUserAPI);
      return addStateUserAPI;
    })
    .catch(function (error) {
      // handle error
      const addStateUserAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('addStateUserAPI==', addStateUserAPI);
      return addStateUserAPI;
    })
    .finally(function () {
      // always executed
      console.log('addStateUserAPI=finally=');
    });
};
const deleteUserAPI = (Token, id) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    id: id,
  };
  console.log(
    'url====',
    Config.baseUrl + APIConstants.deleteUser,
    headers,
    data,
  );
  
  return postAPI(Config.baseUrl + APIConstants.deleteUser, headers, data)
    .then(function (response) {
      // handle success
      const deleteUserAPI = response;
      console.log('loginAPI=15=', deleteUserAPI);
      return deleteUserAPI;
    })
    .catch(function (error) {
      // handle error
      const deleteUserAPI = error?.response?.data ? error.response.data : error;
      console.log('deleteUserAPI==', deleteUserAPI);
      return deleteUserAPI;
    })
    .finally(function () {
      // always executed
      console.log('deleteUserAPI=finally=');
    });
};
const getVerificationRequestAPI = Token => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    limit: "90000",
    offset: "0"
  };
  return postAPI(Config.baseUrl + APIConstants.getVerificationRequest, headers, data)
    .then(function (response) {
      // handle success
      const getVerificationRequestAPI = response;
      console.log('getVerificationRequestAPI=15=', getVerificationRequestAPI);
      return getVerificationRequestAPI;
    })
    .catch(function (error) {
      // handle error
      const getVerificationRequestAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('getVerificationRequestAPI==', getVerificationRequestAPI);
      return getVerificationRequestAPI;
    })
    .finally(function () {
      // always executed
      console.log('getVerificationRequestAPI=finally=');
    });
};
const approvedVerificationRequestAPI = (Token, Id, is_approved) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    id: Id,
    is_approved: is_approved,
  };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.approvedVerificationRequest,
    headers,
    data,
  );
  return postAPI(
    Config.baseUrl + APIConstants.approvedVerificationRequest,
    headers,
    data,
  )
    .then(function (response) {
      // handle success
      const approvedVerificationRequestAPI = response;
      console.log(
        'approvedVerificationRequestAPI=15=',
        approvedVerificationRequestAPI,
      );
      return approvedVerificationRequestAPI;
    })
    .catch(function (error) {
      // handle error
      const approvedVerificationRequestAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log(
        'approvedVerificationRequestAPI==',
        approvedVerificationRequestAPI,
      );
      return approvedVerificationRequestAPI;
    })
    .finally(function () {
      // always executed
      console.log('approvedVerificationRequestAPI=finally=');
    });
};
const sendFeedbackAPI = (Token, commentType, comment, firstName, email) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    type: commentType,
    description: comment,
    name: firstName,
    email: email,
  };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.sendFeedBack,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.sendFeedBack, headers, data)
    .then(function (response) {
      // handle success
      const sendFeedBackAPI = response;
      console.log('sendFeedBackAPI=15=', sendFeedBackAPI);
      return sendFeedBackAPI;
    })
    .catch(function (error) {
      // handle error
      const sendFeedBackAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('sendFeedBackAPI==', sendFeedBackAPI);
      return sendFeedBackAPI;
    })
    .finally(function () {
      // always executed
      console.log('sendFeedBackAPI=finally=');
    });
};
const getFeedListAPI = (Token, feedDataType, offset) => {
  console.log(offset, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    // Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    // 'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    type: feedDataType,
    limit: "10",
    offset: offset
  };
  // const data = {
  //   type: feedDataType,
  //   limit: "90000",
  //   offset: "0"
  // };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.getFeedList,
    headers,
    data,
  );
  
  return postAPI(Config.baseUrl + APIConstants.getFeedList, headers, data)
    .then(function (response) {
      // handle success
      const sendFeedBackAPI = response;
      console.log('sendFeedBackAPI=15=', sendFeedBackAPI);
      return sendFeedBackAPI;
    })
    .catch(function (error) {
      // handle error
      const sendFeedBackAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('sendFeedBackAPI==', sendFeedBackAPI);
      return sendFeedBackAPI;
    })
    .finally(function () {
      // always executed
      console.log('sendFeedBackAPI=finally=');
    });
};

const notificationAPI = (Token, offset) => {
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    // Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    // 'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    limit: "10",
    offset: offset
  };
  // const data = {
  //   limit: "90000",
  //   offset: "0"
  // };
  console.log(
    Config.baseUrl + APIConstants.notification,
    headers,
    data,
  );
  
  return postAPI(Config.baseUrl + APIConstants.notification, headers, data)
    .then(function (response) {
      // handle success
      const notificationAPI = response;
      console.log('notificationAPI=15=', notificationAPI);
      return notificationAPI;
    })
    .catch(function (error) {
      // handle error
      const notificationAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('notificationAPI==', notificationAPI);
      return notificationAPI;
    })
    .finally(function () {
      // always executed
      console.log('notificationAPI=finally=');
    });
};

// const getNotificationCountsAPI = (Token) => {
//   // let responseObj = { error: 1, msg: '', result: '' };
//   const headers = {
//     // Accept: 'application/json',
//     Authorization: 'Bearer ' + Token,
//     // 'Content-Type': 'application/json',
//     // 'Accept-Encoding': 'gzip; q=0'
//   };
//   // const data = {
//   //   limit: "90000",
//   //   offset: "0"
//   // };
//   console.log(
//     Config.baseUrl + APIConstants.get_notification_counts,
//     headers
//   );
  
//   return getAPI(Config.baseUrl + APIConstants.get_notification_counts, headers)
//     .then(function (response) {
//       // handle success
//       const getNotificationCountsAPI = response;
//       console.log('notificationAPI=15=', getNotificationCountsAPI);
//       return getNotificationCountsAPI;
//     })
//     .catch(function (error) {
//       // handle error
//       const getNotificationCountsAPI = error?.response?.data
//         ? error.response.data
//         : error;
//       console.log('getNotificationCountsAPI==', getNotificationCountsAPI);
//       return getNotificationCountsAPI;
//     })
//     .finally(function () {
//       // always executed
//       console.log('getNotificationCountsAPI=finally=');
//     });
// };

const createFeedAPI = (Token, feedID, feed_text, stateName, districtName) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    id: feedID,
    feed_text: feed_text,
    state: stateName,
    district: districtName,
  };

  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.create_Feed,
    headers,
    data,
  );
  // return
  return postAPI(Config.baseUrl + APIConstants.create_Feed, headers, data)
    .then(function (response) {
      // handle success
      const createFeedAPI = response;
      console.log('createFeedAPI=15=', createFeedAPI);
      return createFeedAPI;
    })
    .catch(function (error) {
      // handle error
      const createFeedAPI = error?.response?.data ? error.response.data : error;
      console.log('createFeedAPI==', createFeedAPI);
      return createFeedAPI;
    })
    .finally(function () {
      // always executed
      console.log('createFeedAPI=finally=');
    });
};
const commentListAPI = (Token, feedId) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    // id: feedId
    id: feedId,
    limit: "90000",
    offset: "0"
  };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.comment_List,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.comment_List, headers, data)
    .then(function (response) {
      // handle success
      const commentListAPI = response;
      console.log('commentListAPI=15=', commentListAPI);
      return commentListAPI;
    })
    .catch(function (error) {
      // handle error
      const commentListAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('commentListAPI==', commentListAPI);
      return commentListAPI;
    })
    .finally(function () {
      // always executed
      console.log('commentListAPI=finally=');
    });
};
const add_Edit_CommentAPI = (Token, feedId, comment_text, commentId) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    id: commentId,
    feed_id: feedId,
    comment_text: comment_text,
  };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.add_Edit_Comment,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.add_Edit_Comment, headers, data)
    .then(function (response) {
      // handle success
      const add_Edit_CommentAPI = response;
      console.log('add_Edit_CommentAPI=15=', add_Edit_CommentAPI);
      return add_Edit_CommentAPI;
    })
    .catch(function (error) {
      // handle error
      const add_Edit_CommentAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('add_Edit_CommentAPI==', add_Edit_CommentAPI);
      return add_Edit_CommentAPI;
    })
    .finally(function () {
      // always executed
      console.log('add_Edit_CommentAPI=finally=');
    });
};
const delete_CommentAPI = (Token, comment_Id) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
  };
  const data = {
    id: comment_Id,
  };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.delete_Comment,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.delete_Comment, headers, data)
    .then(function (response) {
      // handle success
      const add_Edit_CommentAPI = response;
      console.log('add_Edit_CommentAPI=15=', add_Edit_CommentAPI);
      return add_Edit_CommentAPI;
    })
    .catch(function (error) {
      // handle error
      const add_Edit_CommentAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('add_Edit_CommentAPI==', add_Edit_CommentAPI);
      return add_Edit_CommentAPI;
    })
    .finally(function () {
      // always executed
      console.log('add_Edit_CommentAPI=finally=');
    });
};
const delete_feedAPI = (Token, feed_Id) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
  };
  const data = {
    id: feed_Id,
  };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.delete_feed,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.delete_feed, headers, data)
    .then(function (response) {
      // handle success
      const add_Edit_CommentAPI = response;
      console.log('add_Edit_CommentAPI=15=', add_Edit_CommentAPI);
      return add_Edit_CommentAPI;
    })
    .catch(function (error) {
      // handle error
      const add_Edit_CommentAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('add_Edit_CommentAPI==', add_Edit_CommentAPI);
      return add_Edit_CommentAPI;
    })
    .finally(function () {
      // always executed
      console.log('add_Edit_CommentAPI=finally=');
    });
};
const safe_or_not_safeAPI = (Token, is_safe, lat, lng) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
  };
  const data = {
    is_safe,
    lat,
    lng,
  };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.safe_or_not_safe,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.safe_or_not_safe, headers, data)
    .then(function (response) {
      // handle success
      const safe_or_not_safeAPI = response;
      console.log('safe_or_not_safeAPI=15=', safe_or_not_safeAPI);
      return safe_or_not_safeAPI;
    })
    .catch(function (error) {
      // handle error
      const safe_or_not_safeAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('safe_or_not_safeAPI==', safe_or_not_safeAPI);
      return safe_or_not_safeAPI;
    })
    .finally(function () {
      // always executed
      console.log('safe_or_not_safeAPI=finally=');
    });
};
const create_crowd_sourcingAPI = (
  Token,
  id,
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
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    // Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'multipart/form-data',
  };

  const weather_phenomena = []

  weather_phenomena.push(weather_phenomena_commnet)

  const flood_reason = []
  flood_reason.push(flood_reason_comment)

  const damage_Cause_Comment = []
  damage_Cause_Comment.push(damageCauseComment)

  const data = new FormData();
  data.append("cyclone_name", cyclone_name)
  data.append("State", stateName)
  data.append("District", districtName)
  data.append("Date", DOB)
  data.append("event_time", time)
  data.append("id", id)
  // weather_phenomena_List.map((x, i) => {

  //   console.log(x,"-----------weather_phenomena-------")
  //   console.log(i, "-----------weather_phenomena-------")
  //   data.append(`weather_phenomena[${i}]`, {
  //     weather_phenomena: x,
  //   });
  // });
  weather_phenomena_List.map((x, i) => {

    console.log(x,"-----------weather_phenomena-------")
    console.log(i, "-----------weather_phenomena-------")
    data.append(`weather_phenomena[${i}]`,x)
  });

  weather_phenomena.map((x, i) => {

    console.log(x,"-----------weather_phenomena_commnet-------")
    console.log(i, "-----------weather_phenomena_commnet-------")
    data.append(`weather_phenomena_commnet[${i}]`,x)
  });

  // data.append("weather_phenomena_commnet[0]", weather_phenomena_commnet)

  flood_Reason_List.map((x, i) => {
    console.log(x,"-----------flood_Reason_List-------")
    console.log(i, "-----------flood_Reason_List-------")
    data.append(`flood_reason[${i}]`, x)
  });
  

  flood_reason.map((x, i) => {
    console.log(x,"-----------flood_reason_comment-------")
    console.log(i, "-----------flood_reason_comment-------")
    data.append(`flood_reason_comment[${i}]`, x)
  });
  // data.append("flood_reason_comment[0]", flood_reason_comment)
  data.append("additional_damage_details", additional_damage_details)
  data.append("questions_to_manager", questions_to_manager)

  // imageSource.map((x, i) => {
  //   console.log(x,"-----------damge_images-------")
  //   console.log(i, "-----------damge_images-------")
  //   data.append(`damge_images[${i}]`, {
  //     uri: x,
  //     name: 'image.jpg',
  //     type: 'image/jpg'
  //   });
  // });
  imageSource.map((x, i) => {
    console.log(x,"-----------damge_images-------")
    console.log(i, "-----------damge_images-------")
    data.append(`damge_images[${i}]`, x)
  });
  console.log( "-----------Viedo-------",damge_video)
  if (damge_video)
  {
    data.append("damge_video", {
      name: "name.mp4",
      uri: damge_video,
      type: 'video/mp4'
    });
  
  }

  // data.append("damge_video", damge_video)

  // weather_phenomena_commnet.map((x, i) => {
  //   console.log(x,"-----------weather_phenomena_commnet-------")
  //   console.log(i, "-----------weather_phenomena_commnet-------")
  //   data.append(`weather_phenomena_commnet[${i}]`, x)
  // });
  // // data.append("weather_phenomena_commnet", weather_phenomena_commnet)
  
  damageCause_List.map((x, i) => {
    console.log(x,"-----------damageCause_List-------")
    console.log(i, "-----------damageCause_List-------")
    data.append(`damage_cause[${i}]`, x)
  });
  // data.append("damage_cause[0]", damageCause_List)

  damage_Cause_Comment.map((x, i) => {
    console.log(x,"-----------damageCauseComment-------")
    console.log(i, "-----------damageCauseComment-------")
    data.append(`damage_cause_comment[${i}]`, x)
  });

  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.create_crowd_sourcing,
    headers,
    data,
  );
  return postAPI(
    Config.baseUrl + APIConstants.create_crowd_sourcing,
    headers,
    data,
  )
    .then(function (response) {
      // handle success
      const create_crowd_sourcingAPI = response;
      console.log('create_crowd_sourcingAPI=15=', create_crowd_sourcingAPI);
      return create_crowd_sourcingAPI;
    })
    .catch(function (error) {
      // handle error
      const create_crowd_sourcingAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('create_crowd_sourcingAPI==', create_crowd_sourcingAPI);
      return create_crowd_sourcingAPI;
    })
    .finally(function () {
      // always executed
      console.log('create_crowd_sourcingAPI=finally=');
    });
};
const croudSourcingDetailAPI = (Token, getCroudSourcingID) => {
  console.log(Token, '-------------------------Token----------------------');
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    // id: feedId
    id: getCroudSourcingID,
  };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.crowd_sourcing_detail,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.crowd_sourcing_detail, headers, data)
    .then(function (response) {
      // handle success
      const croudSourcingDetailAPI = response;
      console.log('croudSourcingDetailAPI=15=', croudSourcingDetailAPI);
      return croudSourcingDetailAPI;
    })
    .catch(function (error) {
      // handle error
      const croudSourcingDetailAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('croudSourcingDetailAPI==', croudSourcingDetailAPI);
      return croudSourcingDetailAPI;
    })
    .finally(function () {
      // always executed
      console.log('croudSourcingDetailAPI=finally=');
    });
};
const get_ProfileAPI = Token => {
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  console.log(headers, '*********************');
  console.log('url====', Config.baseUrl + APIConstants.get_profile, '=\n=', headers);
  return getAPI(Config.baseUrl + APIConstants.get_profile, headers)
    .then(function (response) {
      // handle success
      const get_ProfileAPI = response;
      console.log('get_ProfileAPI=15=', get_ProfileAPI);
      return get_ProfileAPI;
    })
    .catch(function (error) {
      // handle error
      const get_ProfileAPI = error?.response?.data ? error.response.data : error;
      console.log('get_ProfileAPI==', get_ProfileAPI);
      return get_ProfileAPI;
    })
    .finally(function () {
      // always executed
      console.log('get_ProfileAPI=finally=');
    });
};
const edit_profileAPI = (
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
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    // id: userId,
    country_code: "+91",
    name: firstName,
    username: userName,
    mobile: mobileNumber,
    email: email,
    date_of_birth: DOB,
    state: stateName,
    district: districtName,
    relative_mobile_number_1: relative1MobileNumber,
    relative_mobile_number_2: relative2MobileNumber,
    relative_mobile_number_3: relative3MobileNumber,
    relative_mobile_number_4: relative4MobileNumber,
    relative_mobile_number_5: relative5MobileNumber,
  };
  console.log(
    'url====',
    Config.baseUrl + APIConstants.edit_profile,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.edit_profile, headers, data)
    .then(function (response) {
      console.log(response,"PPPPPOPOOOOOOOOOOOOO")
      // return
      // handle success
      const edit_profileAPI = response;
      console.log('edit_profileAPI=15=', edit_profileAPI);
      return edit_profileAPI;
    })
    .catch(function (error) {
      // handle error
      const edit_profileAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('edit_profileAPI==', edit_profileAPI);
      return edit_profileAPI;
    })
    .finally(function () {
      // always executed
      console.log('edit_profileAPI=finally=');
    });
};

const getFeedInfoAPI = (Token, feedId) => {
  // let responseObj = { error: 1, msg: '', result: '' };
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + Token,
    'Content-Type': 'application/json',
    // 'Accept-Encoding': 'gzip; q=0'
  };
  const data = {
    // id: feedId
    id: feedId,
  };
  console.log(
    'url===================================APPROVE+++++++++++++++++=',
    Config.baseUrl + APIConstants.get_feed_details,
    headers,
    data,
  );
  return postAPI(Config.baseUrl + APIConstants.get_feed_details, headers, data)
    .then(function (response) {
      // handle success
      const getFeedInfoAPI = response;
      console.log('getFeedInfoAPI=15=', getFeedInfoAPI);
      return getFeedInfoAPI;
    })
    .catch(function (error) {
      // handle error
      const getFeedInfoAPI = error?.response?.data
        ? error.response.data
        : error;
      console.log('getFeedInfoAPI==', getFeedInfoAPI);
      return getFeedInfoAPI;
    })
    .finally(function () {
      // always executed
      console.log('getFeedInfoAPI=finally=');
    });
};


export {
  //auth-stable
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
  // getNotificationCountsAPI
};
