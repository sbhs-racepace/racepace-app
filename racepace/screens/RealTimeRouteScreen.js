import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import Button from "../components/Button"
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import "../global.js"

const STYLES = StyleSheet.create({

})

class DefaultScreen extends React.Component {
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

class AdvancedScreen extends React.Component {
  constructor(state) {
    super(state);
  }

  render() {
    return (
      <View>      
        <Text style={{fontSize:30}}>Advanced Stats</Text>
        <Text style={{fontSize:30}}>Elevation</Text>
        <Text style={{fontSize:30}}>Heart Beat</Text>
        <Text style={{fontSize:30}}>Goal Pace</Text>
        <Text style={{fontSize:30}}>Points</Text>
        <Text style={{fontSize:30}}>Average Pace</Text>
        <Text style={{fontSize:30}}>Calories Burnt</Text>
        <Text style={{fontSize:30}}>% Effort</Text>
      </View>
    )
  }
}


export default class RealTimeRouteScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      currentScreen: 'default',
      pace: {minutes:5, seconds:0},
      distance: 0,
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
    } else {
      global.socket.emit('run_start');
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

 
  onSwipeLeft(gestureState) {
    if (this.state.currentScreen == 'default') {
      this.setState({currentScreen: 'advanced'});
    } else if (this.state.currentScreen == 'tracking') {
      this.setState({currentScreen: 'default'});
    }
  }
 
  onSwipeRight(gestureState) {
    if (this.state.currentScreen == 'advanced') {
      this.setState({currentScreen: 'default'})
    } else if (this.state.currentScreen == 'default') {
      this.setState({currentScreen: 'tracking'});
    }
  }

  showCurrentScreen() {
    if (this.state.currentScreen == 'default') {
      return <DefaultScreen pace={this.state.pace} distance={this.state.distance}/>;
    } else if (this.state.currentScreen =='advanced') {
      return <AdvancedScreen/>;
    } else if (this.state.currentScreen =='tracking') {
      this.props.navigation.navigate("Track")
      return <DefaultScreen pace={this.state.pace} distance={this.state.distance}/>; 
    } else {
      return <DefaultScreen pace={this.state.pace} distance={this.state.distance}/>; 
    }
  }
  
  render() {
    return (
      <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor
        }}
      >
        <View>{this.showCurrentScreen()}</View>
      </GestureRecognizer>
    )
  
  }
}