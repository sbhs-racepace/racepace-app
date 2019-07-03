// Jason Yu

import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Button from "../components/Button"
import Color from '../constants/Color.js'
import "../global.js"
import {  } from '../functions/action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

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
    backgroundColor:Color.lightBackground2,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  largeButton: {
    width: windowWidth * 0.20,
    height: windowWidth * 0.20,
    borderRadius: windowWidth * 0.20 / 2,
  }, 
  largeIcon: windowWidth * 0.2 / 2,
})

class RunOtherStatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pace: {minutes:'--', seconds:'--'},
      distance: 0,
      time: {hours:'00',minutes:'00',seconds:'00',milliseconds:'00'},
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
              style={[STYLES.circularButton, STYLES.largeButton]}
              onPress={()=>{this.props.navigation.goBack()}}
            >
              <FontAwesome5Icon name="running" size={STYLES.largeIcon}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(RunOtherStatsScreen);