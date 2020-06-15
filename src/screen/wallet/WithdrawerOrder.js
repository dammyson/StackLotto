// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import Navbar from '../../component/Navbar';
import Modal, { ModalContent } from 'react-native-modals';

import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'

import RNPickerSelect from 'react-native-picker-select';


const sports = [
    {
      label: 'Football',
      value: 'football',
    },
    {
      label: 'Baseball Baseball Baseball Baseball',
      value: 'baseball',
    },
    {
      label: 'Hockey',
      value: 'hockey',
    },
  ];

export default class WithdrawerOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      phone: '',
      loading: false,
      type: '',
      condition: false,
      account:'',
      complete_transaction:false
    };
  }


  componentDidMount() {
    AsyncStorage.getItem('type').then((value) => {
      value == '' ? this.setState({ type: "null" }) : this.setState({ type: value })
    })


  }


  render() {

    const placeholder = {
        label: 'Select a account...',
        value: null,
        color:"#000",
      };

    var left = (
      <Left style={{ flex: 1 }}>
       <Button transparent onPress={()=>Actions.pop()}>
          <Icon
            active
            name="arrowleft"
            type='antdesign'
            color={color.primary_color}
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
        <Navbar left={left} title='Wallet' bg='#fff' />
        <Content>
          <View style={styles.backgroundImage}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <View style={[styles.card, { marginLeft: 12 }]}>

                  <View style={{ marginRight: 10 }}>
                    <Icon
                      active
                      name="wallet"
                      type='entypo'
                      color={color.secondary_color}
                      size={40}
                    />
                  </View>
                  <View>
                    <Text style={{ color: color.primary_color, fontSize: 12, fontWeight: '400' }}>Deposit</Text>
                    <Text style={{ color: color.primary_color, marginTop: 10, fontSize: 14, fontWeight: '800' }}>N105,000.00 </Text>
                  </View>
                </View>


                <View style={[styles.card, { marginRight: 12 }]}>

                  <View style={{ marginRight: 10 }}>
                    <Icon
                      active
                      name="wallet"
                      type='entypo'
                      color={color.primary_color}
                      size={40}
                    />
                  </View>
                  <View>
                    <Text style={{ color: color.primary_color, fontSize: 12, fontWeight: '400' }}>winning </Text>
                    <Text style={{ color: color.primary_color, marginTop: 10, fontSize: 14, fontWeight: '800' }}>N105,000.00 </Text>
                  </View>
                </View>

              </View>

              <View style={{ flexDirection: 'row', marginTop: 30 }}>

                <Button style={styles.primaryButtonContainer} block iconLeft>

                  <Text style={{ color: '#000', fontSize: 14, fontWeight: '500' }}>FUND WALLET </Text>
                </Button>


                <Button  style={styles.secondaryButtonContainer} block iconLeft>

                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>WITHDRAW </Text>
                </Button>
              </View>


                <Text style={styles.informationHead}>Withdraw</Text>

              <View style={styles.inputView}>
              <View style={{ flex:1}}>
              <RNPickerSelect
            placeholder={placeholder}
            items={sports}
            onValueChange={value => {
              this.setState({
                account: value,
              });
            }}
            style={pickerSelectStyles}
            value={this.state.account}
            useNativeAndroidPickerStyle={false}

          /></View>
 <TouchableOpacity  style={{ alignItems: 'center', justifyContent: 'center', marginRight:20}}>
                   <Icon
                        active
                        name="md-arrow-dropdown-circle"
                        type='ionicon'
                        color='#5f6066'
                    />
              </TouchableOpacity>

              </View>

               <View style={styles.inputView}>
                <TextInput
                  placeholder="Amount"
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


               <Text style={styles.information}>maximum ammount that can be withdraw is N5000</Text>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Enter password"
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


               <View style={{ flexDirection: 'row', marginTop: 15 }}>

<Button onPress={() => this.setState({ complete_transaction: true })} style={[styles.secondaryButtonContainer, {marginLeft:12}]} block iconLeft>

  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>SEND ORDER </Text>
</Button>
</View>


            </View>



  <Modal
          visible={this.state.complete_transaction}
        >
          <ModalContent style={styles.modal}>
            <View style={{ alignItems: 'center', paddingTop: 1, paddingBottom: 10 }}>

              <View style={{ alignItems: 'center', paddingTop: 1, paddingBottom: 10 }}>
              
              
                  <Icon
                    name="checkcircleo"
                    size={40}
                    type='antdesign'
                    color={color.secondary_color}
                  />
                <Text style={{ fontSize: 17, color:color.primary_color, textAlign: 'left', paddingBottom: 10, marginTop: 25, }}>Withdrawal successful </Text>
                 <Text style={{ fontSize: 13, color:color.primary_color, textAlign: 'center', paddingBottom: 10, marginTop: 25, }}>your winnings will be sent to your wallet within 24 hours </Text>
              </View>
              <View style={{ alignItems: 'center', paddingTop: 1, paddingBottom: 10, }}>

              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button   onPress={() => [this.setState({ complete_transaction: false }), Actions.transW()] }  style={styles.secondaryButtonContainer} block iconLeft>
                  <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Back to wallet </Text>
                </Button>
              </View>
            </View>
          </ModalContent>
        </Modal>

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
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10
  },
  primaryButtonContainer: {
    height: 45,
    backgroundColor: "#fff",
    marginLeft: 7,
    marginRight: 12,
    borderRadius: 5,
    flex: 1,

  },
  secondaryButtonContainer: {
    height: 45,
    backgroundColor: color.secondary_color,
    marginLeft: 12,
    marginRight: 7,
    borderRadius: 5,
    flex: 1,

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
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: "#fff",
    fontSize: 13,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  information: {
    marginLeft: 12,
    color: '#5f6066',
    marginTop: 10,
    fontSize: 12,
  },
  informationHead: {
    marginLeft: 12,
    color: color.primary_color,
    marginTop: 13,
    fontSize: 13,
    fontWeight: '400'
  },
  card: {
    justifyContent: 'center',
    backgroundColor: color.white,
    shadowColor: '#000',
    backgroundColor: "#fff",
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 1,
    flex: 1,
    flexDirection: 'row',
    padding: 20

  },
  modal: {
    width: Dimensions.get('window').width - 60,

  },
  modalbuttonContainer: {
    backgroundColor: color.slide_color_dark,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 30,
    flex: 1
  },
  modalTansButtonContainer: {
    borderColor: color.button_blue,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: 'transparent',
    flex: 1
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      color: 'black',
      
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: 'black',
      paddingRight: 30,
     // to ensure the text is never behind the icon
    },
  });
