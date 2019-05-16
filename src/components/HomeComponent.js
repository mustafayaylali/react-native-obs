import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableHighlight,
  BackHandler,
} from 'react-native';

import bgImage from '../images/background_profile.jpg'
import dersler from '../images/dersler.png'
import ders_secim from '../images/ders_secim.png'
import profil from '../images/profil.png'
import logout from '../images/logout.png'

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

  }

  render() {

    const { params } = this.props.navigation.state;
    var userInfo = params ? params.userInfo : null;

    return (

      <ImageBackground source={bgImage} style={styles.scrollContainer}>

        <View style={styles.container}>
          <View style={styles.box}>
            {userInfo.data.name==='Ahmet' ?
              <Image style={styles.profileImage} source={require('../images/ahmet.jpg')} />
            :
              <Image style={styles.profileImage} source={require('../images/ismail.jpg')} />
            }
            <Text style={styles.name}> {userInfo.data.studentNo}  {userInfo.data.name} {userInfo.data.surname}</Text>
          </View>

          <View style={styles.buttonContainer}>

            <TouchableHighlight style={[styles.button, styles.buttonMessage]} onPress={() => this.props.navigation.navigate("Lessons", { userInfo2: userInfo, })}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.icon} source={dersler} />
                <Text style={styles.btnText}> DERSLERİM</Text>
              </View>
            </TouchableHighlight>


            <TouchableHighlight style={[styles.button, styles.buttonLike]} onPress={() => this.props.navigation.navigate("Profile", { userInfo2: userInfo, })}>
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
                <Image style={styles.icon} source={logout} />
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
