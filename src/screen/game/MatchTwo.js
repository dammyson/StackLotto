// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Header, List, Item, Thumbnail, Grid, Col } from 'native-base';
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
import RNPickerSelect from 'react-native-picker-select';


const sports = [
    {
      label: 'Exact order',
      value: 'football',
    },
    {
      label: 'Any order',
      value: 'baseball',
    },
    {
      label: 'Exact order / Any order',
      value: 'hockey',
    },
    {
      label: '2 Front number Play',
      value: 'baseball',
    },
    {
      label: '2 Back number Play',
      value: 'hockey',
    },
    {
      label: '2 Middle number play',
      value: 'hockey',
    },
  ];
  const TEXT_INPUT_REF = 'urlInput';
const multipleDataONE = ["0","1", "2", "3", "4", "5","6", "7", "8", "9"];
const multipleDataTWO = ["0","1", "2", "3", "4", "5","6", "7", "8", "9"];


export default class MatchTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multipleSelectedData: [],
      multipleSelectedDataONE: [],
      multipleSelectedDataTWO: [],
      multipleSelectedDataTHREE: [],
      multipleSelectedDataFOUR: [],
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
          GameArray.push(this.getnumbers(2))
        }
        var instant_array = []
        instant_array = this.state.allSelectedTickets
       var total = instant_array.concat(GameArray);
        this.setState({ allSelectedTickets: total })  
        this.setState({ number_quick: "" })
  }

  getnumbers(num){

    let array = this.createArrayOfNumber(0, 9)
    let generated =[];
    for(let i = 0; i < num; i++){
      let randomIndex = this.getRandomNumbers(0, array.length - 1);
      let randomNumber = array[randomIndex];
      generated.push(randomNumber)
    }
    return generated;

  }



  render() {

    const { data, balance } = this.state
    const placeholder = {
      label: 'Select Play type',
      value: null,
      color: "#000",
    };

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
          <View style={{ flexDirection:'row', justifyContent: 'center', alignItems:'center' }}>
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '600' }}>Match</Text>
            <Image
                style={{ width: 40,height: 40,resizeMode: 'contain', marginLeft:10}}
                source={require('../../assets/btwo.png')} 
               /> 
                </View>
          </Body>
          <Right style={{ flex: 1 }}>
            <View>
              <Text style={{ color: '#000', fontSize: 12, fontWeight: '600' }}>My Balance</Text>
              <Text style={{ color: '#000', fontSize: 12, fontWeight: '600' }}>N{balance}  </Text>
            </View>

          </Right>
        </Header>
        <Content>
          <View style={styles.backgroundImage}>


            <View style={{ flex: 1 }}>

              <View>
                <Text style={{ fontSize: 15, textAlign: 'center', margin: 20, color: '#fff' }}>Select 2 numbers from 0-9 OR Choose Quick Pick Draw date 2020-01-20 16:00:00</Text>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 20, }}>

              <View style={styles.inputView}>
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
                  style={{flex:1}}
                  defaultValue={this.state.number_quick}
                  onChangeText={text => this.setState({  number_quick: text })}
                />
              </View>
                <TouchableOpacity   onPress={()=> this.generateNumber()}  style={{ height: 40, flexDirection: 'row', marginRight: 10, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: color.secondary_color }}>
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
                          this._singleTapMultipleSelectedButtons(interest, 0)
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
                          this._singleTapMultipleSelectedButtons(interest, 1)
                        }

                      />
                    ))}
                  </View>

                </View>

               
                
              </View>




</View>

              <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 40,  alignItems: 'center', justifyContent: 'center', }}>

              <View style={{ flexWrap: "wrap", flexDirection: "row", marginLeft: 20, justifyContent: "center", }}>
     
              {this.rendersingleslelcted(this.state.multipleSelectedData)}

     </View>
              


                {this.state.multipleSelectedData.length == 2 ?
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


              </View>

<TouchableOpacity onPress={() => this.play()} style={{backgroundColor:color.secondary_color, height: 50,  width: Dimensions.get('window').width - 60, flexDirection: 'row', margin: 30, alignItems: 'center', justifyContent: 'center', }}>
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
    if(this.state.allSelectedTickets.length < 1){
      Alert.alert('Operarion failed', 'You must play atleast one game', [{ text: 'Okay' }])
      return
    }
    const gamesDetails = { ticket: 100, type: 4, exact_order: false, }
    Actions.confirmplay({allSelectedTickets: this.state.allSelectedTickets, gamesDetails: gamesDetails});
  }
  addTicket() {
    if (this.state.multipleSelectedData.length == 2) {

      this.state.allSelectedTickets.push(this.state.multipleSelectedData);
      this.setState({
        multipleSelectedData: [],
        multipleSelectedDataONE: [],
        multipleSelectedDataTWO: [],
        multipleSelectedDataTHREE: [],
        multipleSelectedDataFOUR: []
      });


    } else {
      Alert.alert('Operarion failed', 'Select one number from each column', [{ text: 'Okay' }])
      return
    }
  }

  _singleTapMultipleSelectedButtons(interest, place) {

   
   
    this.state.multipleSelectedData[place] = interest;

    console.warn(this.state.multipleSelectedData)

    if(place == 0){
     

      if (this.state.multipleSelectedDataONE.includes(interest)) {

      } else {
        this.setState({
          multipleSelectedDataONE: interest
        });
       

      }
      
    }else  if(place == 1){
      if (this.state.multipleSelectedDataTWO.includes(interest)) {

      } else {
        this.setState({
          multipleSelectedDataTWO: interest
        });
      
      }
     
    }
    else  if(place == 2){
      if (this.state.multipleSelectedDataTHREE.includes(interest)) {

      } else {
        this.setState({
          multipleSelectedDataTHREE: interest
        });
        
      }
      
    }
   
  }






  selectMatch(arr, pos) {
    console.warn(arr, pos);
  }


  rendersingleslelcted(data) {
    let cat = [];
    for (var i = 0; i < data.length; i++) {
      if(data[i] != null){
        cat.push(
          <TouchableOpacity style={{ height: 40, width: 40, marginRight: 2, marginLeft: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ee005e',  borderRadius:3 }}>
          <Text style={{ color: '#fff', fontSize: 14, marginRight: 15, marginLeft: 15, fontWeight: '600' }}>{data[i]} </Text>
        </TouchableOpacity>
        )
      }
      
    
    
    }

    return cat;

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
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#fff",
    fontSize: 14,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
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

