import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";

const PaiementScreen = props => {

    return (
        <View>
            <View style={styles.container1}>
                <Text style={styles.titre2}>Une notification a bien été envoyée au bloqueur !</Text>
                <Text style={styles.titre3}>Gagnez du temps ! Abonnez-vous pour l'appeler</Text>
            </View>

          <TouchableOpacity style={styles.button} onPress={() => {
            props.navigation.navigate('AbonnementScreen')
          }}>
            <Text style={styles.text1}>S'abonner !</Text>
          </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container1: {
        marginTop: 200,
        width: '90%',
        height: 220,
        backgroundColor: 'lightgrey',
        marginLeft: 20,
        borderRadius: 20
    },
  text1: {
    color: 'white',
    fontWeight: 'bold',
    maxWidth: '95%',
    textAlign: 'center',
    fontSize: 17
  },
    bouton1: {
        backgroundColor: Colors.primaryColor,
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 7,
        width: '95%',
        height: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        borderRadius: 10,
        marginTop: 40,
        marginLeft: '3%',
    },
    titre2: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 40,
        textAlign: 'center',
        marginLeft: 7,
        marginBottom: 20
    },
    titre3: {
        fontWeight: 'bold',
        marginLeft: 40,
        fontSize: 20,
        marginTop: 14
    },
  button: {
    marginTop: 30,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRadius: 10,
  },
});

export default PaiementScreen;
