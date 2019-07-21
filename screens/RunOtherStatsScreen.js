// Jason Yu

import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Color from '../constants/Color.js'
import {  } from '../functions/run_action'
import { connect } from 'react-redux';
import { minuteSecondString } from '../functions/conversions';
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
    fontFamily:'Roboto-Bold',fontSize:50,color:Color.primaryColor,
    borderColor:'white',
    flex:3,
    justifyContent:'center'
  },
  circularButton:{
    margin:5,
    backgroundColor:Color.lightBackground,
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

  }
  
  render() {
    return (
      <View style={{backgroundColor:Color.lightBackground, flex:1}}>
        <View style={{flex:1,alignItems:'center'}}>
          <Text style={STYLES.title}>Other Stats</Text>      
          <Text style={STYLES.text}>Timer: </Text>
          <Text style={STYLES.text}>Lap Pace: {minuteSecondString(this.props.run.real_time_info.lap_pace)}</Text>
          <Text style={STYLES.text}>Lap Distance: {Math.ceil(this.props.run.real_time_info.lap_distance)} m</Text>
        </View>

        <View style={{backgroundColor:Color.darkBackground, height: windowHeight * 0.20}}>
          <View style={{flex:1,flexDirection:'row', width:'100%', justifyContent:'space-evenly'}}>
            <TouchableOpacity
              style={[STYLES.circularButton, STYLES.largeButton]}
              onPress={()=>{this.props.navigation.goBack()}}
            >
              <FontAwesome5Icon name="running" size={STYLES.largeIcon} color={Color.primaryColor}/>
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
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunOtherStatsScreen);