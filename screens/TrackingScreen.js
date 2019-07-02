// Sunny Yan, Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Color from '../constants/Color'
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { startRun, addLocationPacket, pauseRun } from '../functions/action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
  back_btn: {
    width: 40,
    height: "5%",
    top: 5,
    left: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  search: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    width: windowWidth*0.6,
    height: 30,
  },
  circularButton:{
    margin:5,
    borderWidth:1,
    backgroundColor:'blue',
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

  onRegionChange = region => {
    this.setState({
      region: region,
      moveToCurrentLoc: false,
    });
  };

  render() {
    return (
      <View style={{flex:1}}>
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

        <View style={{position:'absolute',flexDirection: 'row', top:windowHeight*0.75, width:'100%', zIndex:3, alignItems:'center'}}>
          <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity
              style={[STYLES.circularButton,STYLES.smallButton]}
              onPress={() => { this.props.navigation.navigate('RunManager') }}
            >
              <Text>Main</Text>
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
              <Text style={{fontSize:20, color:Color.textColor}}>Pause (ICON)</Text>
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
              <Image
                style={STYLES.smallButton}
                source = {require('../assets/icons/compass.jpg')}
              />
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
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingScreen);
