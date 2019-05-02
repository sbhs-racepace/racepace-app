import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';

const LATITUDE_DELTA = 0.0922*1.5
const LONGITUDE_DELTA = 0.0421*1.5

export default class TrackingScreen extends React.Component {
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

  updateLocations() {
    const url = global.serverURL + '/api/tracking';
    try {
      fetch(url, {
        method: 'POST',
        body: `groupName=${this.props.navigation.state.params.groupName}`,
      })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(
          res => {
            res = JSON.parse(res._bodyText);
            this.location = res;
          },
          reason => {
            console.log('Promise rejected');
            Alert.alert('Error connecting to server', reason);
          }
        );
    } catch (err) {
      //Catch any other errors
      Alert.alert('Error', err);
    }
  }

  render() {
    const { width: windowWidth, height: windowHeight } = Dimensions.get(
      'window'
    );
    const STYLES = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
        width: windowWidth,
        height: windowHeight,
        zIndex: 1,
      },
    });
    if (this.props.navigation.state.params == undefined && !global.TEST) {
      return (
        <Text>
          Error: An internal error occurred (No group name specified for
          tracking screen)
        </Text>
      );
    }
    if (global.TEST) {
      this.locations = [
        {
          loc: { latitude: -33.9672563, longitude: 151.1002119 },
          name: 'user1',
        },
        { loc: { latitude: -33.92345, longitude: 151.2350012 }, name: 'user2' },
      ];
    } else {
      this.updateLocations();
      setInterval(this.updateLocations, 10000);
    }
    return (
      <View>
        <MapView
          style={STYLES.map}
          showsUserLocation={true}
          showsMyLocationButton={false}
          region={this.state.region}
        >
          {this.locations.map(user => (
            <Marker
              coordinate={user.loc}
              pinColor="#9900FF"
              title={user.name}
            />
          ))}
        </MapView>
      </View>
    );
  }
}
