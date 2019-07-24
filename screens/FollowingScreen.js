// Jason Yu

import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image, Card, ListItem } from 'react-native-elements'
import "../global.js"
import Color from '../constants/Color'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { unfollow } from '../functions/user_info_action'
import Button from '../components/Button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  card: {
    backgroundColor: Color.lightBackground,
    borderColor: Color.darkBackground,
    color: Color.textColor,
    margin: 10,
  },
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
    borderWidth:0,
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
      username: 'loading',
      bio: ''
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
            console.log(res_data)
          username = res_data.info.username
          full_name = res_data.info.full_name
          this.setState({full_name:full_name, username:username, bio: res_data.info.bio});
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

  goToUserProfile(user_id) {
    if (user_id == this.props.user.user_id) {
      this.props.navigation.navigate('Profile')
      return
    }

    fetch(
      global.serverURL+`/api/get_info/${user_id}`, 
      {
        method: 'GET',
        headers: {
          authorization: this.props.user.token
        }
      })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    })
    .then(
      async res => {
        res = await res.json(); //Parse response as JSON
        let info = res['info']
        console.log(info)
        this.props.navigation.navigate('OtherProfile', {info:info, user_id: user_id})
      }
    );
  }

  render() {

    return (

        <Card 
        dividerStyle={{display: 'none'}}
        containerStyle={STYLES.card}
      >

        <ListItem
          title={this.state.username}
          subtitle={this.state.bio}
          onPress={() => this.goToUserProfile(this.state.other_user_id)}
          leftAvatar={{ source: { uri: global.serverURL + `/api/avatars/${this.state.other_user_id}.png` } }}
          titleStyle={{ color: Color.textColor, fontWeight: 'bold' }}
          subtitleStyle={{ color: Color.textColor }}
          containerStyle={{
              backgroundColor: Color.lightBackground,
            }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
                style={{width: '70%'}}
                text="View Profile"
                onPress={() => {
                this.goToUserProfile(this.state.other_user_id)
                }}
            >
            </Button>
            <Button
                style={{width: '30%', borderLeftWidth: 2, borderLeftColor: Color.lightBackground}}
                text_style={{color: "#e74c3c"}}
                text="Unfollow"
                onPress={() => {
                this.unfollowUser()
                }}
            >
            </Button>
        </View>
      </Card>
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
      <View style={{backgroundColor:Color.darkBackground, flex:1}}>
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
