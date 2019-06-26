// Jason Yu

import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Button from "../components/Button"
import Color from '../constants/Color.js'
import "../global.js"

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  text: {
    fontSize:40,
    color:Color.textColor,
    width:"100%",
    flex:2,
    fontFamily:'Roboto-Thin',
    textAlign:'center',
  },
  title: {
    fontFamily:'RobotoCondensed-BoldItalic',fontSize:50,color:Color.primaryColor,
    borderColor:'white',
    flex:3,
    justifyContent:'center'
  },
  circularButton:{
    margin:5,
    borderWidth:1,
    backgroundColor:'blue',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    width: windowWidth * 0.20,
    height: windowWidth * 0.20,
    borderRadius: windowWidth * 0.20 / 2,
  }
})

export default class RunOtherStasScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      pace: {minutes:'--', seconds:'--'},
      distance: 0,
      time: {hours:'00',minutes:'00',seconds:'00',milliseconds:'00'},
      paused: false,
      interval_id: null,
    }
  }

  timeString() {
    return `${this.state.time.hours}: ${this.state.time.minutes}: ${this.state.time.seconds}.${this.state.time.milliseconds}`
  }
  
  render() {
    return (
      <View style={{backgroundColor:Color.lightBackground, flex:1}}>
        <View style={{flex:1,alignItems:'center'}}>
          <Text style={STYLES.title}>Other Stats</Text>      
          <Text style={STYLES.text}>Timer: {this.timeString()}</Text>
          <Text style={STYLES.text}>Lap Pace: {this.state.pace.minutes} :{this.state.pace.seconds}</Text>
          <Text style={STYLES.text}>Lap Distance: {this.state.distance}</Text>
        </View>

        <View style={{backgroundColor:Color.darkBackground, height: windowHeight * 0.20}}>
          <View style={{flex:1,flexDirection:'row', width:'100%', justifyContent:'space-evenly'}}>
            <TouchableOpacity
              style={STYLES.circularButton}
              onPress={()=>{this.props.navigation.navigate('RunManager')}}
            >
              <Text style={{fontSize:20, color:Color.textColor}}>Main (ICON)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={STYLES.circularButton}
              onPress={()=>{
                this.setState({paused: !this.state.paused})
                this.props.navigation.navigate('Paused');
              }}
            >
              <Text style={{fontSize:20, color:Color.textColor}}>Pause (ICON)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}