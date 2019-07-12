// Sunny Yan, Jason Yu

import '../global';
import { Alert, AsyncStorage } from 'react-native';
import Expo from 'expo';
import { Google } from 'expo';
import io from 'socket.io-client';


export async function getUserInfo(token) {
  let api_url = global.serverURL + '/api/get_info';
  let user_info = false;
  let data = {};
  await fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      Authorization: token,
    }),
  })
    .then(async res => {
      let res_data = await res.json();
      if (res_data.success) {
        user_info = await res_data['info'];
        let socket = io(
          `${global.serverURL}?token=${token}`,
          { transports: ['websocket'] }
        );
        user_info.socket = socket;
      } else {
        Alert.alert('Error', res_data.error);
      }
    })
    .catch(error => {
      console.log("Caught")
      Alert.alert('Error', error.message);
    });
  return user_info;
}

export async function login(email, password) {
  let api_url = global.serverURL + '/api/login';
  let data = {
    email,
    password,
  };
  for (let item of Object.entries(data)) {
    if (!item[1]) {
      Alert.alert(
        'Blank fields',
        `All fields must be filled. ${item[0]} is blank.`
      );
      return false;
    }
  }
  let login_response = false;
  await fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(async res => {
      res = await res.json();
      if (res.success == true) {
        login_response = res;
        await AsyncStorage.setItem(
          'login_info',
          JSON.stringify(login_response)
        ); // Storing User Login
      } else {
        Alert.alert(res.error)
      }

    })
    .catch(error => {
      Alert.alert('Error', error.message);
    });

  return login_response;
}

export async function register(email, pword, full_name, username) {
  //Sends register request to server (also logs in after user is registered)
  let data = {
    email: email,
    password: pword,
    full_name: full_name,
    username: username,
  };
  let register_response = false;
  for (let item of Object.entries(data)) {
    if (!item[1]) {
      Alert.alert(
        'Blank fields',
        `All fields must be filled. ${item[0]} is blank.`
      );
      return register_response;
    }
  }
  const url = global.serverURL + '/api/register';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .catch(res => {
      Alert.alert('Error connecting to server', res.message);
    })
    .then(
      async res => {
        res = await res.json();
        if (res.success) {
          register_response = res;
        } else {
          Alert.alert(res.error)
        }
      },
      reason => {
        Alert.alert('Error connecting to server', reason);
      }
    );
  return register_response
}

export async function googleLogin() {
  let login_response = false;
  try {
    const url = global.serverURL + '/api/google_login';
    const config = {
      androidClientId: global.googleLoginID.android,
    };
    const result = await Google.logInAsync(config);
    if (result.type == 'success') {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ idToken: result.idToken }),
      })
        .catch(res => {
          Alert.alert('Error connecting to server', res.message);
        })
        .then(
          async res => {
            res = await res.json();
            if (res.success) {
              login_response = res;
            } else {
              Alert.alert('Error', res.error);
            }
          },
          reason => {
            Alert.alert('Error connecting to server', reason);
          }
        );
    }
  } catch (err) {
    Alert.alert('Google Login Error', err);
  }
  return login_response;
}
