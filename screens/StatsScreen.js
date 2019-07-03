// Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Button from "../components/Button"
import "../global.js"

import Color from '../constants/Color'
const STYLES = StyleSheet.create({
  text: {
    fontSize:15,
    padding:"3%",
    color:Color.textColor
  }
})

export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let stats = global.user.stats
    return (
    <View>
        <Text style={STYLES.text}>Runs made: {stats.num_runs}</Text>
        <Text style={STYLES.text}>Distance Ran Altogether: {stats.total_distance}</Text>
        <Text style={STYLES.text}>Longest Distance Ran: {stats.longest_distance_ran ? stats.longest_distance_ran : 'None'}</Text>
        <Text style={STYLES.text}>Fastest 1km: {stats.fastest_km ? stats.fastest_km : 'None'}</Text>
        <Text style={STYLES.text}>Fastest 5km: {stats.fastest_5km ? stats.fastest_5km : 'None'}</Text>
        <Text style={STYLES.text}>Fastest 10km: {stats.fastest_10km ? stats.fastest_10km : 'None'}</Text>
        <Text style={STYLES.text}>Fastest Marathon: {stats.fastest_marathon ? stats.fastest_marathon : 'None'}</Text>
        <Text style={STYLES.text}>Estimated V02 Max: {stats.estimated_v02_max ? stats.estimated_v02_max : 'None'}</Text>
        <Text style={STYLES.text}>Average Heart Rate: {stats.average_heart_rate ? stats.average_heart_rate : 'None'}</Text>
        <Text style={STYLES.text}>Cadence: {stats.cadence ? stats.cadence : 'None'}</Text>
    </View>
    );
  }
}