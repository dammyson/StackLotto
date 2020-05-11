// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, Image, TextInput, Dimensions, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Icon, Button, } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { StackActions } from '@react-navigation/native';


import color from '../../component/color'


export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }


  componentWillMount() {

  }


  replaceScreen = (screen) => {
    this.props.navigation.dispatch({
      type: 'ReplaceCurrentScreen',
      routeName: screen,
      params: { },
    });
  };

  render() {

    return (
      <View
        style={styles.backgroundImage}
      >
        <Container style={{ backgroundColor: '#fff' }}>
          <Content>
            <View style={styles.body}>
            <View style={{  justifyContent:'flex-start', alignItems: 'flex-start', marginTop: 40 }}>
            <Image
               style={styles.logo}
               source={require('../../assets/logo.png')} 
               />  
               </View> 
              <View style={styles.mainContent}>
                <Text style={styles.title}>{"Welcome To  \nStacklotto"}</Text>
                <Button onPress={() =>  Actions.login()} style={styles.buttonContainer} block iconLeft>
               
                  <Text style={{ color: '#fff', fontWeight: '200' }}>Login </Text>
                </Button>
                <Button onPress={() =>
                   Actions.login()
                  } style={styles.transButtonContainer} block iconLeft>
                
                  <Text style={{ color: '#fff', fontWeight: '200' }}>Create Account</Text>
                </Button>
              </View>

            </View>

          </Content>
        </Container>
      </View>
    );
  }
  itemClicked(type) {
    AsyncStorage.setItem('type', type);
    Actions.reg()
   
  }

}
const styles = StyleSheet.create({
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
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    backgroundColor: color.primary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 3,
  },
  transButtonContainer: {
    backgroundColor: color.secondary_color,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    borderRadius: 3,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',

  },
  body: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
  title: {
    marginTop: 7,
    marginBottom: 27,
    marginRight: 13,
    marginLeft: 30,
    fontSize: 22,
    color: color.primary_color,
    textAlign: 'left',
    fontWeight: '900'
  },
  logo: {
    width: 250,
    height: 110,
    resizeMode: 'contain',
   
    marginLeft: 30,
  },
 
});

