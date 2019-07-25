// Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Color from '../constants/Color'

const STYLES = StyleSheet.create({
  text: {
    fontSize:15,
    color:Color.textColor
  },
  card: {
      backgroundColor: Color.lightBackground,
      borderColor: Color.darkBackground,
      margin: 5,
      marginBottom: 5,
  }
})

class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap',  padding: 10}}>
          {/* <Card 
              title="Average Heart Rate"
              containerStyle={STYLES.card} 
              titleStyle={{color: Color.textColor}} 
              dividerStyle={{display: 'none'}}>
              <Text style={STYLES.text}>89 bpm</Text>
          </Card>
          <Card 
              title="Cadence"
              containerStyle={STYLES.card} 
              titleStyle={{color: Color.textColor}} 
              dividerStyle={{display: 'none'}}>
              <Text style={STYLES.text}>wtf is cadence</Text>
          </Card> */}
          <Card 
              title="Runs made"
              containerStyle={STYLES.card} 
              titleStyle={{color: Color.textColor}} 
              dividerStyle={{display: 'none'}}>
              <Text style={STYLES.text}>{this.props.user.stats.num_runs} Runs</Text>
          </Card>
          <Card 
              title="Distance Ran"
              containerStyle={STYLES.card} 
              titleStyle={{color: Color.textColor}} 
              dividerStyle={{display: 'none'}}>
              <Text style={STYLES.text}>{this.props.user.stats.total_distance} km</Text>
          </Card>
          <Card 
              title="Longest Distance"
              containerStyle={STYLES.card} 
              titleStyle={{color: Color.textColor}} 
              dividerStyle={{display: 'none'}}>
              <Text style={STYLES.text}>{this.props.user.stats.longest_distance_ran} km</Text>
          </Card>
          {/* <Card 
              title="Fastest 1km"
              containerStyle={STYLES.card} 
              titleStyle={{color: Color.textColor}} 
              dividerStyle={{display: 'none'}}>
              <Text style={STYLES.text}>3m 10s</Text>
          </Card> */}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen);