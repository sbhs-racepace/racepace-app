// Jason Yu

import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-elements'
import Button from "../components/Button"
import BackButtonHeader from '../components/BackButtonHeader'
import "../global.js"
import Color from '../constants/Color'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  total_view : {
    padding:"3%", 
    backgroundColor:Color.lightBackground
  },
  text: {
    color: Color.textColor,
    fontSize:20,
  },
  profile_image: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    borderRadius: windowWidth * 0.2 / 2,
  },  
  roundedButton: {
    width: '20%',
    borderRadius: 10,
  }
});

class FollowRequest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{width:'100%',alignItems:'center',flex:1, flexDirection:'row', justifyContent:'space-between', height:windowHeight*0.2}}>
        <Image
          style={STYLES.profile_image}
          source={{uri: `${global.serverURL}/api/avatars/${this.props.userid}.png`}}
        />
        <Text style={{width:"30%",fontSize:20, color:Color.textColor}}>{this.props.name} wants to follow you!</Text>
        <Button 
          style={STYLES.roundedButton} 
          text="Accept Request"
        />
      </View>
    )
  }
}

class FollowerRequestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow_requests : ['Jamie','George','Josh'],
    }
  }

  render() {
    return (
      <View style={{backgroundColor:Color.lightBackground, flex:1}}>
        <BackButtonHeader
          title='Follower Requests'
          onPress={this.props.navigation.goBack}
        />
        <ScrollView contentContainerStyle={Color.lightBackground}>
          {this.state.follow_requests.map(name => <FollowRequest name={name} userid={"000"}/>)}
        </ScrollView>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowerRequestScreen);
