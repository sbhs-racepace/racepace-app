// Jason Yu

import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'
import '../global'
import Color from '../constants/Color'
import { connect } from 'react-redux';
import Button from '../components/Button'
import { minuteSecondString } from '../functions/conversions';
import BackButtonHeader from '../components/BackButtonHeader';
import { bindActionCreators } from 'redux';

const STYLES = StyleSheet.create({
  scrollView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor:Color.lightBackground,
  },
  text: {
    fontSize:15,
    padding:"3%",
    color:Color.textColor
  },
  card: {
    backgroundColor: Color.lightBackground,
    borderColor: Color.darkBackground,
    color: Color.textColor,
    margin: 20,
  }
})

class RunItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
      >
        <Card 
          title={this.props.run.run_info.start_time}
          titleStyle={{color: Color.textColor}}
          dividerStyle={{display: 'none'}}
          containerStyle={STYLES.card}
        >
          <Text style={STYLES.text}>Distance: {Math.ceil(this.props.run.run_info.final_distance)} m</Text>
          <Text style={STYLES.text}>Pace: {minuteSecondString(this.props.run.run_info.average_pace)}</Text>
          <Text style={STYLES.text}>Duration: {minuteSecondString(this.props.run.run_info.final_duration)}</Text>
        </Card>
      </TouchableOpacity>
    )
  }
}

class RunListScreen extends React.Component {
  render() {
    if (!this.props.user.token) {
      return <Text>Please login to see your runs</Text>;
    }

    let runs = this.props.user.runs.map(run => 
      <RunItem 
        run={run}
        onPress={() => this.props.navigation.navigate('ExtendedDetails', {run})}
      />
    );

    return (
      <View style={{flex:1,backgroundColor:Color.darkBackground,}}>
        <Button
          text="Follow Requests"
          style={{ alignSelf: 'center', width:'90%', height:50, backgroundColor:Color.lightBackground, margin: 20, marginBottom:0}}
          onPress={() => this.props.navigation.navigate('FollowRequests')}
        />
        <ScrollView>
          {runs}
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunListScreen);
