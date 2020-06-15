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
        label: 'Stacklotto 6/49',
        value: 'Matchth',
    },
    {
        label: 'Lucky 5',
        value: 'Matchth',
    },
    {
        label: 'Stacklotto 4/25',
        value: 'Matchth',
    },
    {
        label: 'Match 4',
        value: 'Matchth',
    },
    {
        label: 'Match 3',
        value: 'Matchth',
    },
    {
        label: 'Match 2',
        value: 'Matchth',
    },
];

export default class History extends Component {
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
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
            }
            console.warn(value)
        })

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

    getTicketRequest() {

        const { data, startdate, enddate, type } = this.state
        var date = new Date(startdate).getDate();
        var month = new Date(startdate).getMonth() + 1;
        var year = new Date(startdate).getFullYear();
        console.warn(date, month , year )

        this.setState({ loading: true })

        fetch(URL.url + 'profile/save/plays/' + data.id + '/' + type + '/' +  date + '/' + month + '/' + year + '/',{
            method: 'POST', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(this.processResponse)
            .then(res => {
                this.setState({ loading: false })
                const { statusCode, data } = res;
                console.warn(statusCode, data)
                this.setState({ loading: false })

                if (statusCode == 200) {

                } else if (statusCode == 400) {

                    Alert.alert('Operarion failed', 'Make sure the new password is defferent from the old one', [{ text: 'Okay' }])

                } else {

                    Alert.alert('Operarion failed', '', [{ text: 'Okay' }])

                }

            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert(error.message);
                this.setState({ loading: false })
            });

    }


    render() {

        const placeholder = {
            label: 'Match 5',
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
                        color='#fff'
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
                <Navbar left={left} title='Play History' bg='transparent' tbg='#fff' />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', margin: 20 }}>
                                <Text style={{ color: "#fff", fontSize: 14, fontWeight: '400', }}>Select the lottery type and date to view play history </Text>

                            </View>

                            <View style={styles.bigCard}>
                                <View style={{ marginTop: 20 }} >
                                    <Text style={{ color: '#000', fontSize: 12, fontWeight: '500', marginLeft: 15 }}>Filter History</Text>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginTop: 10, flex: 1 }}>
                                        <View style={{ flex: 1, }}>
                                            <Text style={{ color: '#000', fontSize: 12, fontWeight: '700', marginLeft: 15 }}>Start Date </Text>
                                            <View style={styles.inputViewDate}>
                                                <DatePicker
                                                    style={{ flex:1,}}
                                                    date={this.state.startdate}
                                                    mode="date"
                                                    showIcon={false}
                                                    placeholder="select date"
                                                    format="YYYY-MM-DD"
                                                    minDate="2020-05-01"
                                                    maxDate="2050-06-01"
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    customStyles={{
                                                        // ... You can check the source to find the other keys.
                                                    }}
                                                    onDateChange={(date) => { this.setState({ startdate: date }) }}
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
                                                            type: value,
                                                        });
                                                    }}
                                                    style={pickerSelectStyles}
                                                    value={this.state.account}
                                                    useNativeAndroidPickerStyle={false}

                                                /></View>

                                        </View>


                                    </View>
                                    <View style={{ marginTop: 10, flex: 1 }}>


                                        <View style={{ flex: 1, }}>
                                            <Text style={{ color: '#000', fontWeight: '700', fontSize: 12, marginLeft: 15 }}>End Date </Text>
                                            <View style={styles.inputViewDate}>
                                                <DatePicker
                                                    style={{ flex:1,}}
                                                    date={this.state.enddate}
                                                    mode="date"
                                                    showIcon={false}
                                                    placeholder="select date"
                                                    format="YYYY-MM-DD"
                                                    minDate="2020-05-01"
                                                    maxDate="2050-06-01"
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    customStyles={{
                                                        // ... You can check the source to find the other keys.
                                                    }}
                                                    onDateChange={(date) => { this.setState({ enddate: date }) }}
                                                />

                                            </View>
                                        </View>

                                        <View style={[styles.inputView, { borderColor: '#fff', paddingLeft: 0 }]}>
                                            <TouchableOpacity onPress={() => this.getTicketRequest()} style={styles.primaryButtonContainer} block iconLeft>
                                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>SHOW </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                </View>
                            </View>

                            {this.state.result ?

                                <View style={{ marginTop: 20, }}>
                                    <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, borderBottomColor: '#fff', borderBottomWidth: 3 }}>
                                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', flex: 1, }}>Ticket# </Text>
                                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', flex: 1, }}>Selection </Text>
                                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', flex: 1, }}>Draw date </Text>

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
                                :
                                null


                            }

                        </View>
                    </View>
                </Content>
            </Container>

        );
    }
    sell(item) {
        if (item == 'Matchth') {
            Actions.rd();
        }

    }


    renderItem = ({ item, }) => {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, }}>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '400', flex: 1, }}>ABCDEFGV </Text>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '300', flex: 1, }}> 1, 45, 56, 2, 4, 4 </Text>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '300', flex: 1, }}> 01/01/2020 </Text>


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
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.secondary_color,
        borderRadius: 5,
        flex: 1,

    },
    secondaryButtonContainer: {
        height: 40,
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
        justifyContent: 'center',
        flex: 1,
        borderWidth: 0.8,
        borderColor: color.primary_color,
    },
    inputViewDate: {
        height: 40,
        flexDirection: 'row',
        color: color.primary_color,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#fff",
        fontSize: 13,
        marginBottom: 10,
        paddingLeft: 0,
        justifyContent: 'center',
        flex: 1,
        borderWidth: 0.8,
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
        color: color.primary_color,
        marginTop: 13,
        marginBottom: 13,
        fontSize: 16,
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
        marginLeft: 15,
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
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        paddingRight: 30,
        // to ensure the text is never behind the icon
    },
});

