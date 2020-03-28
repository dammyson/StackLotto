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
        label: 'N3,700,000 Jackpot!',
        value: 'football',
    },
    {
        label: 'N350,000 Jackpot!',
        value: 'baseball',
    },
    {
        label: 'N30,000 Jackpot',
        value: 'hockey',
    },
    {
        label: 'Match 4',
        value: 'baseball',
    },
    {
        label: 'Match 3',
        value: 'hockey',
    }, {
        label: 'Match 2',
        value: 'hockey',
    },
];

export default class WalletTransactions extends Component {
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
            result: false
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
            label: 'All Transactions',
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
            <Container style={{ backgroundColor: color.primary_color }}>
                <Navbar left={left} title='Wallet' bg='#fff' tbg='#000' />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                <View style={[styles.card, { marginLeft: 12 }]}>

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
                                        <Text style={{ color: color.primary_color, fontSize: 12, fontWeight: '400' }}>Deposit </Text>
                                        <Text style={{ color: color.primary_color, marginTop: 10, fontSize: 14, fontWeight: '800' }}>N105,000.00 </Text>
                                    </View>
                                </View>


                                <View style={[styles.card, { marginRight: 12 }]}>

                                    <View style={{ marginRight: 10 }}>
                                        <Icon
                                            active
                                            name="wallet"
                                            type='entypo'
                                            color={color.primary_color}
                                            size={40}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ color: color.primary_color, fontSize: 12, fontWeight: '400' }}>winning </Text>
                                        <Text style={{ color: color.primary_color, marginTop: 10, fontSize: 14, fontWeight: '800' }}>N105,000.00 </Text>
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 30 }}>

                                <Button onPress={() => Actions.how()} style={[styles.secondaryButtonContainer, { backgroundColor: "#fff" }]} block iconLeft>

                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '500' }}>FUND WALLET </Text>
                                </Button>


                                <Button onPress={() => Actions.createW()} style={styles.secondaryButtonContainer} block iconLeft>

                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>WITHDRAW </Text>
                                </Button>
                            </View>


                            <Text style={styles.informationHead}>Recent Transactions History</Text>


                            {
                                this.state.showFilter ?

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={styles.information}>Filter Transactions</Text>



                                        <View style={styles.inputView}>
                                            <View style={{ flex: 1 }}>
                                                <RNPickerSelect
                                                    placeholder={placeholder}
                                                    placeholderTextColor={'#000'}
                                                    items={sports}
                                                    onValueChange={value => {
                                                        this.setState({
                                                            account: value,
                                                        });
                                                    }}
                                                    style={pickerSelectStyles}
                                                    value={this.state.account}
                                                    useNativeAndroidPickerStyle={false}

                                                /></View>
                                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
                                                <Icon
                                                    active
                                                    name="md-arrow-dropdown-circle"
                                                    type='ionicon'
                                                    color='#5f6066'
                                                />
                                            </TouchableOpacity>

                                        </View>


                                    </View>
                                    :
                                    <View style={styles.bigCard}>
                                        <View style={{ marginTop: 20 }} >
                                            <Text style={{ color: '#000', fontSize: 12, marginLeft: 15, fontWeight:'500' }}>Filter Transactions</Text>
                                        </View>


                                 <View style={{ flexDirection:'row'}}>
                                 <View style={{ marginTop: 10,  flex:1  }}>
                                          <View style={{ flex: 1, }}>
                                                <Text style={{ color: '#000', fontSize: 12, marginLeft: 15 }}>Start Date </Text>
                                                <View style={styles.inputView}>
                                                    <TextInput
                                                        placeholder="27/02/2002"
                                                        placeholderTextColor={color.primary_color}
                                                        returnKeyType="next"
                                                        onSubmitEditing={() => this.passwordInput.focus()}
                                                        keyboardType='email-address'
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        inlineImageLeft='ios-call'
                                                        style={{ flex: 1 }}
                                                        onChangeText={text => this.setState({ phone: text })}
                                                    />


                                                </View>
                                            </View>
                                            <View style={styles.inputView}>
                                                <View style={{ flex: 1 }}>
                                                    <RNPickerSelect
                                                        placeholder={placeholder}
                                                        placeholderTextColor={'#000'}
                                                        items={sports}
                                                        onValueChange={value => {
                                                            this.setState({
                                                                account: value,
                                                            });
                                                        }}
                                                        style={pickerSelectStyles}
                                                        value={this.state.account}
                                                        useNativeAndroidPickerStyle={false}

                                                    /></View>

                                            </View>

                                          
                                        </View>
                                        <View style={{  marginTop: 10, flex:1 }}>
                                           

                                            <View style={{ flex: 1, }}>
                                                <Text style={{ color: '#000', fontSize: 12, marginLeft: 15 }}>End Date </Text>
                                                <View style={styles.inputView}>
                                                    <TextInput
                                                        placeholder="27/02/2002"
                                                        placeholderTextColor={color.primary_color}
                                                        returnKeyType="next"
                                                        onSubmitEditing={() => this.passwordInput.focus()}
                                                        keyboardType='email-address'
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        inlineImageLeft='ios-call'
                                                        style={{ flex: 1 }}
                                                        onChangeText={text => this.setState({ phone: text })}
                                                    />


                                                </View>
                                            </View>

                                            <View style={[styles.inputView,{borderColor:'#fff', paddingLeft:0}]}>
                                            <TouchableOpacity onPress={() => this.setState({ result: true, })} style={styles.primaryButtonContainer} block iconLeft>

                                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>SHOW </Text>
                                            </TouchableOpacity>
                                            </View>
                                        </View>

                                       
                                        </View>
                                    </View>

                            }


                            {this.state.result ?
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
                                :
                                null


                            }


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
            <TouchableOpacity style={styles.oneRow}
                underlayColor="red">
                <View style={{ flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: '500' }}>Lucky 5 Nice </Text>
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: '300' }}>Fri Jul 20 2018 09:19:00  </Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={[styles.price, item.price == 1000 ? { color: 'red' } : { color: 'green' }]}>N2000 </Text>
                </View>
            </TouchableOpacity>

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
        height: 40,
        color: color.primary_color,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: "#fff",
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
       
    },
    primaryButtonContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: color.primary_color,
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
        height: 40,
        flexDirection: 'row',
        color: color.primary_color,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#fff",
        fontSize: 13,
        marginBottom: 10,
        paddingLeft: 10,
       
        flex: 1,
        borderWidth: 0.8,
        borderColor: color.primary_color,
    },
    information: {
        marginLeft: 12,
        color: '#fff',
        marginTop: 10,
        fontSize: 12,
        fontWeight: '900'
    },
    informationHead: {
        marginLeft: 12,
        color: "#fff",
        marginTop: 13,
        marginBottom: 13,
        fontSize: 13,
        fontWeight: '800'
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
        margin: 2,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderBottomColor: color.secondary_color,
        borderBottomWidth: 1

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
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 1,
        flex: 1,
        paddingBottom: 20

    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 2,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',

        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 13,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        paddingRight: 30,
        // to ensure the text is never behind the icon
    },
});
