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
          <Text style={STYLES.text_style}>Goal Pace: {this.props.run_info.goal_pace.minutes} minutes {this.props.run_info.goal_pace.seconds} seconds</Text>
          <Text style={STYLES.text_style}>Time: {this.props.run_info.estimated_time.minutes} minutes {this.props.run_info.estimated_time.seconds} seconds</Text>
          <Text style={STYLES.text_style}>Total Distance: {this.props.run_info.estimated_distance}km</Text>
          <Text style={STYLES.text_style}>Kilojoules Burnt: {this.props.run_info.estimated_energy} Kj</Text>
          <Text style={STYLES.text_style}>Points: {this.props.run_info.points}</Text>
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