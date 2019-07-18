// Jason Yu, Sunny Yan

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput, Dimensions, KeyboardAvoidingView, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Button from "../components/Button"
import BackButtonHeader from '../components/BackButtonHeader'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import TextInputCustom from '../components/TextInput';
import Color from '../constants/Color'
import { startRun, addLocationPacket } from '../functions/run_action'
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
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <View style={{flex:1, backgroundColor: Color.lightBackground}}>
        <BackButtonHeader
          title="Route Information"
          onPress={this.props.navigation.goBack}
        />
        <View style={[STYLES.container, {alignItems:'center', justifyContent:'space-around', flex:1,}]}>
          <Image source={require('../assets/map.png')} style={STYLES.routePic} />
          <Text style={STYLES.title_style}>Route Stats</Text>
          <Text style={STYLES.text_style}>Goal Pace: {this.props.run.run_info.goal_pace.minutes} : {this.props.run.run_info.goal_pace.seconds}</Text>
          <Text style={STYLES.text_style}>Duration: {this.props.run.run_info.estimated_duration.minutes} : {this.props.run.run_info.estimated_duration.seconds}</Text>
          <Text style={STYLES.text_style}>Total Distance: {this.props.run.run_info.estimated_distance}m</Text>
          <Text style={STYLES.text_style}>Kilojoules Burnt: {this.props.run.run_info.estimated_energy} Kj</Text>
          <Text style={STYLES.text_style}>Points: {this.props.run.run_info.points}</Text>
        </View>

        <Button 
          text="Save Route"
          style={{borderRadius:10, alignSelf:'center'}} 
          onPress={() => {
            this.props.navigation.navigate("SaveRoute");
          }}
        />

        
        <Button 
          text="Start Run"
          style={{borderRadius:10, alignSelf:'center'}} 
          onPress={() => {
            this.props.startRun();
            this.props.navigation.navigate("RunManager");
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, startRun }, dispatch)
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunInformationScreen);