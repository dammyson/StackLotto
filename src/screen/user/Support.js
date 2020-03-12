// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, FlatList, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import Navbar from '../../component/Navbar';
import Modal, { ModalContent } from 'react-native-modals';

import color from '../../component/color'
import { Card, Icon, SocialIcon } from 'react-native-elements'


export default class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            phone: '',
            loading: false,
            type: '',
            condition: false,
            account: '',
            complete_transaction: false,
         
        };
    }


    componentDidMount() {
        AsyncStorage.getItem('type').then((value) => {
            value == '' ? this.setState({ type: "null" }) : this.setState({ type: value })
        })
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        this.setState({
            today: year + '-' + month + '-' + date,
        });

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
            <Container style={{ backgroundColor: '#fff' }}>
                <Navbar left={left} title='Support' bg='#fff' />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>

                            <View style={{ marginTop: 15 }}>

                               <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ marginRight: 15 }}>
                <Icon
                        active
                        name="headphones"
                        type='font-awesome'
                        size={50}
                        color={color.secondary_color}
                    />
                </View>
               
                <View style={{ flex: 1 ,  justifyContent: 'center',}}>
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: '500' }}>Call us on </Text>
                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}> 081000000000000 or 081000000000  </Text>
                </View>
            </TouchableOpacity>

              <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ marginRight: 15 }}>
                <Icon
                        active
                        name="whatsapp"
                        type='font-awesome'
                        size={50}
                        color={color.secondary_color}
                    />
                </View>
               
                <View style={{ flex: 1 ,  justifyContent: 'center',}}>
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: '500' }}>Chat with us on Whatsapp</Text>
                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}> Click her to chat </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ marginRight: 15 }}>
                <Icon
                        active
                        name="telegram"
                        type='font-awesome'
                        size={50}
                        color={color.secondary_color}
                    />
                </View>
               
                <View style={{ flex: 1 ,  justifyContent: 'center',}}>
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: '500' }}>Chat with us on Telegram</Text>
                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}> Click her to chat </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ marginRight: 15 }}>
                <Icon
                        active
                        name="mail"
                        type='antdesign'
                        size={50}
                        color={color.secondary_color}
                    />
                </View>
               
                <View style={{ flex: 1 ,  justifyContent: 'center',}}>
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: '500' }}>Send us an e-mail at </Text>
                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}> stacklotto@us  </Text>
                </View>
            </TouchableOpacity>


                            </View>


                        </View>





                    </View>
                </Content>
            </Container>

        );
    }
    itemClicked(item) {
        Actions.product();
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
   
    mainContent: {
        flex: 1,
        justifyContent: 'center'
    },
    
    oneRow: {
        borderRadius: 3,
        margin: 12,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor:color.primary_color

    },
  
});

