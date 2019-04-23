//SY
import './global';
import { Alert } from 'react-native';
import Expo from 'expo';

function check_login(res) {
  //Read response from server
  if (!res) {
    //Check for empty response
    Alert.alert('Error',"Server didn't respond");
    return false;
  }
  res = JSON.parse(res._bodyText); //Parse response as JSON
  console.log(res);
  if (res['success']) {
    //Credentials correct
    global.login_status = res; //Save response (contains user id, token)
  } else {
    //Credentials incorrect
    Alert.alert('Error', res.error);
  }
  return res['success'];
}

export function login() {
  //Sends login request to server
  let data = {
    email: this.state.email,
    password: this.state.pword,
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
          if (check_login(res)) {
            //Checking response from server
            console.log('Login success');
            this.props.navigation.navigate('Details');
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
    full_name: this.state.full_name
  };
  let url = global.serverURL + '/api/register';
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
          if (check_login(res)) {
            //Checking response from server
            console.log('Login success');
            this.props.navigation.navigate('Details');
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
    const result = await Expo.Google.logInAsync({
      androidClientId: global.googleLoginID.android,
      scopes: ['email'],
    });
    if (result.type == 'success') {
      console.log(result);
      //NOT IMPLEMENTED (Requires new backend code)
    }
  } catch (err) {
    Alert.alert('Google Login Error', err);
  }
}
