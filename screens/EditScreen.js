// Calvin Chang

import React from 'react';
import { DocumentPicker } from 'expo';
import { View, Alert, Text, ScrollView, AppRegistry, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import TextInput from '../components/TextInput'
import { Image } from 'react-native-elements'
import { login, getUserInfo } from '../functions/login'
import Button from '../components/Button';
import BackButtonHeader from '../components/BackButtonHeader';
import Color from '../constants/Color';
import '../global.js';
import { storeUserInfo, storeLoginInfo } from '../functions/user_info_action'
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
    width: windowWidth * 0.8,
    marginTop: 5,
  },
  profile_image: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    borderRadius: windowWidth * 0.3 / 2,
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
            let user_info = await getUserInfo(this.props.user.token)
            await this.props.storeUserInfo(user_info)
            Alert.alert('Changed User Details')
          } else {
            Alert.alert(res.error)
          }
        });
      } else {
        Alert.alert("New Password doesn't match with Confirmation Password")
      }
    } else {
      Alert.alert('Password was incorrect')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Color.lightBackground}}>
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
                style={{ ...STYLES.input, width: windowWidth * 0.50 }}
                returnKeyType="go"
                onChangeText={full_name => this.setState({ full_name })}
              />
              <TextInput
                placeholder="Enter Bio"
                onChangeText={bio => this.setState({ bio })}
                style={{ ...STYLES.input, width: windowWidth * 0.50 }}
                text_style={{height: windowWidth * 0.3, fontSize: 12, width: windowWidth * 0.50}}
                returnKeyType="go"
                multiline={true}
              />
            </View>
          </View>

          <View style={{alignItems:'center', justifyContent:'space-evenly', height: windowHeight * 0.8}}>
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
              onPress={async () => {
                await this.saveChanges();
                this.props.navigation.navigate('Profile')
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeUserInfo, storeLoginInfo }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);
