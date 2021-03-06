// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Header, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import _ from "lodash";

import Navbar from '../../component/Navbar';

import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'
import {
  SelectMultipleButton,
  SelectMultipleGroupButton
} from "react-native-selectmultiple-button";
const TEXT_INPUT_REF = 'urlInput';
const multipleData = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42",];

export default class SelectFiveNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multipleSelectedData: [],
      multipleSelectedDataLimited: [],
      allSelectedTickets: [],
      data: '',
      loading: false,
      balance: '',
      number_quick:0
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
      console.warn(value)
    })

  }

  getRandomNumbers(min, max){
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
  }


  createArrayOfNumber(start, end){
      let myArray =[];
      for(let i = start; i <= end ; i++){
        myArray.push(i);
      }
      return myArray;
  }


  generateNumber(){
    this.refs[TEXT_INPUT_REF].blur();
        let GameArray=[];
        for(let i = 0; i < this.state.number_quick; i++){
          GameArray.push(this.getnumbers(5))
        }
        var instant_array = []
        instant_array = this.state.allSelectedTickets
       var total = instant_array.concat(GameArray);
        this.setState({ allSelectedTickets: total })  
        this.setState({ number_quick: "" })
    
  }

  getnumbers(num){

    let array = this.createArrayOfNumber(1, 42)
    let generated =[];
    for(let i = 0; i < num; i++){
      let randomIndex = this.getRandomNumbers(0, array.length - 1);
      let randomNumber = array[randomIndex];
      generated.push(randomNumber)
      array.splice(randomIndex, 1);
    }
    return generated;

  }
 

 
 

  render() {
    const { data, balance } = this.state

    const placeholder = {
      label: 'Select a sport...',
      value: null,
      color: "#000",
    };





    return (
      <Container style={{ backgroundColor: color.primary_color }}>
       <Header
          style={{ backgroundColor: '#fff' }}
          androidStatusBarColor={color.white}
          noShadow={true}
        >
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
          <Body style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
            <Image
               style={{ width: 120,height: 50,resizeMode: 'contain'}}
               source={require('../../assets/five.png')} 
               />  
          </Body>
          <Right style={{ flex: 1 }}>
            <View>
              <Text style={{ color: '#000', fontSize: 12, fontWeight: '600' }}>My Balance</Text>
              <Text style={{ color: '#000', fontSize: 12, fontWeight: '600' }}>N {balance}  </Text>
            </View>

          </Right>
        </Header>
        <Content>
          <View style={styles.backgroundImage}>


            <View style={{ flex: 1 }}>

              <View>
                <Text style={{ fontSize: 13, textAlign: 'center', margin: 20, color: '#fff' }}>Select 5 number from 1-42 OR Choose Quick Pick Draw date 2020-01-20 16:00:00</Text>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                <TextInput
                  ref={TEXT_INPUT_REF}
                  placeholder="Enter number of play"
                  placeholderTextColor={color.primary_color}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType='numeric'
                  autoCapitalize="none"
                  autoCorrect={false}
                  inlineImageLeft='ios-call'
                  style={styles.inputView}
                  maxLength={2}
                  onChangeText={text => this.setState({ number_quick: text })}
                  defaultValue={this.state.number_quick}
                />

                <TouchableOpacity  onPress={()=> this.generateNumber()}  style={{ height: 40, flexDirection: 'row', marginRight: 10, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: color.secondary_color }}>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Quick Play </Text>
                </TouchableOpacity>

              </View>



<View style={{ alignItems: 'center', justifyContent: 'center', }}>
              <View style={styles.newmultipleContainer}>
                {multipleData.map(interest => (
                  <SelectMultipleButton
                    key={interest}
                    buttonViewStyle={styles.buttonViewStyle}
                    textStyle={{
                      fontSize: 13,
                      margin: 20,
                      color: '#000',
                    }}
                    highLightStyle={{
                      borderColor: "white",
                      backgroundColor: "white",
                      textColor: "#000",
                      fontWeight: '900',
                      borderTintColor: color.primary_color,
                      backgroundTintColor: "#ee005e",
                      textTintColor: "#fff"
                    }}
                    value={interest}
                    selected={this.state.multipleSelectedData.includes(interest)}
                    singleTap={valueTap =>
                      this._singleTapMultipleSelectedButtons(interest)
                    }
                  />
                ))}
              </View>
</View>

              <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 40, alignItems: 'center', justifyContent: 'center', }}>
                <View style={{ flexWrap: "wrap", flexDirection: "row", marginLeft: 20, justifyContent: "center", }}>
                  {this.state.multipleSelectedData.map(interest => (
                    <SelectMultipleButton
                      key={interest}
                      buttonViewStyle={styles.buttonStepTwoViewStyle}
                      textStyle={{
                        fontSize: 13,
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
                      selected={this.state.multipleSelectedData.includes(interest)}
                      singleTap={valueTap =>
                        this._singleTapMultipleSelectedButtons(interest)
                      }
                    />
                  ))}
                </View>


                {this.state.multipleSelectedData.length == 5 ?
                  <TouchableOpacity onPress={() => this.addTicket()} style={{ height: 40, flexDirection: 'row', marginRight: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: color.secondary_color }}>
                    <Text style={{ color: '#fff', fontSize: 15, marginRight: 15, marginLeft: 15, fontWeight: '600' }}>Add </Text>
                  </TouchableOpacity>


                  :
                  null
                }


              </View>



              <View>
                <Text style={{ fontSize: 15, fontWeight: '900', textAlign: 'center', margin: 20, color: '#fff' }}>Number of tickets selected: {this.state.allSelectedTickets.length}</Text>
              </View>



              {this.renderslelcted()}


              <TouchableOpacity onPress={() => this.play()} style={{ height: 50, flexDirection: 'row', margin: 30, alignItems: 'center', justifyContent: 'center', backgroundColor:color.secondary_color}}>
                <Text style={{ color: '#fff', fontSize: 15, marginRight: 15, marginLeft: 15, fontWeight: '600' }}>Play </Text>
              </TouchableOpacity>




            </View>

          </View>
        </Content>
      </Container>

    );
  }
  play() {
    if(this.state.allSelectedTickets.length < 1){
      Alert.alert('Operarion failed', 'You must play atleast one game', [{ text: 'Okay' }])
      return
    }
    const gamesDetails = { ticket: 100, type: 1, exact_order: false, }
    Actions.confirmplay({allSelectedTickets: this.state.allSelectedTickets, gamesDetails: gamesDetails});
  }
  addTicket() {
    if (this.state.multipleSelectedData.length == 5) {

      this.state.allSelectedTickets.push(this.state.multipleSelectedData);
      this.setState({
        multipleSelectedData: []
      });


    } else {

    }
  }

  _singleTapMultipleSelectedButtons(interest) {

    if (this.state.multipleSelectedData.includes(interest)) {
      _.remove(this.state.multipleSelectedData, ele => {
        return ele === interest;
    });
    } else {
      if (this.state.multipleSelectedData.length < 5) {
        this.state.multipleSelectedData.push(interest);
      }
    }

    if (this.state.multipleSelectedData.length < 6) {
      this.setState({
        multipleSelectedData: this.state.multipleSelectedData
      });
      console.warn(this.state.multipleSelectedData);
    } else {
      Alert.alert('Information', '5 is the maximum you can select', [{ text: 'Okay' }])
    }


  }

  renderslelcted() {

    let cat = [];
    for (var i = 0; i < this.state.allSelectedTickets.length; i++) {
      cat.push(


        <View style={{ alignItems: 'center', justifyContent: "center", }}>


          <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10, }}>
            <View style={{ flexWrap: "wrap", flexDirection: "row", marginLeft: 20, justifyContent: "center", }}>
              {this.state.allSelectedTickets[i].map(interest => (
                <SelectMultipleButton
                  key={interest}
                  buttonViewStyle={styles.buttonStepTwoViewStyle}
                  textStyle={{
                    fontSize: 13,
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

            <TouchableOpacity onPress={() =>  this.deleteFromSelected(i)} style={{ height: 40, width: 40, flexDirection: 'row', marginRight: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
              <Icon
                active
                name="close"
                type='antdesign'
                color='#ee005e'
              />
            </TouchableOpacity>

          </View>

        </View>
      );
    }
    return cat;

  }


  deleteFromSelected(index) {
    console.warn(index);
  const allSelectedTickets = this.state.allSelectedTickets;
  allSelectedTickets.splice(index - 1, 1);
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
    height: 50,
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
    marginRight: 20,
    backgroundColor: "#fff",
    fontSize: 14,
    paddingLeft: 10,
    justifyContent: 'center',
    flex: 1

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
    margin: 1,

  },

  newmultipleContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    width:300
  },
});

