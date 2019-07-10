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
      color: Color.textColor,
      margin: 5,
      marginBottom: 5,
  }
})

class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let stats = this.props.user.stats
    
    return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap',  padding: 10}}>
        <Card 
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
        </Card>
        <Card 
            title="Runs made"
            containerStyle={STYLES.card} 
            titleStyle={{color: Color.textColor}} 
            dividerStyle={{display: 'none'}}>
            <Text style={STYLES.text}>300</Text>
        </Card>
        <Card 
            title="Distance Ran"
            containerStyle={STYLES.card} 
            titleStyle={{color: Color.textColor}} 
            dividerStyle={{display: 'none'}}>
            <Text style={STYLES.text}>69 km</Text>
        </Card>
        <Card 
            title="Longest Distance"
            containerStyle={STYLES.card} 
            titleStyle={{color: Color.textColor}} 
            dividerStyle={{display: 'none'}}>
            <Text style={STYLES.text}>21 km</Text>
        </Card>
        <Card 
            title="Fastest 1km"
            containerStyle={STYLES.card} 
            titleStyle={{color: Color.textColor}} 
            dividerStyle={{display: 'none'}}>
            <Text style={STYLES.text}>3m 10s</Text>
        </Card>


        {/* <Card title="Distance Ran Altogether"><Text>{stats.total_distance}</Text></Card>
        <Card title="Longest Distance Ran"> <Text>{stats.longest_distance_ran ? stats.longest_distance_ran : 'None'}</Text></Card>
        <Card title="Fastest 1km"><Text>{stats.fastest_km ? stats.fastest_km : 'None'}</Text></Card>
        <Card title="Fastest 5km"><Text>{stats.fastest_5km ? stats.fastest_5km : 'None'}</Text></Card>
        <Card title="Fastest 10km"><Text>{stats.fastest_10km ? stats.fastest_10km : 'None'}</Text></Card>
        <Card title="Fastest Marathon"><Text>{stats.fastest_marathon ? stats.fastest_marathon : 'None'}</Text></Card>
        <Card title="Estimated V02 Max"><Text>{stats.estimated_v02_max ? stats.estimated_v02_max : 'None'}</Text></Card>
        <Card title="Average Heart Rate"><Text>{stats.average_heart_rate ? stats.average_heart_rate : 'None'}</Text></Card>
        <Card title="Cadence"><Text>{stats.cadence ? stats.cadence : 'None'}</Text></Card> */}

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