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
    flexDirection:"column"
  },
  profile_image: { 
    height: 100, 
    width: 100, 
    borderRadius:50 
  },
  profile_data_box: {
    flex: 1,
    padding:"3%"
  },
  profile_box: {
    flexDirection: 'row',
    padding: "3%",
    flex:1
  },
  thebuttons: {
    fontSize:20,
    borderWidth: 1,
    width:"80%",
    borderRadius:10,
  }
});

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
        <View style={STYLES.profile_box}>
          <Image
            style={STYLES.profile_image}
            source={require('../assets/cat.jpeg')}
          />
          <View style={STYLES.profile_data_box}>
            <Text>{this.state.name}</Text>
          </View>
        </View>

        <Text>Username: {this.state.username}</Text>
        <Text>Age: {this.state.age}</Text>
        <Text>Email: {this.state.email}</Text>
        <Text>Country: {global.region.name}</Text>
              

        <Button text="9 Following"/>
        <Button text="3 Followers"/>
        <Button text="Find Friends"/>
        <Button
          text="Logout"
          onPress={()=>{
            global.login_status = {
              success: false, 
              token: false, 
              user_id: false
            };
            global.user = {
              name:'guest',
              routes: [],
            }
            this.props.navigation.navigate("Home")
          }}
        />


      </View>
    );
  }
}
