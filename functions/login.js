// Sunny Yan, Jason Yu

import '../global';
import { Alert } from 'react-native';
import Expo from 'expo';
import io from 'socket.io-client';

async function storeUserInfo(res) {
  let data = { user_id: global.login_status.user_id };
  let api_url = global.serverURL + '/api/get_info';
  fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      Authorization: global.login_status.token,
    }),
  })
  .then(async res => {
    let res_data = await res.json()
    if (res_data.success) {
      global.user = res_data['info']
      global.socket = io(`${global.serverURL}?token=${global.login_status.token}`, { transports: ['websocket'] });
      global.socket.emit('authenticate', global.login_status.token);
    } else {
      Alert.alert('Error', res_data.error)
    }
  }).catch(error => {
    Alert.alert('Error', error);
  })
}

export async function execute_login(email,password) {
  let login_response = await login(email,password)
  if (login_response.success) {
    storeUserInfo(login_response);
    this.props.navigation.navigate('FeedFollowing');
  }
}

export async function login(email,password) {
  let data = { email: email, password: password };
  let api_url = global.serverURL + '/api/login';
  let res_data;
  fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  .then(async res => {
    res_data = await res.json()
  })
  .catch(error => {
    Alert.alert('Error ', error);
  })
  return res_data;
}

export async function register() {
  //Sends register request to server (also logs in after user is registered)
  let data = {
    email: this.state.email,
    password: this.state.pword,
    full_name: this.state.full_name,
    dob: this.state.dob,
    username: this.state.username,
  };
  let api_url = global.serverURL + '/api/register';
  fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  .then(async res => {
    let res_data = await res.json()
    if (res_data.success) {
      storeUserInfo(login_response);
      this.props.navigation.navigate('FeedFollowing');
    } else {
      Alert.alert('Error', res_data.error)
    }
  })
  .catch(error => {
    Alert.alert('Error', error);
  })
}

export async function googleLogin() {
  let api_url = global.serverURL + '/api/google_login'
  let result = await Expo.Google.logInAsync({ androidClientId: global.googleLoginID.android });
  if (result.type == 'success') {
    fetch(api_url, {
      method: 'POST',
      body: "idToken="+result.idToken,
    })
    .then(async res => {
        let res_data = await res.json()
        if (res_data.success) {
          storeUserInfo(login_response);
          this.props.navigation.navigate('FeedFollowing');
        } else {
          Alert.alert('Error', res_data.error)
        }
      }
    )
    .catch(error => {
      Alert.alert('Error connecting to server', error);
    })
  } else {
    Alert.alert('Error')
  }
}
