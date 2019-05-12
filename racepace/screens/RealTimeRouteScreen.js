import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Button from "../components/Button"
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import "../global.js"

const STYLES = StyleSheet.create({
})

class DefaultScreen extends React.Component {

}

export default class RealTimeRouteScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      pace: {minutes:5, seconds:3},
      myText: 'none',
      gestureName: 'none',
      backgroundColor: '#fff',
      screenName:'default',
    }
  }

  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }
 
  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
  }
 
  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }
 
  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }
  
  render() {
    return (
      <GestureRecognizer
      onSwipeUp={(state) => this.onSwipeUp(state)}
      onSwipeDown={(state) => this.onSwipeDown(state)}
      onSwipeLeft={(state) => this.onSwipeLeft(state)}
      onSwipeRight={(state) => this.onSwipeRight(state)}
      style={{
        flex: 1,
        backgroundColor: this.state.backgroundColor
      }}
      >
      <Text>{this.state.myText}</Text>
      <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
      <Text style={{fontSize:30}}>Pace: {this.state.pace.minutes} :{this.state.pace.seconds}</Text>
      <Text style={{fontSize:30}}>Distance: {this.state.distace}</Text>
      <Text style={{fontSize:30}}>Timer: 15 seconds</Text>
      <Text style={{fontSize:30}}>Time: 509</Text>
      <Text style={{fontSize:30}}>Calories Burnt: 509</Text>
    </GestureRecognizer>
    )
  
  }
}