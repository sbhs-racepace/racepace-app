// Jason Yu

import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'react-native-elements'
import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Button from "../components/Button"
import Color from '../constants/Color.js'
import { startRun, addLocationPacket, saveRun,resumeRun } from '../functions/run_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  text: {
    fontSize:30,
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
  smallButton: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    borderRadius: windowWidth * 0.12 / 2,
  },
  smallIcon: windowWidth * 0.12 / 2,
  largeIcon: windowWidth * 0.2 / 2,
})

class RunPausedScreen extends React.Component {
  constructor(props) {
    super(props);
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
          <Text style={STYLES.title}>Paused</Text>      
          <Text style={STYLES.text}>Distance: {this.props.run.real_time_info.distance}</Text>
          <Text style={STYLES.text}>Average Pace: {this.props.run.real_time_info.average_pace.minutes} :{this.props.run.real_time_info.average_pace.seconds}</Text>
          <Text style={STYLES.text}>Calories/Kilojoules: Not implemented</Text>
          <Text style={STYLES.text}>Elevation: Not implemented</Text>
          <Text style={STYLES.text}>Graphs: Not implemented</Text>
        </View>

        <View style={{backgroundColor:Color.darkBackground, height: windowHeight * 0.20,flexDirection:'row', width:'100%', justifyContent:'space-evenly'}}>
          <TouchableOpacity
            style={[STYLES.circularButton, STYLES.smallButton]}
            onPress={()=>{
              this.props.navigation.navigate('Feed');
            }}
          >
            <MaterialIcon name="delete" size={STYLES.smallIcon} color={Color.primaryColor}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={[STYLES.circularButton, STYLES.largeButton]}
            onPress={()=>{
              this.props.resumeRun();
              this.props.navigation.goBack();
            }}
          >
            <FontAwesomeIcon name="play" size={STYLES.largeIcon} color={Color.primaryColor}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={[STYLES.circularButton, STYLES.smallButton]}
            onPress={() => {
              this.props.saveRun();
              this.props.navigation.navigate('SaveRun');
            }}
          >
            <FontAwesomeIcon name="save" size={STYLES.smallIcon} color={Color.primaryColor}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, startRun, saveRun, resumeRun }, dispatch)
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunPausedScreen);