// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { RippleLoader } from 'react-native-indicator';
import Navbar from '../../component/Navbar';
import PasswordTextBox  from './../../component/PasswordTextBox';
import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'



export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      data: '',
      loading: false,
      old_password: '',
      password: '',
      c_password: '',

    };
  }


  componentDidMount() {
    AsyncStorage.getItem('data').then((value) => {
      if (value == '') { } else {
        this.setState({ data: JSON.parse(value) })
      }
    })

  }

  updatePasswordRequest() {

    const { data, old_password, password, c_password } = this.state
    if (old_password == "" || password == "") {
      Alert.alert('Validation failed', 'Password field (s) cannot be empty', [{ text: 'Okay' }])
      return
    }
    if (password != c_password) {
      Alert.alert('Validation failed', 'password  and confirm password must be same', [{ text: 'Okay' }])
      return
    } else {

    }
    this.setState({ loading: true })
    fetch(URL.url + 'profile/change/password/' + data.id + '/', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        old_password: old_password,
        new_password: password,
        new_password2: c_password,
      }),
    })
      .then(this.processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
        console.warn(statusCode, data)
        this.setState({ loading: false })
        if (statusCode == 200) {
          Alert.alert('Successful', 'Password changed successfully', [{ text: 'Okay' }])
        } else if (statusCode == 400) {
          Alert.alert('Operarion failed', 'Make sure the new password is defferent from the old one', [{ text: 'Okay' }])
        } else {
          Alert.alert('Operarion failed', '', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.setState({ loading: false })
      });

  }

  processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }
  render() {

    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon
            active
            name="arrowleft"
            type='antdesign'
            color='#FFF'
          />
        </Button>
      </Left>
    );


    if (this.state.loading) {
      return (
        <View
          style={[styles.backgroundImage, { height: Dimensions.get('window').height, }]}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.welcome}>
              <RippleLoader color={color.slide_color_dark} size={50} />
            </View>
            <Text style={{ color: color.slide_color_dark }}>Proccessing... </Text>
          </View>
        </View>
      );
    }

    return (
      <Container style={{ backgroundColor: color.primary_color }}>
        <Navbar left={left} title='My Account' bg='transparent' tbg='#fff' />
        <Content>
          <View style={styles.backgroundImage}>


            <View style={{ flex: 1 }}>
              <Text style={styles.information}> Name *</Text>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Enter Phone number"
                  placeholderTextColor={color.primary_color}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType='email-address'
                  autoCapitalize="none"
                  autoCorrect={false}
                  inlineImageLeft='ios-call'
                  style={{ flex: 1 }}
                  onChangeText={text => this.setState({ phone: text })}
                />
              </View>

              <Text style={styles.information}> Sex *</Text>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor={color.primary_color}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType='email-address'
                  autoCapitalize="none"
                  autoCorrect={false}
                  inlineImageLeft='ios-call'
                  style={{ flex: 1 }}
                  onChangeText={text => this.setState({ phone: text })}
                />

              </View>

              <Text style={styles.information}>Email *</Text>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={color.primary_color}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType='email-address'
                  autoCapitalize="none"
                  autoCorrect={false}
                  inlineImageLeft='ios-call'
                  style={{ flex: 1 }}
                  onChangeText={text => this.setState({ email: text })}
                />


              </View>

              <Text style={styles.information}>Phone Number</Text>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={color.primary_color}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType='email-address'
                  autoCapitalize="none"
                  autoCorrect={false}
                  inlineImageLeft='ios-call'
                  style={{ flex: 1 }}
                  onChangeText={text => this.setState({ email: text })}
                />


              </View>
              <Text style={styles.information}>Date of birth *</Text>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={color.primary_color}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType='email-address'
                  autoCapitalize="none"
                  autoCorrect={false}
                  inlineImageLeft='ios-call'
                  style={{ flex: 1 }}
                  onChangeText={text => this.setState({ email: text })}
                />
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
                  <Icon
                    active
                    name="calendar"
                    type='antdesign'
                    color='#5f6066'
                  />
                </TouchableOpacity>

              </View>

              <Text style={styles.informationHead}>Change password</Text>
              <Text style={styles.information}>Old Password *</Text>
              <PasswordTextBox icon="lock" label="Password" onChange={(v) => this.setState({ old_password: v })} />
             

              <Text style={styles.information}>Password *</Text>
              <PasswordTextBox icon="lock" label="Password" onChange={(v) => this.setState({ password: v })} />
              <Text style={styles.information}>Confirm Password *</Text>
                <PasswordTextBox icon="lock" label="Confirm Password" onChange={(v) => this.setState({ c_password: v })} />
             
            
             
            </View>





          


            <Button onPress={() => this.updatePasswordRequest()} style={styles.buttonContainer} block iconLeft>

              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '400' }}>Update Account </Text>
            </Button>


          </View>
        </Content>
      </Container>

    );
  }
  itemClicked(item) {
    Actions.product();
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,


  },
  input: {
    height: 45,
    color: color.primary_color,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#fff",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10
  },
  buttonContainer: {
    backgroundColor: color.secondary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center'

  },
  title: {
    marginTop: 7,
    marginBottom: 15,
    marginRight: 13,
    fontSize: 22,
    color: color.primary_color,
    textAlign: 'left',
    fontWeight: '900'
  },
  inputView: {
    height: 45,
    flexDirection: 'row',
    color: color.primary_color,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#fff",
    fontSize: 13,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  information: {
    marginLeft: 30,
    color: '#fff',
    marginTop: 10,
    fontSize: 12,
  },
  informationHead: {
    marginLeft: 30,
    color: '#fff',
    marginTop: 10,
    fontSize: 13,
    fontWeight: '400'
  }
});

