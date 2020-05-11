// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import URL from '../../component/server'
import { RippleLoader } from 'react-native-indicator';
import { Card, Icon, SocialIcon } from 'react-native-elements'

import color from '../../component/color'



export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      code: '',
      loading: false,
      data: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('data').then((value) => {
      if (value == '') { } else {
        this.setState({ data: JSON.parse(value) })
      }
    })

  }


  verificationRequest(code) {

    this.setState({ loading: true })
    const { data } = this.state
    console.warn(data)

    if (code == "") {
      Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
      return
    } else {

    }

    fetch(URL.url + 'profile/verify/code/' +data.id+ '/', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        code: code,
      }),
    })
    .then(res => res.json())
      .then(res => {
        this.setState({ loading: false })
          if (res.success) {
            Actions.home()
          } else {
            Alert.alert('Operarion failed', 'Please check your phone, get the approprate code and retry', [{ text: 'Okay' }])
          }
       
      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.setState({ loading: false })
      });

  }

  resendVerificationcodeRequest() {

    this.setState({ loading: true })
    const { data } = this.state
   

    fetch(URL.url + 'profile/resend/code/'+data.id+'/'+data.phone+'/', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
      }),
    })
    .then(this.processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
        console.warn(statusCode, data )
        this.setState({ loading: false })
          if (statusCode == 200) {
            Alert.alert('Successfull', 'Please check your phone, get the approprate code and retry', [{ text: 'Okay' }])
          } else {
            Alert.alert('Operarion failed', 'Please check your phone, get the approprate code and retry', [{ text: 'Okay' }])
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
            <Text style={{ color: color.slide_color_dark }}>Proccessing... </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.backgroundImage}>

        <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={{ margin: 30, marginTop: 45 }}>
            <Text style={styles.title}>{"Enter \nVerification Code"} </Text>
            <Text style={styles.information}>A text message with a 6 digit code was sent to your phone</Text>

          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <OTPInputView
              style={{
                width: '70%', height: 70, marginLeft: 30,
                marginRight: 30, justifyContent: 'center', color: '#fff',
              }}
              pinCount={6}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => { this.setState({ code }) }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code => {
                this.verificationRequest(code)
              })}
            />
          </View>




          <Text style={{ textAlign: 'center', color: '#000', fontSize: 14, fontWeight: '200', opacity: 0.6 }}>Didn't get text? </Text>



          <View style={{ margin: 30, marginTop: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, }}>

            <TouchableOpacity onPress={() => this.resendVerificationcodeRequest()}>
              <Text style={{ color: color.primary_colo, fontSize: 15, fontWeight: '900' }}>{"RESEND "}  </Text>
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
    backgroundColor: '#fff',
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
  information: {
    marginLeft: 3,
    color: '#5f6066',
    marginTop: 10,
    fontSize: 13,
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
    borderBottomWidth: 4,
    borderColor: "black",
    color: 'black'
  },

  underlineStyleHighLighted: {
    borderColor: "black",
  },
});

