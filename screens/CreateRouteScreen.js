// Jason Yu, Sunny Yan

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import {createAppContainer,createMaterialTopTabNavigator} from 'react-navigation';
import { CheckBox } from 'react-native-elements'
import Button from "../components/Button"
import "../global.js"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import TextInputCustom from '../components/TextInput';
import Color from '../constants/Color'
import { createRun, createRunRoute } from '../functions/action'
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
    margin:3,
  },
  title_style: {
    fontSize:30,
    fontFamily: 'Roboto',
    textAlign:"center",
    color: Color.textColor
  },
})

class RunSetupScreen extends React.Component {
  constructor(props) {
    super(props);
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

  async getRouteFromAddress(start,end) {
    let {latitude:s_lat, longitude:s_lon} = (await Location.geocodeAsync(start+","+global.region.name))[0];
    let startCoord = `${s_lat},${s_lon}`;
    let {latitude:e_lat, longitude:e_lon} = (await Location.geocodeAsync(end+","+global.region.name))[0];
    let endCoord = `${e_lat},${e_lon}`;

    if (start == end) {
      Alert.alert("Error","From location can't be same as to location");
    } else if (startCoord == endCoord) {
      Alert.alert("Error","Start or end position couldn't be understood");
    } else {
      this.getRouteFromCoords(startCoord,endCoord);
    }
  }

  async getRouteFromCoords(start, end) {
    let api_url = `${global.serverURL}/api/route?start=${start}&end=${end}`;
    let route_data = false
    await fetch(api_url,{
      method: "GET"
    })
    .catch(error => Alert.alert("Error connecting to server",error))
    .then(async res => {
      let res_data = await res.json()
      if (!res_data.success) {
        Alert.alert("Error",res_data.error);
      } else {
        route_data = res_data;
      }
    });
    return route_data;
  }

  generateRoute(start, end) {
    let coordPattern = /\-?[0-9]+,\-?[0-9]+/ // Checking for coords
    let coordinate_form = coordPattern.test(start) && coordPattern.test(end)
    if (coordinate_form) {
      return this.getRouteFromCoords(start,end)
    } else {
      return this.getRouteFromAddress(start,end)
    }
  }

  async generateRouteInfo() {
    let route_data = await this.generateRoute(this.state.start,this.state.end);
    if (route_data != false) {
      let route = route_data.route
      let distance = route_data.dist
      this.props.createRunRoute(route, this.state.real_time_tracking, distance, this.state.goal_pace);
      this.props.navigation.navigate("Information"); // Go To Run Information Screen
    } else {
      Alert.alert('Failure Generating Route')
    }
  }
  
  render() {
    return(
      <View style={[STYLES.container, {flex:1, backgroundColor:Color.lightBackground}]}>
        <TextInputCustom 
          placeholder="Start"
          defaultValue={this.state.start}
          onChangeText={start => {
            this.setState({ start: start });
          }}
        />
        <TextInputCustom 
          placeholder="End"
          defaultValue={this.props.navigation.state.params==undefined ? this.state.end : this.props.navigation.state.params.name}
          onChangeText={end => {
            this.setState({ end: end });
          }}
        />
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%'}}>
          <TextInputCustom 
            style={{width:'45%'}}
            placeholder="Minutes"
            onChangeText={minutes => {
              this.setState({ goal_pace: {minutes: minutes} });
            }}
            defaultValue={this.state.goal_pace.minutes}
            keyboardType="number-pad"
            returnKeyType="go"
          />
          <TextInputCustom 
            style={{width:'45%'}}
            placeholder="Seconds"
            onChangeText={seconds => {
              this.setState({ goal_pace: {seconds: seconds} });
            }}
            defaultValue={this.state.goal_pace.seconds}
            returnKeyType="go" 
            keyboardType="number-pad"
          />
        </View>
        <CheckBox
          containerStyle={{backgroundColor:Color.lightBackground, borderColor:Color.darkBackground, width:'80%'}}
          textStyle={{color:Color.textColor}}
          title='Real Time Tracking'
          checked={this.state.real_time_tracking}
          onPress={() => {this.setState({real_time_tracking:!this.state.real_time_tracking})}}
        />
        <Button 
          style={{borderRadius:10}} 
          text="Generate Route Info"
          onPress={() => {
            this.generateRouteInfo()
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createRunRoute, createRun }, dispatch)
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(RunSetupScreen);