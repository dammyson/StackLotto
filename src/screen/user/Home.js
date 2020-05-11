/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, Text, FlatList, View, Dimensions, StyleSheet, Image, AsyncStorage,InteractionManager, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Button, Left, Right, CardItem, Toast, cardBody, ScrollableTab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import color from '../../component/color'
import { Avatar, Icon, SocialIcon } from 'react-native-elements'
import URL from '../../component/server'
// Our custom files and classes import


import Navbar from '../../component/Navbar_home';
import SideMenuDrawer from './../../component/SideMenuDrawer';



export default class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
      auth: '',
      profile: '',
      balance: '',
      data:''
    };
  }

  componentDidMount() {
   
    AsyncStorage.getItem('data').then((value) => {
      if (value == '') { } else {
        this.setState({ data: JSON.parse(value) })
      }
    })
    AsyncStorage.getItem('balance').then((value) => {
      this.setState({ 'balance': value.toString() })
      this.getBalance();
    })

  }

  currencyFormat(n) {
    return n.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }

  getBalance() {
    const { data } = this.state
    this.setState({ loading: true })

  

    fetch(URL.url + 'profile/balance/'+ data.id + '/', {
      method: 'GET', headers: {
        Accept: 'application/json',
      }, 
    })
    .then(this.processResponse)
    .then(res => {
     const { statusCode, data } = res;
     if (statusCode == 200) {
      AsyncStorage.setItem('balance', this.currencyFormat(data.balance));
      this.setState({ complete_transaction: true , balance: this.currencyFormat(data.balance) })  
      }
      }).catch((error) => {
        console.warn(error);
        console.warn(error.message);
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
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon
            name="menu"
            type='entypo'
            style={{ color: "#000" }} />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: '#000', fontSize: 10, fontWeight: '400' }}>My Balance</Text>
          <Text style={{ color: '#000', fontSize: 10, fontWeight: '400' }}>N {this.state.balance} </Text>
        </View>
        <Icon
          active
          name="notifications-active"
          type='material-icons'
          color='#000'
        />
      </Right>
    );
    return (
      <SideMenuDrawer styles={{ marginTop: 2 }} ref={(ref) => this._sideMenuDrawer = ref}>
        <Container style={{ backgroundColor: "#d1d1d1" }}>
          <Navbar left={left} right={right} bg="#fff" title="Home" />
          <Content>
            <View style={styles.backgroundImage}>
              <View style={{ flex: 1 }}>
                <ScrollView horizontal={true} style={{ flex: 1 }}>

                  <View style={{ height: Dimensions.get('window').height / 3.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: color.primary_color }}>
                    <Image
                      style={{ flex: 1, height: Dimensions.get('window').height / 3.5, width: Dimensions.get('window').width, resizeMode: 'stretch' }}
                      size="large"
                      source={require('../../assets/banner.png')}
                    />
                  </View>
                  <View style={{ height: Dimensions.get('window').height / 3.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: color.primary_color }}>
                    <Image
                      style={{ flex: 1, height: Dimensions.get('window').height / 3.5, width: Dimensions.get('window').width, resizeMode: 'stretch' }}
                      size="large"
                      source={require('../../assets/banner.png')}
                    />
                  </View>

                </ScrollView>


                <View style={{ paddingTop: 7, paddingBottom: 7, flexDirection: 'row', margin: 15, borderRadius: 5, backgroundColor: color.primary_color }}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                      style={{ height: 30, marginBottom: 10 }}
                      size="large"
                      source={require('../../assets/six.png')}
                    />
                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: '900' }}>N 200 / Ticket</Text>
                  </View>

                  <View style={{ flex: 1, }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '900' }}>Jackpot!</Text>
                    <Text style={{ color: '#fff', marginBottom: 7, fontSize: 14, fontWeight: '900' }}>N 3,700,000.</Text>

                    <View style={{ flexDirection: 'row', }}>
                      <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, }}>
                        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>00</Text>
                      </View>
                      <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, marginLeft: 4, }}>
                        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>00</Text>
                      </View>
                      <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, marginLeft: 4, }}>
                        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>00</Text>
                      </View>
                      <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, marginLeft: 4, }}>
                        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>00</Text>
                      </View>
                    </View>


                  </View>

                  <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => Actions.sg()} style={{ height: 50, flexDirection: 'row', marginTop: 10, marginBottom: 10, margin: 10, flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: color.secondary_color }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Play Now </Text>
                      <Icon
                        name="play"
                        type='antdesign'
                        color="#fff" 
                        style={20}/>
                    </TouchableOpacity>
                  </View>

                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <TouchableOpacity onPress={() => Actions.selectFive()} style={[styles.card, { marginLeft: 12 }]}>

                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '900', opacity: 0.7 }}>Lucky 5 Jackpot</Text>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '900', opacity: 0.7 }}>N 350,000.00</Text>
                    <View style={{ flexDirection: 'row', }}>

                      <View style={{ flexDirection: 'row', alignItems:'center'}}>
                        <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, }}>
                          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>00</Text>
                        </View>
                        <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, marginLeft: 4, }}>
                          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>00</Text>
                        </View>
                        <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, marginLeft: 4, }}>
                          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>00</Text>
                        </View>
                        <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 4, paddingRight: 3, marginLeft: 4, marginRight: 1 }}>
                          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>00</Text>
                        </View>

                      </View>


                      <Image
                        style={{ height: 25, resizeMode: 'contain', }}
                        size="large"
                        source={require('../../assets/five.png')}
                      />
                    </View>

                    <Text style={{ color: '#000', marginTop: 3, fontSize: 10, fontWeight: '900' }}>N 100 / Ticket</Text>
                  </TouchableOpacity>


                  <TouchableOpacity onPress={() => Actions.match()} style={[styles.card, { marginRight: 12 }]}>

                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '900', opacity: 0.7 }}>Match 4 To win</Text>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '900', opacity: 0.7 }}>N 20,000.00</Text>
                    <View style={{ flexDirection: 'row', }}>

                      <View style={{ flexDirection: 'row', alignItems:'center'}}>
                        <View style={{ backgroundColor: '#f54278', alignItems:'center', borderRadius: 3, paddingLeft: 3, paddingRight: 3, }}>
                          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>00</Text>
                        </View>
                        <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, marginLeft: 4, }}>
                          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>00</Text>
                        </View>
                        <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, marginLeft: 4, }}>
                          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>00</Text>
                        </View>
                        <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 3, paddingRight: 3, marginLeft: 4, marginRight: 1 }}>
                          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>00</Text>
                        </View>

                      </View>


                      <Image
                        style={{ height: 30, resizeMode: 'contain', }}
                        size="large"
                        source={require('../../assets/bfour.png')}
                      />
                    </View>

                    <Text style={{ color: '#000', marginTop: 3, fontSize: 10, fontWeight: '900' }}>N 100 / Ticket</Text>
                  </TouchableOpacity>

                </View>



                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <TouchableOpacity onPress={() => Actions.r()} style={[styles.boxCard, { marginLeft: 10, backgroundColor: color.secondary_color }]}>
                    <Image
                      style={styles.icon}
                      size="large"
                      source={require('../../assets/result.png')}
                    />

                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: '900' }}>Result</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => Actions.transW()} style={[styles.boxCard, { marginLeft: 10 }]}>
                    <Image
                      style={styles.icon}
                      size="large"
                      source={require('../../assets/wallet.png')}
                    />

                    <Text style={{ color: '#000', textAlign: 'center', fontSize: 15, fontWeight: '900' }}>Wallet</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => Actions.h()} style={[styles.boxCard, { marginLeft: 10 }]}>
                    <Image
                      style={styles.icon}
                      size="large"
                      source={require('../../assets/history.png')}
                    />

                    <Text style={{ color: '#000', textAlign: 'center', fontSize: 15, fontWeight: '900' }}>History</Text>
                  </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => Actions.game()} style={{ height: 80, flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: color.primary_color }}>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '900' }}>VIEW ALL LOTTERIES</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        </Container>
      </SideMenuDrawer>
    );
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
  icon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    resizeMode: 'contain',
    margin: 15,

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
    backgroundColor: color.primary_color,
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
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: color.primary_color,
  },
  information: {
    marginLeft: 12,
    color: '#5f6066',
    marginTop: 10,
    fontSize: 12,
  },
  informationHead: {
    marginLeft: 18,
    marginRight: 18,
    color: color.primary_color,
    marginTop: 13,
    marginBottom: 13,
    fontSize: 16,
    fontWeight: '400'
  },
  card: {
    backgroundColor: color.white,
    shadowColor: '#000',
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 1,
    flex: 1,
    padding: 10
  },
  boxCard: {
    backgroundColor: color.white,
    shadowColor: '#000',
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 1,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneRow: {
    borderRadius: 15,
    margin: 12,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row'

  },
  price: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  bigCard: {
    backgroundColor: color.white,
    shadowColor: '#000',
    backgroundColor: "#fff",

    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 1,
    flex: 1,
    paddingBottom: 20

  },
});