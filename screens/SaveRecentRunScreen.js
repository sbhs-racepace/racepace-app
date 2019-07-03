// Jason Yu

import React from 'react';
import { Component } from 'react';
import { View, Text, TextInput,Dimensions, StyleSheet, Alert } from 'react-native';
import { Image } from 'react-native-elements'
import Button from '../components/Button.js';
import BackButtonHeader from '../components/BackButtonHeader.js';
import Color from '../constants/Color.js';
import '../global.js';
import { startRun, addLocationPacket, endRun } from '../functions/action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
  routePic: {
    aspectRatio: 1.7, 
    width: '80%', 
    height: undefined,
    borderRadius: 5
  },
})

class SaveRecentRunScreen extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.endRun()
    this.props.navigation.navigate('Feed');
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Color.lightBackground}}>
        <BackButtonHeader 
          title="Save Screen"
          onPress={this.props.navigation.goBack}
        />
        <View style={{flex:1, justifyContent:'space-evenly', alignItems:'center'}}>
          <Text style={STYLES.title_style}>Run Information</Text>
          <Image source={require('../assets/map.png')} style={STYLES.routePic} />
          <Text style={STYLES.text_style}>Average Pace: {this.props.real_time_info.average_pace.minutes} minutes {this.props.real_time_info.average_pace.seconds} seconds</Text>
          <Text style={STYLES.text_style}>Distance Ran: {this.props.real_time_info.distance}</Text>
          <Text style={STYLES.text_style}>Duration: {this.props.run_info.duration}</Text>
          <Text style={STYLES.text_style}>Points: {this.props.run_info.points}</Text>
        </View>
        <Button 
          style={{width:'100%'}}
          text="Save Run"
          onPress={()=> {
            this.saveRecentRun()
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, startRun, endRun }, dispatch)
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveRecentRunScreen);