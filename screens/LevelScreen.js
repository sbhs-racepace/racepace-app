// Roy Wu

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Color from '../constants/Color'
import BackButtonHeader from '../components/BackButtonHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class LevelScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      points: 24759,
      remainder: 5241,
    };
  }

  levelcalc(points) {
    let levelpoints = 0.6 * Math.sqrt(points);
    let level = Math.floor(levelpoints)
    return level
  }

  levelToPoints(level) {
    let points = Math.floor((level / 0.6) ** 2)
    return points
  }

  calculateRemainder(points) {
    let currentLevel = this.levelcalc(points)
    let nextLevelPoints = this.levelToPoints(currentLevel + 1)
    return nextLevelPoints - points
  }

  calculateLevelProgress(points) {
    let currentLevel = this.levelcalc(points)
    let currentLevelPoints = this.levelToPoints(currentLevel)
    let nextLevelPoints = this.levelToPoints(currentLevel + 1)
    let level_total = Math.abs(nextLevelPoints - currentLevelPoints)
    let level_progress = Math.abs(points - currentLevelPoints)
    let progress = level_progress / level_total
    return progress
  }


  render() {
    const STYLES = StyleSheet.create({
      progressBar: {
        backgroundColor: 'gray',
        width: '80%',
        height: '15%',
        borderRadius: 20,
      },
      progressBarFill: {
        backgroundColor: 'blue',
        width: (this.calculateLevelProgress(this.props.user.stats.points)) * 100 + '%',
        height: '100%',
        borderRadius: 20,
      },
      remainderText: {
          fontSize: 25, 
          textAlign: 'center', 
          width: '80%',
      },
      header: {
      top: '0%',
      borderWidth: 1,
      },
    });

    return (
      <View style={{flex:1, backgroundColor:Color.lightBackground}}>
        <BackButtonHeader
          title='Level'
          onPress={this.props.navigation.goBack}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: 40 }}>You are level {this.levelcalc(this.props.user.stats.points)}</Text>
          <Text style={{ fontSize: 40 }}>{this.props.user.stats.points} points</Text>
          <View style={STYLES.progressBar}>
            <View style={STYLES.progressBarFill} />
          </View>
          <Text style={STYLES.remainderText}>
            {this.calculateRemainder(this.props.user.stats.points)} more points are required to level up. Race on!
          </Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LevelScreen);
