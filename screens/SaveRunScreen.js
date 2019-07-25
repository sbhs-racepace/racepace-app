// Jason Yu

import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import TextInput from '../components/TextInput'
import { Image } from 'react-native-elements'
import Button from '../components/Button.js';
import Color from '../constants/Color.js'
import '../global.js';
import BackButtonHeader from '../components/BackButtonHeader'; 
import { endRun } from '../functions/run_action'
import { addRun, addSavedRun } from '../functions/user_info_action'

import MapView from "react-native-maps";
import { Polyline } from "react-native-maps";
import { noLabel, cobalt, lunar, neutral_blue } from "../constants/mapstyle";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { minuteSecondString } from '../functions/conversions';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  text_style: {
    color: Color.textColor,
    fontSize:20,
  },
  container: {
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center"
  },
  title_style: {
    fontSize:30,
    fontFamily: 'Roboto',
    textAlign:"center",
    color: Color.textColor
  },
  input: {
    fontSize: 20,
    width: '80%',
    color: Color.textColor,
  },
  multiline_input: {
    fontSize: 20,
    width: '80%',
    color: Color.textColor,
    height:windowHeight*0.15,
  },
  map: {
    aspectRatio: 1.7, 
    width: '80%', 
    borderRadius: 5
  },
})

class SaveRunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runName: 'Run Name',
      runDescription: 'Run Description',
      region: this.calcMapRegion()
    };
  }

  calcMapRegion() {
    if (this.props.run.location_packets.length > 0) {
      let lat_list = this.props.run.location_packets.map(point => point.latitude);
      let max_lat = Math.max(...lat_list);
      let min_lat = Math.min(...lat_list);
      let lon_list = this.props.run.location_packets.map(point => point.longitude);
      let max_lon = Math.max(...lon_list);
      let min_lon = Math.min(...lon_list);
      let region = {
        latitude: (max_lat + min_lat)/2,
        longitude: (max_lon + min_lon)/2,
        latitudeDelta: max_lat - min_lat + 0.001,
        longitudeDelta: max_lon - min_lon + 0.0005,
      }
      return region
    } else { // Default if no run
      let region =  {
        ...global.default_location,
        latitudeDelta:0.005, 
        longitudeDelta:0.005,
      }
      return region;
    }
  }

  async addRun() {
    let data = {
      run_info: this.props.run.run_info,
      location_packets: this.props.run.location_packets,
    }
    let api_url = `${global.serverURL}/api/add_run`;
    fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: this.props.user.token,
      }),
    })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    })
    .then( async () => {
      this.props.addRun(data)
      Alert.alert('Success Saving Run');
    });
  }

  async saveRun() {
    let data = {
      name: this.state.runName,
      description: this.state.runDescription,
      run_info: this.props.run.run_info,
      location_packets: this.props.run.location_packets,
    }
    let api_url = `${global.serverURL}/api/save_run`;
    fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: this.props.user.token,
      }),
    })
    .then( async () => {
      this.props.addSavedRun(data)
      Alert.alert('Success Saving Run');
    })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Color.lightBackground}}>
        <BackButtonHeader 
          title="Save Run Screen"
          onPress={this.props.navigation.goBack}
        />
        <ScrollView style={{flex: 4/5, backgroundColor: Color.lightBackground}}>
          <View style={{height:windowHeight*0.8, justifyContent:'space-evenly', alignItems:'center'}}>
            <Text style={STYLES.title_style}>Run Stats</Text>
            <View
              style={[
                STYLES.container,
                { alignItems: "center", justifyContent: "space-around", flex: 1 }
              ]}
            >
              <MapView
                style={STYLES.map}
                provider={MapView.PROVIDER_GOOGLE} // Usage of google maps
                customMapStyle={lunar}
                showsMyLocationButton={false}
                region={this.state.region}
                pitchEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Polyline
                  coordinates={this.props.run.location_packets}
                  strokeColor={Color.primaryColor}
                  strokeWidth={4}
                />
              </MapView>
            </View>

            <Text style={STYLES.text_style}>Average Pace: {minuteSecondString(this.props.run.real_time_info.average_pace)}</Text>
            <Text style={STYLES.text_style}>Distance Ran: {Math.ceil(this.props.run.real_time_info.current_distance)} m</Text>
            <Text style={STYLES.text_style}>Duration: {minuteSecondString(this.props.run.run_info.final_duration)}</Text>
            <Text style={STYLES.text_style}>Points: {this.props.run.run_info.points}</Text>
          </View>
          <View style={{height:windowHeight*0.5, justifyContent:'space-evenly', alignItems:'center'}}>
            <Text style={STYLES.title_style}>Post your Run</Text>
            <TextInput
              style={STYLES.input}
              placeholder="Run Name"
              onChangeText={runName => {
                this.setState({ runName: runName });
              }}
              defaultValue='Run Name'
            />
            <TextInput
              text_style={STYLES.multiline_input}
              placeholder="Run Description"
              onChangeText={runDescription => {
                this.setState({ runDescription: runDescription });
              }}
              defaultValue='Run Description'
            />
          </View>
          <View style={{height:windowHeight*0.3, justifyContent:'space-evenly', alignItems:'center'}}>
            <Button 
              style={{width:'80%',alignSelf:'center'}}
              text="Post and Save Run"
              onPress={async ()=> {
                await this.saveRun()
                this.props.navigation.navigate('Feed');
                this.props.endRun();
              }}
            />
            <Text style={[{alignSelf:'center'}, STYLES.text_style]}>Or</Text>
            <Button 
              style={{width:'80%', alignSelf:'center'}}
              text="Just Save Run"
              onPress={async ()=> {
                await this.addRun()
                this.props.navigation.navigate('Feed');
                this.props.endRun();
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ endRun, addRun, addSavedRun }, dispatch)
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveRunScreen);
