// Sunny Yan

import { Alert } from 'react-native';
import '../global';

export default async function request(
  endpoint,
  method = 'POST',
  data = {},
  token = "",
  callback = ()=>{}
) {
  let options;
  this.resp = false
  if (method === 'GET') {
    options = { method: 'GET' };
  } else {
    options = {
      method,
      body: JSON.stringify(data),
      headers: {
        Authorization: token,
      },
    };
  }

  fetch(global.serverURL + endpoint, options)
  .catch(res => {
    Alert.alert('Error connecting to server', res.message);
  })
  .then(
    async resp => {
      resp = await resp.json();
      callback(resp);
    },
    reason => {
      Alert.alert('Error connecting to server', reason);
    }
  );
  return this.resp
}
