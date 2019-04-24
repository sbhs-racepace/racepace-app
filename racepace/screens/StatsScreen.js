import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Button from "../components/Button"
import "../global.js"

const STYLES = StyleSheet.create({
  text: {
    fontSize:15,
    padding:"3%"
  }
})

export default class StatsScreen extends React.Component {
  constructor(state) {
    super(state);
  }
  
  render() {
    return (
      <ScrollView contentContainerStyle={{flexDirection:"column", flex:1}}>
        <Text style={STYLES.text}>Runs made: 10</Text>
        <Text style={STYLES.text}>Distance Ran Altogether: 10</Text>
        <Text style={STYLES.text}>Longest Distance Ran: 10</Text>
        <Text style={STYLES.text}>Fastest 1km: 10</Text>
        <Text style={STYLES.text}>Fastest 5km: 10</Text>
        <Text style={STYLES.text}>Fastest 10km: 10</Text>
        <Text style={STYLES.text}>Fastest Marathon: 20</Text>
        <Text style={STYLES.text}>Estimated V02 Max: 50</Text>
        <Text style={STYLES.text}>Average Heart Rate: 50</Text>
        <Text style={STYLES.text}>Cadence: 150</Text>
      </ScrollView>
    );
  }
}