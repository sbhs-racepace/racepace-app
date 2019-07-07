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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  text_style: {
    color: Color.textColor,
    fontSize:20,
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
    borderRadius: 10,
    color: Color.textColor,
  },
  routePic: {
    aspectRatio: 1.7, 
    width: '80%', 
    height: undefined,
    borderRadius: 5
  },
})

class SaveRunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'name',
      description: 'description',
    };
  }

  async saveRun() {
    let data = {
      name: this.state.name,
      description: this.state.description,
      run_info: this.props.run_info,
      location_packets: this.props.location_packets,
    }
    let api_url = `${global.serverURL}/api/save_route`;
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
      console.log('Success Saving Route');
    });
    this.props.endRun();
    this.props.navigation.navigate('Feed');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Color.lightBackground}}>
        <BackButtonHeader 
          title="Save Screen"
          onPress={this.props.navigation.goBack}
        />
        <ScrollView style={{flex: 4/5, backgroundColor: Color.lightBackground}}>
          <View style={{height:windowHeight*0.3, justifyContent:'space-evenly', alignItems:'center'}}>
            <Text style={STYLES.title_style}>Run Description</Text>
            <TextInput
              style={STYLES.input}
              placeholder="Name"
              onChangeText={name => {
                this.setState({ name: name });
              }}
              defaultValue='Name'
            />
            <TextInput
              style={STYLES.input}
              placeholder="Description"
              onChangeText={description => {
                this.setState({ description: description });
              }}
              defaultValue='Description'
            />
          </View>
          <View style={{height:windowHeight*0.8, justifyContent:'space-evenly', alignItems:'center'}}>
            <Text style={STYLES.title_style}>Run Information</Text>
            <Image source={require('../assets/map.png')} style={STYLES.routePic} />
            <Text style={STYLES.text_style}>Average Pace: {this.props.run.real_time_info.average_pace.minutes} minutes {this.props.run.real_time_info.average_pace.seconds} seconds</Text>
            <Text style={STYLES.text_style}>Distance Ran: {this.props.run.real_time_info.distance}</Text>
            <Text style={STYLES.text_style}>Duration: {this.props.run.run_info.duration}</Text>
            <Text style={STYLES.text_style}>Points: {this.props.run.run_info.points}</Text>
          </View>
          <Button 
            style={{width:'100%'}}
            text="Save Run"
            onPress={()=> {
              this.saveRun()
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ endRun }, dispatch)
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveRunScreen);
