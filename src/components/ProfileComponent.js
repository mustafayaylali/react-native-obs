// DashboardComponent.js

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableHighlight,
  BackHandler
} from 'react-native';


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
      <ScrollView style={styles.scrollContainer}>

        <View style={styles.container}>
          <View style={styles.box}>
            <Image style={styles.profileImage} source={{ uri: userInfo.avatar_url }} />
            <Text style={styles.name}>{userInfo.login} - {userInfo.type}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={[styles.button, styles.buttonMessage]} onPress={() => this.onClickListener('message')}>
              <Image style={styles.icon} source={{ uri: '../../images/dersler.png' }} />
            </TouchableHighlight>

            <TouchableHighlight style={[styles.button, styles.buttonLike]} onPress={() => this.onClickListener('like')}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/48/000000/facebook-like.png' }} />
            </TouchableHighlight>

            <TouchableHighlight style={[styles.button, styles.buttonLove]} onPress={() => this.onClickListener('love')}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/48/000000/facebook-like.png' }} />
            </TouchableHighlight>

            <TouchableHighlight style={[styles.button, styles.buttonCall]} onPress={() => this.onClickListener('phone')}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/48/000000/facebook-like.png' }} />
            </TouchableHighlight>
          </View>
        </View>

      </ScrollView>
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
    marginTop: 10,
    borderRadius:70,
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    alignItems: 'center',
    shadowColor: 'black',
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
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },

  button: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    margin: 10,
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
    width: 35,
    height: 35,
  }
});
