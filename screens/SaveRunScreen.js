// Jason Yu

import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import Button from '../components/Button.js';
import Color from '../constants/Color.js'
import '../global.js';
import { startRun, addLocationPacket, endRun } from '../functions/action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    padding: '1%',
    marginTop: 5,
    color: Color.textColor,
    backgroundColor: Color.lightBackground,
  },
  routePic: {
    aspectRatio: 1.7, 
    width: '80%', 
    height: undefined,
    borderRadius: 5
  },
})

class SaveRunScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      name: 'name',
      description: 'description',
    };
  }

  async saveRun() {
    let data = {
      name: this.state.name,
      description: this.state.description,
      route: this.props.navigation.state.params
    };
    let api_url = `${global.serverURL}/api/save_route`;
    fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: global.login_info.token,
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
      <View style={{flex:1, backgroundColor:Color.lightBackground}}>
        <View style={{flex:1, justifyContent:'space-evenly', alignItems:'center'}}>
          <Text style={STYLES.title_style}>Save Run Screen</Text>
          <Image source={require('../assets/map.png')} style={STYLES.routePic} />
          <Text style={STYLES.title_style}>Run Stats</Text>
          <Text style={STYLES.text_style}>Average Pace: {this.props.real_time_info.average_pace.minutes} minutes {this.props.real_time_info.average_pace.seconds} seconds</Text>
          <Text style={STYLES.text_style}>Distance Ran: {this.props.real_time_info.distance}</Text>
          <Text style={STYLES.text_style}>Duration: {this.props.run_info.duration}</Text>
          <Text style={STYLES.text_style}>Points: {this.props.run_info.points}</Text>
        </View>
        <View style={{flex:1, justifyContent:'space-evenly'}}>
          <Text style={STYLES.title_style}>Saved Run Description</Text>
          <TextInput
            style={STYLES.input}
            onChangeText={name => {
              this.setState({ name: name });
            }}
            defaultValue='Name'
          />
          <TextInput
            style={STYLES.input}
            onChangeText={description => {
              this.setState({ description: description });
            }}
            defaultValue='Description'
          />
        </View>
        <Button 
          text="Save Run"
          onPress={()=> {
            this.saveRun()
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, startRun, endRun }, dispatch)
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveRunScreen);
