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
      currentScreen: 'default',
      pace: {minutes:'NA', seconds:'NA'},
      distance: 0,
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
    } else {
      global.socket.emit('start_run');
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      Alert.alert('permission not granted')
    }
    let location = await Location.getCurrentPositionAsync({timeInterval:5000});
    let current_time = new Date()
    let data = {
      'location': location,
      'time': current_time.toLocaleString(),
    }
    console.log(data.time)
    global.socket.emit('location_update',data);
  };
  
  render() {
    return (
      <View>
        <RealTimeRouteDefaultScreen pace={this.state.pace} distance={this.state.distance}></RealTimeRouteDefaultScreen>
        <Button 
          text="Save Running Route"
          onPress={() => {
            Alert.alert('End Route')
            this.props.navigation.navigate('SaveRun');
          }}
        />
        <Button 
          text="Stop Run"
          onPress={() => {
            Alert.alert('Stop Route')
            this.props.navigation.navigate('FeedFollowing');
          }}
        />
      </View>
    )
  
  }
}