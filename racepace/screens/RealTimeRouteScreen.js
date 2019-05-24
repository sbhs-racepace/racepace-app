import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import Button from "../components/Button"
import "../global.js"

const STYLES = StyleSheet.create({

})

class RealTimeRouteDefaultScreen extends React.Component {
  constructor(state) {
    super(state);
  }

  render() {
    return (
      <View>      
        <Text style={{fontSize:30}}>Pace: {this.props.pace.minutes} :{this.props.pace.seconds}</Text>
        <Text style={{fontSize:30}}>Distance: {this.props.distance}</Text>
        <Text style={{fontSize:30}}>Timer: 15 seconds</Text>
        <Text style={{fontSize:30}}>Time</Text>
      </View>
    )
  }
}

export default class RealTimeRouteScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      pace: {minutes:'NA', seconds:'NA'},
      distance: 0,
    }
  }

  updateRunInfo() {
    let data = {'period': 5}
    let pace_url = global.serverURL + '/api/get_run_info'
    fetch(pace_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Authorization': global.login_status.token,
      })
    }).then(res => res.json()).then(data => { 
      let pace = data.pace
      let distance = data.distance
      this.setState({'pace':pace,'distance':distance})
    });
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
    } else {
      // Getting start time and intializing the real time route
      Alert.alert('real_time_route_screen did mount')
      let current_time = new Date();
      let start_time = {
        'year':current_time.getFullYear(),
        'month':current_time.getMonth(),
        'day':current_time.getDate(),
        'hours':current_time.getHours(),
        'minutes':current_time.getMinutes(),
        'seconds':current_time.getSeconds(),
      }
      let data = {
        'start_time': start_time,
        'route': global.current_route,
      }
      global.socket.emit('start_run', start_time);

      // Asking location permission and creating location loop
      let { status } = Permissions.askAsync(Permissions.LOCATION);
      if (status) { //Check whether permission granted
        Location.watchPositionAsync(
          {
            accuracy: 4, //Accurate to 10m
            timeInterval: 5000,
          },
          (location) => {
            let current_time = new Date();
            let data = {
              'location': location,
              'time': (current_time.getTime() / 1000), // Conversion to seconds
            }
            global.socket.emit('location_update',data);
            console.log('updating location')
            console.log(location);
            this.updateRunInfo(); // Updates pace even with only 
          }
        )
      }
    }
  }
  
  render() {
    return (
      <View>
        <RealTimeRouteDefaultScreen pace={this.state.pace} distance={this.state.distance}></RealTimeRouteDefaultScreen>
        <Button 
          text="Save Running Route"
          onPress={() => {
            Alert.alert('End Route')
            global.socket.emit('end_run');
            global.current_route = null;
            this.props.navigation.navigate('SaveRun');
          }}
        />
        <Button 
          text="Stop Run"
          onPress={() => {
            Alert.alert('Stop Route')
            global.socket.emit('end_run');
            global.current_route = null;
            this.props.navigation.navigate('FeedFollowing');
          }}
        />
      </View>
    )
  
  }
}