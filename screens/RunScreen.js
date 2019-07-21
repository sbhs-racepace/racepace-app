// Jason Yu

import React from 'react';
import { Platform, StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Color from '../constants/Color.js'
import "../global.js"
import { startRun, addLocationPacket, pauseRun } from '../functions/run_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
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
      pace: {minutes:'--', seconds:'--'},
      distance: 0,
      time: {hour:0, min:0, sec: 0},
    }
  }


  zFill(num) {
    if (num < 10) {
      return "0"+num
    }
    else {
      return num
    }
  }

incrementTimer() {
    let {hour,min,sec} = this.state.time;
    sec++;
    if (sec == 60) {
        min++;
        sec=0;
    }
    if (min == 60) {
        hour++;
        min=0;
    }
    this.setState({time: {hour,min,sec}});
}

  async timerUpdateLoop() {
    if (this.props.run.run_info.active == true) {
      this.incrementTimer();
      let timerId = setTimeout(this.timerUpdateLoop.bind(this), 1000);
    } 
  }

  async locationUpdate() {
    let location_packet = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    })
    if (this.props.run.run_info.real_time_tracking == true) this.props.user.socket.emit('location_update',json_location_packet);
    let json_location_packet = {latitude: location_packet.coords.latitude, longitude: location_packet.coords.longitude, speed: location_packet.coords.speed, timestamp: location_packet.timestamp}
    this.props.addLocationPacket(json_location_packet)
  }

  async locationUpdateLoop() {
    if (this.props.run.run_info.active == true) {
      if (this.props.run.run_info.real_time_tracking == true) this.props.user.socket.emit('start_run', start_time);
      this.locationUpdate()
      let timerId = setTimeout(this.locationUpdateLoop.bind(this), 3000);
    } 
  }

  loops() {
    this.locationUpdateLoop();
    this.timerUpdateLoop();
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
          <Text style={STYLES.text}>Distance: {this.props.run.real_time_info.distance}m</Text>
          <Text style={STYLES.text}>Timer: {this.state.time.hour==0 ? "" : this.state.time.hour+":"}{this.zFill(this.state.time.min)}:{this.zFill(this.state.time.sec)}</Text>
          <Text style={STYLES.text}>Current Pace: {this.props.run.real_time_info.current_pace.minutes} :{this.props.run.real_time_info.current_pace.seconds}</Text>
          <Text style={STYLES.text}>Average Pace: {this.props.run.real_time_info.average_pace.minutes} :{this.props.run.real_time_info.average_pace.seconds}</Text>
        </View>

        <View style={{backgroundColor:Color.darkBackground, height: windowHeight * 0.20}}>
          <View style={{flex:1,flexDirection:'row', width:'100%', justifyContent:'space-evenly'}}>
            <TouchableOpacity
              style={[STYLES.circularButton, STYLES.smallButton]}
              onPress={()=>{
                this.props.navigation.navigate('OtherStats')
                this.props.pauseRun();
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
                this.props.pauseRun();
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
  return bindActionCreators({ addLocationPacket, startRun, pauseRun }, dispatch)
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunScreen);