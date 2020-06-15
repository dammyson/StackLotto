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
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';


const sports = [
    {
        label: 'Football',
        value: 'football',
    },
    {
        label: 'Baseball Baseball Baseball Baseball',
        value: 'baseball',
    },
    {
        label: 'Hockey',
        value: 'hockey',
    },
    {
        label: 'Baseball Baseball Baseball Baseball',
        value: 'baseball',
    },
    {
        label: 'Hockey',
        value: 'hockey',
    },
];

export default class Notification extends Component {
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
            showFilter: false,
            startdate: "2019-05-29",
            enddate: "2019-05-29",
            todate: "2019-06-11",
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
                        color={"#fff"}
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
            <Container style={{ backgroundColor: color.primary_color }}>
                <Navbar left={left} title='Notification' bg='transparent'  tbg='#fff' />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>

                            <View style={{ marginTop: 15 }}>

                            <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: '500' }}> Welcome to stacklotto Match 3 draw winning, Number.</Text>
                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: '900' }}>Game type: Match 3  </Text>
                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: '900' }}>Draw date: March 3 </Text>
                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: '900' }}>Fri Jul 20 2018 09:19:00  </Text>
                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: '900' }}>Drawing: 0,1, 1, 1   </Text>
                </View>
            </TouchableOpacity>



            <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: '500' }}>Congratulations your ticket number  <Text style={{ color: "#fff", fontSize: 13, fontWeight: '900' }}>XD563HFKFKFJG  </Text> have just won 35.000.000 Jackpot. kindly View your winning wallet to withdraw or place more tickets .</Text>

                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: '500' }}>Your games with ticket numbers  <Text style={{ color: "#fff", fontSize: 13, fontWeight: '900' }}>XD563HFKFKFJG, XD563HFKFKFJG,XD563HFKFKFJG </Text>  has been successfully 
placed..</Text>

                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: '500' }}>Your account has been funded succesfully with N75,000</Text>

                </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: '500' }}>Congratulations Your account has  succesfully created. Kindly visit your profile page to complete your information and start winning</Text>

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
    input: {
        height: 45,
        color: color.primary_color,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: "#fff",
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10
    },
    primaryButtonContainer: {
        height: 45,
        backgroundColor: color.primary_color,
        marginLeft: 7,
        marginRight: 12,
        borderRadius: 5,
        flex: 1,

    },
    secondaryButtonContainer: {
        height: 45,
        backgroundColor: color.secondary_color,
        marginLeft: 12,
        marginRight: 7,
        borderRadius: 5,
        flex: 1,

    },
    mainContent: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        marginTop: 7,
        marginBottom: 15,
        marginRight: 13,
        fontSize: 22,
        color: color.primary_color,
        textAlign: 'left',
        fontWeight: '900'
    },
    information: {
        marginLeft: 12,
        color: '#5f6066',
        marginTop: 10,
        fontSize: 12,
    },
    informationHead: {
        marginLeft: 12,
        color: color.primary_color,
        marginTop: 13,
        marginBottom: 13,
        fontSize: 13,
        fontWeight: '400'
    },
    card: {
        justifyContent: 'center',
        backgroundColor: color.white,
        shadowColor: '#000',
        backgroundColor: "#fff",
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 1,
        flex: 1,
        flexDirection: 'row',
        padding: 20
    },
    oneRow: {
        borderRadius: 4,
        margin: 10,
        padding: 11,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor:color.secondary_color,
        marginLeft:20,
        marginRight:20,

    },
  
});

