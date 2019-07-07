// Calvin Chang

import React from 'react';
import { DocumentPicker } from 'expo';
import { View, Alert, Text, ScrollView, AppRegistry, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import TextInput from '../components/TextInput'
import { Image } from 'react-native-elements'
import { login } from '../functions/login'
import Button from '../components/Button';
import BackButtonHeader from '../components/BackButtonHeader';
import Color from '../constants/Color';
import '../global.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  chsfile: {
    width: 80,
    height: 30,
    borderRadius: 10,
    alignSelf: 'center'
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    width: windowWidth * 0.8,
    borderRadius: 10,
    marginTop: 5,
    color: Color.textColor,
    backgroundColor: Color.lightBackground2,
  },
  profile_image: {
    height: windowWidth * 0.25,
    width: windowWidth * 0.25,
    borderRadius: windowWidth * 0.25 / 2,
    alignSelf: 'center'
  },
  container : {
    flex: 1,
    backgroundColor: Color.lightBackground,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  saveButton: {
    width: '80%',
    borderRadius: 10,
    fontSize: 14,
    alignSelf:'center'
  }
});

class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: global.serverURL + `/api/avatars/${this.props.user.user_id}.png`,
      new_username: null,
      new_password: null,
      bio: null,
      full_name: null,
      image: null,
      current_password: null,
      confirmation_password: null,
    };
  }

  async saveChanges() {
    let login_data = await login(this.props.user.email, this.state.current_password)
    let equivalent_new = this.state.new_password == this.state.confirmation_password
    let data = {
      username: this.state.new_username,
      password: this.state.new_password,
      bio: this.state.bio,
      full_name: this.state.full_name,
      image: this.state.image,
    };
    if (login_data.success) {
      if (equivalent_new) {
        let api_url = global.serverURL + '/api/update_profile';
        fetch(api_url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            Authorization: this.props.user.token,
          }),
        })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(async res => {
          res = await res.json()
          if (res.success == true) {
            Alert.alert('Changed details')
          } else {
            Alert.alert(res.error)
          }
        });
      } else {
        Alert.alert("New Passwords don't match")
      }
    } else {
      Alert.alert('Current Password was not correct')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={STYLES.container}>
        <BackButtonHeader title='Edit Screen' onPress={this.props.navigation.goBack} />
        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{flex:2/5}}>
              <Image
                style={STYLES.profile_image}
                source={{
                  uri: this.state.uri,
                }}
              />
              <Button
                text="Choose File"
                style={STYLES.chsfile}
                onPress={async () => {
                  let { uri, type } = await DocumentPicker.getDocumentAsync({
                    type: 'image/*',
                  });
                  if (type == 'success') {
                    this.setState({ uri });
                  }
                }}
              />
            </View>
            <View style={{ flex:3/5 }}>
              <TextInput 
                placeholder="Name" 
                style={{ ...STYLES.input, width: windowWidth * 0.45 }}
                returnKeyType="go"
                onChangeText={full_name => this.setState({ full_name })}
              />
              <TextInput
                placeholder="Enter Bio"
                onChangeText={bio => this.setState({ bio })}
                style={{ ...STYLES.input, width: windowWidth * 0.45 }}
                text_style={{height: windowWidth * 0.3, fontSize: 12, width: windowWidth * 0.45}}
                returnKeyType="go"
                multiline={true}
              />
            </View>
          </View>

          <View style={{alignItems:'center', justifyContent:'space-evenly', height: windowHeight * 0.5}}>
            <TextInput 
              style={STYLES.input} 
              placeholder="New Username"
              returnKeyType="go"
              onChangeText={new_username => this.setState({ new_username })} 
            />
            <TextInput 
              placeholder="New Password" 
              style={STYLES.input} 
              secureTextEntry={true}
              autoCapitalize="none"
              returnKeyType="go"
              onChangeText={new_password => this.setState({ new_password })}
            />
            <TextInput 
              placeholder="New Password Confirmation" 
              style={STYLES.input} 
              secureTextEntry={true}
              autoCapitalize="none"
              returnKeyType="go"
              onChangeText={confirmation_password => this.setState({ confirmation_password })}
            />
            <TextInput 
              placeholder="Current Password" 
              style={STYLES.input} 
              secureTextEntry={true}
              autoCapitalize="none"
              returnKeyType="go"
              onChangeText={current_password => this.setState({ current_password })}
            />
            <Button
              text="Save Changes"
              style={STYLES.saveButton}
              onPress={this.saveChanges.bind(this)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);
