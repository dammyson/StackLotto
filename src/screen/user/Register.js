// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text,Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';

import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'



export default class Login extends Component {
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
      <Container style={{ backgroundColor: '#fff' }}>
      <Content>
            <View style={styles.backgroundImage}>
             

              <View style={{flex:1}}>


              <View style={{margin:20, marginTop: 45}}>
              <Text style={styles.title}>Welcome  back. </Text>
              <Text style={styles.information}> create account</Text>

              </View>
              
                
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
                        color='#000'
                    />
              </TouchableOpacity>
                </View>
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
                        color='#000'
                    />
              </TouchableOpacity>
                </View>

              <View style={{marginTop: 9,  marginBottom: 9,flexDirection:'row' , marginLeft:45,   alignItems: 'center',}}>
              <View style={[{
                        height: 22,
                        width: 22,
                        borderWidth: 1.5,
                        borderColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight:10
                    }]}>
                    {this.state.condition ?
                        <View style={{
                            height: 10,
                            width: 10,
                            backgroundColor: '#000',
                        }} />

                    :
                        null
                    }
                    </View>
              <Text style={{ color: color.primary_colo, fontSize:14, fontWeight: '200' }}>I agreed to </Text> 
              <TouchableOpacity>
              <Text style={{ color: color.primary_colo,  fontSize:14,fontWeight: '400' }}>Terms & Conditions  </Text> 
              </TouchableOpacity>
              </View>



              
              <Button onPress={() =>  Actions.login()} style={styles.buttonContainer} block iconLeft>
               
               <Text style={{ color: '#fff', fontSize:14, fontWeight: '200' }}>Create Account </Text>
             </Button>


            

              </View>


              <View style={{margin:30, marginTop: 45, flexDirection:'row' ,   alignItems: 'center', justifyContent: 'center', padding:10, backgroundColor:color.primary_color}}>
              <Text style={{ color: '#fff', fontSize:14, fontWeight: '200' }}>Already have an account? </Text> 
              <TouchableOpacity onPress={() =>  Actions.login()}>
              <Text style={{ color: '#fff', fontSize:14, fontWeight: '400' }}>Sign In </Text> 
              </TouchableOpacity>
              </View>

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
    height: 50,
    color: color.primary_color,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#f5f5f5",
    fontSize:14,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft:10
  },
  buttonContainer: {
    height: 50,
    backgroundColor: color.secondary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
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
    backgroundColor: "#d1d1d1",
    fontSize:14,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft:10,
    justifyContent: 'center',
   
  },
});

