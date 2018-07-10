'use strict';

import React from 'react';
import {
  AsyncStorage
} from 'react-native';

let getUserInfo = (callback) => {
  AsyncStorage.multiGet(['userId', 'userName', 'avatar'], (err, data) => {
    var user = {};
    user.userId = data[0][1];
    user.userName = data[1][1];
    user.avatar = data[2][1];
    callback(user);
  });
}
let getToken = (callback) => {
  AsyncStorage.getItem('token', (err, result) => {
    callback(result);
  });
}
let loginState = (callback) => {
  getToken((result) => {
    if(result) {
      callback(true);
    } else {
      callback(false);
    }
  });
}
let outLogin = (callback) => {
  AsyncStorage.multiRemove([
    'token', 'userId', 'userName', 'avatar'
  ], callback);
}

export {
  getToken,
  loginState,
  getUserInfo,
  outLogin
}
