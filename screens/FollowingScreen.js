// Jason Yu

import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import "../global.js"
import Color from '../constants/Color'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { unfollow } from '../functions/user_info_action'
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
      full_name: "",
      other_user_id: this.props.other_user_id,
      username: '',
    }
  }

  async get_details() {
    let data = {other_user_id:this.state.other_user_id}
    let api_url = global.serverURL+'/api/get_other_info'
    await fetch(api_url, 
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({'Authorization': this.props.user_token})
      })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    })
    .then(
      async res_data => {
        res_data = await res_data.json()
        if (res_data.success == true) {
          username = res_data.info.username
          full_name = res_data.info.full_name
          this.setState({full_name:full_name, username:username});
        } else {
          Alert.alert("Couldn't retrieve other user info");
        }
      }
    );
  }

  async componentDidMount() {
    await this.get_details()
  }

  async unfollowUser() {
    let api_url = global.serverURL+'/api/unfollow'
    let data = {other_user_id:this.state.other_user_id}
    await fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({'Authorization': this.props.user_token})
    })
    .then( async res_data => {
      res_data = await res_data.json()
      if (res_data.success == true) {
        this.props.parent_props.unfollow(this.state.other_user_id)
        Alert.alert("Successfuly Unfollowed")
      } else {
        Alert.alert("Unfollow Unsuccessfully");
      }
    })
    .catch(error => {
      console.log(error)
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
        <Text style={{width:"30%",fontSize:15, color:Color.textColor}}>You are following {this.state.username}</Text>
        <View style={{width:"30%"}}>
          <TouchableOpacity
            style={[STYLES.circularButton, STYLES.smallButton]}
            onPress={() => {
              this.unfollowUser()
            }}
          >
            <FontAwesomeIcon name="remove" size={STYLES.smallIcon} color={Color.primaryColor}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class FollowingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.user.token) {
      return <Text>Please login to see your follow requests</Text>;
    }

    let test_data = this.props.user.following.map(other_user_id => 
      <FollowRequest 
        other_user_id={other_user_id}
        user_token={this.props.user.token}
        parent_props={this.props}
      />
    );


    return (
      <View style={{backgroundColor:Color.lightBackground, flex:1}}>
        <ScrollView contentContainerStyle={Color.lightBackground}>
          {test_data}
        </ScrollView>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ unfollow }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingScreen);
