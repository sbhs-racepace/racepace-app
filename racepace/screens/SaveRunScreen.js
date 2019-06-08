import React from 'react';
import { Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import Button from '../components/Button.js'
import "../global.js"

export default class SaveRunScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      'name': 'name',
      'description': 'description',
    }
  }

  saveRun() {

    let data = {
      name: this.state.name,
      description: this.state.description,
    }
    let url = `${global.serverURL}/api/save_route`
    try {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Authorization': global.login_status.token,
        })
      })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(
          res => {
            console.log('Success Saving Route');
          },
          reason => {
            console.log('Promise rejected');
            Alert.alert('Error connecting to server', reason);
          }
        );
    } catch (err) {
      Alert.alert('Error', err);
    }
  }

  render() {
    return (
      <View>
        <Text>Save Run Screen</Text>
        <TextInput
          onChangeText={name => {
            this.setState({ name: name });
          }}
          defaultValue='Name'
        />
        <TextInput
          onChangeText={description => {
            this.setState({ description: description });
          }}
          defaultValue='Description'
        />
        <Button 
          text="Save Run"
          onClick={()=> {
            Alert.alert("Saving Run")
            this.saveRun()
            console.log('navigating to feed following')
            this.props.navigation.navigate('FeedFollowing');
          }}
        />
      </View>
    )
  }
}