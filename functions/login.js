// Sunny Yan, Jason Yu

import '../global';
import { Alert, AsyncStorage } from 'react-native';
import Expo from 'expo';
import { Google } from 'expo';
import io from 'socket.io-client';

export async function storeUserInfo() {
  let api_url = global.serverURL + '/api/get_info';
  fetch(api_url, {
    method: 'POST',
    headers: new Headers({
      Authorization: global.login_info.token,
    }),
  })
    .then(async res => {
      let res_data = await res.json();
      if (res_data.success) {
        global.user = res_data['info'];
        global.socket = io(
          `${global.serverURL}?token=${global.login_info.token}`,
          { transports: ['websocket'] }
        );
        global.socket.emit('authenticate', global.login_info.token);
      } else {
        Alert.alert('Error', res_data.error);
      }
    })
    .catch(error => {
      Alert.alert('Error', error);
    });
}

export async function execute_login(email, password) {
  let login_response = await login(email, password);
  if (login_response.success) {
    storeUserInfo();
    this.setState({ loading: false });
    this.props.navigation.navigate('Feed');
  } else {
    this.setState({ loading: false });
  }
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
      login_response = await res.json();
      global.login_info = {
        token: login_response.token,
        user_id: login_response.user_id,
      };
      await AsyncStorage.setItem(
        'login_info',
        JSON.stringify(global.login_info)
      ); // Storing User Login
    })
    .catch(error => {
      Alert.alert('Error ', error);
    });

  return login_response;
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
  for (let item of Object.entries(data)) {
    if (!item[1]) {
      Alert.alert(
        'Blank fields',
        `All fields must be filled. ${item[0]} is blank.`
      );
      this.setState({ loading: false });
      return 0; //Exit function
    }
  }
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
        async res => {
          res = await res.json();
          if (res.success) {
            storeUserInfo();
            this.setState({ loading: false });
            this.props.navigation.navigate('FeedFollowing');
          }
        },
        reason => {
          this.setState({ loading: false });
          Alert.alert('Error connecting to server', reason);
        }
      );
  } catch (err) {
    //Catch any other errors
    Alert.alert('Error', err);
    this.setState({ loading: false });
  }
}

export async function googleLogin() {
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
          console.log(res);
          Alert.alert('Error connecting to server', res);
        })
        .then(
          async res => {
            res = await res.json();
            if (res.success) {
              storeUserInfo();
              this.props.navigation.navigate('Feed');
            } else {
              Alert.alert('Error', res.error);
            }
          },
          reason => {
            console.log('Promise rejected');
            Alert.alert('Error connecting to server', reason);
          }
        );
    }
  } catch (err) {
    console.log(err);
    Alert.alert('Google Login Error', err);
  }
}
