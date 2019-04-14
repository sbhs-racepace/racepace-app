import React from "react";
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { Alert, View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import Button from '../components/Button'
import {Location,Permissions} from 'expo';
import "../global"

const LATITUDE_DELTA = 0.0922*1.5
const LONGITUDE_DELTA = 0.0421*1.5

const STYLES = StyleSheet.create({
  header: {
    top:5,
    width:"80%",
    height:30,
    zIndex:2,
  },
  search: {
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 3,
    backgroundColor: "white",
    placeholderTextColor: "#fffe"
  }
})

function generateMapStyle() {
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  return {
    ...StyleSheet.absoluteFillObject,
    width: windowWidth,
    height: windowHeight,
    zIndex: 1,
  }
}

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
      viewHeight: 0,
      moveToCurrentLoc: true,
    };
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

  async goToLocation(loc) {
    try {
      let {latitude, longitude} = (await Location.geocodeAsync(loc+","+global.region.name))[0];
    }
    catch {
      Alert.Alert("Error","Input couldn't be understood.")
      return 0;
    }
    if ([latitude, longitude] != global.region.coords) {
      console.log("test")
      this.setState(prevState => ({
        region: {
          ...prevState.region, //Copy in other parts of the object
          latitude: latitude,
          longitude: longitude
        }
      }))
    }
    else {
      console.log("Fail")
      Alert.Alert("Error","Input was blank or couldn't be understood.")
    }
  }

  render() {
    return (
      <View style={{alignItems:"center"}}>
        <TextInput 
          placeholder="Search"
          style = {StyleSheet.flatten([STYLES.header,STYLES.search])}
          onSubmitEditing={event=>this.goToLocation(event.nativeEvent.text)}
        />
        <MapView
          style={generateMapStyle()}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
          <Polyline
            coordinates={global.dispRoute.markers}
            strokeColor="#9900FF"
            strokeWidth={6}
          />
        </MapView>
      </View>
    );
  }
}