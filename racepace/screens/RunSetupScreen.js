import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput, Dimensions } from 'react-native';
import Button from "../components/Button"
import "../global.js"
import {Location,Permissions} from 'expo';
import RadioForm from 'react-native-simple-radio-button';

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
      route_type : 0,
      start: "-33.878363,151.104490", //Burwood
      end: "-33.912466, 151.103120", //Campsi
      goal_pace: {minutes: "5", seconds: "0"},
      time: {minutes: 0, seconds: 0},
      distance: 0,
      points: 0,
      calories: 0,
      route: null,
    }
    this.radio_props = [
      {label: 'Default Route', value: 0 },
      {label: 'Scenic Route', value: 1 }
    ];
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

  async getRouteFromCoords(start, end) {
    let url = `${global.serverURL}/api/route?start=${start}&end=${end}`;
    console.log("Getting route. URL:"+url);
    
    await fetch(url,{
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
            distance: (res.dist/1000).toFixed(3),
          });
        }
      },
      reason => Alert.alert("Error",reason)
    );
    let points = this.calculatePoints(this.state.distance, this.state.goal_pace)
    let time = this.calculateTime(this.state.distance, this.state.goal_pace)
    let calories = this.calculateCaloriesBurnt(this.state.distance)
    this.setState({points:points, time: time, calories: calories})
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
    console.log(this.props.navigation.state)
    return(
      <View style={{flex:1}}>
        <View style={[STYLES.container, {flex:2}]}>
          <Text style={[STYLES.text_style,{textAlign:"center"}]}>Plan your route</Text>
          <TextInput 
            style={[STYLES.text_style,STYLES.input_view]}
            placeholder="Start"
            defaultValue={this.state.start}
            onChangeText={start => {
              this.setState({ start: start });
            }}
          />
          <TextInput 
            style={[STYLES.text_style,STYLES.input_view]}
            placeholder="End"
            defaultValue={this.props.navigation.state.params==undefined ? this.state.end : this.props.navigation.state.params.name}
            onChangeText={end => {
              this.setState({ end: end });
            }}
          />
          <View style={STYLES.pace_view}>
            <TextInput 
            style={STYLES.text_style} 
              placeholder="minutes"
              onChangeText={minutes => {
                this.setState({ goal_pace: {minutes: minutes} });
              }}
              defaultValue={this.state.goal_pace.minutes}
              keyboardType="number-pad"
              returnKeyType="go"
            />
            <Text style={STYLES.text_style}>:</Text>
            <TextInput 
              style={STYLES.text_style} 
              placeholder="seconds"
              onChangeText={seconds => {
                this.setState({ goal_pace: {seconds: seconds} });
              }}
              defaultValue={this.state.goal_pace.seconds}
              returnKeyType="go" 
              keyboardType="number-pad"
            />
          </View>
          <Text style={[STYLES.text_style,{textAlign:"center"}]}>Select a route typing</Text>
          <RadioForm
            radio_props={this.radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            onPress={(route_type) => {this.setState({route_type:route_type})}}
          />
          <Button 
            style={{borderRadius:10,padding:"2%"}} 
            text="Generate Route Info"
            onPress={() => {this.setupRoute(this.state.start,this.state.end)}}
          />
        </View>
        <View style={[STYLES.container, {flex:1}]}>
          <Text style={[STYLES.text_style,{textAlign:"center"}]}>Route Information</Text>
          <Text style={STYLES.text_style}>Time: {this.state.time.minutes} minutes {this.state.time.seconds} seconds</Text>
          <Text style={STYLES.text_style}>Total Distance: {this.state.distance}km</Text>
          <Text style={STYLES.text_style}>Calories Burnt/Kilojoules Burnt: {this.state.calories} Cal/ {Math.floor(this.state.calories *4.184)} Kj</Text>
          <Text style={STYLES.text_style}>Points: {this.state.points}</Text>
        </View>
        <View style={STYLES.container}>
          <Button 
            style={{borderRadius:10,padding:"2%"}} 
            text="Start Run"
            onPress={() => {
            }}
          />
        </View>
      </View>
    );
  }
}