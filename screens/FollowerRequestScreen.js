// Jason Yu

import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import Button from "../components/Button"
import BackButtonHeader from '../components/BackButtonHeader'
import "../global.js"
import Color from '../constants/Color'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

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



class FollowRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      other_user_id: this.props.other_user_id
    }
  }

  async getUsername() {
    let api_url = `${global.serverURL}/api/get_other_info/${this.state.other_user_id}`
    let username = ''
    await fetch(api_url, {
      method: 'GET',
    })
    .then( async res => {
      let res_data = await res.json();
      if (res_data.success == true) {
        username = res_data.info.username
      } else {
        console.log("Couldn't retrieve other user info");
      }
    })
    .catch(error => {
      Alert.alert('Error connecting to server', error);
    });
    return username
  }

  async componentDidMount() {
    let username = await this.getUsername()
    this.setState({username:username});
  }

  async acceptRequest() {
    let api_url = `${global.serverURL}/api/acceptFollowRequest`
    let data = { other_user_id:this.state.other_user_id }
    await fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: this.props.user_token, // Taking user_token from parent
      }),
    })
    .then( async res => {
      let res_data = await res.json();
      if (res_data.success == true) {
        Alert.alert("Request SuccessfullyAccepted")
      } else {
        console.log("Couldn't accept request");
      }
    })
    .catch(error => {
      Alert.alert('Error connecting to server', error);
    });
  }

  async declineRequest() {
    let api_url = `${global.serverURL}/api/declineFollowRequest`
    let data = { other_user_id:this.state.other_user_id }
    await fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: this.props.user_token, // Taking user_token from parent
      }),
    })
    .then( async res => {
      let res_data = await res.json();
      if (res_data.success == true) {
        Alert.alert("Request Successfuly Declined")
      } else {
        console.log("Couldn't decline request");
      }
    })
    .catch(error => {
      Alert.alert('Error connecting to server', error);
    });
  }

  render() {
    return (
      <View style={{width:'100%',alignItems:'center',flex:1, flexDirection:'row', justifyContent:'space-around', height:windowHeight*0.2}}>
        <Image
          style={STYLES.profile_image}
          source={{uri: `${global.serverURL}/api/avatars/${this.state.other_user_id}.png`}}
        />
        <Text style={{width:"30%",fontSize:15, color:Color.textColor}}>{this.state.username} wants to follow you!</Text>
        <TouchableOpacity
          style={[STYLES.circularButton, STYLES.smallButton]}
          onPress={() => this.acceptRequest()}
        >
          <FontAwesomeIcon name="check" size={STYLES.smallIcon} color={Color.primaryColor}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[STYLES.circularButton, STYLES.smallButton]}
          onPress={() => this.declineRequest()}
        >
          <FontAwesomeIcon name="remove" size={STYLES.smallIcon} color={Color.primaryColor}/>
        </TouchableOpacity>
      </View>
    )
  }
}

class FollowerRequestScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.user.token) {
      return <Text>Please login to see your runs</Text>;
    }

    let user_ids = ['5165773889219314892','5165773889219314892']
    let test_data = user_ids.map(other_user_id => 
          <FollowRequest 
            other_user_id={other_user_id}
            user_token={this.props.user.token}
          />
    );


    return (
      <View style={{backgroundColor:Color.lightBackground, flex:1}}>
        <BackButtonHeader
          title='Follower Requests'
          onPress={this.props.navigation.goBack}
        />
        <ScrollView contentContainerStyle={Color.lightBackground}>
          {test_data}
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
