// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import Navbar from '../../component/Navbar';

import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'



export default class CreateWithdrawer extends Component {
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


  render() {

    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={()=> Actions.pop()}>
          <Icon
            active
            name="arrowleft"
            type='antdesign'
            color='#000'
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
        <Navbar left={left} title='Wallet' bg='#fff'  />
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
                    <Text style={{ color: color.primary_color, fontSize: 12, fontWeight: '400' }}>Deposit </Text>
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

                <Button  onPress={()=> Actions.how()} style={styles.primaryButtonContainer} block iconLeft>

                  <Text style={{ color: '#000', fontSize: 14, fontWeight: '500' }}>FUND WALLET </Text>
                </Button>


                <Button onPress={()=> Actions.orderW()}  style={styles.secondaryButtonContainer} block iconLeft>

                  <Text  style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>WITHDRAW </Text>
                </Button>
              </View>


    <Text style={styles.informationHead}>{''}</Text>

              <View style={styles.inputView}>
                <TextInput
                  placeholder="Name"
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
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Account Number"
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
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Select your bank"
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

<Button style={styles.secondaryButtonContainer} block iconLeft>

  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>CREATE  </Text>
</Button>


<Button  style={styles.primaryButtonContainer} block iconLeft>

  <Text style={{ color: '#000', fontSize: 14, fontWeight: '500' }}>CANCEL </Text>
</Button>
</View>


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
    marginLeft: 30,
    color: '#5f6066',
    marginTop: 10,
    fontSize: 12,
  },
  informationHead: {
    marginLeft: 12,
    color: '#fff',
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
});

