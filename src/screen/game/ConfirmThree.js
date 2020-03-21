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
import {
  SelectMultipleButton,
  SelectMultipleGroupButton
} from "react-native-selectmultiple-button";


export default class ConfirmThree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multipleSelectedData: [],
      multipleSelectedDataLimited: [],
      allSelectedTickets: [["6", "9", "1",],["6", "9", "1", ], ["6", "9",  "9"]]
    };
  }


  componentDidMount() {


  }


  render() {


    const placeholder = {
      label: 'Select a sport...',
      value: null,
      color: "#000",
    };

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
        <Text style={{ color: '#000', fontSize: 12, fontWeight: '600' }}>N 45,000.00 </Text>
      </View>
       
      </Right>
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
        <Navbar right={right} left={left} title='Confirm' bg='#fff' />
        <Content>
          <View style={styles.backgroundImage}>


            <View style={{ flex: 1 }}>

              <View style={{ marginBottom: 20, marginTop: 20,}}>
                <Text style={{ fontSize: 15, fontWeight: '900', textAlign: 'left', marginLeft: 20, color: '#fff' }}>Draw date: 2020-01-01 16:00:00</Text>
                <Text style={{ fontSize: 15, fontWeight: '900',textAlign: 'left', marginLeft: 20, color: '#fff' }}>Play Type: N/A</Text>
                <Text style={{ fontSize: 15, fontWeight: '900',textAlign: 'left', marginLeft: 20, color: '#fff' }}>Tickets @N200/Tickets</Text>
              </View>

             


              {this.renderslelcted()}

 <View style={{ backgroundColor: '#fff', margin: 20,  paddingTop:15, paddingBottom:15, borderRadius:5, }}>
 <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', marginLeft: 10, color: '#000' }}>Name:    Dayo Awojobi</Text>
 <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', marginLeft: 10, color: '#000' }}>phone:   08123456789</Text>
 
 </View>



  <View style={{ backgroundColor: '#fff', margin: 20,  paddingTop:20, paddingBottom:20, borderRadius:5, }}>
 <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', marginLeft: 10, color: '#000' }}>Play 3 Tickets @ N600   </Text>
 <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', marginLeft: 10, color: '#000' }}>Available balance N49,000.00</Text>
 
 </View>



 <View style={{ flexDirection: 'row', marginBottom: 20, }}>

<TouchableOpacity style={{ height: 40, flexDirection: 'row', margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center',borderRadius:5, backgroundColor: "#fff" }}>
    <Text style={{ color: '#000', fontSize: 13, fontWeight: '600' }}>Cancle </Text>
  </TouchableOpacity>

  <TouchableOpacity style={{ height: 40, flexDirection: 'row', margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius:5, backgroundColor: color.secondary_color }}>
    <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>Play </Text>
  </TouchableOpacity>

</View>



            </View>

          </View>
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


  deleteFromSelected(index){
   
    const allSelectedTickets = this.state.allSelectedTickets;
    allSelectedTickets.splice(index, 1);
    this.setState({ allSelectedTickets });
  
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
});

