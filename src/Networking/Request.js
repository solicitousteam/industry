import axios from 'axios';
import * as RootNavigation from './../Navigation/RootNavigation';
import * as React from 'react';

// export const isReadyRef = React.createRef();
const AccountTypeErrorTitle = 'Error';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import AccountType from '../Screens/Auth/AccountType';

// const clearStorageAndLogout = async (response) => {
//   try {
//     await AsyncStorage.clear();
//     RootNavigation.reset({
//       index: 0,
//       routes: [{name: 'AccountType'}],
//     });
//     setTimeout(() => {
//       AccountType.showErrorMessage(
//         AccountTypeErrorTitle,
//         response?.message ? response?.message : 'Something went wrong!',
//         5000,
//         2,
//       );
//     }, 1000);
//     return true;
//   } catch (err) {
//     console.log('error is: ' + err);
//   }
// };

//getAPI
const getAPI = (url, headers) =>
  axios
    .get(url, { headers })
    .then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        let response = error?.response?.data;
        // clearStorageAndLogout(response);
      } else {
        // alert('Error is ',error?.response?.data)
        let response = error?.response?.data;
        return response;
      }
    });

//postAPI
const postAPI = (url, headers, data) =>
  axios
    .post(url, data, { headers })
    .then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        let response = error?.response?.data;
        // clearStorageAndLogout(response);
      } else {
        // alert('Error is ',error?.response?.data)
        let response = error?.response?.data;
        return response;
      }
    });

//putAPI
const putAPI = (url, headers, data) =>
  axios
    .put(url, { headers }, data)
    .then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        let response = error?.response?.data;
        clearStorageAndLogout(response);
      } else {
        // alert('Error is ',error?.response?.data)
        let response = error?.response?.data;
        return response;
      }
    });

//patchAPI
const patchAPI = (url, headers, data) =>
  axios
    .patch(url, data, { headers })
    .then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        let response = error?.response?.data;
        clearStorageAndLogout(response);
      } else {
        // alert('Error is ',error?.response?.data)
        let response = error?.response?.data;
        return response;
      }
    });

//deleteAPI
const deleteAPI = (url, headers, data) => {
  // data = {
  //     data
  // }

  return (
    axios
      .delete(url, { headers, data })
      .then((response) => response.data)
      .catch((error) => {
        if (error?.response?.status == 401) {
          let response = error?.response?.data;
          clearStorageAndLogout(response);
        } else {
          // alert('Error is ',error?.response?.data)
          let response = error?.response?.data;
          return response;
        }
      })
      // .catch(function (error) {
      //     let displayError = {}
      //     displayError.status = 0;
      //     console.log("error?.response?.data ====> ", error)
      //     displayError.message = error?.response?.data?.message
      //         ? error.response.data.message
      //         :
      //         (error?.response.data?.error[0]?.msg
      //             ?
      //             error.response.data.error[0].msg : 'Something went wrong!');
      //     console.log('deleteAPI=104=', displayError)
      //     return displayError
      // })
      .finally(function () {
        // always executed
        console.log('deleteAPI=finally=');
      })
  );
};

const headerpost = (header, url, data, method = 'POST', type = 'none') => {
  return new Promise((resolve, reject) => {

    const isQuery = url.indexOf('?') >= 0;

    console.log("Url: ", url)
    // console.log("authHeader: ", authHeader)
    console.log("body: ", data)
    console.log("type: ", type)
    console.log("header: ", header)

    fetch(url, {
      method: method,
      // headers: {
      //   Accept: 'application/json',
      //   Authorization: authHeader,
      //   'Content-Type':
      //     type === "formData"
      //       ? 'multipart/form-data'
      //       : 'application/json',
      // },
      headers: header,
      body: type == "formData"
        ? data
        : data
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("response123:", result)
        if (result.status == 412 || result.status == 400 || result.status == 401 || result.status == 403 || result.status == 404 || result.status == 500) {
          // reject(new Error(result.message));
          reject(result.message);
          console.log("error:", result)
        } else if (result.status == 200) {
          resolve(result);
          console.log("success:", result)
        }
      })
      .catch((error) => {
        console.log("error:", error)
        reject(error);
      });
  });
};

export { getAPI, putAPI, postAPI, patchAPI, deleteAPI, headerpost };
