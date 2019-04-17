import React, { Component } from 'react';

import { StyleSheet, Text, View, FlatList, Dimensions, ImageBackground, Image } from 'react-native';

import bgImage from '../images/background_profile.jpg'

const data = [
    { key: 'Matematik' }, { key: 'Fizik' }, { key: 'Kimya' }, { key: 'Türkçe' }, { key: 'E' }, { key: 'F' },
    // { key: 'K' },
    // { key: 'L' },
];

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};

const numColumns = 2;

export default class LessonsComponent extends Component {


    static navigationOptions = {
        //header: null
        title: 'Derslerim',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#000000',
            borderBottomWidth: 3,
        },
        headerTitleStyle: {
            fontSize: 18,
        },
    }
    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <ImageBackground source={bgImage} style={styles.item}>
                <Text style={styles.itemText}>{item.key}</Text>
                <Text style={styles.itemText2}>1.Sınav : 55</Text>
                <Text style={styles.itemText2}>2.Sınav : 70 </Text>
            </ImageBackground>
        );
    };

    render() {
        return (
                  
                <FlatList
                    data={formatData(data, numColumns)}
                    style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                />
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
        fontSize:25,
        marginBottom:8
    },
    itemText2: {
        color: '#fff',
        fontSize:15,
        marginBottom:3
    },
});