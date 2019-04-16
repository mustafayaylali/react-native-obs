// DashboardComponent.js

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  BackHandler
} from 'react-native';

import bgImage from '../../images/background_profile.jpg'
import dersler from '../../images/dersler.png'

export default class ProfileComponent extends Component {

  static navigationOptions = {
    header: null
  }

  componentDidMount() { //back button disable
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    });
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {

    const { params } = this.props.navigation.state;
    const userInfo = params ? params.userInfo : null;

    return (
      <ImageBackground source={bgImage} style={styles.scrollContainer}>

        <View style={styles.container}>
          <View style={styles.box}>
            <Image style={styles.profileImage} source={{ uri: userInfo.avatar_url }} />
            <Text style={styles.name}>{userInfo.login} - {userInfo.type}</Text>
          </View>

          <View style={styles.buttonContainer}>

            <TouchableHighlight style={[styles.button, styles.buttonMessage]} onPress={() => this.onClickListener('message')}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.icon} source={dersler} />
                <Text style={styles.btnText}> DERSLERİM</Text>
              </View>
            </TouchableHighlight>


            <TouchableHighlight style={[styles.button, styles.buttonLike]} onPress={() => this.onClickListener('like')}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.icon} source={dersler} />
                <Text>Abnc</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.button, styles.buttonLove]} onPress={() => this.onClickListener('love')}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/48/000000/facebook-like.png' }} />
            </TouchableHighlight>

            <TouchableHighlight style={[styles.button, styles.buttonCall]} onPress={() => this.onClickListener('phone')}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/48/000000/facebook-like.png' }} />
            </TouchableHighlight>
          </View>
        </View>

      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({


  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  box: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '20%',
    borderRadius: 5,
    backgroundColor: 'rgba(178, 255, 249,0)',
    shadowColor: 'white',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2,
    paddingTop: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 200
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
    color: '#ffffff',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
  },

  button: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: .8,
    shadowOffset: {
      height: 2,
      width: -2
    },
    elevation: 4,
  },
  buttonMessage: {
    backgroundColor: "#00BFFF",
  },
  buttonLike: {
    backgroundColor: "#228B22",
  },
  buttonLove: {
    backgroundColor: "#FF1493",
  },
  buttonCall: {
    backgroundColor: "#40E0D0",
  },
  icon: {
    width: 45,
    height: 45,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  }
});
