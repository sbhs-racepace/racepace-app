// Jason Yu Sunny Yan

import React from 'react';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { Alert, View, Text, TextInput, StyleSheet, Dimensions, Platform, TouchableOpacity} from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Image } from 'react-native-elements'
import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import "../global";
import { label, cobalt, lunar,neutral_blue } from '../constants/mapstyle'
import Color from '../constants/Color'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { startRun, changeEnd } from '../functions/run_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  search: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Color.darkBackground,
    color:Color.textColor,
    width: windowWidth*0.6,
    height:40
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
        latitude: -33.9672563, // Generic Starting Location
        longitude: 151.1002119,
        latitudeDelta: global.latitudeDelta,
        longitudeDelta: global.longitudeDelta,
      },
      showSearch: false,
      searchStr: '',
      searchLoc: {
        latitude: '',
        longitude: '',
      },
      searchResults: [ // Test Variabls
        {
          id: 1,
          name: 'JavaScript',
        },
        {
          id: 2,
          name: 'Java',
        },
      ]
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Device is not of valid type to record location.')
      this.props.navigation.navigate('Feed')
    } else {
      this.goToCurrent() // Automatically go to current location
    }
  }

  onRegionChange(region) {
    this.setState({
      region: region,
    });
  };

  async getSearchResults(location) {
    let inputString = location + ',' + global.region.name;
    let locationResults = await Location.geocodeAsync(inputString)
    return locationResults
  }

  async goToSearchLocation(location) {
    if (location == '') {
      Alert.alert('Error', 'Input was blank.');
    } else {
      try {
        let searchResults = await this.getSearchResults(location)
        let topResult = searchResults[0];
        let { latitude, longitude } = topResult
        this.setState(prevState => ({
          region: {
            ...prevState.region, //Copy in other parts of the object
            latitude: latitude,
            longitude: longitude,
          },
          searchLoc: {
            latitude: latitude,
            longitude: longitude,
          },
          showSearch: true,
        }));
      } catch {
        Alert.alert('Error', "Input couldn't be understood.");
      }
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
        this.setState({
          region: {
            ...this.state.region,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: global.latitudeDelta,
            longitudeDelta: global.longitudeDelta,
          }
        })
      }
    )
    .catch(error =>
      Alert.alert('Error', 'Location tracking failed. Error: ' + error)
    );
  }

  setupRun(name) {
    if (name == '') { // Empty String input
      Alert.alert('Error', 'Please enter an address in the search box');
    } else {
      this.props.changeEnd(name);
      this.props.navigation.navigate('Setup')
    }
  }

  updateSearch(searchStr) {
    let newSearchResults = []
    this.setState({ searchStr: searchStr, searchResults: newSearchResults });
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
          onRegionChangeComplete={this.onRegionChange.bind(this)}
        >
          {
            this.state.showSearch && (<Marker coordinate={this.state.searchLoc} pinColor={Color.primaryColor} />)
          }
        </MapView>
        
        <View style={{position:'absolute',flexDirection: 'row', top:windowHeight*0.05,left:windowWidth*0.1, zIndex:3, justifyContent:'space-evenly'}}>
          <SearchableDropdown
            onTextChange={searchStr => this.updateSearch(searchStr)}
            onItemSelect={searchStr => this.updateSearch(searchStr)}
            textInputStyle={STYLES.search}
            itemStyle={{
              padding: 10,
              marginTop: 4,
              backgroundColor: Color.lightBackground,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: Color.textColor }}
            placeholderTextColor={Color.textColor}
            itemsContainerStyle={{ maxHeight: 100 }}
            items={this.state.searchResults}
            placeholder="Enter a location"
            reset={false}
          />
          <View style={{flexDirection:'row', alignItems:'center', height:40}}>
            <TouchableOpacity
              style={[STYLES.circularButton, STYLES.smallButton]}
              onPress={() => this.goToSearchLocation(this.state.searchStr)}
            >
              <FontAwesomeIcon name="search" size={STYLES.smallIcon} color={Color.primaryColor}/>
            </TouchableOpacity>

            <TouchableOpacity
              style={[STYLES.circularButton, STYLES.smallButton]}
              onPress={() => this.setupRun(this.state.searchStr)}
            >
              <FontAwesome5Icon name="running" size={STYLES.smallIcon} color={Color.primaryColor}/>
            </TouchableOpacity>
          </View>
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
              onPress={() => this.goToCurrent()}
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
  return bindActionCreators({ startRun, changeEnd }, dispatch)
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
