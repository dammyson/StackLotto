
import React, { Component } from 'react';
import { Platform, StyleSheet, AsyncStorage, View, Image, Dimensions, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Splash extends Component {


    async componentDidMount() {
        setTimeout(() => {
       //  this.initPage();
       Actions.matchtwo();
          }, 3000);
    }

    initPage = () => {
     
        AsyncStorage.getItem('step').then((value) => {
          console.log(value)
          if(value=='one'){
            Actions.addpin();
          }else if(value==null){
            Actions.intro();
          }else if(value=="two"){
            Actions.home();
          }
          else{
            Actions.intro();
          } 
            
        })
       
      }
   
    render() {
        return (
            <View
                style={styles.backgroundImage}
            >
             <View style={styles.container}>
             <Image
               style={styles.logo}
               source={require('../../assets/logo.png')} 
               />   
             </View>
   
            </View>
        );
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
    logo: {
        width: 250,
        height: 110,
        justifyContent: 'center',
        resizeMode: 'contain'


    }
    ,
});
