import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import Button from "../components/Button"
import "../global.js"

export default class RealTimeRouteAdvancedScreen extends React.Component {
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