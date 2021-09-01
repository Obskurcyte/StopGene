import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import {windowHeight} from "../components/FormInput";
import CountDown from 'react-native-countdown-component';
import call from 'react-native-phone-call'

const ContactScreen = props => {

    const phone = props.route.params.numphone;
    const time = props.route.params.numtime;

  const args = {
    number: `${phone}`, // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
  }

    console.log(time)
    const goodTime = (time.replace('minutes', ''))
    console.log(goodTime)
    return (
        <View style={styles.container}>

            <Text style={styles.titre2}>Voici le numéro de téléphone de votre bloqueur : {phone}</Text>
          <TouchableOpacity onPress={() => call(args).catch(console.error)} style={styles.bouton2}>
            <Text style={styles.text2}>Appeler le numéro</Text>
          </TouchableOpacity>
            <Text style={styles.titre2}>Il reviendra dans : </Text>
          <CountDown
            until={goodTime * 60}
            size={30}
            onFinish={() => alert('Finished')}
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: Colors.primaryColor}}
            timeToShow={['M', 'S']}
            timeLabels={{m: 'Min', s: 'Sec'}}
          />
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
        marginTop: 150,
      alignItems: 'center'
    },
    titre2: {
        fontSize: 18,
        marginTop: 14,
        textAlign: 'center',
        marginLeft: 7,
        marginBottom: 20
    },
    bouton: {
        backgroundColor: Colors.primaryColor,
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
  bouton2: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    padding: '3%'
  },
    text1: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '5%'
    },
  text2: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',

  },
    inputContainer: {
        marginTop: '8%',
        marginBottom: 40,
        width: '80%',
        height: windowHeight / 12,
        borderColor: '#ccc',
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default ContactScreen
