import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import {windowHeight} from "../components/FormInput";

const NoAnnonceScreen = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.titre2}>Désolé ! Cette immatriculation n'est pas encore enregistrée</Text>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.bouton} onPress={() => props.navigation.navigate('ChoiceScreen')}>
                    <Text style={styles.text1}>Retourner au menu principal</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 200
    },
    titre2: {
        fontSize: 18,
        marginTop: 14,
        textAlign: 'center',
        marginLeft: 7,
        marginBottom: 40,
        fontFamily: 'Calibri'
    },
    bouton: {
        backgroundColor: Colors.primaryColor,
        height: '100%',
        width: '100%',
        borderRadius: 20
    },
    text1: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '8%',
        fontFamily: 'Calibri'
    },
    inputContainer: {
        marginTop: 5,
        marginBottom: 40,
        width: '80%',
        height: windowHeight / 12,
        borderColor: '#ccc',
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10%'
    }
});

export default NoAnnonceScreen;