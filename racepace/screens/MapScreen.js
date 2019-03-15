import React from "react";
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import Button from '../components/Button'

let { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.0922*1.5
const LONGITUDE_DELTA = 0.0421*1.5

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

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
      start: "",
      end: "",
      viewHeight: 0
    };
    
    let start = '-33.9672563,151.1002119'
    let end   = '-33.9619925,151.1059193'
    this.api_route(start, end);
  }

  api_route(start, end) {
    let data = {
      'start': start,
      'end': end,
    }
    fetch('http://127.0.0.1:8000/api/route',{
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      result.route.map(marker => {
        this.state.markers.push({
          title:'Node',
          coordinate: marker
        })})
    })
  }

  // setToLocation(location) {
  //   let region = {
  //     latitude: location.latitude,
  //     longitude: location.longitude,
  //     latitudeDelta: 0.0922*1.5,
  //     longitudeDelta: 0.0421*1.5,
  //   }
  //   this.onRegionChange(region);
  // }

  // setToCurrentLocation() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     let location = {
  //       latitude: position.latitude,
  //       longitude:position.longitude
  //     }
  //     this.setToLocation(location);
  //   }, (error) => {
  //     alert(JSON.stringify(error))
  //   }, {
  //     enableHighAccuracy: true,
  //     timeout: 20000,
  //     maximumAge: 1000
  //   });
  // }

  // componentDidMount() {
  //   this.setToCurrentLocation()
  // }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          markers:this.state.markers
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          markers:this.state.markers
        });
      }
    );
    console.log(this.state.region)
  }

  onRegionChange = (region) => {
    this.setState({
      mapRegion: region,
      lastLat: region.latitude || this.state.lastLat,
      lastLong: region.longitude || this.state.lastLong
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
      <View onLayout={(event)=>{
        let {x,y, width, height} = event.nativeEvent.layout
        this.setState({
          viewHeight: height
        })
      }}>
        <TextInput 
          placeholder="From"
          style = {this}
          onChangeText={(text)=>this.setState({
            start: text
          })}
        />
        <TextInput
          placeholder="To"
          onChangeText={(text)=>this.setState({
            end: text
          })}
        />
        <Button text="Generate" onPress={() => {
          console.log(this.state.start)
          console.log(this.state.end)
        }}
        />
        <MapView
          style={this.generateStyles().map}
          showsUserLocation={true}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
          <Polyline
            coordinates={this.state.markers.map(marker => {return marker.coordinate})}
            strokeColor="#9900FF"
            strokeWidth={6}
          />
        </MapView>
      </View>
    );
  }
}
