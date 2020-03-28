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

export default class BankPayment extends Component {
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
            label: 'All Transaction',
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
                        color={'#fff'}
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
                <Navbar left={left} title='Fund using Bank Transfer' bg='transparent'  tbg='#fff'/>
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', margin: 20 }}>
                            <Text style={{ color:"#fff", fontSize: 23, fontWeight: '900' }}>The account number provided is unique to stacklotto account </Text>

                            </View>




                            <Text style={styles.informationHead}>Copy the details provided below</Text>



                            <View style={styles.bigCard}>


                                <View style={{ margin: 25,}}>

                                    <Text style={{ color: color.primary_color, fontSize: 20, fontWeight: '900' }}>Bank Name </Text>
                                    <Text style={{ color: color.primary_color, fontSize: 17, fontWeight: '300' }}>Acces Bank PLC </Text>

                                </View>

 <View style={{ margin: 20,}}>

<Text style={{ color: color.primary_color, fontSize: 20, fontWeight: '900' }}>Bank Account Number </Text>
<Text style={{ color: color.primary_color, fontSize: 17, fontWeight: '300' }}>1234567890 (Saving Account) </Text>

</View>





                            </View>


                               <Text style={styles.informationHead}>Transfer the amount you wish to fund using your banc USSD or mobile banking</Text>
                               <Text style={styles.informationHead}>Your Stacklotton deposit wallet will be funded immidiately</Text>


 <TouchableOpacity style={{ height: 50, flexDirection: 'row', margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius:5, backgroundColor: color.secondary_color }}>
    <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Copy ACCOUNT DETAIL </Text>
  </TouchableOpacity>

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
        marginLeft: 18,
        marginRight: 18,
        color: "#fff",
        marginTop: 13,
        marginBottom: 13,
        fontSize: 16,
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
        backgroundColor: color.white,
        shadowColor: '#000',
        backgroundColor: "#fff",
   
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 1,
        flex: 1,
        paddingBottom: 20

    },
});

