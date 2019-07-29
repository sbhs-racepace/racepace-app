// Jason Yu, Sunny Yan

import React from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, Platform, ScrollView } from 'react-native';
import {createAppContainer,createMaterialTopTabNavigator} from 'react-navigation';
import TextInput from '../components/TextInput'
import { CheckBox } from 'react-native-elements'
import Button from "../components/Button"
import "../global.js"
import Constants from 'expo-constants';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Color from '../constants/Color'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { createRun, createRunRoute, changeEnd, changeStart, changeLocationInput } from '../functions/run_action'
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
      startAtCurrent: true,
      goal_pace: {minutes: "5", seconds: "0"},
      real_time_tracking: false,
      locationInputs:[]
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
      coord = await this.addressToCoord(location_reference);
      if (coord == undefined) {
        Alert.alert('Name could not be understood')
        return false;
      } 
      name = location_reference;
    } else {
      coord = this.coordStringToCoord(location_reference);
      let floatCoord = {latitude:parseFloat(coord.latitude), longitude:parseFloat(coord.longitude)}
      name = (await Location.reverseGeocodeAsync(floatCoord))[0].name
    }
    return {coord, name};
  }

  async getCurrentLocation() {
    let coords = false;
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
      this.props.navigation.navigate('Feed')
    } else {
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 5000,
        timeout: 5000,
      })
      .then(
        async location => {
          coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
          return coords;
        }
      )
      .catch(error =>
        Alert.alert('Error', 'Location tracking failed. Error: ' + error)
      );
    }
    return coords;
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

  async generateMultiRoute(waypoints) {
    let api_comma = '%2C'
    let waypoint_strings = waypoints.map(location=>`${location.latitude}${api_comma}${location.longitude}`)
    waypoint_string = '?waypoints=' + waypoint_strings.join('&waypoints=') // Joining values
    let api_url = `${global.serverURL}/api/route/multiple${waypoint_string}`;
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
    let start = this.props.run.run_setup.start
    let end = this.props.run.run_setup.end
    let start_packet = null
    if (start == 'Current Location' && this.state.startAtCurrent == true) {
      start_packet = {name: start, coord: (await this.getCurrentLocation())} // Current Location cannot be retrieved on simulator
    } else {
      start_packet = await this.createLocationPacket(start);
      if (start_packet == false) {
        return 0;
      }
    }
    let end_packet = await this.createLocationPacket(end);
    if (end_packet == false) {
      return 0;
    }

    if (start == '' || end == '') {
      Alert.alert('Incomplete fields')
    } else {
      let route_data = false;
      if (this.props.run.run_setup.locations.length > 0) {
        let location_packets = this.props.run.run_setup.locations.map(async location =>  await this.createLocationPacket(location))
        let way_points = [start_packet, ...location_packets, end_packet]
        route_data = await this.generateMultiRoute(way_points);
      } else {
        route_data = await this.generateRoute(start_packet.coord,end_packet.coord);
      }
      if (route_data != false) {
        let route = route_data.route
        let distance = route_data.distance
        this.props.createRunRoute(route, start_packet, end_packet, this.state.real_time_tracking, distance, this.state.goal_pace);
        this.props.navigation.navigate("Information"); // Go To Run Information Screen
      } else {
        Alert.alert('Failure Generating Route')
      }
    }
    this.setState({loading:false});
  }

  setToCurrentLocation() {
    this.setState({startAtCurrent:true})
    this.props.changeStart('Current Location')
  }

  addInput() {
    let index = this.state.locationInputs.length
    this.props.changeLocationInput('', index);
    this.setState({
      locationInputs: [
        ...this.state.locationInputs,
        (
          <View style={{flexDirection:'row', alignItems:'center', marginBottom: 20, width:"90%", justifyContent:'space-between'}}>
          <TextInput
            placeholder="Waypoint"
            style={{width:windowWidth*0.7}}
            onChangeText={locationText => {
              this.props.changeLocationInput(locationText, index);
            }}
          />
            <View style={{width:windowWidth*0.1}}></View>
          </View>
        )
      ]
    })
  }

  async removeInput() {
    this.setState(prevState=>{
      prevState.locationInputs.pop()
      return {locationInputs: prevState.locationInputs}
    })
  }

  render() {
    let locationInputs = this.state.locationInputs;
    return(
      <View style={[STYLES.container, {flex:1, backgroundColor:Color.lightBackground}]}>
        <ScrollView contentContainerStyle={{alignItems:'center'}}>

          <TouchableOpacity
            style={{width:"90%", backgroundColor:Color.lightBackground2, flexDirection:'row', alignItems:'center', height:50, justifyContent:'space-evenly', marginBottom: 20, marginTop:20, borderRadius: 5}}
            onPress={() => this.setToCurrentLocation()}
          >
            <FontAwesomeIcon name="location-arrow" size={20} color={Color.primaryColor}/>
            <Text style={[STYLES.text_style,{fontSize:14}]}>Set Start to Current Location</Text>
          </TouchableOpacity>
          <View style={{width:'90%'}}>
            <Text style={[STYLES.text_style]}>Route</Text>
          </View>

          <View style={{flexDirection:'row', alignItems:'center', marginBottom: 20, width:"90%", justifyContent:'space-between'}}>
            <TextInput
              style={{width:windowWidth*0.7}}
              placeholder="Start"
              value={this.props.run.run_setup.start}
              onChangeText={start => {
                this.props.changeStart(start);
              }}
            />
            <View style={{width:windowWidth*0.1}}>
              <TouchableOpacity
                onPress={()=>{this.addInput()}}
              >
                <FontAwesomeIcon name="plus" size={30} color={Color.primaryColor}/>
              </TouchableOpacity>
            </View>
          </View>
          {locationInputs.map(input=>input)}
          <View style={{flexDirection:'row', alignItems:'center', marginBottom: 20, width:"90%", justifyContent:'space-between'}}>
            <TextInput
              placeholder="End"
              style={{width:windowWidth*0.7}}
              value={this.props.run.run_setup.end}
              onChangeText={end => {
                this.props.changeEnd(end);
              }}
            />
            <View style={{width:windowWidth*0.1}}>
              <TouchableOpacity
                onPress={()=>{ this.removeInput()}}
              >
                <FontAwesomeIcon name="minus" size={30} color={Color.primaryColor}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{alignItems:'center', flexDirection:'column', width:'100%'}}>
            <View style={{width:'90%'}}>
              <Text style={[STYLES.text_style]}>Goal Pace</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', width:'90%', marginBottom:20}}>
              <TextInput
                style={{width:'45%'}}
                placeholder="Minutes"
                onChangeText={minutes => this.setState({goal_pace: {minutes: minutes}})}
                defaultValue={this.state.goal_pace.minutes}
                keyboardType="number-pad"
                returnKeyType="go"
              />
              <TextInput
                style={{width:'45%'}}
                placeholder="Seconds"
                onChangeText={seconds => this.setState({goal_pace: {seconds: seconds}})}
                defaultValue={this.state.goal_pace.seconds}
                returnKeyType="go"
                keyboardType="number-pad"
              />
            </View>

            {/* <CheckBox
              containerStyle={{backgroundColor:Color.lightBackground2, borderColor:Color.darkBackground, width:'90%', height:50, borderRadius:5,}}
              textStyle={{color:Color.textColor}}
              title='Enable Real Time Tracking'
              checked={this.state.real_time_tracking}
              onPress={() => {this.setState({real_time_tracking:!this.state.real_time_tracking})}}
            /> */}
          </View>
        </ScrollView>
        <Button
          style={{borderRadius:10}}
          text="Generate Route Info"
          disabled={this.state.loading}
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
  return bindActionCreators({ createRunRoute, createRun, changeEnd, changeStart, changeLocationInput }, dispatch)
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(RunSetupScreen);
