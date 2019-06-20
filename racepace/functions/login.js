//SY
import '../global';
import { Alert } from 'react-native';
import Expo from 'expo';
import io from 'socket.io-client';

function check_login(res) {
  if (!res) {
    //Check for empty response
    Alert.alert('Error', "Server didn't respond");
    return false;
  }
  let res_json = JSON.parse(res._bodyText); //Parse response as JSON
  if (res_json['success']) {
    //Credentials correct
    global.login_status = res_json;
  } else {
    //Credentials incorrect
    Alert.alert('Error', res_json.error);
  }
  return res_json['success'];
}

function storeUserInfo(res) {
  console.log('Login success');
  let data = { user_id: global.login_status.user_id };
  let info_url = global.serverURL + '/api/get_info';
  console.log(global.login_status.token);
  fetch(info_url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      Authorization: global.login_status.token,
    }),
  }).then(res => {
    // Store user info
    global.user = JSON.parse(res._bodyText).info;
    global.socket = socket = io(
      `${global.serverURL}?token=${global.login_status.token}`,
      { transports: ['websocket'] }
    );
    socket.emit('authenticate', global.login_status.token);
  });
}

export function login(email,password) {
  //Sends login request to server
  let data = {
    email, password
  };
  let url = global.serverURL + '/api/login';
  try {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .catch(res => {
        Alert.alert('Error connecting to server', res);
      })
      .then(
        res => {
          console.log('Login response received from server');
          let login_response = check_login(res);
          if (login_response) {
            storeUserInfo(login_response);
            this.props.navigation.navigate('FeedFollowing');
          }
        },
        reason => {
          console.log('Promise rejected');
          Alert.alert('Error connecting to server', reason);
        }
      );
  } catch (err) {
    //Catch any other errors
    Alert.alert('Error', err);
  }
}

export function register() {
  //Sends register request to server (also logs in after user is registered)
  let data = {
    email: this.state.email,
    password: this.state.pword,
    full_name: this.state.full_name,
    dob: this.state.dob,
    username: this.state.username,
  };
  const url = global.serverURL + '/api/register';
  try {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .catch(res => {
        Alert.alert('Error connecting to server', res);
      })
      .then(
        res => {
          console.log('Login response received from server');
          let login_response = check_login(res);
          if (login_response) {
            storeUserInfo(login_response);
            this.props.navigation.navigate('FeedFollowing');
          }
        },
        reason => {
          console.log('Promise rejected');
          Alert.alert('Error connecting to server', reason);
        }
      );
  } catch (err) {
    //Catch any other errors
    Alert.alert('Error', err);
  }
}

export async function googleLogin() {
  try {
    const url = global.serverURL + '/api/google_login'
    const result = await Expo.Google.logInAsync({
      androidClientId: global.googleLoginID.android,
    });
    if (result.type == 'success') {
      fetch(url, {
        method: 'POST',
        body: "idToken="+result.idToken,
      })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(
          res => {
            console.log('Login response received from server');
            let login_response = check_login(res);
            if (login_response) {
              storeUserInfo(login_response);
              this.props.navigation.navigate('FeedFollowing');
            }
          },
          reason => {
            console.log('Promise rejected');
            Alert.alert('Error connecting to server', reason);
          }
        );
    }
  } catch (err) {
    Alert.alert('Google Login Error', err);
  }
}
