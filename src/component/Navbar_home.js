/**
* This is the navbar component
* example of usage:
*   var left = (<Left><Button transparent><Icon name='menu' /></Button></Left>);
*   var right = (<Right><Button transparent><Icon name='menu' /></Button></Right>);
*   <Navbar left={left} right={right} title="My Navbar" />
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'native-base';
import {Image,  } from 'react-native';

// Our custom files and classes import
import Colors from './color';

export default class Navbar extends Component {
  render() {
    return(
      <Header
        style={{backgroundColor: this.props.bg}}
        androidStatusBarColor={Colors.white}
        noShadow={true}
        >
        {this.props.left ? this.props.left : <Left />}
        <Body style={styles.body}>
        <Image
               style={styles.logo}
               source={require('../assets/logo.png')} 
               />  
        </Body>
        {this.props.right ? this.props.right : <Right />}
      </Header>
    );
  }
}

const styles={
  body: {
    flex:1,
    justifyContent:'flex-start' ,
    alignItems: 'flex-start' ,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
};
