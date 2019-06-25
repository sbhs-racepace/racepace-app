// Jason Yu

import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Button from "../components/Button"
import "../global.js"
import Color from '../constants/Color.js'

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
})

export default class RealTimeRouteScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      pace: {minutes:'--', seconds:'--'},
      distance: 0,
      interval_id: null,
    }
  }

  async updateRunInfo() {
    let data = {'period': 5}
    let pace_url = global.serverURL + '/api/get_run_info'
    fetch(pace_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Authorization': global.login_status.token,
      })
    })
    .then(async res => await res.json()).then(data => { 
      this.setState({pace:data.pace,distance:data.distance})
    });
  }

  startRun() {
    let current_time = new Date();
    let start_time = {
      year:current_time.getFullYear(),
      month:current_time.getMonth(),
      day:current_time.getDate(),
      hours:current_time.getHours(),
      minutes:current_time.getMinutes(),
      seconds:current_time.getSeconds(),
    }
    let data = {
      start_time: start_time,
      route: global.current_route,
    }
    global.socket.emit('start_run', start_time);
  }

  async componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
    } else {
      // Getting start time and intializing the real time route
      this.startRun()
      // Asking location permission and creating location loop
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status) { //Check whether permission granted
        Location.watchPositionAsync(
          {
            accuracy: 4, //Accurate to 10m
            timeInterval: 10000,
            distanceInterval:10,
          },
          (location) => {
            let current_time = new Date();
            let data = {
              location: location.coords,
              time: (current_time.getTime() / 1000), // Conversion to seconds
            }
            global.socket.emit('location_update',data);
          }
        )
        this.state.interval_id = setInterval(this.updateRunInfo.bind(this), 10000);
      }
    }
  }

  stop_tracking() {
    global.socket.emit('end_run');
    global.current_route = null;
    clearInterval(this.state.interval_id);
  }
  
  render() {
    return (
      <View style={{backgroundColor:Color.lightBackground, flex:1}}>
        <View style={{flex:9,alignItems:'center'}}>
          <Text style={STYLES.title}>Real Time Info</Text>      
          <Text style={STYLES.text}>Pace: {this.props.pace.minutes} :{this.props.pace.seconds}</Text>
          <Text style={STYLES.text}>Distance: {this.props.distance}</Text>
          <Text style={STYLES.text}>Timer: 15 seconds</Text>
          <Text style={STYLES.text}>Time</Text>
        </View>
        <Button 
          text="Save Running Route"
          style={{width:"100%"}}
          onPress={() => {
            Alert.alert('End Route')
            this.stop_tracking()
            if (global.route == null) {
              this.props.navigation.navigate('SaveRecentRun');
            } else {
              this.props.navigation.navigate('SaveRun');
            }
          }}
        />
        <Button 
          text="Stop Run"
          style={{width:"100%"}}
          onPress={() => {
            Alert.alert('Stop Route')
            this.stop_tracking()
            this.props.navigation.navigate('Feed');
          }}
        />
      </View>
    )
  
  }
}