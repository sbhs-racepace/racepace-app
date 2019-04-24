import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Button from '../components/Button'
import '../global';
import '../assets/cat.jpeg';

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent:"space-evenly"
  },
  profile_image: { 
    height: 100, 
    width: 100, 
    borderRadius:50 
  },
  other_data_box: {
    padding:"3%"
  },
  profile_image_box: {
    flexDirection: 'column',
    padding: "3%",
  },
  text: {
    fontSize:20,
  },
  button: {
    fontSize:20,
    borderWidth: 1,
    borderRadius:10,
    margin:"3%"
  }
});

function logout() {
  global.login_status = {
    success: false, 
    token: false, 
    user_id: false
  };
  global.user = {
    name:"guest",
    username:"guest",
    dob:"None",
    routes: [],
  }
}

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: global.user.full_name,
      username: global.user.username,
      age: 16,
      email: global.user.email,
      statistics: {
        fastest_100: 9.4,
        total_distance_run: 100,
        fastest_800: 120,
        v02_max: 56,
        average_pace: 3.4,
      },
      imageurl: '../assets/cat.jpeg',
    };
  }

  render() {
    return (
      <View style={STYLES.container}>
        <View style={{height:150}}>
          <View style={{flexDirection:"row", flex:1, justifyContent:"space-evenly"}}>
            <View style={STYLES.profile_image_box}>
              <Image
                style={STYLES.profile_image}
                source={require('../assets/cat.jpeg')}
              />
              <Text style={[{padding:"3%"},STYLES.text]}>Name: {this.state.name}</Text>
            </View>
            <View style={{flexDirection:'column', flex:1, justifyContent:"space-evenly"}}>
              <View style={{flexDirection:'row', flex:1, justifyContent:"space-evenly"}}>
                <Button style={STYLES.button} text="8 Runs"/>
                <Button style={STYLES.button} text="9 Following"/>
                <Button style={STYLES.button} text="3 Followers"/>
              </View>
              <Button style={STYLES.button} text="Edit Profile"/>
            </View>
          </View>
        </View>

        <View style={{flexDirection:'column', flex:1}}>
          <View>
            <Text>Username: {this.state.username}</Text>
            <Text>Age: {this.state.age}</Text>
            <Text>Country: {global.region.name}</Text>
          </View>
                

          <Button style={STYLES.button} text="Find Friends"/>
          <Button
            style={STYLES.button} 
            text="Logout"
            onPress={()=>{
              logout()
              this.props.navigation.navigate("Home")
            }}
          />
        </View>
      </View>
    );
  }
}
