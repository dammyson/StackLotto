// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { RippleLoader } from 'react-native-indicator';
import Navbar from '../../component/Navbar';
import Modal, { ModalContent } from 'react-native-modals';

import RNPaystack from 'react-native-paystack';
RNPaystack.init({ publicKey: 'pk_test_e4ac7acbc8627f70face51c904aaf3171ed824e0' });

import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'


export default class FundWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      loading: false,
      balance: '',
      gamesDetails: {},
      amount: 0,
      cv: '',
      ex: '',
      cn: ''

    };
  }



  componentDidMount() {
    AsyncStorage.getItem('data').then((value) => {
      if (value == '') { } else {
        this.setState({ data: JSON.parse(value) })
      }
      console.warn(value)
    })
    AsyncStorage.getItem('balance').then((value) => {
      this.setState({ 'balance': value.toString() })
      console.warn(value)
    })

  }

  currencyFormat(n) {
    return n.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
  processFundWallet() {

    const {  data, amount } = this.state
    this.setState({ loading: true })
    fetch(URL.url + 'profile/credit/wallet/' + data.id + '/', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        amount: amount,
      }),
    })
      .then(this.processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
        console.warn(statusCode, data)
        this.setState({ loading: false })
        if (statusCode == 200) {
          AsyncStorage.setItem('balance', this.currencyFormat(data.data.amount));
          this.setState({ balance: this.currencyFormat(data.data.amount) })
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


  chargeCard() {

    const { cn, ex, cv, amount, data } = this.state

    console.warn( cn, ex, cv, amount, data )

    var card_lenghts = [16, 17, 18, 19, 20];
    if (!card_lenghts.includes(cn.length)) {
        Alert.alert('Operation failed', 'Invalide card number, remove spaces if present', [{ text: 'Okay' }])
        return
    }


    if (!ex.includes('/')) {
        Alert.alert('Operation failed', 'Invalide Expiry date', [{ text: 'Okay' }])
        return
    }
    if (cv.length != 3) {
        Alert.alert('Operation failed', 'Invalide card cvv', [{ text: 'Okay' }])
        return
    }
   

    var res = ex.split("/");
    this.setState({ loading: true })
    RNPaystack.chargeCard({
        cardNumber: cn,
        expiryMonth: res[0],
        expiryYear: res[1],
        cvc: cv,
        email: "pechbusorg@yahoo.com",
        amountInKobo: amount * 100,
    })
        .then(response => {
            console.warn(response); // card charged successfully, get reference here
            this.processFundWallet(response)
        })
        .catch(error => {
            this.setState({ loading: false })
            console.warn(error);
            Alert.alert('Process failed', error.message, [{ text: 'Okay' }])// error is a javascript Error object
        })
      
}


handleChange = (text) => {

    let textTemp = text;
    if (textTemp[0] !== '1' && textTemp[0] !== '0') {
        textTemp = '';
    }
    if (textTemp.length === 2) {
        if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) == 0) {
            textTemp = textTemp[0];
        } else if (this.state.ex.length === 1) {
            textTemp += '/';
        } else {
            textTemp = textTemp[0];
        }
    }
    this.setState({ ex: textTemp })
}


  render() {
    const { data, allSelectedTickets, gamesDetails, balance } = this.state

    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon
            active
            name="arrowleft"
            type='antdesign'
            color={color.primary_color}
          />
        </Button>
      </Left>
    );

    var right = (
      <Right style={{ flex: 1 }}>
        <View>
          <Text style={{ color: '#000', fontSize: 12, fontWeight: '600' }}>My Balance</Text>
          <Text style={{ color: '#000', fontSize: 12, fontWeight: '600' }}>N {balance}  </Text>
        </View>

      </Right>
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
            <Text style={{ color: color.slide_color_dark }}>processing ... </Text>
          </View>
        </View>
      );
    }

    return (
      <Container style={{ backgroundColor: color.primary_color }}>
        <Navbar right={right} left={left} title='Paystack' bg='#fff' />
        <Content>
          <View style={styles.backgroundImage}>


            <View style={{ flex: 1 , paddingTop: 20}}>
            <View style={ styles.inputView}>
                <TextInput
                    placeholder="Enter amount"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.first_name.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ amount: text })}
                  />

                  
                </View>


                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Enter Card number"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.first_name.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ cn: text })}
                  />

                  
                </View>
            
                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Enter Exp"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.first_name.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={this.handleChange}
                    defaultValue={this.state.ex}
                  />

                  
                </View>

                <View style={ styles.inputView}>
                <TextInput
                    placeholder="Enter CVV"
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    onSubmitEditing={() => this.first_name.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{flex:1}}
                    onChangeText={text => this.setState({ cv: text })}
                  />

                  
                </View>
            
                <View style={{ flex: 1 , paddingTop: 20,  }}>
                <TouchableOpacity onPress={() => this.chargeCard()} style={[styles.buttonContainer, { marginTop: 20 }]} block iconLeft>
                                        <Text style={{ color: "#fff", marginTop: 10, marginBottom: 15, fontSize: 16, fontWeight: '500', }}>PAY</Text>
                                    </TouchableOpacity>

                                    </View>


            </View>

          </View>

        
        </Content>
      </Container>

    );
  }
 


}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
    height: 40,
    color: color.primary_color,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#f5f5f5",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10
  },
  multipleContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    flex: 6,
  },
  buttonViewStyle: {
    borderRadius: 4,
    height: 40,
    width: 40,
    shadowColor: '#000',
    backgroundColor: "#fff",
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    color: '#000',
    fontWeight: '900',
    margin: 5
  },
  inputView: {
    height: 40,
    flexDirection: 'row',
    color: color.primary_color,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: "#fff",
    fontSize: 14,
    paddingLeft: 10,
    justifyContent: 'center',
    flex: 3,
    marginTop:20,
    borderRadius:10

  },
  buttonStepTwoViewStyle: {
    borderRadius: 4,
    height: 40,
    width: 40,
    shadowColor: '#000',
    backgroundColor: "#fff",
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    color: '#000',
    fontWeight: '900',
    margin: 5,

  },
  buttonContainer: {
    height: 40,
    backgroundColor: color.secondary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center'
  },
});

