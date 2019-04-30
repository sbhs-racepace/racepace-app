import React from 'react';
import {
  View,
  Text,
  ScrollView,
  AppRegistry,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Button from "../components/Button";
import "../global.js";

export default class EditScreen extends React.Component {
  render() {
    const BACK_BTN = {
      width: 40,
      height: "5%",
      left: 5,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    }
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ flex: 1, alignItems: 'centre', justifyContent: 'top' }}>
        <Button text="Back" onPress={()=>this.props.navigation.goBack()} style={BACK_BTN} />
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
        <Text style={{fontSize: 15,}}> Current Username: {global.user.username} </Text>
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
