// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text,Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import Navbar from '../../component/Navbar';

import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'



export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      phone: '',
      loading: false,
      type: '',
      condition: false
    };
  }


  componentDidMount() {
    AsyncStorage.getItem('type').then((value) => {
      value == '' ? this.setState({ type: "null" }) : this.setState({ type: value })
    })


  }

  registrationRequest() {

    const { phone, type } = this.state

    if (phone == "") {
      Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
      return
    } else {
      if (phone.length == 15 || phone.length == 11) {

      } else {
        Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
      }

    }
    this.setState({ loading: true })
    var phonenumber = 0 + phone.substr(phone.length - 10);
    const formData = new FormData();
    formData.append('phone', phonenumber);
    formData.append('user_type', type)
    this.setState({ loading: true })
    fetch(URL.url + '/register', {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(this.processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
        if (statusCode === 201) {
          AsyncStorage.setItem('auth', data.data.token.toString());
          AsyncStorage.setItem('step', 'one');
          Actions.addpin();
        } else if (statusCode === 422) {
          Alert.alert('Validation failed', 'Phone number already exits', [{ text: 'Okay' }])
        } else {
          Alert.alert('Operarion failed', 'Please check your phone number and retry', [{ text: 'Okay' }])
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
          style={styles.backgroundImage}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.welcome}>
              <PulseIndicator color={color.slide_color_dark} size={70} />
            </View>
          </View>
        </View>
      );
    }

    return (
      <Container style={{ backgroundColor: color.primary_color }}>
        <Navbar left={left} title='My Account' bg='transparent'  tbg='#fff' />
      <Content>
            <View style={styles.backgroundImage}>
             

              <View style={{flex:1}}>
              <Text style={styles.information}> Name *</Text>
              <View style={ styles.inputView}>
                <TextInput
                    placeholder="Enter Phone number"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ phone: text })}
                  />   
                </View>
                  
                <Text style={styles.information}> Sex *</Text>
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Full Name"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ phone: text })}
                  />
  
                </View>

                   <Text style={styles.information}>Email *</Text>
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ email: text })}
                  />

                  
                </View>

                 <Text style={styles.information}>Phone Number</Text>
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ email: text })}
                  />

                  
                </View>
                <Text style={styles.information}>Date of birth *</Text>
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ email: text })}
                  />
  <TouchableOpacity  style={{ alignItems: 'center', justifyContent: 'center', marginRight:20}}>
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
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Old Password"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ password: text })}
                  />

                   <TouchableOpacity  style={{ alignItems: 'center', justifyContent: 'center', marginRight:20}}>
                   <Icon
                        active
                        name="ios-eye"
                        type='ionicon'
                        color='#5f6066'
                    />
              </TouchableOpacity>
                </View>

                <Text style={styles.information}>Password *</Text>
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ password: text })}
                  />

                   <TouchableOpacity  style={{ alignItems: 'center', justifyContent: 'center', marginRight:20}}>
                   <Icon
                        active
                        name="ios-eye"
                        type='ionicon'
                        color='#5f6066'
                    />
              </TouchableOpacity>
                </View>
                <Text style={styles.information}>Comfirm Password *</Text>
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ c_password: text })}
                  />

                   <TouchableOpacity  style={{ alignItems: 'center', justifyContent: 'center', marginRight:20}}>
                   <Icon
                        active
                        name="ios-eye"
                        type='ionicon'
                        color='#5f6066'
                    />
              </TouchableOpacity>
                </View>
              </View>

  <Button onPress={() =>  Actions.logina()} style={styles.buttonContainer} block iconLeft>
               
               <Text style={{ color: '#fff', fontSize:14, fontWeight: '400' }}>Update Account </Text>
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
  welcome: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    fontSize:14,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft:10
  },
  buttonContainer: {
    backgroundColor: color.primary_color,
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
    flexDirection:'row',
    color: color.primary_color,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#fff",
    fontSize:13,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft:10,
    justifyContent: 'center',
  },
  information:{
    marginLeft: 30,
    color: '#fff',
    marginTop: 10,
    fontSize:12,
  },
  informationHead:{
    marginLeft: 30,
    color: '#fff',
    marginTop: 10,
    fontSize:13,
    fontWeight:'400'
  }
});

