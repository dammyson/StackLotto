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


export default class How extends Component {
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
                <Button transparent onPress={this.props.back}>
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
            <Container style={{ backgroundColor: color.primary_color }}>
            
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>
                        <View style={{ margin: 20 }}>
                          <Text style={{ color: '#fff', fontSize: 30, fontWeight: '800' }}>How  would you like to fund? </Text>
                          </View>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity style={[styles.card]} onPress={() =>  Actions.createW()}>

                                    <View style={{ marginRight: 10 }}>
                                        <Icon
                                            active
                                            name="wallet"
                                            type='entypo'
                                            color={color.secondary_color}
                                            size={40}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ color: color.primary_color, fontSize: 25, fontWeight: '800' }}>Paystacks </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.card]} onPress={() =>  Actions.createW()}>

                                    <View style={{ marginRight: 10 }}>
                                        <Icon
                                            active
                                            name="wallet"
                                            type='entypo'
                                            color={color.secondary_color}
                                            size={40}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ color: color.primary_color,  fontSize: 25, fontWeight: '800' }}>Opay </Text>
                                    </View>
                                </TouchableOpacity>



                                <View style={[styles.card]}>

                                    <View style={{ marginRight: 10 }}>
                                        <Icon
                                            active
                                            name="wallet"
                                            type='entypo'
                                            color={color.secondary_color}
                                            size={40}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ color: color.primary_color, fontSize: 25, fontWeight: '800' }}>Interswitch </Text>
                                    </View>
                                </View>


                                <View style={[styles.card]}>

                                    <View style={{ marginRight: 10 }}>
                                        <Icon
                                            active
                                            name="wallet"
                                            type='entypo'
                                            color={color.secondary_color}
                                            size={40}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ color: color.primary_color, fontSize: 25, fontWeight: '800' }}>Monify </Text>
                                    </View>
                                </View>



                                <View style={[styles.card]}>

                                    <View>
                                        <Text style={{ color: color.primary_color, fontSize: 25, fontWeight: '800' }}>Bank Transfer </Text>
                                    </View>
                                </View>


                                <View style={[styles.card]}>

                                   
                                    <View>
                                        <Text style={{ color: color.primary_color, fontSize: 25, fontWeight: '800' }}>USSD </Text>
                                    </View>
                                </View>



                                 <View style={{ margin: 20 }}>
                        
                          <TouchableOpacity onPress={() =>  Actions.pop()}>
                               <Icon
                                            active
                                            name="pluscircle"
                                            type='antdesign'
                                            color={color.secondary_color}
                                            size={60}
                                        />
                          </TouchableOpacity>
                         
                        
                          </View>
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
    inputView: {
        height: 45,
        flexDirection: 'row',
        color: color.primary_color,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: "#fff",
        fontSize: 13,
        marginBottom: 10,
        paddingLeft: 10,
        justifyContent: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: color.primary_color,
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
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    oneRow: {
        borderRadius: 15,
        margin: 12,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row'

    },
    price: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    bigCard: {
        justifyContent: 'center',
        backgroundColor: color.white,
        shadowColor: '#000',
        backgroundColor: "#fff",
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 1,
        flex: 1,
        paddingBottom: 20

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
