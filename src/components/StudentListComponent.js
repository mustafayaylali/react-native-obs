import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ImageBackground, AsyncStorage, TouchableOpacity } from 'react-native';
import { getStudentByLesson } from '../services/FetchStudentByLesson'


export default class StudentListComponent extends Component {

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
        const lessonId = params ? params.lessonId2 : null;
        const teacherId = params ? params.teacherId2 : null;
        getStudentByLesson(lessonId, teacherId).then((res) => { //lessonId,teacherId     
            this.setState({ lessonsState: res });
        });

        //////////////////////////////////////////
    }

    componentWillMount() {
        this.getKey();
    }

    static navigationOptions = {
        //header: null
        title: 'Öğrenci Listesi',
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

    _onPress = (item) => {
        // your code on item press
        console.error(item);
        //this.props.navigation.navigate("StudentsList");
    };

    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (

            <TouchableOpacity style={styles.item} onPress={() => this._onPress(item)}>
                <Text style={styles.itemText}>{item}</Text>

            </TouchableOpacity>
        );
    };


    render() {

        return (

            <FlatList
                data={this.state.lessonsState}
                style={styles.container}
                renderItem={this.renderItem}
            />


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#437743',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: 30 // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
        fontSize: 17,
        marginBottom: 7
    },
    itemText2: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 3,
    },
});