// DashboardComponent.js

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

export default class ProfileComponent extends Component {
  render() {

    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;
    const userInfo = params ? params.userInfo : null;

    return (
      <View style={styles.container}>
        {/* <Text>itemId: {JSON.stringify(itemId)}</Text> */}
        <Text>ABC - {userInfo.login}</Text>
        <Image source={{uri: userInfo.avatar_url}} style={styles.image} /> 
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  }
});