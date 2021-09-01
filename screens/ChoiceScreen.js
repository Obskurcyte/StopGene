import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from "../constants/Colors";
import firebase from "firebase";
const ChoiceScreen = props => {


  console.log(firebase.auth().currentUser)
    const pressHandler= () => {
        props.navigation.navigate('BloqueurScreen');
    };
    const pressHandler2= () => {
        props.navigation.navigate('BloqueScreen');
    };


    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <TouchableOpacity onPress={pressHandler2}>
                    <Text style={styles.bouton1}>Je suis bloqué</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container1}>
                <TouchableOpacity onPress={pressHandler}>
                    <Text style={styles.bouton}>Je bloque</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#E5E7E7'
    },
    bouton: {
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: Colors.primaryColor,
        width: 200,
        borderRadius: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Calibri',
        fontSize: 20,
        opacity: 1,
        marginTop: '20%',
        marginLeft: '22%'
    },
    bouton1: {
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: '30%',
        backgroundColor: Colors.primaryColor,
        width: 200,
        fontFamily: 'Calibri',
        borderRadius: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        overflow: 'visible',
        marginLeft: '22%',
    },
    container2: {
        width: '100%',
        marginBottom: 50,
        flex: 1
    },
    container1: {
        flex: 1
    }
});

export default ChoiceScreen;
