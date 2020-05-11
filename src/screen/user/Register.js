// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text,Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { RippleLoader } from 'react-native-indicator';

import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'
import PasswordTextBox  from './../../component/PasswordTextBox';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
      password: '',
      password2: '',
      loading: false,
      agree: false
    };
  }


  componentDidMount() {
    AsyncStorage.getItem('type').then((value) => {
      value == '' ? this.setState({ type: "null" }) : this.setState({ type: value })
    })


  }

  registrationRequest() {

    const { phone,email, last_name, first_name, password, agree,  password2} = this.state
    console.warn(password)

    if (phone == "" || email == "" || last_name == "" || first_name == "" || password == "" || password2 == "") {
      Alert.alert('Validation failed', 'one or more fields are empty', [{ text: 'Okay' }])
      return
    } else {
    }
    if (!agree) {
      Alert.alert('Validation failed', 'Please agree to our terms and conditons', [{ text: 'Okay' }])
      return
    } else {
     


    }
  
    this.setState({ loading: true })
    fetch(URL.url + 'profile/register/', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        age: 23,
        password: password,
        password2: password2,
      }),
    })
      .then(this.processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
        console.warn(data)
        if (statusCode === 200) {
          Actions.login({type: 'replace'});
        } else if (statusCode === 422) {
          if(data.phone){
            Alert.alert('Validation failed', data.phone.Phone, [{ text: 'Okay' }])
          }
        } else {
          Alert.alert('Validation failed', 'Error connection to the server please check you details and try again', [{ text: 'Okay' }])
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



  _updateState(loo, ll){
    console.warn(loo, ll)

  }
  render() {


    if (this.state.loading) {
      return (
        <View
          style={[styles.backgroundImage, {height: Dimensions.get('window').height,}]}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.welcome}>
              <RippleLoader color={color.slide_color_dark} size={50} />
            </View>
            <Text style={{ color: color.slide_color_dark }}>login in... </Text>
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
                    onSubmitEditing={() => this.first_name.focus()}
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
                    placeholder="First Name"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.last_name.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    ref={(input) => this.first_name = input}
                    onChangeText={text => this.setState({ first_name: text })}
                  />

                   
                </View>
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.email.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    ref={(input) => this.last_name = input}
                    onChangeText={text => this.setState({ last_name: text })}
                  />

                   
                </View>
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.password.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    ref={(input) => this.email = input}
                    onChangeText={text => this.setState({ email: text })}
                  />

                  
                </View>
               
                <PasswordTextBox icon="lock" label="Password" onChange={(v) => this.setState({ password: v })} />
                <PasswordTextBox icon="lock" label="Confirm Password" onChange={(v) => this.setState({ password2: v })} />


               

              <View style={{marginTop: 9,  marginBottom: 9,flexDirection:'row' , marginLeft:45,   alignItems: 'center',}}>
              { !this.state.agree ?
              <TouchableOpacity onPress={() => this.setState({ agree: true })} style={[{
                height: 18,
                width: 18,
                borderWidth: 1,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 3
            }]}>
               
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.setState({  agree: false})} style={[{
                  height: 18,
                  width: 18,
                  borderWidth: 1,
                  borderColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 3
              }]}>
                <View style={{
                          height: 12,
                          width: 12,
                          backgroundColor: '#000',
                      }} />
                </TouchableOpacity>

            }

              <Text style={{ color: color.primary_colo, fontSize:14, fontWeight: '200' }}>I agreed to </Text> 
              <TouchableOpacity>
              <Text style={{ color: color.primary_colo,  fontSize:14,fontWeight: '400' }}>Terms & Conditions  </Text> 
              </TouchableOpacity>
              </View>



              
              <Button onPress={() =>  this.registrationRequest()} style={styles.buttonContainer} block iconLeft>
               
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

