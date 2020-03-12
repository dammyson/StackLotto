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

// Our custom files and classes import
import Colors from '../component/color';

export default class Navbar extends Component {
  render() {
    return(
      <Header
        style={{backgroundColor: this.props.bg}}
        androidStatusBarColor={Colors.white}
        noShadow={true}
        >
        {this.props.left ? this.props.left : <Left style={{flex: 1}} />}
        <Body style={styles.body}>
          <Title style={{ textAlign:"left", fontWeight: '400', color:this.props.tbg}}>{this.props.title}</Title>
        </Body>
        {this.props.right ? this.props.right : <Right style={{flex: 1}} />}
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
  title: {
   
  }
};
