// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Platform, Dimensions, StyleSheet, Image } from 'react-native';
import { Container, Content, View, Text, Icon, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import OTPInputView from '@twotalltotems/react-native-otp-input'



import color from '../../component/color'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            enterCode: true,
            spinner: false,
        };
    }


    componentWillMount() {

    }

    render() {

        return (
            <View
                style={styles.backgroundImage}
            >
                <Container style={{ backgroundColor: 'transparent' }}>
                    <Content>
                        <View>
                            <View style={styles.body}>
                                <View style={styles.sideContent}>
                                    <Image
                                        style={styles.logo}
                                        resizeMode="contain"
                                        source={require('../../assets/logo.png')} />
                                </View>
                                <View style={styles.mainContent}>
                                    <Text style={styles.title}>Verify Your Number</Text>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>We've  sent your Otp to 080123456789</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                                        <OTPInputView
                                            style={{
                                                width: '70%', height: 70, marginLeft: 30,
                                                marginRight: 30, justifyContent: 'center', color: '#fff',
                                            }}
                                            pinCount={6}
                                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                            // onCodeChanged = {code => { this.setState({code})}}
                                            autoFocusOnLoad
                                            codeInputFieldStyle={styles.underlineStyleBase}
                                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                            onCodeFilled={(code => {
                                                Actions.addpin();
                                            })}
                                        />
                                    </View>
                                    <Text style={{ marginTop: 7, marginBottom: 7, marginRight: 13, marginLeft: 30, fontSize: 15, color: '#fff', textAlign: 'center', fontWeight: '300' }}>Sent Otp</Text>
                                    <Button onPress={() =>  Actions.addpin()} style={styles.buttonContainer} block iconLeft>
                                        <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Enter </Text>
                                    </Button>
                                </View>



                            </View>


                        </View>

                    </Content>
                </Container>
            </View>
        );
    }

    itemClicked(item) {
        Actions.product();
    }



}
const styles = StyleSheet.create({
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
    textInput: {
        padding: 0,
        margin: 0,
        flex: 1,
        fontSize: 20,
        color: 'red'
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    buttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderRadius: 10,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center'
    
      },
      sideContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
      },
      body: {
        flex: 1,
      },
    actionbutton: {
        marginTop: 7,
        marginBottom: 7,
        marginRight: 13,
        marginLeft: 30,
        fontSize: 13,
        color: '#fff',
        textAlign: 'left',
        fontWeight: '500',
        fontFamily: 'Montserrat-Bold'
    },
    title: {
        marginTop: 7,
        marginBottom: 7,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 19,
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: '900',
        fontFamily: 'Montserrat-Bold'
    },
    logo: {
        width: 100,
        height: 100,
        margin: 40,
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "red",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: "white",
        color:'white'
    },

    underlineStyleHighLighted: {
        borderColor: "white",
    },
});

