// Jason Yu

import React from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import Button from '../components/Button.js'
import Color from '../constants/Color.js'
import '../global.js'
import { startRun, addLocationPacket } from '../functions/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const STYLES = StyleSheet.create({
  text_style: {
    color: Color.textColor,
    fontSize: 20
  },
  title_style: {
    fontSize: 30,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: Color.textColor
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    padding: '1%',
    marginTop: 5,
    color: Color.textColor,
    backgroundColor: Color.lightBackground
  }
})

class SaveRunScreen extends React.Component {
  constructor (state) {
    super(state)
    this.state = {
      name: 'name',
      description: 'description'
    }
  }

  async saveRun () {
    let data = {
      name: this.state.name,
      description: this.state.description,
      route: this.props.navigation.state.params
    }
    let api_url = `${global.serverURL}/api/save_route`
    fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: global.login_info.token
      })
    })
      .catch(res => {
        Alert.alert('Error connecting to server', res)
      })
      .then(async () => {
        console.log('Success Saving Route')
      })
  }

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: Color.lightBackground }}>
        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          <Text style={STYLES.title_style}>Save Run Screen</Text>
          <Text style={STYLES.text_style}>Good job on your run!</Text>
          <Text style={STYLES.text_style}>Here are some stats.</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          <Text style={STYLES.title_style}>Saved Run Description</Text>
          <TextInput
            style={STYLES.input}
            onChangeText={name => {
              this.setState({ name: name })
            }}
            defaultValue='Name'
          />
          <TextInput
            style={STYLES.input}
            onChangeText={description => {
              this.setState({ description: description })
            }}
            defaultValue='Description'
          />
        </View>
        <Button
          text="Save Run"
          onPress={() => {
            this.saveRun()
            this.props.navigation.navigate('Feed')
          }}
        />
      </View>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addLocationPacket, startRun }, dispatch)
}

function mapStateToProps (state) {
  return state
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveRunScreen)
