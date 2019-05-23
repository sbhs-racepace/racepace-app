import React from 'react';
import { DocumentPicker } from 'expo';
import {
  View,
  Alert,
  Text,
  ScrollView,
  AppRegistry,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Button from '../components/Button';
import '../global.js';
const STYLES = StyleSheet.create({
  backbtn: {
    width: 40,
    height: 30,
    left: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    padding: '1%',
    marginTop: 5,
  },
  profile_image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
export default class EditScreen extends React.Component {
  updateServer(username, password, profilePicture) {
    let url = global.serverURL + '/api/users/' + global.login_status.user_id;
    try {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ username, password, profilePicture }),
      })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(
          res => {
            console.log('Login response received from server');
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
  render() {
    return (
      <KeyboardAvoidingView>
        <View style={{ alignSelf: 'flex-start' }}>
          <Button
            text="Back"
            onPress={() => this.props.navigation.goBack()}
            style={STYLES.backbtn}
          />
          <Image
            style={STYLES.profile_image}
            source={{
              uri:
                global.serverURL +
                `/api/avatars/${global.login_status.user_id}.png`,
            }}
          />
          <Button
            text="Choose File"
            onPress={() => {
              let result = DocumentPicker.getDocumentAsync({ type: 'image/*' });
            }}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}> Change Password</Text>
          <TextInput placeholder="Current Password" style={STYLES.input} />
          <TextInput placeholder="New Password" style={STYLES.input} />
          <TextInput placeholder="Confirm New Password" style={STYLES.input} />
          <Text style={{ fontSize: 30 }}> Change Username</Text>
          <Text style={{ fontSize: 15 }}>
            {' '}
            Current Username: {global.user.username}{' '}
          </Text>
          <TextInput placeholder="New Username" style={STYLES.input} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
