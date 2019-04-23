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
    // placeholderTextColor: "#fffe"
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
      showSearch: false,
      searchStr: "",
      searchLoc: {
        latitude: -33.9672563,
        longitude: 151.1002119,
      }
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
    if (!loc) {
      Alert.alert("Error","Input was blank.")
      return 0;
    }
    let lat,lon
    try {
      let {latitude, longitude} = (await Location.geocodeAsync(loc+","+global.region.name))[0];
      lat = latitude
      lon = longitude
    }
    catch {
      Alert.alert("Error","Input couldn't be understood.")
      return 0;
    }

    if (lat != global.region.coords[0] || lon != global.region.coords[1]) {
      this.setState(prevState => ({
        region: {
          ...prevState.region, //Copy in other parts of the object
          latitude: lat,
          longitude: lon
        },
        searchLoc: {
          latitude: lat,
          longitude: lon,
        },
        showSearch: true,
      }))
    }
    else {
      Alert.alert("Error","Input couldn't be understood.")
    }
  }

  render() {
    return (
      <View style={{alignItems:"center"}}>
        <View style={{flexDirection: "row", zIndex:2, alignItems:"center"}}>
          <TextInput 
            placeholder="Search"
            style = {StyleSheet.flatten([STYLES.header,STYLES.search])}
            onChangeText = {text=>this.setState({searchStr:text})}
          />
          <Button img={require("../assets/icons/search.png")}
            style={{height:30,width:30,borderRadius:15,borderWidth:1}}
            img_style={{height:30,width:30,borderRadius:15,borderWidth:1}}
            onPress={()=>this.goToLocation(this.state.searchStr)}
          />
        </View>
        <MapView
          style={generateMapStyle()}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
          {this.state.showSearch &&
            <Marker
              coordinate={this.state.searchLoc}
              pinColor="#9900FF"
            />
          }
        </MapView>
      </View>
    );
  }
}