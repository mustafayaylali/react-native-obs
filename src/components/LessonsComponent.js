import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ImageBackground, AsyncStorage,TouchableOpacity } from 'react-native';
import bgImage from '../images/background_profile.jpg'
import { getLessonInfo } from '../services/FetchLesson.js'
import { TouchableHighlight } from 'react-native-gesture-handler';


const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        //data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};

const numColumns = 2;

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
                if (this.state.userTypeState === "teacher") {
                    lessons.push({ key: res[i].name,lessonId: res[i].id,teacherId:res[i].teacherId}); //teacher= res[i].name  student=res[i].lessonInfo.name
                } else {
                    for (var j = 0; j < res[i].lessonPoints.length; j++) {
                        if (res[i].lessonPoints[j].point === null) res[i].lessonPoints[j].point = "Girilmedi";
                        lessons.push({ key: res[i].lessonInfo.name, pointName: res[i].lessonPoints[j].name, point: res[i].lessonPoints[j].point });
                    }

                }
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

    _onPress = (itemLessonId,itemTeacherId) => {
        this.props.navigation.navigate("StudentList", { lessonId2: itemLessonId,teacherId2:itemTeacherId });
     };

    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
       
            <TouchableOpacity  style={styles.item}  onPress={() => this.state.userTypeState === 'teacher' && this._onPress(item.lessonId,item.teacherId)}>
                <Text style={styles.itemText}>{item.key}</Text>
                {this.state.userTypeState === 'student' ?
                    <Text style={styles.itemText2}>{item.pointName} : {item.point}</Text>
                    : null
                }
            </TouchableOpacity>
        );
    };


    render() {

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
        backgroundColor: '#437743',
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
        marginBottom: 3,
    },
});