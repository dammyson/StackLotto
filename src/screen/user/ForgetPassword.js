// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { RippleLoader } from 'react-native-indicator';
import { Card, Icon, SocialIcon } from 'react-native-elements'

import color from '../../component/color'



export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      phone: '',
      loading: false,
    
    };
  }


  componentDidMount() {
    AsyncStorage.getItem('type').then((value) => {
      value == '' ? this.setState({ type: "null" }) : this.setState({ type: value })
    })


  }

  forgetPasswordRequest() {

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

    console.warn(phonenumber);
   
    fetch(URL.url + 'profile/forget/password/', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        phone: phonenumber,
      }),
    })
      .then(this.processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
          console.warn(statusCode, data)

        if (statusCode === 200) {
          Alert.alert(
            'Alert',
             data.message,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => Actions.changepass({id: data.profile_id })},
            ],
            { cancelable: false }
          )
        
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
            <RippleLoader color={color.slide_color_dark} size={50} />
            </View>
            <Text style={{ color: color.slide_color_dark }}>login in... </Text>
          </View>
        </View>
      );
    }


    return (
            <View style={styles.backgroundImage}>
             

              <View>


              <View style={{margin:30, marginTop: 45}}>
              <Text style={styles.title}>{"Password \nRecovery"} </Text>
              <Text style={styles.information}>We just need your phone number to send you password reset code</Text>

              </View>
              
              <View style={ styles.inputView}>
                <TextInput
                    placeholder="Phone number"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.forgetPasswordRequest()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ phone: text })}
                  />

                  
                </View>
              
              <Button onPress={() =>  this.forgetPasswordRequest()} style={styles.buttonContainer} block iconLeft>
               
               <Text style={{ color: '#fff', fontSize:14, fontWeight: '400' }}>Reset Password </Text>
             </Button>


              <View style={{margin:30, marginTop: 19, flexDirection:'row' ,   alignItems: 'center', justifyContent: 'center', padding:20,}}>
              
              <TouchableOpacity onPress={() =>  Actions.login()}>
              <Text style={{ color: color.primary_colo, fontSize:14, fontWeight: '600' }}>{"<< Back to login page "}  </Text> 
              </TouchableOpacity>
              </View>

              </View>



            </View>

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
    height: Dimensions.get('window').height,
    justifyContent: 'center',
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
  buttonContainer: {
    backgroundColor: color.secondary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center'

  },
  information:{
    color: '#5f6066',
    marginTop: 10,
    fontSize:13,
    marginBottom: 30,
  },
 
  title: {
    marginTop: 7,
    marginBottom: 15,
    marginRight: 10,
    fontSize: 22,
    color: color.primary_color,
    textAlign: 'left',
    fontWeight: '900'
  },
});

