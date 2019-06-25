// Jason Yu Sunny Yan

import React from 'react';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { Alert, View, Text, TextInput, StyleSheet, Dimensions, Platform, } from "react-native";
import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import "../global";
import Button from '../components/Button';
import Timer from '../components/Timer';

const LATITUDE_DELTA = 0.0922 * 1.5;
const LONGITUDE_DELTA = 0.0421 * 1.5;
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  header: {
    top: 20,
    width: '90%',
    height: 40,
    zIndex: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent:"center",
  },
  header_text: {
    backgroundColor: 'white',
    fontSize: 16,
    flexWrap: 'wrap',
    flexShrink: 1,
    flex: 1,
  },
  search: {
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 3,
    backgroundColor: 'white',
    width: '80%',
    height: 30,
  },
  search_btn: {
    width: 0.1 * windowWidth,
    height: 0.1 * windowWidth,
    borderRadius: 0.05 * windowWidth,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  search_img: {
    width: '100%',
    height: '100%',
    borderRadius: 0.08 * windowWidth,
  },
  compass_btn: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    zIndex: 2,
    top: 0.75 * windowHeight,
    right: 5,
  },
  compass_img: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderColor: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: windowWidth,
    height: windowHeight,
    zIndex: 1,
  }
});

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
      showSaveDialog: false,
      searchStr: '',
      searchLoc: {
        latitude: -33.9672563,
        longitude: 151.1002119,
      },
      pace: {minutes:'-', seconds:'-'},
      distance: 0,
    };
  }

  async updateRunInfo() {
    let data = {'period': 5}
    let pace_url = global.serverURL + '/api/get_run_info'
    fetch(pace_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Authorization': global.login_status.token,
      })
    })
    .then(async res => await res.json()).then(data => { 
      let pace = data.pace
      let distance = data.distance
      this.setState({'pace':pace,'distance':distance})
    });
  }

  userTracking(location) {
    this.setState(prevState => ({
      region: {
        ...prevState.region, //Copy in other parts of the object
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    }))
  }

  defaultLocationAsync() {
    let { status } = Permissions.askAsync(Permissions.LOCATION);
    if (status) { //Check whether permission granted
      Location.watchPositionAsync(
        {
          accuracy: 4, //Accurate to 10m
          timeInterval: 5000,
          distanceInterval:10,
        },
        (location) => {
          // Always moves to current location if activated
          if (this.state.moveToCurrentLoc) {
            this.userTracking(location);
          }
        }
      )
    }
  }

  runTrackingAsync() {
    let current_time = new Date();
    let start_time = {
      'year':current_time.getFullYear(),
      'month':current_time.getMonth(),
      'day':current_time.getDate(),
      'hours':current_time.getHours(),
      'minutes':current_time.getMinutes(),
      'seconds':current_time.getSeconds(),
    }
    global.socket.emit('start_run', start_time);

    // Asking location permission and creating location loop
    let { status } = Permissions.askAsync(Permissions.LOCATION);
    if (status) { //Check whether permission granted
      Location.watchPositionAsync(
        {
          accuracy: 4, //Accurate to 10m
          timeInterval: 5000,
        },
        (location) => {
          let current_time = new Date();
          let data = {
            'location': location,
            'time': (current_time.getTime() / 1000), // Conversion to seconds
          }
          global.socket.emit('location_update',data);
          this.updateRunInfo(); // Updates pace even with only 

          // Always moves to current location if activated
          if (this.state.moveToCurrentLoc) {
            this.userTracking(location);
          }
        }
      );
    }

  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
    } else {
      if (global.login_status.success) {
        this.runTrackingAsync();
      } else {
        this.defaultLocationAsync();
      }
    }
  }

  onRegionChange = region => {
    this.setState({
      region: region,
      moveToCurrentLoc: false,
    });
  };

  async goToLocation(loc) {
    if (!loc) {
      Alert.alert('Error', 'Input was blank.');
      return 0;
    }
    let lat, lon;
    try {
      let { latitude, longitude } = (await Location.geocodeAsync(
        loc + ',' + global.region.name
      ))[0];
      lat = latitude;
      lon = longitude;
    } catch {
      Alert.alert('Error', "Input couldn't be understood.");
      return 0;
    }

    if (lat != global.region.coords[0] || lon != global.region.coords[1]) {
      this.setState(prevState => ({
        region: {
          ...prevState.region, //Copy in other parts of the object
          latitude: lat,
          longitude: lon,
        },
        searchLoc: {
          latitude: lat,
          longitude: lon,
        },
        showSearch: true,
      }));
    } else {
      Alert.alert('Error', "Input couldn't be understood.");
    }
  }

  async goToCurrent() {
    Location.getCurrentPositionAsync({
      accuracy: 4,
      maximumAge: 5000,
      timeout: 5000,
    })
      .then(
        location => {
          this.setState(prevState => ({
            region: {
              ...prevState.region, //Copy in other parts of the object
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          }));
        },
        reason =>
          Alert.alert('Error', 'Location tracking failed. Error: ' + reason)
      )
      .catch(error =>
        Alert.alert('Error', 'Location tracking failed. Error: ' + error)
      );
  }

  runHere(name, coords) {
    if (!name) {
      Alert.alert('Error', 'Please enter an address in the search box');
    }
    this.props.navigation.navigate('Run', {
      name: name,
      coords: coords,
    });
  }

  async saveRoute() {
    let data = {
      name: "",
      start_time: "",
      points: 0,
      description: "",
      route: this.props.navigation.state.params.route
    };
    let api_url = global.serverURL + '/api/save_route';
    fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    })
    .then(
      async res => {
        console.log('Login response received from server');
      },
      reason => {
        console.log('Promise rejected');
        Alert.alert('Error connecting to server', reason);
      }
    );
    this.setState({showSaveDialog: false}) //Close save dialog
  }

  render() {
    let header;
    if (!this.props.navigation.getParam('start',null)) {
      header = (
        <View style={{ ...STYLES.header, flexDirection: 'row' }}>
          <TextInput
            placeholder="Search"
            style={STYLES.search}
            onChangeText={text => this.setState({ searchStr: text })}
          />
          <Button
            img={require('../assets/icons/search.png')}
            style={STYLES.search_btn}
            img_style={STYLES.search_img}
            onPress={() => this.goToLocation(this.state.searchStr)}
          />
          <Button
            img={require('../assets/icons/run.png')}
            style={STYLES.search_btn}
            img_style={STYLES.search_img}
            onPress={() =>
              this.runHere(this.state.searchStr, this.state.searchLoc)
            }
          />
        </View>
      );
    } else {
      header = (
        <View style={STYLES.header}>
          <View style={{ flexDirection: 'row', justifyContent:"center"}}>
            <Button
              text="Close"
              onPress={() => {this.props.navigation.setParams({start:null,end:null,route:null})}}
            />
            <Text style={STYLES.header_text}>
              {this.props.navigation.state.params.start} to{' '}
              {this.props.navigation.state.params.end}
            </Text>
          </View>
          <View style={{ width:"100%", flexDirection: 'row', justifyContent:"space-between"}}>
            <Timer />
            <Button text="Save Route" onPress={()=>this.props.navigation.navigate("SaveRun", this.props.navigation.state.params)} />
          </View>
        </View>
      );
    }

    return (
      <View style={{ alignItems: 'center' }}>
        {header}
        <MapView
          style={STYLES.map}
          showsUserLocation={true}
          showsMyLocationButton={false}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChange.bind(this)}>
          {this.state.showSearch && (
            <Marker coordinate={this.state.searchLoc} pinColor="#9900FF" />
          )}
          {this.props.navigation.state.params != undefined && (
            <Polyline
              coordinates={this.props.navigation.state.params.route}
              strokeColor="#9900FF"
            />
          )}
        </MapView>
        <Button
          img={require('../assets/icons/compass.jpg')}
          style={STYLES.compass_btn}
          img_style={STYLES.compass_img}
          onPress={() => {
            this.setState({ moveToCurrentLoc: true });
            this.goToCurrent();
          }}
        />
      </View>
    );
  }
}
