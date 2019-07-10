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
    width: windowWidth * 0.8,
    color: Color.textColor,
  },
  multiline_input: {
    fontSize: 20,
    width: windowWidth * 0.8,
    color: Color.textColor,
    height:windowHeight*0.15,
  },
})

class SaveRunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: 'Route Name',
      routeDescription:'Route Description',
    };
  }

  async saveRoute() {
    let data = {
      distance: this.props.run.run_info.estimated_distance,
      route: this.props.run.run_info.route,
      name: this.state.routeName,
      description: this.state.routeDescription,
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
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.lightBackground, alignItems:'center'}}>
        <View style={{flex:4, justifyContent:'space-evenly', alignItems:'center'}}>
          <Text style={STYLES.title_style}>Would you like to save your route?</Text>
          <TextInput
            style={STYLES.input}
            placeholder="Route Name"
            onChangeText={routeName => {
              this.setState({ routeName: routeName });
            }}
            defaultValue='Route Name'
          />
          <TextInput
            text_style={STYLES.multiline_input}
            multiline={true}
            placeholder="Route Description"
            onChangeText={routeDescription => {
              this.setState({ routeDescription: routeDescription });
            }}
            defaultValue='Route Description'
          />
        </View>
        <View style={{flex:1, justifyContent:'space-evenly', alignItems:'center'}}>
          <Button 
            style={{width:windowWidth*0.8, alignSelf:'center'}}
            text="Save Route"
            onPress={async ()=> {
              await this.saveRoute()
              this.props.navigation.navigate('Feed');
            }}
          />
          <Text style={[{alignSelf:'center'}, STYLES.text_style]}>Or</Text>
          <Button 
            style={{width:windowWidth*0.8, alignSelf:'center'}}
            text="Just Exit"
            onPress={()=> {
              this.props.navigation.navigate('Feed');
            }}
          />
        </View>
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
