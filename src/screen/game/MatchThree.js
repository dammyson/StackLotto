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

const multipleDataONE = ["0","1", "2", "3", "4", "5","6", "7", "8", "9"];
const multipleDataTWO = ["0","1", "2", "3", "4", "5","6", "7", "8", "9"];
const multipleDataTHREE = ["0","1", "2", "3", "4", "5","6", "7", "8", "9"];



export default class Match extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multipleSelectedData: [],
      multipleSelectedDataONE: [],
      multipleSelectedDataTWO: [],
      multipleSelectedDataTHREE: [],
      multipleSelectedDataLimited: [],
      allSelectedTickets: [],
      SELONE:'',
      SELTWO:'',
      SELTHREE:'',
      SELFOUR:'',

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
          <Text style={{ color: '#000', fontSize: 10, fontWeight: '400' }}>My Balance</Text>
          <Text style={{ color: '#000', fontSize: 10, fontWeight: '400' }}>N 45,000.00 </Text>
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
        <Navbar right={right} left={left} title='Match 3' bg='#fff' />
        <Content>
          <View style={styles.backgroundImage}>


            <View style={{ flex: 1 }}>

              <View>
                <Text style={{ fontSize: 15, textAlign: 'center', margin: 20, color: '#fff' }}>Select 3 number from 0-9 OR Choose Quick Pick Draw date 2020-01-20 16:00:00</Text>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                <TextInput
                  placeholder="Enter number of play"
                  placeholderTextColor={color.primary_color}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType='email-address'
                  autoCapitalize="none"
                  autoCorrect={false}
                  inlineImageLeft='ios-call'
                  style={styles.inputView}
                  onChangeText={text => this.setState({ password: text })}
                />

                <TouchableOpacity style={{ height: 40, flexDirection: 'row', marginRight: 10, flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: color.secondary_color }}>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Quick Play </Text>
                </TouchableOpacity>

              </View>

  <View style={{ alignItems:'center', justifyContent: "center", }}>
              <View style={{ width:180, flexDirection: "row",  marginLeft: 20, alignItems:'center', justifyContent: "center", }}>

                <View style={styles.multipleContainer}>
                  <View style={{ marginLeft: 2, }}>
                    {multipleDataONE.map(interest => (
                      <SelectMultipleButton
                        key={interest}
                        buttonViewStyle={styles.buttonStepTwoViewStyle}
                        textStyle={{
                          fontSize: 15,
                          marginRight: 7,
                          color: '#000',
                        }}
                        highLightStyle={{
                          borderColor: "#fff",
                          backgroundColor: "#fff",
                          textColor: "#000",
                          fontWeight: '900',
                          borderTintColor: color.primary_color,
                          backgroundTintColor: "#ee005e",
                          textTintColor: "#000"
                        }}
                        value={interest}
                        selected={this.state.multipleSelectedDataONE.includes(interest)}
                        singleTap={valueTap =>
                          this._singleTapMultipleSelectedButtons(interest, 1)
                        }

                      />
                    ))}
                  </View>

                </View>
                <View style={styles.multipleContainer}>
                  <View style={{ marginLeft: 2, }}>
                    {multipleDataTWO.map(interest => (
                      <SelectMultipleButton
                        key={interest}
                        buttonViewStyle={styles.buttonStepTwoViewStyle}
                        textStyle={{
                          fontSize: 15,
                          marginRight: 1,
                          color: '#000',
                        }}
                        highLightStyle={{
                          borderColor: "#fff",
                          backgroundColor: "#fff",
                          textColor: "#000",
                          fontWeight: '900',
                          borderTintColor: color.primary_color,
                          backgroundTintColor: "#ee005e",
                          textTintColor: "#000"
                        }}
                        selected={this.state.multipleSelectedDataTWO.includes(interest)}
                        value={interest}
                        singleTap={valueTap =>
                          this._singleTapMultipleSelectedButtons(interest, 2)
                        }

                      />
                    ))}
                  </View>

                </View>

                 <View style={styles.multipleContainer}>
                  <View style={{  marginLeft: 2, }}>
                    {multipleDataTHREE.map(interest => (
                      <SelectMultipleButton
                        key={interest}
                        buttonViewStyle={styles.buttonStepTwoViewStyle}
                        textStyle={{
                          fontSize: 15,
                          marginRight: 1,
                          color: '#000',
                        }}
                        highLightStyle={{
                          borderColor: "#fff",
                          backgroundColor: "#fff",
                          textColor: "#000",
                          fontWeight: '900',
                          borderTintColor: color.primary_color,
                          backgroundTintColor: "#ee005e",
                          textTintColor: "#000"
                        }}
                        selected={this.state.multipleSelectedDataTHREE.includes(interest)}
                        value={interest}
                        singleTap={valueTap =>
                          this._singleTapMultipleSelectedButtons(interest, 3) 
                        }

                      />
                    ))}
                  </View>

                </View>

              

              </View>




</View>

              <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 40,  alignItems: 'center', justifyContent: 'center', }}>
                <View style={{ flexWrap: "wrap", flexDirection: "row", marginLeft: 20, justifyContent: "center", }}>
                  {this.state.multipleSelectedData.map(interest => (
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
                      selected={this.state.multipleSelectedData.includes(interest)}
                      singleTap={valueTap =>
                        this._singleTapMultipleSelectedButtons(interest)
                      }
                    />
                  ))}
                </View>


                {this.state.multipleSelectedData.length == 3 ?
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



  <View style={{  alignItems: 'center', justifyContent: 'center',}}>

     {this.renderslelcted()}

<TouchableOpacity onPress={() => this.play()} style={{ height: 50, flexDirection: 'row', margin: 30, alignItems: 'center', justifyContent: 'center', }}>
  <Text style={{ color: '#fff', fontSize: 15, marginRight: 15, marginLeft: 15, fontWeight: '600' }}>Play </Text>
</TouchableOpacity>
  </View>
             




            </View>

          </View>
        </Content>
      </Container>

    );
  }
  play() {
    Actions.play();
  }

  addTicket() {
    if (this.state.multipleSelectedData.length == 3) {

      this.state.allSelectedTickets.push(this.state.multipleSelectedData);
      this.setState({
        multipleSelectedData: [],
        multipleSelectedDataONE: [],
        multipleSelectedDataTWO: [],
        multipleSelectedDataTHREE: [],
     
      });


    } else {

    }
  }

  _singleTapMultipleSelectedButtons(interest, place) {

    if(place == 1){
      this.state.multipleSelectedData[0] = interest;
      if (this.state.multipleSelectedDataONE.includes(interest)) {

      } else {
        this.setState({
          multipleSelectedDataONE: interest.split()
        });
       

      }
      
    }else  if(place == 2){
      this.state.multipleSelectedData[1] = interest;
      if (this.state.multipleSelectedDataTWO.includes(interest)) {

      } else {
        this.setState({
          multipleSelectedDataTWO: interest.split()
        });
      
      }
     
    }
    else  if(place == 3){
      this.state.multipleSelectedData[2] = interest;
      if (this.state.multipleSelectedDataTHREE.includes(interest)) {

      } else {
        this.setState({
          multipleSelectedDataTHREE: interest.split()
        });
        
      }
      
    }
  
   
  }






  selectMatch(arr, pos) {
    console.warn(arr, pos);
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

            <TouchableOpacity onPress={() => this.deleteFromSelected(i)} style={{ height: 40, width: 40, flexDirection: 'row', marginRight: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
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
    margin: 1,

  },
});

