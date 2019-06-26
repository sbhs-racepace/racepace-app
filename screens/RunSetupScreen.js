// Jason Yu, Sunny Yan

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Button from "../components/Button"
import "../global.js"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import TextInputCustom from '../components/TextInput';
import Color from '../constants/Color'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  container: {
    borderWidth:1,
    padding:"3%",
    justifyContent:"space-evenly", 
    flexDirection:"column",
    alignItems:'center'
  },
  text_style: {
    color: Color.textColor,
    fontSize:15,
  },
  title_style: {
    fontSize:30,
    fontFamily: 'Roboto',
    textAlign:"center",
    color: Color.textColor
  },
})

export default class RunSetupScreen extends React.Component {
  constructor(state) {
    super(state);
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

  calculateTime(distance, pace) {
    let pace_minutes = pace.minutes
    let pace_seconds = pace.seconds
    let time = distance * pace_minutes * 60 + distance * pace_seconds // Time is in seconds
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - (minutes * 60))
    return {minutes:minutes, seconds:seconds}
  }

  calculateCaloriesBurnt(distance) {
    let weight = 60
    let calories = distance * weight * 1.036
    return Math.floor(calories)
  }

  async getRouteFromAddress(start,end) {
    console.log("Geolocation with "+start+","+end);
    let {latitude:s_lat, longitude:s_lon} = (await Location.geocodeAsync(start+","+global.region.name))[0];
    let startCoord = `${s_lat},${s_lon}`;
    let {latitude:e_lat, longitude:e_lon} = (await Location.geocodeAsync(end+","+global.region.name))[0];
    let endCoord = `${e_lat},${e_lon}`;
    console.log(start+"&"+end);

    if (start == end) {
      Alert.alert("Error","From location can't be same as to location");
    }
    else if (startCoord == endCoord) {
      //^This condition is met as both start and end have the city appended
      //The geocoding will ignore the part it can't understand and just read the city
      Alert.alert("Error","Start or end position couldn't be understood");
    }
    else {
      this.getRouteFromCoords(startCoord,endCoord);
    }
  }

  async getRouteFromCoords(start, end) {
    let api_url = `${global.serverURL}/api/route?start=${start}&end=${end}`;
    await fetch(api_url,{
      method: "GET"
    })
    .catch(error => Alert.alert("Error connecting to server",error))
    .then(async res => await res.json())
    .then(res => {
        console.log("Got response from server:");
        console.log(res);
        if (!res.success) {
          Alert.alert("Error",res.error);
        }
        else {
          this.setState({
            route: res.route,
            distance: (res.dist/1000).toFixed(3),
          });
        }
      }
    );
    let points = this.calculatePoints(this.state.distance, this.state.goal_pace);
    let time = this.calculateTime(this.state.distance, this.state.goal_pace);
    let calories = this.calculateCaloriesBurnt(this.state.distance);
    this.setState({points:points, time: time, calories: calories});
  }

  setupRoute(start, end) {
    let coordPattern = /\-?[0-9]+,\-?[0-9]+/ // Checking for coords
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
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="position" style={{backgroundColor: Color.lightBackground}}>
        <ScrollView contentContainerStyle={{backgroundColor: Color.lightBackground}}>
          <View style={[STYLES.container, {height:windowHeight * 0.8}]}>
            <Text style={STYLES.title_style}>Plan your route</Text>
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
            <View style={{flexDirection:'row'}}>
              <TextInputCustom 
                style={{width:"40%"}}
                placeholder="minutes"
                onChangeText={minutes => {
                  this.setState({ goal_pace: {minutes: minutes} });
                }}
                defaultValue={this.state.goal_pace.minutes}
                keyboardType="number-pad"
                returnKeyType="go"
              />
              <TextInputCustom 
                style={{width:"40%"}}
                placeholder="seconds"
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
              onPress={() => {this.setupRoute(this.state.start,this.state.end)}}
            />
          </View>
          <View style={[STYLES.container, {height:windowHeight * 0.5, alignItems:'flex-start'}]}>
            <Text style={STYLES.title_style}>Route Information</Text>
            <Text style={STYLES.text_style}>Time: {this.state.time.minutes} minutes {this.state.time.seconds} seconds</Text>
            <Text style={STYLES.text_style}>Total Distance: {this.state.distance}km</Text>
            <Text style={STYLES.text_style}>Calories Burnt/Kilojoules Burnt: {this.state.calories} Cal/ {Math.floor(this.state.calories *4.184)} Kj</Text>
            <Text style={STYLES.text_style}>Points: {this.state.points}</Text>
          </View>
          <Button 
            text="Start Run"
            style={{borderRadius:10, alignSelf:'center'}} 
            onPress={() => this.props.navigation.navigate("RunManager")} // ,{route: this.state.route, start:this.state.start, end: this.state.end}
            disabled={!this.state.route}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}