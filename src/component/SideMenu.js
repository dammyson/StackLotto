/**
* This is the SideMenu component used in the navbar
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, Image, UIManager,StyleSheet, TouchableOpacity } from 'react-native';
import { View, List,Text,ListItem, Body, Left, Right, Item, Input, Button, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Card, Icon, SocialIcon } from 'react-native-elements'

// Our custom files and classes import
import category from './../data/category'

export default class SideMenu extends Component {
  constructor(props) {
      super(props);
      this.state = {
        search: "",
        searchError: false,
        subMenu: false,
        subMenuItems: [],
        clickedItem: ''
      };

      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  render() {
    return(
          <ScrollView style={styles.backgroundImage}>
             <View style={styles.card}>
             <Image
               style={styles.logo}
               source={require('../assets/logo.png')} 
               />  
             </View>

              <View style={{ marginTop:20,}}>

              <TouchableOpacity style={styles.row}>
              <View style={{ marginRight:20,}}>
              <Image
               style={styles.icon}
               source={require('../assets/home.png')} 
               />  
                 </View>
                <Text style={styles.rowText}>Home </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.row}  onPress={()=> Actions.tc()}>
              <View style={{ marginRight:20,}}>
              <Image
               style={styles.icon}
               source={require('../assets/resul.png')} 
               /> 
                 </View>
                <Text style={styles.rowText}>Result </Text>
               </TouchableOpacity>


                <TouchableOpacity style={styles.row}  onPress={()=>   Actions.createW()}>
              <View style={{ marginRight:20,}}>
              <Image
               style={styles.icon}
               source={require('../assets/wal.png')} 
               />  
                 </View>
                <Text style={styles.rowText}>Wallet </Text>
               </TouchableOpacity>

             <TouchableOpacity style={styles.row}  onPress={()=>   Actions.h()}>
              <View style={{ marginRight:20,}}>
              <Image
               style={styles.icon}
               source={require('../assets/hist.png')} 
               /> 
                 </View>
                <Text style={styles.rowText}>Play History </Text>
               </TouchableOpacity>



                <TouchableOpacity style={styles.row}  onPress={()=>   Actions.noti()}>
              <View style={{ marginRight:20,}}>
              <Image
               style={styles.icon}
               source={require('../assets/noti.png')} 
               /> 
                 </View>
                <Text style={styles.rowText}>Notification </Text>
               </TouchableOpacity>

                 <TouchableOpacity style={styles.row}  onPress={()=> Actions.game()}>
              <View style={{ marginRight:20,}}>
              <Image
              style={styles.icon}
               source={require('../assets/info.png')} 
               /> 
                 </View>
                <Text style={styles.rowText}>How To Play </Text>
               </TouchableOpacity>

                 <TouchableOpacity style={styles.row}  onPress={()=> Actions.sup()}>
              <View style={{ marginRight:20,}}>
              <Image
              style={styles.icon}
               source={require('../assets/sup.png')} 
               /> 
                 </View>
                <Text style={styles.rowText}>Support </Text>
               </TouchableOpacity>



                  <TouchableOpacity style={styles.row}  onPress={()=> Actions.account()}>
              <View style={{ marginRight:20,}}>
              <Image
               style={styles.icon}
               source={require('../assets/user.png')} 
               /> 
                 </View>
                <Text style={styles.rowText}>Account </Text>
               </TouchableOpacity>




               
             </View>


                <TouchableOpacity style={[styles.row, {marginTop:25}]}  onPress={()=> Actions.logout()}>
              <View style={{ marginRight:20,}}>
              <Image
               style={{height:30, resizeMode: 'contain',}}
               source={require('../assets/log.png')} 
               /> 
                 </View>
                <Text style={styles.rowText}>Logout </Text>
               </TouchableOpacity>

          </ScrollView>
    );
  }


  itemClicked() {
    Actions.createW();
      return;
    
  }


}



const styles = StyleSheet.create({

  backgroundImage: {
    backgroundColor: "#fff",
  },
  card: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    backgroundColor: "#fff",
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: 1,
    flex: 1,
    flexDirection: 'row',
    padding: 20
},
logo: {
  width: 200,
  height: 110,
  resizeMode: 'contain',
  justifyContent: 'center',
  margin: 10,
},
icon:{ height:20, width:30, resizeMode: 'contain',},

row:{ flexDirection: 'row',
alignItems: 'center',
 marginTop: 10,
  marginLeft:20,
 },
 rowText:{ flex:1 ,
  color: '#000', 
  fontSize: 15, 
  marginTop:5,
  fontWeight: '400' }
});


