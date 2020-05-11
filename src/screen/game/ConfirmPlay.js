// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { RippleLoader } from 'react-native-indicator';
import Navbar from '../../component/Navbar';
import Modal, { ModalContent } from 'react-native-modals';

import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'
import {
  SelectMultipleButton,
  SelectMultipleGroupButton
} from "react-native-selectmultiple-button";


export default class ConfirmPlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multipleSelectedData: [],
      multipleSelectedDataLimited: [],
      allSelectedTickets: [],
      complete_transaction: false,
      data: '',
      loading: false,
      balance: '',
      gamesDetails: {},
    };
  }



  componentDidMount() {
    this.setState({ allSelectedTickets: this.props.allSelectedTickets, gamesDetails: this.props.gamesDetails });
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
  saveTicketRequest() {

    const { allSelectedTickets, data, gamesDetails } = this.state
    const game_id = gamesDetails.type;
    this.setState({ loading: true })
    fetch(URL.url + 'profile/save/tickets/' + game_id + '/' + data.id + '/', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        tickets: allSelectedTickets,
        exact_order: gamesDetails.exact_order
      }),
    })
      .then(this.processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
        console.warn(statusCode, data)
        this.setState({ loading: false })
        if (statusCode == 200) {
          AsyncStorage.setItem('balance', this.currencyFormat(data.balance));
          this.setState({ complete_transaction: true, balance: this.currencyFormat(data.balance) })
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
        <Navbar right={right} left={left} title='Confirm and play' bg='#fff' />
        <Content>
          <View style={styles.backgroundImage}>


            <View style={{ flex: 1 }}>

              <View style={{ marginBottom: 20, marginTop: 20, }}>
                <Text style={{ fontSize: 15, fontWeight: '900', textAlign: 'left', marginLeft: 20, color: '#fff' }}>Draw date: 2020-01-01 16:00:00</Text>
                <Text style={{ fontSize: 15, fontWeight: '900', textAlign: 'left', marginLeft: 20, color: '#fff' }}>Play Type: N/A</Text>
                <Text style={{ fontSize: 15, fontWeight: '900', textAlign: 'left', marginLeft: 20, color: '#fff' }}>Tickets @N{gamesDetails.ticket}/Tickets</Text>
              </View>




              {this.renderslelcted()}

              <View style={{ backgroundColor: '#fff', margin: 20, paddingTop: 15, paddingBottom: 15, borderRadius: 5, }}>
                <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', marginLeft: 10, color: '#000' }}>Name: {data.first_name} {data.last_name}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', marginLeft: 10, color: '#000' }}>phone:  {data.phone} </Text>

              </View>



              <View style={{ backgroundColor: '#fff', margin: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 5, }}>
                <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', marginLeft: 10, color: '#000' }}>Play {allSelectedTickets.length} Tickets @ N{allSelectedTickets.length * gamesDetails.ticket}   </Text>
                <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', marginLeft: 10, color: '#000' }}>Available balance N{balance} </Text>

              </View>



              <View style={{ flexDirection: 'row', marginBottom: 20, }}>

                <TouchableOpacity onPress={() => Actions.pop()} style={{ height: 40, flexDirection: 'row', margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: "#fff" }}>
                  <Text style={{ color: '#000', fontSize: 13, fontWeight: '600' }}>Cancel </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.saveTicketRequest()} style={{ height: 40, flexDirection: 'row', margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: color.secondary_color }}>
                  <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>Confirm Play </Text>
                </TouchableOpacity>

              </View>



            </View>

          </View>

          <Modal
            visible={this.state.complete_transaction}
          >
            <ModalContent style={styles.modal}>
              <View style={{ alignItems: 'center', paddingTop: 1, paddingBottom: 10 }}>

                <View style={{ alignItems: 'center', paddingTop: 1, paddingBottom: 10 }}>


                  <Icon
                    name="checkcircle"
                    size={60}
                    type='antdesign'
                    color={color.secondary_color}
                  />
                  <Text style={{ fontSize: 17, color: color.primary_color, textAlign: 'left', paddingBottom: 10, marginTop: 25, }}>Ticket Placed Successfully </Text>
                  <Text style={{ fontSize: 13, color: color.primary_color, textAlign: 'center', paddingBottom: 10, marginTop: 25, }}>Your lottery have been successfully placed</Text>
                </View>
                <View style={{ alignItems: 'center', paddingTop: 1, paddingBottom: 10, }}>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Button onPress={() => [this.setState({ complete_transaction: false }), setTimeout(() => {
                    Actions.game();
                  }, 500)]} style={styles.secondaryButtonContainer} block iconLeft>
                    <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Back to Lotteries </Text>
                  </Button>
                </View>
              </View>
            </ModalContent>
          </Modal>
        </Content>
      </Container>

    );
  }
  play() {
    console.warn(this.state.allSelectedTickets);
  }

  addTicket() {
    if (this.state.multipleSelectedData.length == 6) {

      this.state.allSelectedTickets.push(this.state.multipleSelectedData);
      this.setState({
        multipleSelectedData: []
      });


    } else {

    }
  }

  _singleTapMultipleSelectedButtons(interest) {

    if (this.state.multipleSelectedData.includes(interest)) {

    } else {
      this.state.multipleSelectedData.push(interest);
    }
    if (this.state.multipleSelectedData.length < 7) {
      this.setState({
        multipleSelectedData: this.state.multipleSelectedData
      });
    } else {
      Alert.alert('Information', '6 is the maximum you can select', [{ text: 'Okay' }])
    }


  }

  renderslelcted() {

    let cat = [];
    for (var i = 0; i < this.state.allSelectedTickets.length; i++) {
      cat.push(


        <View style={{ alignItems: 'center', justifyContent: "center", }}>


          <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10, }}>
            <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center", }}>
              {this.state.allSelectedTickets[i].map(interest => (
                <SelectMultipleButton
                  key={interest}
                  buttonViewStyle={styles.buttonStepTwoViewStyle}
                  textStyle={{
                    fontSize: 15,
                    marginRight: 10,
                    color: '#000',
                  }}
                  highLightStyle={{
                    borderColor: "#ee005e",
                    backgroundColor: "#ee005e",
                    textColor: "#fff",
                    fontWeight: '900',
                    borderTintColor: color.primary_color,
                    backgroundTintColor: "#ee005e",
                    textTintColor: "#fff"
                  }}
                  value={interest}
                  selected={this.state.allSelectedTickets[i].includes(interest)}

                />
              ))}
            </View>

          </View>

        </View>
      );
    }
    return cat;

  }


  deleteFromSelected(index) {

    const allSelectedTickets = this.state.allSelectedTickets;
    allSelectedTickets.splice(index, 1);
    this.setState({ allSelectedTickets });

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
    flex: 3

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

