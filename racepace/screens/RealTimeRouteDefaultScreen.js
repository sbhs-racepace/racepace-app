import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import Button from "../components/Button"
import "../global.js"

export default class RealTimeRouteDefaultScreen extends React.Component {
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
        <Button 
          text="Save Running Route"
          onPress={() => {
            Alert.alert('End Route')
          }}
        />
        <Button 
          text="Stop Run"
          onPress={() => {
            Alert.alert('Stop Route')
          }}
        />
      </View>
    )
  }
}