// Sunny Yan, Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Color from '../constants/Color'
import {noLabel, cobalt,lunar,neutral_blue} from '../constants/mapstyle'
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { startRun, addLocationPacket, pauseRun } from '../functions/run_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const LATITUDE_DELTA = 0.0922*1.5
const LONGITUDE_DELTA = 0.0421*1.5
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
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
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    borderRadius: windowWidth * 0.12 / 2,
  },
  smallIcon: windowWidth * 0.12 / 2,
  largeIcon: windowWidth * 0.2 / 2,
});

class TrackingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -33.9672563,
        longitude: 151.1002119,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    }
  }

  async componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
    } else {
      this.defaultLocationAsync();
    }
  }

  defaultLocationAsync() {
    let { status } = Permissions.askAsync(Permissions.LOCATION);
    if (status) { //Check whether permission granted
      Location.watchPositionAsync(
        {
          accuracy: 4, //Accurate to 10m
          timeInterval: 3000,
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

  onRegionChange = region => {
    this.setState({
      region: region,
      moveToCurrentLoc: false,
    });
  };

  render() {
    return (
      <View style={{flex:1, backgroundColor:Color.darkBackground}}>
        <MapView
          style={STYLES.map}
          provider = { MapView.PROVIDER_GOOGLE } // Usage of google maps
          customMapStyle = { lunar }
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

        <View style={{position:'absolute',flexDirection: 'row', top:windowHeight*0.8, width:'100%', zIndex:3, alignItems:'center'}}>
          <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity
              style={[STYLES.circularButton,STYLES.smallButton]}
              onPress={() => { this.props.navigation.navigate('RunManager') }}
            >
              <FontAwesome5Icon name="running" size={STYLES.smallIcon} color={Color.primaryColor}/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity
              style={[STYLES.circularButton,STYLES.largeButton]}
              onPress={()=>{
                this.props.pauseRun()
                this.props.navigation.navigate('Paused')
              }}
            >
              <FontAwesomeIcon name="pause" size={STYLES.largeIcon} color={Color.primaryColor}/>
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
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, startRun, pauseRun }, dispatch)
}

function mapStateToProps(state) {
  const { run, user } = state;
  return { run, user };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingScreen);
