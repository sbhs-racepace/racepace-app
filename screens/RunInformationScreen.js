// Jason Yu, Sunny Yan

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput, Dimensions, KeyboardAvoidingView, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Button from "../components/Button"
import BackButtonHeader from '../components/BackButtonHeader'
import "../global.js"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import TextInputCustom from '../components/TextInput';
import Color from '../constants/Color'
import { startRun, addLocationPacket } from '../functions/action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  container: {
    justifyContent:"space-evenly", 
    flexDirection:"column",
    alignItems:'center'
  },
  text_style: {
    color: Color.textColor,
    fontSize:15,
  },
  title_style: {
    fontSize:20,
    fontFamily: 'Roboto',
    textAlign:"center",
    color: Color.textColor
  },
  routePic: {
    aspectRatio: 1.7, 
    width: '80%', 
    height: undefined,
    borderRadius: 5
  },
})

class RunInformationScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      start: "-33.878363,151.104490", //Burwood
      end: "-33.912466,151.103120", //Campsie
      goal_pace: {minutes: "5", seconds: "0"},
      time: {minutes: 0, seconds: 0},
      distance: 0,
      points: 0,
      calories: 0,
      route: null,
      real_time_tracking: false,
    }
  }

  calculateTime(distance, pace) {
    let pace_minutes = pace.minutes
    let pace_seconds = pace.seconds
    let time = distance * pace_minutes * 60 + distance * pace_seconds // Time is in seconds
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - (minutes * 60))
    return {minutes:minutes, seconds:seconds}
  }

  calculateCaloriesBurnt(distance) {
    let weight = 60
    let calories = distance * weight * 1.036
    return Math.floor(calories)
  }

  calculatePoints(distance, pace) {
    return Math.floor(distance * 100 * Math.pow((1/pace.minutes),2))
  }
  
  render() {
    return(
      <View style={{flex:1, backgroundColor: Color.lightBackground}}>
        <BackButtonHeader
          title="Route Information"
          onPress={this.props.navigation.goBack}
        />
        <View style={[STYLES.container, {alignItems:'center', justifyContent:'space-around', flex:1,}]}>
          <Text style={STYLES.title_style}>Route Overview</Text>
          <Image source={require('../assets/map.png')} style={STYLES.routePic} />
          <Text style={STYLES.title_style}>Route Stats</Text>
          <Text style={STYLES.text_style}>Goal Pace: {this.state.time.minutes} minutes {this.state.time.seconds} seconds</Text>
          <Text style={STYLES.text_style}>Time: {this.state.time.minutes} minutes {this.state.time.seconds} seconds</Text>
          <Text style={STYLES.text_style}>Total Distance: {this.state.distance}km</Text>
          <Text style={STYLES.text_style}>Kilojoules Burnt:{Math.floor(this.state.calories *4.184)} Kj</Text>
          <Text style={STYLES.text_style}>Points: {this.state.points}</Text>
          <Text style={STYLES.text_style}>Incline Gain: 0</Text>
        </View>
        <Button 
          text="Start Run"
          style={{borderRadius:10, alignSelf:'center'}} 
          onPress={() => this.props.navigation.navigate("RunManager")}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, startRun }, dispatch)
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(RunInformationScreen);