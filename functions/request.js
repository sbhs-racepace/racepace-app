import { Alert } from 'react-native';
import '../global';

export default async function request(
  endpoint,
  method = 'POST',
  data = {},
  token = "",
  errorMess = 'Error connecting to server'
) {
  let options;
  if (method === 'GET') {
    options = { method: 'GET' };
  } else {
    options = {
      method,
      body: JSON.stringify(data),
      headers: {
        Authorization: token===true ? global.login_status.token : token,
      },
    };
  }

  try {
    fetch(global.serverURL + endpoint, options)
      .catch(res => {
        Alert.alert(errorMess, res);
      })
      .then(
        async resp => {
          
          this.resp = await resp.json();
        },
        reason => {
          Alert.alert(errorMess, reason);
        }
      );
  } catch (err) {
    //Catch any other errors
    Alert.alert(errorMess, err);
  }

  return this.resp;
}
