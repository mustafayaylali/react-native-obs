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

import bgImage from '../images/background_profile.jpg'
import dersler from '../images/dersler.png'
import ders_secim from '../images/ders_secim.png'
import profil from '../images/profil.png'

export default class HomeComponent extends Component {

  static navigationOptions = {
    header: null
  }

  componentDidMount() { //back button disable
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    });
  }

  onClickListener = (viewId) => {
    if (viewId == "ders") {
      this.props.navigation.navigate("Lessons");
    }
    else if (viewId == "cikis") {
      this.props.navigation.navigate("Home");
    }
    else if(viewId=="profil"){
      this.props.navigation.navigate("Profile");
    }
    // Alert.alert("Alert", "Button pressed " + viewId);

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

            <TouchableHighlight style={[styles.button, styles.buttonMessage]} onPress={() => this.onClickListener('ders')}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.icon} source={dersler} />
                <Text style={styles.btnText}> DERSLERİM</Text>
              </View>
            </TouchableHighlight>


            <TouchableHighlight style={[styles.button, styles.buttonLike]} onPress={() => this.onClickListener('profil')}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.icon} source={profil} />
                <Text style={styles.btnText}> PROFİLİM</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.button, styles.buttonLove]} onPress={() => this.onClickListener('love')}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.icon} source={ders_secim} />
                <Text style={styles.btnText}> DERS SEÇİMİ</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.button, styles.buttonCall]} onPress={() => this.onClickListener('cikis')}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.icon} source={dersler} />
                <Text style={styles.btnText}> ÇIKIŞ</Text>
              </View>
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
    //borderRadius: 80,
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
    color: '#dbdbdb',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
  },

  button: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    //justifyContent: 'center',
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
    backgroundColor: "#2F95D6",
  },
  buttonLike: {
    backgroundColor: "#228B22",
  },
  buttonLove: {
    backgroundColor: "#FF1493",
  },
  buttonCall: {
    backgroundColor: "gray",
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 20,
    marginRight: 20
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginTop: 5
  }
});
