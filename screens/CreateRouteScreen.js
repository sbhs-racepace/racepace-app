// Jason Yu, Sunny Yan

import React from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import {createAppContainer,createMaterialTopTabNavigator} from 'react-navigation';
import TextInput from '../components/TextInput'
import { CheckBox } from 'react-native-elements'
import Button from "../components/Button"
import "../global.js"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Color from '../constants/Color'
import { createRun, createRunRoute } from '../functions/run_action'
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
      real_time_tracking: false,
    }
  }

  async addressToCoord(address) {
    let location = (await Location.geocodeAsync(address+","+global.region.name))[0];
    return location;
  }

  coordStringToCoord(coordString) {
    let [latitude, longitude] = coordString.split(",");
    return { latitude, longitude };
  }

  async createLocationPacket(location_reference) {
    // Creates location packet with name and location. Takes in coord or address
    let coordPattern = /\-?[0-9]+,\-?[0-9]+/ // Checking for coords
    let coord, name = null;
    if (coordPattern.test(location_reference) == false) {
      coord = this.addressToCoord(location_reference);
      name = location_reference;
    } else {
      coord = this.coordStringToCoord(location_reference);
      let floatCoord = {latitude:parseFloat(coord.latitude), longitude:parseFloat(coord.longitude)}
      name = (await Location.reverseGeocodeAsync(floatCoord))[0].name
    }
    return {coord, name};
  }

  async generateRoute(start_coord, end_coord) {
    let start_string = `${start_coord.latitude},${start_coord.longitude}`;
    let end_string = `${end_coord.latitude},${end_coord.longitude}`;
    let api_url = `${global.serverURL}/api/route?start=${start_string}&end=${end_string}`;
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


  async generateRouteInfo() {
    let start_packet = await this.createLocationPacket(this.state.start);
    let end_packet = await this.createLocationPacket(this.state.end);
    let route_data = await this.generateRoute(start_packet.coord,end_packet.coord);
    if (route_data != false) {
      let route = route_data.route
      let distance = route_data.dist
      this.props.createRunRoute(route, start_packet, end_packet, this.state.real_time_tracking, distance, this.state.goal_pace);
      this.props.navigation.navigate("Information"); // Go To Run Information Screen
    } else {
      Alert.alert('Failure Generating Route')
    }
	  this.setState({loading:false});
  }
  
  render() {
    return(
      <View style={[STYLES.container, {flex:1, backgroundColor:Color.lightBackground}]}>
        <TextInput 
          placeholder="Start"
          defaultValue={this.state.start}
          onChangeText={start => {
            this.setState({ start: start });
          }}
        />
        <TextInput 
          placeholder="End"
          defaultValue={this.props.navigation.state.params==undefined ? this.state.end : this.props.navigation.state.params.name}
          onChangeText={end => {
            this.setState({ end: end });
          }}
        />
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%'}}>
          <TextInput 
            style={{width:'45%'}}
            placeholder="Minutes"
            onChangeText={minutes => {
              this.setState({ goal_pace: {minutes: minutes} });
            }}
            defaultValue={this.state.goal_pace.minutes}
            keyboardType="number-pad"
            returnKeyType="go"
          />
          <TextInput 
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
			      this.setState({loading:true}, this.generateRouteInfo.bind(this))
          }}
        >
		  {this.state.loading && (
		    <ActivityIndicator
			  animating={true}
			  color="white"
			  size="large"
			/>
		  )}
		</Button>
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