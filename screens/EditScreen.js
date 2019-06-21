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
import { login } from '../functions/login'
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Color from '../constants/Color';
import '../global.js';

const STYLES = StyleSheet.create({
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
    color: Color.inputColor,
    backgroundColor: Color.darkBackground,
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
      bio: null,
      full_name: null,
      image: null,
      current_password: null,
      confirmation_password: null,
    };
  }

  saveChanges() {
    let login_check = login.login(global.email, this.state.current_password)
    if (login_check != false) {
      if (this.state.passowrd == this.state.confirmation_password) {
        let data = {
          username: this.state.username,
          password: this.state.password,
          bio: this.state.bio,
          full_name: this.state.full_name,
          image: this.state.image,
        };
        let url = global.serverURL + '/api/update_profile';
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
                res = await res.json()
                if (res.success == true) {
                  Alert.alert('Changed details')
                } else {
                  Alert.alert('Could not change details')
                }
              },
              reason => {
                Alert.alert('Error connecting to server', reason);
              }
            );
        } catch (err) {
          //Catch any other errors
          Alert.alert('Error', err);
        }
      } else {
        Alert.alert('New Password does not match')
      }
    } else {
      Alert.alert('Current Password was not correct')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: Color.lightBackground,
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <BackButton onPress={this.props.navigation.goBack} />
        <View style={{ flex: 1, alignSelf: 'flex-start' }} />
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
            <TextInput 
              placeholder="Name" style={STYLES.input} 
              onChangeText={full_name => this.setState({ full_name })}
            />
            <TextInput
              placeholder="Enter Bio"
              onChangeText={bio => this.setState({ bio })}
              style={{ ...STYLES.input, height: 100, fontSize: 12 }}
              multiline={true}
            />
          </View>
        </View>
        <Text style={{ fontSize: 30, color: 'white' }}> Change Password</Text>
        <TextInput 
          placeholder="Current Password" style={STYLES.input} 
          onChangeText={current_password => this.setState({ current_password })}
        />
        <TextInput 
          placeholder="New Password" style={STYLES.input} 
          onChangeText={password => this.setState({ password })}
        />
        <TextInput 
          placeholder="Confirm New Password" style={STYLES.input} 
          onChangeText={confirmation_pword => this.setState({ confirmation_pword })}
        />
        
        <Text style={{ fontSize: 30, color: 'white' }}> Change Username</Text>
        <Text style={{ fontSize: 15, color: 'white' }}>
          {' '}
          Current Username: {global.user.username}{' '}
        </Text>
        <TextInput 
          placeholder="New Username" style={STYLES.input} 
          onChangeText={username => this.setState({ username })} 
        />
        <View style={{ flex: 5 }} />

        <Button
          text="Save Changes"
          style={{
            width: '50%',
            height: 30,
            bottom: 50,
            borderRadius: 10,
            fontSize: 14,
          }}
          onPress={this.saveChanges}
        />
      </KeyboardAvoidingView>
    );
  }
}
