// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'


import color from '../../component/color'


export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            visible: false,
            view_balance: false,
            data:'',
        };
    }
    componentWillMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
              this.setState({ data: JSON.parse(value) })
            }
            
          })
    }

    render() {
        return (
            <View
              
                style={styles.backgroundImage}
              >
                <View style={styles.body}>
                    <View style={{ height: 2 }}>
                    </View>
                    <View style={styles.mainContent}>
                    <View style={styles.arrowContainer}>
                        <Icon
                            name="ios-arrow-back"
                            size={30}
                            type='ionicon'
                            color={color.primary_color}
                        />
                         <Text style={styles.title}>User Data</Text>
                        </View>
                        <View style={styles.avartar}>
                            <Avatar
                                rounded
                                source={{
                                    uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                                }}
                                size="large"
                                icon={{ name: 'rocket', color: 'orange', type: 'font-awesome' }}
                                overlayContainerStyle={{ backgroundColor: 'white', borderColor: color.primary_color, borderWidth: 2 }}
                                onPress={() => console.log("Works!")}
                                containerStyle={{ borderRadius: 15 }}
                                showEditButton={true}
                            />
                        </View>
                        <Text style={styles.title}>ID no: 3436373</Text>

                    </View>
                    <View style={styles.sideContent}>
                        <Button onPress={() => {
                            this.setState({ visible: true });
                        }} style={styles.qrbuttonContainer} block iconLeft>
                            <Icon
                                active
                                name="qrcode-scan"
                                type='material-community'
                                color='#000'
                            />
                            <Text style={{ textAlign: 'right', color: '#000', fontSize: 13, fontWeight: '400' }}>My QR code </Text>
                        </Button>

                        <View style={styles.item}>
                        <TextInput
                          defaultValue={this.state.data.phone}
                            placeholder="Phone Number"
                            placeholderTextColor='#fff'
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.menu}
                            onChangeText={text => this.setState({ username: text })}
                        />
                            <Icon active name="edit" type='entypo' color='#fff'
                                    />
                        </View>
                        <View style={styles.item}>
                        <TextInput
                            defaultValue={this.state.data.first_name + this.state.data.last_name}
                            placeholder="Name"
                            placeholderTextColor='#fff'
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.menu}
                            onChangeText={text => this.setState({ username: text })}
                        />
                            <Icon active name="edit" type='entypo' color='#fff'
                                    />
                        </View>
                        <View style={styles.item}>
                        <TextInput
                            placeholder="Pin"
                            secureTextEntry
                            placeholderTextColor='#fff'
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.menu}
                            onChangeText={text => this.setState({ username: text })}
                        />
                            <Icon active name="edit" type='entypo' color='#fff'
                                    />
                        </View>
                    </View>
                </View>



            </View>
        );
    }

    itemClicked(item) {
        Actions.product();
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainContent: {
        flex: 1,
        width: Dimensions.get('window').width,
        marginTop: 40,


    },
    sideContent: {
        flex: 2,
        width: Dimensions.get('window').width,

    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 7,
        marginRight: 13,
        marginLeft: 30,
        fontSize: 13,
        color: '#ffffff',
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
    avartar: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    card: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 15,
    },
    qrbuttonContainer: {
        backgroundColor: color.white,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 1,
        borderRadius: 13,
        paddingLeft: 10
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#393939',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderRadius: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        alignItems: 'center',
        paddingRight: 15
    },
    menu: {
        flex: 1,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 12,
        color: '#ffffff',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    arrowContainer: {
        flexDirection: "row",
        justifyContent:'flex-start',
        marginLeft: 40,
        marginRight: 20,
      },

});

