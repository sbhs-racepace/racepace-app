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
      name: 'Jason Yu',
      username: 'jyuuuk',
      age: 16,
      email: 'jasonyu0100@gmail.com',
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
            <Text>Name: {this.state.name}</Text>
            <Text>Username: {this.state.username}</Text>
            <Text>Age: {this.state.age}</Text>
            <Text>Email: {this.state.email}</Text>
            <Text>Country: {global.region.name}</Text>
          </View>
        </View>
        
        <View style={STYLES.profile_data_box}>
            <Text>Total distance run {this.state.statistics.total_distance_run}</Text>
            <Text>Fastest 100m: {this.state.statistics.fastest_100}</Text>
            <Text>Fastest 800m: {this.state.statistics.fastest_800}</Text>
            <Text>Maximum v02: {this.state.statistics.v02_max}</Text>
            <Text>Average pace: {this.state.statistics.average_pace}</Text>
        </View>

        <View>
          <Button 
          text= "Account Settings"
          onPress={() => 
                  this.props.navigation.navigate('Settings')
                }
          style= {STYLES.thebuttons}/>
          <Button 
          text= "Statistics"
          style= {STYLES.thebuttons}/>
          <Button 
          style= {STYLES.thebuttons}
          text= "Routes"
          onPress={() => 
                  this.props.navigation.navigate('Routes')
                }/>
        </View>
      </View>
    );
  }
}
