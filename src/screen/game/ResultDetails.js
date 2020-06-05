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

export default class ResultDetails extends Component {
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
            label: 'Match 3',
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
                <Navbar left={left} title='Result Details' bg='transparent'  tbg='#fff'/>
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>





                            <View style={{ flexDirection: 'row', margin: 20 }}>
                              <View style={styles.card}>

                               <View style={{ flex: 2 }}>
                               <Image
               style={{height:70, width:70, resizeMode: 'contain',}}
               source={require('../../assets/bthree.png')} 
               /> 
                               
                               </View>
                               <View style={{ flex: 3 }}>
                               <Text style={{ color:'#000', fontSize: 16, fontWeight: '800', }}>Match 3  </Text>

                                <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color:"#000", fontSize: 14, fontWeight: '200' ,  marginRight:20, opacity:0.6}}>selections</Text>

                                 <View style={{ flexDirection: 'row', }}>
                      <View style={{ backgroundColor: color.secondary_color, borderRadius: 3, paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>0</Text>
                      </View>
                      <View style={{ backgroundColor: color.secondary_color,  borderRadius: 3, paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>9</Text>
                      </View>
                      <View style={{ backgroundColor: color.secondary_color,  borderRadius: 3, paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>0</Text>
                      </View>
                     
                    </View>
                                </View>
         

 <Text style={{ color:"#000", fontSize: 14, fontWeight: '200' ,  opacity:0.6}}> 01/09/2020</Text>
           
                               
                               </View>
                              
                              
                              </View>
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
            <TouchableOpacity style={styles.oneRow}
            underlayColor="red">
            <View style={{ flex: 1 }}>
           
            <Text style={{ color:'#fff', fontSize: 14, fontWeight: '500', }}>Price: 8000.00  </Text>
            <Text style={{ color:"#fff", fontSize: 14, fontWeight: '200' ,}}>Exact orde 5, 3, 7 </Text>
            </View>
            <View style={{ marginLeft: 20 }}>
            <Text style={{ color:'#fff', fontSize: 14, fontWeight: '400' ,}}>0 winners </Text>
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
        height: 40,
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
        marginLeft:25,
        marginRight:25,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderBottomColor:'#fff',
        borderBottomWidth:0.5,
        paddingBottom:4

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

