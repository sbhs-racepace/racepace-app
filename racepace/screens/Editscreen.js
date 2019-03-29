import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  AppRegistry,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import "../global.js"

export default class EditScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ flex: 1, alignItems: 'centre', justifyContent: 'top' }}>
        <ScrollView 
        style={{ alignItems: 'left', height: '30%'}}>
        <Text style={{fontSize:30}}> Change Password 
        </Text>
        <TextInput
          placeholder="Current Password"
          style={{
            height: '20%',
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        <TextInput
          placeholder="New Password"
          style={{
            height: '20%',
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        <TextInput
          placeholder="Confirm New Password"
          style={{
            height: '20%',
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        </ScrollView>
        <ScrollView>
        <Text style={{fontSize: 30}}> Change Username
        </Text>
        <Text style={{fontSize: 15,}}> Current Username: {global.username} </Text>
        <TextInput
          placeholder="New Username"
          style={{
            height: '20%',
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
