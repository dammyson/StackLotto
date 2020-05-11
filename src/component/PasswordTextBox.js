import React from 'react';
import { Item, Input, Icon, Label } from 'native-base';
import { TextInput, StyleSheet,View, TouchableOpacity } from 'react-native';
import color from './color'
export default class PasswordTextBox extends React.Component {
    state = {
        icon: "eye-off",
        password: true
    };

    _changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
            password: !prevState.password
        }));
    }

    render() {
        const { label, icon, onChange,  } = this.props;
        return (
            <View style={styles.inputView}>
                <TextInput
                    placeholder={label}
                    placeholderTextColor={color.primary_color}
                    returnKeyType="next"
                    secureTextEntry={this.state.password} 
                    onSubmitEditing={() => this.password2.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{ flex: 1 }}
                    ref={(input) => this.password = input}
                    onChangeText={(e) => onChange(e)} 
                />

                <TouchableOpacity onPress={() => this._changeIcon()} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
                    <Icon
                        active
                        name={this.state.icon}
                        color='#000'
                        
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

PasswordTextBox;

const styles = StyleSheet.create({
 
    inputView: {
      height: 45,
      flexDirection:'row',
      color: color.primary_color,
      marginLeft: 30,
      marginRight: 30,
      backgroundColor: "#d1d1d1",
      fontSize:14,
      marginTop: 10,
      marginBottom: 10,
      paddingLeft:10,
      justifyContent: 'center',
     
    },
  });