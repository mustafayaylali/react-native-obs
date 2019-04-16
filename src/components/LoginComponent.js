
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity
} from 'react-native';


import bgImage from '../../images/background.jpg'
import logo from '../../images/logo.png'
import Icon from 'react-native-vector-icons/Ionicons'

import { getUserInfo } from '../services/FetchUser';

const { width: WIDTH } = Dimensions.get('window')

export default class LoginComponent extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)

        this.state = {
            showPass: true,
            press: false,
            TextInput_Username: '',
            error:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        getUserInfo(this.state.TextInput_Username)//this.state.TextInput_Username
        .then((res) => {
            if(res.message === 'Not Found') {
              this.setState({
                  error: 'Kullanıcı bulunamadı..'
              });
            }
          else {
            
            this.props.navigation.navigate("Profile", {
                itemId: 86,
                userName: this.state.TextInput_Username,
                authority: "student"
            });

            this.setState({
              error: false,
              TextInput_Username: ''
            })
          }
      });
    }

    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }

    render() {

        let showErr = (
            this.state.error ?
            <Text style={styles.errorText}>
              {this.state.error}
            </Text> :
            <View></View>
          );

        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}>ÖĞRENCİ BİLGİ SİSTEMİ</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={data => this.setState({ TextInput_Username: data })}
                        placeholder={'Username'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                    />
                    <TouchableOpacity style={styles.btnEye}
                        onPress={this.showPass.bind(this)}>
                        <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'}
                            size={26} color={'rgba(255,255,255,0.7)'} />
                    </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity style={styles.btnLogin} onPress={this.handleSubmit}>
                    <Text style={styles.text}>Login1</Text>
                </TouchableOpacity>
                {showErr}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logo: {
        width: 120,
        height: 120
    },
    logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    inputContainer: {
        marginTop: 10
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    errorText:{
        textAlign:'center',
        fontSize:15,
        color:'yellow',
        top:15
    }
});
