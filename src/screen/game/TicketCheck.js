// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, FlatList, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
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

export default class TicketCheck extends Component {
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
            <Container style={{ backgroundColor: color.primary_color}}>
                <Navbar left={left} title='Check your tickets'  bg='transparent'  tbg='#fff' />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', margin: 20 }}>
                                <Text style={{ color: '#fff', fontSize: 13, fontWeight: '400' }}>Enter the ticket number or the batch number to check the current status of your game </Text>

                            </View>




                            <Text style={styles.informationHead}>Ticket Number / Batch Number</Text>

                            <View style={{ marginTop: 10, marginBottom: 15, flexDirection: 'row', }}>
                                <View style={{ marginTop: 9, marginBottom: 9, flexDirection: 'row', marginLeft: 45, flex: 1, alignItems: 'center', }}>
                                    <TouchableOpacity style={[{
                                        height: 22,
                                        width: 22,
                                        borderRadius: 11,
                                        borderWidth: 1.5,
                                        borderColor: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 10
                                    }]}>
                                        {this.state.condition ?
                                            <View style={{
                                                height: 10,
                                                width: 10,
                                                backgroundColor: '#fff',
                                            }} />

                                            :
                                            <View style={{
                                                height: 10,
                                                width: 10,
                                                borderRadius: 5,
                                                backgroundColor: color.secondary_color,
                                            }} />
                                        }
                                    </TouchableOpacity>
                                    <Text style={{ color: '#fff', fontSize: 13, fontWeight: '500' }}>Ticket Number  </Text>
                                </View>

                                <View style={{ marginTop: 9, marginBottom: 9, flexDirection: 'row', marginRight: 45, flex: 1, alignItems: 'center', }}>
                                    <TouchableOpacity style={[{
                                        height: 22,
                                        width: 22,
                                        borderRadius: 11,
                                        borderWidth: 1.5,
                                        borderColor: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 10
                                    }]}>
                                        {this.state.condition ?
                                            <View style={{
                                                height: 10,
                                                width: 10,
                                                backgroundColor: '#fff',
                                            }} />

                                            :
                                            null
                                        }
                                    </TouchableOpacity>
                                    <Text style={{ color: '#fff', fontSize: 13, fontWeight: '500' }}>Batch Number  </Text>
                                </View>

                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    placeholder=""
                                    placeholderTextColor={color.primary_color}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    keyboardType='email-address'
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    inlineImageLeft='ios-call'
                                    style={{ flex: 1 }}
                                    onChangeText={text => this.setState({ password: text })}
                                />

                            </View>






                            <TouchableOpacity style={{ height: 50, flexDirection: 'row', margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: color.secondary_color }}>
                                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Check your Ticket ID</Text>
                            </TouchableOpacity>

                            <View style={{ marginLeft: 20, marginBottom:15 }}>
                                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>Ticket Result  </Text>
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '400' }}>3 tickets won of 3  the tickets played  </Text>

                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, borderBottomColor: color.primary_color, borderBottomWidth: 3 }}>
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', flex: 2 }}>Ticket# </Text>
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', flex: 2 , }}>Selection </Text>
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', flex: 1 }}>Outcome </Text>

                            </View>

                            <View style={{ marginTop: 15 }}>

                                <FlatList
                                    style={{ paddingBottom: 5 }}
                                    data={sports}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.id}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    ListHeaderComponent={this.renderHeader}
                                />

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


    renderItem = ({ item, }) => {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, }}>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '400', flex: 2 }}>ABCDEFGV </Text>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '300', flex: 2 , opacity: 0.5}}> 1, 45, 56, 2, 4, 4 </Text>
                <Text style={{ color: 'green', fontSize: 14, fontWeight: '300', flex: 1 }}> won </Text>


            </View>

        )

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
        height: 50,
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
        color: color.primary_color,
        marginTop: 13,
        marginBottom: 13,
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'center'
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

