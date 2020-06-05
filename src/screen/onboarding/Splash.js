
import React, { Component } from 'react';
import { Platform, StyleSheet, AsyncStorage, View, Image, Dimensions, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Splash extends Component {


    async componentDidMount() {
        setTimeout(() => {
       this.initPage();
   // Actions.fundwallet();
          }, 3000);
    }

    initPage = () => {
        AsyncStorage.getItem('step').then((value) => {
          console.log(value)
          if(value=='one'){
            Actions.home({type: 'replace'});
          }else if(value==null){
            Actions.welcome({type: 'replace'});
          }else if(value=="two"){
            Actions.home({type: 'replace'});
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
        backgroundColor:'#0f154a'
    },
    logo: {
      marginBottom:100,
        width: 250,
        height: 110,
        justifyContent: 'center',
        resizeMode: 'contain'


    }
    ,
});
