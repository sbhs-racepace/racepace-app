// Jason Yu

import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import RunItem from '../components/RunItem';
import Button from '../components/Button';
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
});

class RunListScreen extends React.Component {
  render() {
    if (!this.props.user.token) {
      return <Text>Please login to see your feed</Text>;
    }

    const test_data = (
      <ScrollView contentContainerStyle={STYLES.scrollView}>
        <RunItem
          name="Circular Quay Run"
          start="Hyde Park"
          end="Circular Quay"
          postTime="10am"
          length="1"
        />
        <RunItem
        name="Circular Quay Run"
          start="Hyde Park"
          end="Circular Quay"
          start_time="10am"
          length="1"
        />
        <RunItem
          name="Circular Quay Run"
          start="Hyde Park"
          end="Circular Quay"
          start_time="10am"
          length="1"
        />
      </ScrollView>
    );

    return (
      <View style={{flex:1,backgroundColor:Color.lightBackground}}>
        {test_data}
        {/* {
          this.props.user.runs.map(run=>
          <RunItem
            postTime={run.start_time}
            length={run.distance}
          />)
        } */}
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
