// Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import Color from '../constants/Color'
import { minuteSecondString } from '../functions/conversions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const STYLES = StyleSheet.create({
  text: {
    fontSize:15,
    padding:"3%",
    color:Color.textColor
  },
  card: {
      backgroundColor: Color.lightBackground,
      borderColor: Color.darkBackground,
      color: Color.textColor,
      margin: 10,
  }
})

class SavedRunItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card
        title={this.props.run.name}
        titleStyle={{color: Color.textColor}}
        dividerStyle={{display: 'none'}}
        containerStyle={STYLES.card}
      >
        <Text style={STYLES.text}>Start Time: {this.props.run.run_info.start_time}</Text>
        <Text style={STYLES.text}>Distance: {Math.ceil(this.props.run.run_info.final_distance)} m</Text>
        <Text style={STYLES.text}>Pace: {minuteSecondString(this.props.run.run_info.average_pace)}</Text>
        <Text style={STYLES.text}>Duration: {minuteSecondString(this.props.run.run_info.final_duration)}</Text>
        <Text style={STYLES.text}>{this.props.run.description}</Text>
      </Card>
    )
  }
}

class SavedRunListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let saved_runs = [];
    for (run_id in this.props.user.saved_runs) {
      saved_runs.push(this.props.user.saved_runs[run_id])
    };

    let runs = saved_runs.map(run =>
      <SavedRunItem
        run={run}
      />
    );


    return (
      <View style={{backgroundColor: Color.darkBackground, flex:1}}>
          {runs}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch)
}

function mapStateToProps(state) {
  const {user} = state
  return {user};
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedRunListScreen);
