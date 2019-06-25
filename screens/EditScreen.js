// Calvin Chang

import React from 'react';
import { DocumentPicker } from 'expo';
import { View, Alert, Text, ScrollView, AppRegistry, TextInput, StyleSheet, KeyboardAvoidingView, Image, Dimension } from 'react-native';
import { login } from '../functions/login'
import Button from '../components/Button';
import BackButtonHeader from '../components/BackButtonHeader';
import Color from '../constants/Color';
import '../global.js';

const window_width = Dimensions.get("window").width
const window_height = Dimensions.get("window").height

const STYLES = StyleSheet.create({
  chsfile: {
    width: 80,
    height: 30,
    borderRadius: 10,
    alignSelf: 'center'
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    width: window_width * 0.8,
    borderRadius: 10,
    padding: '1%',
    marginTop: 5,
    color: Color.textColor,
    backgroundColor: Color.lightBackground2,
  },
  profile_image: {
    height: window_width * 0.35,
    width: window_width * 0.35,
    borderRadius: window_width * 0.35 / 2,
    alignSelf: 'center'
  },
  container : {
    flex: 1,
    backgroundColor: Color.lightBackground,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  saveButton: {
    width: '80%',
    height: 30,
    bottom: 50,
    borderRadius: 10,
    fontSize: 14,
  }
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

  async saveChanges() {
    let login_data = login.login(global.email, this.state.current_password)
    let equivalent_new = this.state.passowrd == this.state.confirmation_password
    let data = {
      username: this.state.username,
      password: this.state.password,
      bio: this.state.bio,
      full_name: this.state.full_name,
      image: this.state.image,
    };

    if (login_data.success) {
      if (equivalent_new) {
        let api_url = global.serverURL + '/api/update_profile';
        fetch(api_url, {
          method: 'POST',
          body: JSON.stringify(data),
        })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(async res => {
          res = await res.json()
          if (res.success == true) {
            Alert.alert('Changed details')
          } else {
            Alert.alert('Could not change details')
          }
        });
      } else {
        Alert.alert("New Passwords don't match")
      }
    } else {
      Alert.alert('Current Password was not correct')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={STYLES.container}>
        <BackButtonHeader title='Edit Screen' onPress={this.props.navigation.goBack} />
        <View style={{flexDirection: 'row', justifyContent:'space-around' }}>
          <View style={{width: window_width * 0.4}}>
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
          <View style={{ width: window_width * 0.5 }}>
            <TextInput 
              placeholder="Name" 
              style={{ ...STYLES.input, width: window_width * 0.5 }}
              onChangeText={full_name => this.setState({ full_name })}
            />
            <TextInput
              placeholder="Enter Bio"
              onChangeText={bio => this.setState({ bio })}
              style={{ ...STYLES.input, height: window_width * 0.3, fontSize: 12, width: window_width * 0.5 }}
              multiline={true}
            />
          </View>
        </View>

        <View style={{alignItems:'center'}}>
          <Text style={{ fontSize: 30, color: 'white' }}> Change Password</Text>
          <TextInput 
            placeholder="Current Password" 
            style={STYLES.input} 
            onChangeText={current_password => this.setState({ current_password })}
          />
          <TextInput 
            placeholder="New Password" 
            style={STYLES.input} 
            onChangeText={password => this.setState({ password })}
          />
          <TextInput 
            placeholder="Confirm New Password" 
            style={STYLES.input} 
            onChangeText={confirmation_pword => this.setState({ confirmation_pword })}
          />
          
          <Text style={{ fontSize: 30, color: 'white' }}>Change Username</Text>
          <Text style={{ fontSize: 15, color: 'white' }}>Current Username: {global.user.username}</Text>
          <TextInput 
            style={STYLES.input} 
            placeholder="New Username"
            onChangeText={username => this.setState({ username })} 
          />
        </View>

        <Button
          text="Save Changes"
          style={STYLES.saveButton}
          onPress={this.saveChanges}
        />
      </KeyboardAvoidingView>
    );
  }
}
