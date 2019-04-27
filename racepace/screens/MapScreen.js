import React from "react";
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { Alert, View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import Button from '../components/Button'
import {Location,Permissions} from 'expo';
import "../global"

const LATITUDE_DELTA = 0.0922*1.5
const LONGITUDE_DELTA = 0.0421*1.5
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  header: {
    top:20,
    width:"90%",
    height:30,
    zIndex:2,
    elevation: 2,
    flexDirection:"row",
    alignItems:"center"
  },
  search: {
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 3,
    backgroundColor: "white",
    width:"80%",
    height:30,
  },
  search_btn: {
    width:"10%",
    height: "100%",
    borderRadius: 0.08*windowWidth,
    borderWidth: 1,
    backgroundColor:"white"
  },
  search_img: {
    width:"100%",
    height:"100%",
    borderRadius: 0.08*windowWidth,
  },
  compass_btn: {
    position: "absolute",
    width:40,
    height:40,
    borderRadius: 20,
    borderWidth:1,
    zIndex: 2,
    top: 0.75*windowHeight,
    right: 5,
  },
  compass_img: {
    width:"100%",
    height:"100%",
    borderRadius: 20,
    borderColor:"white",
  }
})

function generateMapStyle() {
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
      moveToCurrentLoc: false,
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
      region: region,
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

  async goToCurrent() {
    try {
    Location.getCurrentPositionAsync({accuracy:4,maximumAge:5000,timeout:5000}).then(
      location => {this.setState(prevState => ({
        region: {
          ...prevState.region, //Copy in other parts of the object
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      }))},
      reason => Alert.alert("Error","Location tracking failed. Error: "+reason)
    ).catch(error => Alert.alert("Error","Location tracking failed. Error: "+error))
    }
    catch(error) {
      Alert.alert("Error","Location tracking failed. Error: "+error)
    }
  }

  runHere(name, coords) {
    if (!name) {
      Alert.alert("Error","Please enter an address in the search box")
    }
    this.props.navigation.navigate("Run", {
      name: name,
      coords: coords
    })
  }

  render() {
    return (
      <View style={{alignItems:"center"}}>
        <View style={STYLES.header}>
          <TextInput 
            placeholder="Search"
            style = {STYLES.search}
            onChangeText = {text=>this.setState({searchStr:text})}
          />
          <Button img={require("../assets/icons/search.png")}
            style={STYLES.search_btn}
            img_style={STYLES.search_img}
            onPress={()=>this.goToLocation(this.state.searchStr)}
          />
          <Button img={require("../assets/icons/run.png")}
            style={STYLES.search_btn}
            img_style={STYLES.search_img}
            onPress={()=>this.runHere(this.state.searchStr,this.state.searchLoc)}
          />
        </View>
        <MapView
          style={generateMapStyle()}
          showsUserLocation={true}
          showsMyLocationButton={false}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
        >
          {this.state.showSearch &&
            <Marker
              coordinate={this.state.searchLoc}
              pinColor="#9900FF"
            />
          }
        </MapView>
        <Button img={require("../assets/icons/compass.jpg")}
          style={STYLES.compass_btn}
          img_style={STYLES.compass_img}
          onPress={()=>{
          this.setState({moveToCurrentLoc: true});
          this.goToCurrent();}}
        />
      </View>
    );
  }
}