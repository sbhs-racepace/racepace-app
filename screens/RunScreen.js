// Jason Yu

import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import * as Location from 'expo-location'
import Color from '../constants/Color.js'
import "../global.js"
import { startRun, addLocationPacket, pauseRun, incrementTimer } from '../functions/run_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { minuteSecondString, hourMinuteSecondString } from '../functions/conversions';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

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
  smallButton: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    borderRadius: windowWidth * 0.12 / 2,
  },
  smallIcon: windowWidth * 0.12 / 2,
  largeIcon: windowWidth * 0.2 / 2,
})

class RunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: { hours:0, minutes:0, seconds: 0 },
    }
  }

  async timerUpdateLoop() {
    if (this.props.run.run_info.active == true) {
      this.props.incrementTimer();
      let timerId = setTimeout(this.timerUpdateLoop.bind(this), 1000);
    } 
  }

  async locationUpdate() {
    let location_packet = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    })
    if (this.props.run.run_info.real_time_tracking == true) this.props.user.socket.emit('location_update',json_location_packet);
    let json_location_packet = {latitude: location_packet.coords.latitude, longitude: location_packet.coords.longitude, speed: location_packet.coords.speed, timestamp: location_packet.timestamp}
    this.props.addLocationPacket(json_location_packet)
  }

  async locationUpdateLoop() {
    if (this.props.run.run_info.active == true) {
      if (this.props.run.run_info.real_time_tracking == true) this.props.user.socket.emit('start_run', start_time);
      this.locationUpdate()
      let timerId = setTimeout(this.locationUpdateLoop.bind(this), 5000);
    } 
  }

  loops() {
    this.timerUpdateLoop();
    this.locationUpdateLoop();
  }

  async componentDidMount() {
    if (global.location_permission) {
      await this.props.startRun(new Date())
      this.focusListener = this.props.navigation.addListener("didFocus", this.loops.bind(this));
    } else {
      Alert.alert('Location Permission not allowed')
      this.props.navigation.navigate('Feed')
    }
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }
  
  render() {
    return (
      <View style={{backgroundColor:Color.lightBackground, flex:1}}>
        <View style={{flex:1,alignItems:'center'}}>
          <Text style={STYLES.title}>Run</Text>      
          <Text style={STYLES.text}>Distance: {Math.ceil(this.props.run.real_time_info.current_distance)} m</Text>
          <Text style={STYLES.text}>Timer: {hourMinuteSecondString(this.props.run.real_time_info.timer)}</Text>
          <Text style={STYLES.text}>Current Pace: {minuteSecondString(this.props.run.real_time_info.current_pace)}</Text>
          <Text style={STYLES.text}>Average Pace: {minuteSecondString(this.props.run.real_time_info.average_pace)}</Text>
        </View>

        <View style={{backgroundColor:Color.darkBackground, height: windowHeight * 0.20}}>
          <View style={{flex:1,flexDirection:'row', width:'100%', justifyContent:'space-evenly'}}>
            <TouchableOpacity
              style={[STYLES.circularButton, STYLES.smallButton]}
              onPress={()=>{
                this.props.navigation.navigate('OtherStats')
              }}
            >
              <IonIcon name="ios-stats" size={STYLES.smallIcon} color={Color.primaryColor}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[STYLES.circularButton, STYLES.largeButton]}
              onPress={()=>{
                this.props.pauseRun();
                this.props.navigation.navigate('Paused');
              }}
            >
              <FontAwesomeIcon name="pause" size={STYLES.largeIcon} color={Color.primaryColor}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[STYLES.circularButton, STYLES.smallButton]}
              onPress={()=>{
                this.props.navigation.navigate('Tracking');
              }}
            >
              <MaterialCommunityIcon name="map-marker" size={STYLES.smallIcon} color={Color.primaryColor}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, startRun, pauseRun, incrementTimer }, dispatch)
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunScreen);