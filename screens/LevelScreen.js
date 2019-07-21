// Roy Wu, Jason

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Color from '../constants/Color'
import BackButtonHeader from '../components/BackButtonHeader';
import { connect } from 'react-redux';
import { levelCalc, levelToPoints, calculateRemainder, calculateLevelProgress } from '../functions/points';
import { bindActionCreators } from 'redux';


class LevelScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const STYLES = StyleSheet.create({
      progressBar: {
        backgroundColor: 'gray',
        width: '80%',
        height: '30%',
        borderRadius: 25,
      },
      progressBarFill: {
        backgroundColor: 'blue',
        width: (calculateLevelProgress(this.props.user.stats.points)) * 100 + '%',
        height: '100%',
        borderRadius: 25,
      },
      text: {
        fontSize: 40,
        color:Color.textColor,
      },
      remainderText: {
          fontSize: 20, 
          textAlign: 'center', 
          width: '80%',
          color:Color.textColor,
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
        <View style={{justifyContent: 'center', flex:1}}>
          <View style={{ alignItems: 'center', height:"50%", justifyContent:'space-around' }}>
            <Text style={STYLES.text}>You are level {levelCalc(this.props.user.stats.points)}</Text>
            <Text style={STYLES.text}>{this.props.user.stats.points} points</Text>
            <View style={STYLES.progressBar}>
              <View style={STYLES.progressBarFill} />
            </View>
            <Text style={STYLES.remainderText} multiline={true}>
              {calculateRemainder(this.props.user.stats.points)} more point{this.props.user.stats.points>1 ? ' is' :'s are'} required to level up. Race on!
            </Text>
          </View>
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
