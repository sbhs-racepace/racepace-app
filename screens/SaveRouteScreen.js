import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import TextInput from '../components/TextInput'
import { Image } from 'react-native-elements'
import Button from '../components/Button.js';
import Color from '../constants/Color.js'
import '../global.js';
import BackButtonHeader from '../components/BackButtonHeader'; 
import { endRun } from '../functions/run_action'
import { addRoute } from '../functions/user_info_action'
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

class SaveRouteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: 'Route Name',
      routeDescription:'Route Description',
      start_name: this.props.run.run_info.start.name,
      end_name: this.props.run.run_info.end.name,
    };
  }

  async saveRoute() {
    let data = {
      distance: this.props.run.run_info.estimated_distance,
      route: this.props.run.run_info.route,
      name: this.state.routeName,
      description: this.state.routeDescription,
      start_name: this.state.start_name,
      end_name: this.state.end_name,
    }
    let api_url = `${global.serverURL}/api/save_route`;
    await fetch(api_url, {
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
      this.props.addRoute(data)
      Alert.alert('Success Saving Route');
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.lightBackground, alignItems:'center'}}>
        <BackButtonHeader
          title="Save Route Screen"
          onPress={this.props.navigation.goBack}
        />
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
            style={STYLES.input}
            placeholder="Start Name"
            onChangeText={start_name => {
              this.setState({ start_name: start_name });
            }}
            defaultValue={this.props.run.run_info.start.name}
          />
          <TextInput
            style={STYLES.input}
            placeholder="End Name"
            onChangeText={end_name => {
              this.setState({ end_name: end_name });
            }}
            defaultValue={this.props.run.run_info.end.name}
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
        <Button 
          style={{width:windowWidth*0.8, alignSelf:'center'}}
          text="Save Route"
          onPress={async ()=> {
            await this.saveRoute()
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ endRun, addRoute }, dispatch)
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveRouteScreen);
