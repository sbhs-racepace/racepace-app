import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput, Dimensions } from 'react-native';
import Button from "../components/Button"
import "../global.js"
import {Location,Permissions} from 'expo';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
 
class RouteTypeRadio extends React.Component {
  constructor(props) {
    super(props)
    this.radio_props = [
      {label: 'Default Route', value: 0 },
      {label: 'Scenic Route', value: 1 }
    ];
    this.state = {
      value:0
    }
  }

  render() {
    return (
      <View>
        <RadioForm
          radio_props={this.radio_props}
          initial={0}
          formHorizontal={false}
          labelHorizontal={true}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
    );
  }
}

const STYLES = StyleSheet.create({
  text_style: {
    fontSize: 20,
  },
  route_info : {
    borderWidth:1,
  },
  container: {
    borderWidth:1,
    padding:"3%",
    justifyContent:"space-evenly", 
    flexDirection:"column"
  },
  input_view: {
    borderWidth: 1,
    borderRadius:10,
    margin:"3%"
  },
  pace_view: {
    borderWidth: 1,
    borderRadius:10,
    flexDirection:"row",
    alignItems:"center",
    margin:"3%"
  },
})

export default class RunSetupScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      route_type : "default",
      start: "0,0",
      end: "0,0",
      goal_pace: {minutes: 0, seconds: 0},
      time: {minutes: 5, seconds: 0},
      distance: 0,
      points: 0,
      route: null,
    }
  }

  calculateTime(distance, pace) {
    let pace_minutes = pace.minutes
    let pace_seconds = pace.seconds
    let time = distance * pace_minutes * 60 + distance * pace_seconds // Time is in seconds
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - (minutes * 60))
    return {minutes:minutes, seconds:seconds}
  }

  async getRouteFromAddress(start,end) {
    console.log("Geolocation with "+start+","+end);
    console.log(await Location.geocodeAsync(end+","+global.region));
    let {latitude:s_lat, longitude:s_lon} = (await Location.geocodeAsync(start+","+global.region))[0];
    let startCoord = `${s_lat},${s_lon}`;
    let {latitude:e_lat, longitude:e_lon} = (await Location.geocodeAsync(end+","+global.region))[0];
    let endCoord = `${e_lat},${e_lon}`;
    console.log(start+"&"+end);

    if (start == end) {
      Alert.alert("Error","From location can't be same as to location");
    }
    else if (startCoord == endCoord) {
      //^This condition is met as both start and end have the city appended
      //The geocoding will ignore the part it can't understand and just read the city
      Alert.Alert("Error","Start or end position couldn't be understood");
    }
    else {
      this.getRouteFromCoords(startCoord,endCoord);
    }
  }

  getRouteFromCoords(start, end) {
    let url = `${global.serverURL}/api/route?start=${start}&end=${end}`;
    console.log("Getting route. URL:"+url);
    
    fetch(url,{
      method: "GET"
    })
    .catch(error => Alert.alert("Error connecting to server",error))
    .then(res => res.json())
    .then(res => {
        console.log("Got response from server:");
        console.log(res);
        if (!res.success) {
          Alert.Alert("Error",res.error);
        }
        else {
          this.setState({
            route: res.route,
            distance: Math.floor(res.dist/1000),
          });
        }
      },
      reason => Alert.alert("Error",reason)
    );
    let points = this.calculatePoints(this.state.distance, this.state.goal_pace)
    let time = this.calculateTime(this.state.distance, this.state.goal_pace)
    this.setState({points:points, time: time})
  }

  setupRoute(start, end) {
    let coordPattern = /\-?[0-9]+,\-?[0-9]+/
    if (coordPattern.test(start) && coordPattern.test(end)) {
      this.getRouteFromCoords(start,end)
    } else {
      this.getRouteFromAddress(start,end)
    }
  }

  calculatePoints(distance, pace) {
    return Math.floor(distance * 100 * Math.pow((1/pace.minutes),2))
  }
  
  render() {
    return(
      <View style={{flex:1}}>
        <View style={[STYLES.container, {flex:2}]}>
          <Text style={[STYLES.text_style,{textAlign:"center"}]}>Plan your route</Text>
          <TextInput 
            style={[STYLES.text_style,STYLES.input_view]} 
            placeholder="Start"
            onChangeText={start => {
              this.setState({ start: start });
            }}
          />
          <TextInput 
            style={[STYLES.text_style,STYLES.input_view]} 
            placeholder="End"
            defaultValue={this.props.navigation.state.params.name}
            onChangeText={end => {
              this.setState({ end: end });
            }}
          />
          <View style={STYLES.pace_view}>
            <TextInput 
            style={STYLES.text_style} 
              placeholder="minutes"
              defaultValue="5"
              onChangeText={minutes => {
                this.setState({ goal_pace: {minutes: minutes} });
              }}
              keyboardType="number-pad"
              returnKeyType="go"
            />
            <Text style={STYLES.text_style}>:</Text>
            <TextInput 
              style={STYLES.text_style} 
              placeholder="seconds"
              defaultValue="00"
              onChangeText={seconds => {
                this.setState({ goal_pace: {seconds: seconds} });
              }}
              returnKeyType="go" 
              keyboardType="number-pad"
            />
          </View>
          <Text style={[STYLES.text_style,{textAlign:"center"}]}>Select a route typing</Text>
          <RouteTypeRadio></RouteTypeRadio>
        </View>
        <View style={[STYLES.container, {flex:1}]}>
          <Text style={[STYLES.text_style,{textAlign:"center"}]}>Route Information</Text>
          <Text style={STYLES.text_style}>Time: {this.state.time.minutes} minutes {this.state.time.seconds} seconds</Text>
          <Text style={STYLES.text_style}>Total Distance: {this.state.distance}km</Text>
          <Text style={STYLES.text_style}>Points: {this.state.points} Pace-Points</Text>
        </View>
        <View style={{padding:"3%", borderWidth:1}}>
          <Button 
            text_style={{padding:"5%"}} 
            style={{borderRadius:10}} 
            text="Start Run"
            onPress={() => {this.setupRoute(this.state.start,this.state.end)}}
          />
        </View>
      </View>
    );
  }
}