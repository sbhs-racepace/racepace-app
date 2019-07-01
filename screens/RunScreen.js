// Jason Yu

import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Button from "../components/Button"
import Color from '../constants/Color.js'
import "../global.js"
import { startRun, addLocationPacket } from '../functions/action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  text: {
    fontSize:40,
    color:Color.textColor,
    width:"100%",
    flex:2,
    fontFamily:'Roboto-Thin',
    textAlign:'center',
  },
  title: {
    fontFamily:'RobotoCondensed-BoldItalic',fontSize:50,color:Color.primaryColor,
    borderColor:'white',
    flex:3,
    justifyContent:'center'
  },
  circularButton:{
    margin:5,
    borderWidth:1,
    backgroundColor:'blue',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    width: windowWidth * 0.20,
    height: windowWidth * 0.20,
    borderRadius: windowWidth * 0.20 / 2,
  }
})

class RunScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      pace: {minutes:'--', seconds:'--'},
      distance: 0,
      time: {hours:'00',minutes:'00',seconds:'00',milliseconds:'00'},
    }
  }

  timeString() {
    return `${this.state.time.hours}: ${this.state.time.minutes}: ${this.state.time.seconds}.${this.state.time.milliseconds}`
  }

  async locationUpdateLoop(real_time_tracking) {
    let location_packet = await Location.getCurrentPositionAsync({
      accuracy: 4,
    })
    if (real_time_tracking) global.socket.emit('location_update',location_packet);
    this.props.addLocationPacket(location_packet)
  }

  async componentDidMount() {
    if (global.location_permission) {
      this.props.startRun(new Date())
      let real_time_tracking = this.props.run_info.real_time_tracking
      if (real_time_tracking) global.socket.emit('start_run', start_time);
      let timerId = setInterval((real_time_tracking) => {this.locationUpdateLoop(real_time_tracking)}, 5000);
    } else {
      Alert.alert('Location Permission not allowed')
      this.props.navigation.navigate('Feed')
    }
  }
  
  render() {
    return (
      <View style={{backgroundColor:Color.lightBackground, flex:1}}>
        <View style={{flex:1,alignItems:'center'}}>
          <Text style={STYLES.title}>Run</Text>      
          <Text style={STYLES.text}>Distance: {this.state.distance}</Text>
          <Text style={STYLES.text}>Timer: {this.timeString()}</Text>
          <Text style={STYLES.text}>Pace: {this.state.pace.minutes} :{this.state.pace.seconds}</Text>
          <Text style={STYLES.text}>Average Pace: {this.props.real_time_info.average_pace.minutes} :{this.props.real_time_info.average_pace.seconds}</Text>
        </View>

        <View style={{backgroundColor:Color.darkBackground, height: windowHeight * 0.20}}>
          <View style={{flex:1,flexDirection:'row', width:'100%', justifyContent:'space-evenly'}}>
            <TouchableOpacity
              style={STYLES.circularButton}
              onPress={()=>{this.props.navigation.navigate('OtherStats')}}
            >
              <Text style={{fontSize:20, color:Color.textColor}}>Stats (ICON)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={STYLES.circularButton}
              onPress={()=>{
                this.setState({paused: !this.state.paused})
                this.props.navigation.navigate('Paused');
              }}
            >
              <Text style={{fontSize:20, color:Color.textColor}}>Pause (ICON)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={STYLES.circularButton}
              onPress={()=>{this.props.navigation.navigate('Tracking')}}
            >
              <Text style={{fontSize:20, color:Color.textColor}}>Map (ICON)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, startRun }, dispatch)
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(RunScreen);