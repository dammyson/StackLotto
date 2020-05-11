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


const slides = [
    {
        title: 'N3,700,000 Jackpot!',
        text: 'Select 6 number from 1 - 49',
        img: require('../../assets/six.png'),
        go: 1,
        price:'N 200 / Ticket',
    },
    {
        title: 'N350,000 Jackpot!',
        text: 'Select 5 number from 1 - 42 ',
        img: require('../../assets/five.png'),
        go: 2,
        price:"N 100 / Ticket"
    },
    {
        title: 'N30,000 Jackpot!',
        text: 'Select 4 number from 1 - 25 ',
        img: require('../../assets/four.png'),
        go: 3,
        price:"N 100 / Ticket"
    },
    {
        title: 'Match 4 to win N20,000',
        text: 'Select 4 number from 0 - 9 ',
        img: require('../../assets/bfour.png'),
        go: 4,
        price:"N 100 / Ticket"
    },
    {
        title: 'Match 3 to win N8,000',
        text: 'Select 3 number from 0 - 9 ',
        img: require('../../assets/bthree.png'),
        go: 5,
        price:"N 100 / Ticket"
    },
    {
        title: 'Match 2 to win N2,200',
        text: 'Select 2 number from 0 - 9 ',
        img: require('../../assets/btwo.png'),
        go: 6,
        price:"N 100 / Ticket"
    }
];

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            loading: false,
            balance: '',
        };
    }


    componentDidMount() {
        AsyncStorage.getItem('data').then((value) => {
          if (value == '') { } else {
            this.setState({ data: JSON.parse(value) })
          }
        })
    
        AsyncStorage.getItem('balance').then((value) => {
          this.setState({ 'balance': value.toString() })
          console.warn(value)
        })
    
    
      }


    render() {

        const { data, balance } = this.state

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

        var right = (
            <Right style={{ flex: 1, flexDirection:'row' }}>
            <View style={{ marginLeft:10 }}>
            <Text style={{ color: '#000', fontSize: 10, fontWeight: '400' }}>My Balance</Text>
            <Text style={{ color: '#000', fontSize: 12, fontWeight: '600' }}>N {balance}  </Text>
            </View>
            </Right>
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
                <Navbar left={left}   right={right}  title='LOTTERIES' bg='#fff' />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>





                            <View style={{ flexDirection: 'row', margin: 20 }}>
                            <FlatList
                                    style={{ paddingBottom: 5 }}
                                    data={slides}
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
    go(item) {
        if(item ==1 ){
            Actions.sg();
        }else if(item ==2 ){
            Actions.selectFive();
        }else  if(item ==3 ){
            Actions.selectFour();
        }else if(item ==4 ){
            Actions.match();
        }else if(item ==5 ){
            Actions.matchthree();
        }else  if(item ==6){
            Actions.matchtwo();
        }
       
    }

    renderItem = ({ item, }) => {
        return (
          
            <TouchableOpacity  onPress={()=> this.go(item.go)}  style={styles.card}>

            <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center', }}>
                <Image
                    style={{}}
                    size="large"
                    source={item.img}
                />
                <Text style={{ color: '#000', fontSize: 10, fontWeight: '900' }}>{item.price}</Text>
            </View>

            <View style={{ flex: 3 }}>
                <Text style={{ color: '#000', fontSize: 14, fontWeight: '900' }}>{item.title}</Text>

                <View style={{ flexDirection: 'row', }}>
                    <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>00</Text>
                    </View>
                    <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>00</Text>
                    </View>
                    <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>00</Text>
                    </View>
                    <View style={{ backgroundColor: '#f54278', borderRadius: 3, paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>00</Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', }}>
                    <View style={{ paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#000', fontSize: 12, fontWeight: '300' }}>D</Text>
                    </View>
                    <View style={{ paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#000', fontSize: 12, fontWeight: '300' }}>  Hr</Text>
                    </View>
                    <View style={{ paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#000', fontSize: 12, fontWeight: '300' }}>   Mi</Text>
                    </View>
                    <View style={{ paddingLeft: 4, paddingRight: 4, marginLeft: 5, }}>
                        <Text style={{ color: '#000', fontSize: 12, fontWeight: '300' }}>  Sec</Text>
                    </View>
                </View>

                <Text style={{ color: '#000', fontSize: 11, fontWeight: '200', }}>{item.text}</Text>
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
        padding: 20,
        paddingBottom: 10,
        marginTop:10,
        marginBottom:10
    },
    oneRow: {
        borderRadius: 15,
        margin: 12,
        marginLeft: 25,
        marginRight: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row'

    },
    
});

