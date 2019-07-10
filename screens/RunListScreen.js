// Jason Yu

import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements'
import '../global'
import Color from '../constants/Color'
import { connect } from 'react-redux';
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
      <Card 
        title={this.props.run.date}
        titleStyle={{color: Color.textColor}}
        dividerStyle={{display: 'none'}}
        containerStyle={STYLES.card}
      >
        <Text style={STYLES.text}>Duration: {this.props.run.duration.minutes}:{this.props.run.duration.seconds}</Text>
        <Text style={STYLES.text}>Distance: {this.props.run.distance}km</Text>
        <Text style={STYLES.text}>Pace: {this.props.run.average_pace.minutes}:{this.props.run.average_pace.seconds}</Text>
      </Card>
    )
  }
}

class RunListScreen extends React.Component {
  render() {
    if (!this.props.user.token) {
      return <Text>Please login to see your runs</Text>;
    }

    runs = [1,2,3]
    let test_data = runs.map(route => 
      <RunItem 
        run={{
          date:'Saturday June 10am',
          distance:1,
          average_pace: {minutes:4,seconds:30},
          duration: {minutes:20,seconds:30},
        }}
      />
    );

    return (
      <View style={{flex:1,backgroundColor:Color.darkBackground}}>
        <ScrollView>
          {test_data}
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
