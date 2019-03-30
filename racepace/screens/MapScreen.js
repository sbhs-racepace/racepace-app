import React from "react";
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { Alert, View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import Button from '../components/Button'
import {Location,Permissions} from 'expo';
import "../global"
//http://racepace-sbhs.herokuapp.com/api/route?start=-33.91129113451052,151.11011066055426&end=-37.8431826,145.12120
let { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.0922*1.5
const LONGITUDE_DELTA = 0.0421*1.5

const STYLES = StyleSheet.create({
  general: {
    width:"80%",
    marginTop: 5
  },
  input: {
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    marginTop: 5,
    paddingLeft: 3,
    width:"80%",
  },
})

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -33.9672563,
        longitude: 151.1002119,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      start: "Campsie",
      end: "Canterbury",
      viewHeight: 0,
      moveToCurrentLoc: true,
    };
    
    let start = '-33.9672563,151.1002120'
    let end   = '-33.9619925,151.1059193'
    this.getRouteFromCoords(start, end);
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
            markers: res.route
          });
        }
      },
      reason => Alert.alert("Error",reason)
    );
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

  componentDidMount() {
    let {status} = Permissions.askAsync(Permissions.LOCATION);
    if (status) { //Check whether permission granted
      Location.watchPositionAsync(
        {
          accuracy: 4, //Accurate to 10m
          timeInterval: 5000,
          distanceInterval: 10
        },
        (location) => {
          //Move to current location on map
          if (this.state.moveToCurrentLoc) {
            this.setState(prevState => ({
              region: {
                ...prevState.region, //Copy in other parts of the object
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }
            }))
          }
        }
      )
    }
  }

  onRegionChange = (region) => {
    this.setState({
      mapRegion: region,
      lastLat: region.latitude || this.state.lastLat,
      lastLong: region.longitude || this.state.lastLong,
      moveToCurrentLoc: false
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  generateStyles() {
    return StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
        top: 80,
        height: 600
      },
    });
  }

  render () {
    return(
      <View style={{alignItems:"center"}}>
        <TextInput 
          placeholder="From"
          defaultValue = "Campsie"
          style = {STYLES.input}
          placeholderTextColor="rgba(225,225,225,0.8)"
          onChangeText={(text)=>this.setState({
            start: text
          })}
        />
        <TextInput
          placeholder="To"
          style = {STYLES.input}
          defaultValue = "Canterbury"
          placeholderTextColor="rgba(225,225,225,0.8)"
          onChangeText={(text)=>this.setState({
            end: text
          })}
        />
        <Button text="Generate"
          style = {STYLES.general}
          onPress={() => {
            this.getRouteFromAddress(this.state.start,this.state.end)
        }}
        />
        <MapView
          style={this.generateStyles().map}
          showsUserLocation={true}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
          <Polyline
            coordinates={this.state.markers}
            strokeColor="#9900FF"
            strokeWidth={6}
          />
        </MapView>
      </View>
    );
  }
}
