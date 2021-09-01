import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import call from "react-native-phone-call";
import CountDown from "react-native-countdown-component";
import Colors from "../constants/Colors";

const AppelScreen = (props) => {
  const numphone = props.route.params.numphone;
  const numtime = props.route.params.numtime;

  const goodTime = (numtime.replace('minutes', ''))
  const args = {
    number: `${numphone}`, // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titre2}>Voici le numéro de téléphone de votre bloqueur : {numphone}</Text>
      <TouchableOpacity onPress={() => call(args).catch(console.error)} style={styles.bouton2}>
        <Text style={styles.text1}>Appeler le numéro</Text>
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
      <View>
        <TouchableOpacity style={styles.bouton2} onPress={() => props.navigation.navigate('ChoiceScreen')}>
          <Text style={styles.text1}>Retourner au menu principal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  suivantText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  finContainer: {
    width: '80%',
    textAlign: 'center'
  },
  paiementstatus: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  container: {
    color: 'white',
    flex: 1,
  },
  imageContainer: {
    height: '30%'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  ombre: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  ombreContainer: {
    position: 'absolute',
    top: '15%',
    alignItems: 'center',
    left: '5%'
  },
  innerText: {
    color: 'white',
    fontSize: 16
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textContainer: {
    width: '90%'
  },
  superContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '40%'
  },
  boutonContainer: {
    textAlign: 'center',
    justifyContent: 'space-around',
    marginBottom: '15%',
    display: 'flex',
    flexDirection: 'row'
  },
  decline: {
    backgroundColor: 'black',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    alignItems: 'center',
    marginTop: '5%',
  },
  text: {
    fontSize: 18,
    marginTop: 14,
    textAlign: 'center',
    marginLeft: 7,
  },
  titre2: {
    fontSize: 18,
    marginTop: 14,
    textAlign: 'center',
    marginLeft: 7,
    marginBottom: 40
  },
  smiley : {
    marginLeft: 80,
    position: 'relative',
    bottom: 20
  },
  text3: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    marginLeft: 7,
    color: 'blue'
  },
  entrainementCherContainer: {
    borderWidth: 1,
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    width: '110%',
    marginTop: '10%'
  },
  entrainementPasClicked : {
    display: 'flex',
    flexDirection: 'row',
    width: '110%',
    marginTop: '10%'
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 40,
    width: '90%',
    height: '10%',
    borderColor: '#ccc',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3%',
    textAlign: 'center',
    backgroundColor: Colors.primaryColor,
  },
  entrainementPasCher: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  entrainementPasCherClicked: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
    backgroundColor: '#186EE7',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
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
    width: 260,
    height: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderRadius: 10,
    marginTop: 40,
    marginLeft: '18%',
    marginBottom: 30
  },
  bouton2: {
    backgroundColor: Colors.primaryColor,
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 7,
    width: 260,
    height: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 30,
    marginLeft: '10%'
  },
  paymentStatusText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
  },
  paymentStatusText2: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  }
});

export default AppelScreen;
