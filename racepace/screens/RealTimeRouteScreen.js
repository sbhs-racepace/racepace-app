import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Button from "../components/Button"
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import "../global.js"

const STYLES = StyleSheet.create({

})

class DefaultScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      pace: {minutes:5, seconds:3},
      distance: 10,
    }
  }
  render() {
    return (
      <View>      
        <Text style={{fontSize:30}}>Pace: {this.state.pace.minutes} :{this.state.pace.seconds}</Text>
        <Text style={{fontSize:30}}>Distance: {this.state.distance}</Text>
        <Text style={{fontSize:30}}>Timer: 15 seconds</Text>
        <Text style={{fontSize:30}}>Time</Text>
      </View>
    )
  }
}

class AdvancedScreen extends React.Component {
  render() {
    return (
      <View>      
        <Text>Some advanced stuff in here</Text>
      </View>
    )
  }
}


export default class RealTimeRouteScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      currentScreen: 'default',
    }
  }
 
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
      return <DefaultScreen/>;
    } else if (this.state.currentScreen =='advanced') {
      return <AdvancedScreen/>;
    } else if (this.state.currentScreen =='tracking') {
      this.props.navigation.navigate("Track")
      return <DefaultScreen/>; 
    } else {
      return <DefaultScreen/>; 
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
      <View style={{flex:7}}>{this.showCurrentScreen()}</View>
    </GestureRecognizer>
    )
  
  }
}