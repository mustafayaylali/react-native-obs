import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ImageBackground, AsyncStorage } from 'react-native';
import bgImage from '../images/background_profile.jpg'
import { getLessonInfo } from '../services/FetchLesson.js'


const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        //data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};

const numColumns = 1;

export default class LessonsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lessonsState: '',
            userIdState: '',
            userTypeState: ''
        }

    }


    async getKey() {
        try {
            const value = await AsyncStorage.getItem('@UserTypeStore:key');
            this.setState({ userTypeState: value });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }

        //////////////////////////////////////77
        const { params } = this.props.navigation.state;
        const userInfo = params ? params.userInfo2 : null;

        const lessons = [];
        getLessonInfo(userInfo.data._id, this.state.userTypeState).then((res) => { //5cd6c53fef922200115bfdce
            for (var i = 0; i < res.length; i++) {
                lessons.push({ key: res[i].name }); //teacher= res[i].name  student=res[i].lessonInfo.name
                this.setState({ lessonsState: lessons });
            }
        });

        //////////////////////////////////////////
    }

    componentWillMount() {
        this.getKey();
    }

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

        /*
        const { params } = this.props.navigation.state;
        const userInfo = params ? params.userInfo2 : null; //ogrenci id  yollamak için
        //console.error(userInfo.data._id);
        this.setState({userIdState:userInfo.data._id});   
        */

        return (

            <FlatList
                data={formatData(this.state.lessonsState, numColumns)}
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
        fontSize: 25,
        marginBottom: 8
    },
    itemText2: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 3
    },
});