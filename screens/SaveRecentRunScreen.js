// Jason Yu

import React from 'react';
import { Component } from 'react';
import { View, Text, TextInput,Dimensions, StyleSheet, Alert } from 'react-native';
import { Image } from 'react-native-elements'
import Button from '../components/Button.js';
import Color from '../constants/Color.js';
import '../global.js';

const STYLES = StyleSheet.create({
  text_style: {
    color: Color.textColor,
    fontSize:20,
  },
  title_style: {
    fontSize:30,
    fontFamily: 'Roboto',
    textAlign:"center",
    color: Color.textColor
  },
})

export default class SaveRunScreen extends React.Component {
  constructor(state) {
    super(state);
  }

  async saveRecentRun() {
    let api_url = `${global.serverURL}/api/save_recent_route`
    fetch(api_url, {
      method: 'POST',
      headers: new Headers({
        'Authorization': global.login_info.token,
      })
    })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    })
    .then (async res => {
        console.log('Success Saving Recent Route');
      }
    );
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Color.lightBackground}}>
          <View style={{flex:1, justifyContent:'space-evenly'}}>
            <Text style={STYLES.title_style}>Save Run Screen</Text>
            <Text style={STYLES.text_style}>Good job on your run!</Text>
            <Text style={STYLES.text_style}>Here are some stats.</Text>
          </View>
          <Button 
            style={{width:'100%'}}
            text="Save Run"
            onPress={()=> {
              this.saveRecentRun()
              this.props.navigation.navigate('Feed');
            }}
          />
      </View>
    );
  }
}
