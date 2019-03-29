import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import '../global';
import '../assets/cat.jpeg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  white_text: {
    color: 'white',
    fontSize: 20,
  },
  profileimage: { height: 100, width: 100 },
  profile_data_box: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 100,
    borderWidth: 10,
  },
  profile_box: {
    flexDirection: 'row',
  },
});

class WhiteText extends React.Component {
  render() {
    return <Text style={styles.white_text}>{this.props.text}</Text>;
  }
}

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
      <ScrollView style={styles.container}>
        <Text> </Text>
        <Text> </Text>
        <View style={styles.profile_box}>
          <Image
            style={styles.profileimage}
            source={require(this.state.imageurl)}
          />
          <Button
            title="Edit"
            onPress={() => {
              this.props.navigation.navigate('Edit');
            }}
            style={{ right: 5, height: '80%', topMargin: '10%', width: '100%' }}
            text_style={{ top: '20%' }}
          />
          <View style={styles.profile_data_box}>
            <Text style={styles.white_text}>Name: {this.state.name}</Text>
            <Text style={styles.white_text}>
              Username: {this.state.username}
            </Text>
            <Text>Age: {this.state.age}</Text>
            <Text>Email: {this.state.email}</Text>
            <Text>{global.country}</Text>
          </View>
        </View>
        <View style={styles.profile_data_box}>
          <Text>
            Total distance run
            {this.state.statistics.total_distance_run}
          </Text>
          <Text>Fastest 100m: {this.state.statistics.fastest_100}</Text>
          <Text>Fastest 800m: {this.state.statistics.fastest_800}</Text>
          <Text>Maximum v02: {this.state.statistics.v02_max}</Text>
          <Text>Average pace: {this.state.statistics.average_pace}</Text>
        </View>
      </ScrollView>
    );
  }
}
