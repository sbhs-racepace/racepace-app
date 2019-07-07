// Jason Yu Sunny Yan

import React from 'react';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { Alert, View, Text, TextInput, StyleSheet, Dimensions, Platform, TouchableOpacity} from "react-native";
import { Image } from 'react-native-elements'
import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import "../global";
import { label, cobalt, lunar,neutral_blue } from '../constants/mapstyle'
import Color from '../constants/Color'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { startRun } from '../functions/run_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const LATITUDE_DELTA = 0.0922 * 1.5;
const LONGITUDE_DELTA = 0.0421 * 1.5;
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  search: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Color.darkBackground,
    color:Color.textColor,
    width: windowWidth*0.6,
    height: 40,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: windowWidth,
    height: windowHeight,
    zIndex: 1,
  },
  circularButton:{
    margin:5,
    borderWidth:1,
    backgroundColor:Color.darkBackground,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  largeButton: {
    width: windowWidth * 0.20,
    height: windowWidth * 0.20,
    borderRadius: windowWidth * 0.20 / 2,
  }, 
  smallButton: {
    width: windowWidth * 0.10,
    height: windowWidth * 0.10,
    borderRadius: windowWidth * 0.10 / 2,
  },
  largeIcon: windowWidth * 0.2 / 2,
  smallIcon: windowWidth * 0.12 / 2,
});

class MapScreen extends React.Component {
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

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
    } else {
      this.defaultLocationAsync();
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
    } this.props.navigation.navigate('Setup', {
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
    return (
      <View style={{flex:1, backgroundColor:Color.darkBackground}}>
        <MapView
          style={STYLES.map}
          provider = { MapView.PROVIDER_GOOGLE } // Usage of google maps
          customMapStyle = { neutral_blue }
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
        
        <View style={{position:'absolute',flexDirection: 'row', top:windowHeight*0.05,left:windowWidth*0.1, zIndex:3, justifyContent:'space-evenly', alignItems:'center'}}>
          <TextInput
            placeholder="Search"
            style={STYLES.search}
            placeholderTextColor={Color.textColor}
            onChangeText={text => this.setState({ searchStr: text })}
          />

          <TouchableOpacity
            style={[STYLES.circularButton, STYLES.smallButton]}
            onPress={() => this.goToLocation(this.state.searchStr)}
          >
            <FontAwesomeIcon name="search" size={STYLES.smallIcon} color={Color.primaryColor}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={[STYLES.circularButton, STYLES.smallButton]}
            onPress={() => this.runHere(this.state.searchStr, this.state.searchLoc)}
          >
            <FontAwesome5Icon name="running" size={STYLES.smallIcon} color={Color.primaryColor}/>
          </TouchableOpacity>
        </View>

        <View style={{position:'absolute',flexDirection: 'row', top:windowHeight*0.75, width:'100%', zIndex:3, alignItems:'center'}}>
          <View style={{flex:1, alignItems:'center'}}>

          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity
              style={[STYLES.circularButton,STYLES.largeButton]}
              onPress={()=>{
                this.props.startRun();
                this.props.navigation.navigate('RunManager')
              }}
            >
              <FontAwesomeIcon name="play" size={STYLES.largeIcon} color={Color.primaryColor}/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity
              style={[STYLES.circularButton,STYLES.smallButton]}
              onPress={() => {
                this.setState({ moveToCurrentLoc: true });
                this.goToCurrent();
              }}
            >
              <FontAwesomeIcon name="location-arrow" size={STYLES.smallIcon} color={Color.primaryColor}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startRun }, dispatch)
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
