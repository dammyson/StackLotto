// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import { Card, Icon, SocialIcon } from 'react-native-elements'

import color from '../../component/color'



export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      phone: '',
      loading: false,
      type: '',
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
            <View style={styles.backgroundImage}>
             
              <View style={{justifyContent:'flex-start', alignItems:'center'}}>
              <View style={{margin:30, marginTop: 45}}>
              <Text style={styles.title}>{"Enter \nVerification Code"} </Text>
              <Text style={styles.information}>A text message with a 6 digit code was sent to your phone</Text>

              </View>
              
              <View style={{justifyContent:'center', alignItems:'center'}}>
              <OTPInputView
                                            style={{
                                                width: '70%', height: 70, marginLeft: 30,
                                                marginRight: 30, justifyContent: 'center', color: '#fff',
                                            }}
                                            pinCount={6}
                                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                            // onCodeChanged = {code => { this.setState({code})}}
                                            autoFocusOnLoad
                                            codeInputFieldStyle={styles.underlineStyleBase}
                                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                            onCodeFilled={(code => {
                                                Actions.home();
                                            })}
                                        />
                </View>
              
              
             
               
               <Text style={{ textAlign:'center', color: '#000', fontSize:14, fontWeight: '200', opacity:0.6 }}>Didn't get text? </Text>
            


              <View style={{margin:30, marginTop: 19, flexDirection:'row' ,   alignItems: 'center', justifyContent: 'center', padding:20,}}>
              
              <TouchableOpacity  onPress={() =>  Actions.login()}>
              <Text style={{ color: color.primary_colo, fontSize:14, fontWeight: '600' }}>{"RESEND "}  </Text> 
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
  
    alignItems: 'center',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundImage: {
    backgroundColor:'#fff',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  inputView: {
  
  
    marginLeft: 30,
    marginRight: 30,
  
   
  },
  buttonContainer: {
    backgroundColor: color.secondary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    height: 50,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center'

  },
  information:{
    marginLeft: 3,
    color: '#5f6066',
    marginTop: 10,
    fontSize:13,
    marginBottom: 30,
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
  borderStyleBase: {
    width: 30,
    height: 45
},

borderStyleHighLighted: {
    borderColor: "red",
},

underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: "black",
    color:'black'
},

underlineStyleHighLighted: {
    borderColor: "black",
},
});

