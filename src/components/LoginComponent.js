import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Picker,
    AsyncStorage
} from 'react-native';


import bgImage from '../images/background.jpg'
import logo from '../images/logo.png'
import Icon from 'react-native-vector-icons/Ionicons'

import { getUserLoginInfo } from '../services/FetchUser';

const { width: WIDTH } = Dimensions.get('window')

export default class LoginComponent extends Component {

    static navigationOptions = {
        header: null
    }
    
    async saveKey(value) {
        try {
          await AsyncStorage.setItem('@UserTypeStore:key', value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
      }
      
      

    constructor(props) {
        super(props)

        //TOKEN TUTULMASI İÇİN ASYNC STORAGE KULLANILACAK

        this.state = {
            showPass: true,
            press: false,
            error: false,
            showAnimation: false,
            userType:'student'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        if (this.state.TextInput_Username == '') {
            this.setState({ error: 'Lütfen kullanıcı adını giriniz..' });
        }
        else if (this.state.TextInput_Password == '') {
            this.setState({ error: 'Lütfen şifrenizi giriniz..' });
        }
        else {
            this.setState({ showAnimation: true, error: false });

            getUserLoginInfo(this.state.TextInput_Username, this.state.TextInput_Password,this.state.userType).then((res) => {

                if (res.errorCode === 0) {

                    this.props.navigation.navigate("Main", {
                        userInfo: res,
                    });
                    this.text_input_username.clear();
                    this.text_input_password.clear();
                    this.setState({
                        error: false,
                        showAnimation: false,
                        TextInput_Username: '',
                        TextInput_Password: ''
                    })

                    this.saveKey(this.state.userType);
                }
                else {
                    this.setState({
                        showAnimation: false,
                        error: 'Kullanıcı adı veya şifre hatalı !'
                    });
                }

            });
        }
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
                <Picker
                    selectedValue={this.state.userType}
                    style={styles.selectBox}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ userType: itemValue })
                    }>
                    
                    <Picker.Item label="Öğretmen" value="teacher" />
                    <Picker.Item label="Öğrenci" value="student" />
                </Picker>

                <View style={styles.inputContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={data => this.setState({ TextInput_Username: data })}
                        ref={input => { this.text_input_username = input }}
                        placeholder={'Kullanıcı Adı'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={data => this.setState({ TextInput_Password: data })}
                        ref={input => { this.text_input_password = input }}
                        placeholder={'Şifre'}
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
                        <Text style={styles.text}>Giriş</Text>
                    </TouchableOpacity>
                    {this.state.showAnimation && <ActivityIndicator style={styles.animation} size="large" color="white" />}
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
    errorText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        top: 15
    },
    animation: {
        top: 15
    },
    selectBox:{
         height: 50, 
         width: 140,
         color:'white',
         marginTop: 10
    }
});
