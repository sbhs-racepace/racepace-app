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
import BackButton from '../components/BackButton'
import Color from '../constants/Color'
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
  chsfile: {
    width: 80,
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
  constructor(props) {
    super(props);
    this.state = {
      uri: global.serverURL + `/api/avatars/${global.login_status.user_id}.png`,
      username: null,
      password: null,
      full_name: null,
      image_null: null,
    };
  }

  updateServer(username, password, profilePicture) {
    let url = global.serverURL + '/api/update_profile';
    data = {
      username: this.state.username, 
      password: this.state.password, 
      full_name: this.state.full_name, 
      bio: this.state.bio, 
      profile_image: this.state.profile_image,

    }
    try {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          Authorization: global.login_status.token,
        }),
      })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(
          async res => {
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
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor:Color.lightBackground
        }}
      >
        <BackButton
          onPress={this.props.navigation.goBack}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 5, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Image
                style={STYLES.profile_image}
                source={{
                  uri: this.state.uri,
                }}
              />
              <Button
                text="Choose File"
                style={STYLES.chsfile}
                onPress={async () => {
                  let { uri, type } = await DocumentPicker.getDocumentAsync({
                    type: 'image/*',
                  });
                  if (type == 'success') {
                    this.setState({ uri });
                  }
                }}
              />
            </View>
            <View style={{ flex: 2 }}>
              <TextInput placeholder="Name" style={STYLES.input} />
              <TextInput
                placeholder="Enter Bio"
                style={{ ...STYLES.input, height: 100, fontSize: 12 }}
                multiline={true}
              />
            </View>
          </View>
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
          <View style={{ flex: 5 }}>
          <Button
            text="Save Changes"
            style={{
              width: '50%',
              height: 30,
              bottom: 50,
              borderRadius: 10,
              fontSize: 14,
            }}
          />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
