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
import { addLocationPacket, pauseRun } from '../functions/run_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import '../global'

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
        ...global.default_location,
        latitudeDelta:0.005, 
        longitudeDelta:0.005,
      },
      autoTracking:true,
    }
  }

  async componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
    } else {
      this.goToCurrent();
    }
  }

  async goToCurrent() {
    let location_packet = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    })
    this.setState({
      region: {
        ...this.state.region,
        latitude: location_packet.coords.latitude,
        longitude: location_packet.coords.longitude,
      }
    })
    let {latitude, longitude, latitudeDelta, longitudeDelta} = this.state.region
    this.animate(latitude, longitude)
  }

  animate(latitude, longitude) {
    this.mapView.animateToRegion({latitude:Number(latitude), longitude:Number(longitude), latitudeDelta:0.005, longitudeDelta:0.005}, 2000)
  }

  async autoTrackingLoop() {
    if (this.state.autoTracking == true) {
      this.goToCurrent()
      let timerId = setTimeout(this.autoTrackingLoop.bind(this), 2000);
    } 
  }

  onRegionChange(region) {
    this.setState({
      region: region,
    });
  };

  render() {
    return (
      <View style={{flex:1, backgroundColor:Color.darkBackground}}>
        <MapView
          style={STYLES.map}
          ref = {(ref)=>this.mapView=ref}
          provider = { MapView.PROVIDER_GOOGLE } // Usage of google maps
          customMapStyle = { lunar }
          showsUserLocation={true}
          showsMyLocationButton={false}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
        >
          {this.props.run.run_info.route != null && (
            <Polyline
              coordinates={this.props.run.run_info.route}
              strokeColor={Color.primaryColor}
              strokeWidth={4}
            />
          )}
        </MapView>

        <View style={{position:'absolute',flexDirection: 'row', top:windowHeight*0.7, width:'100%', zIndex:3, alignItems:'center'}}>
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
              onPress={async () => {
                await this.setState({autoTracking: !this.state.autoTracking})
                if (this.state.autoTracking == true) {
                  this.autoTrackingLoop()
                }
              }}
            >
              <FontAwesomeIcon name="location-arrow" size={STYLES.smallIcon} color={this.state.autoTracking ? Color.primaryColor: 'grey'}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, pauseRun }, dispatch)
}

function mapStateToProps(state) {
  const { run, user } = state;
  return { run, user };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingScreen);
