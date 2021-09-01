import React, { useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
import { PaymentView } from '../components/PaymentView'
import axios  from 'axios';
import {Feather} from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import firebase from 'firebase';

const RecapBloqueurScreen = (props) => {

  const [isAbonne, setIsAbonne] = useState(false)
  useEffect(() => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const abonnement = snapshot.data().abonnement
          console.log('abonnement', abonnement)
          console.log(abonnement === 'annuel')
          if (abonnement === 'annuel' || abonnement === 'mensuel' || abonnement === 'hebdomadaire') {
            setIsAbonne(true)
          }
        } else {
          console.log('does not exists')
        }
      })
  })

  console.log(isAbonne)

  const [response, setResponse] = useState()
  const [makePayment, setMakePayment] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  const cartInfo = {
    id: '5eruyt35eggr76476236523t3',
    description: 'T Shirt - With react Native Logo',
    amount: 1
  }

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus('Votre paiement est en cours de traitement')
    setResponse(paymentResponse)

    let jsonResponse = JSON.parse(paymentResponse);
    console.log('paymentresponse', paymentResponse)
    // perform operation to check payment status

    try {

      const stripeResponse = await axios.post('https://stopgene.herokuapp.com/paymentonetime', {
        email: 'hadrien.jaubert99@gmail.com',
        product: cartInfo,
        authToken: jsonResponse,
        amount: 2
      })

      console.log('TSRIPE RESPONSE', stripeResponse)

      if (stripeResponse) {

        const {paid} = stripeResponse.data;
        if (paid === true) {
          setPaymentStatus('Votre paiement a été validé ! Les utilisateurs vont pouvoir désormais voir votre numéro')
        } else {
          setPaymentStatus('Le paiement a échoué')
        }

      } else {
        setPaymentStatus('Le paiement a échoué')
      }


    } catch (error) {

      console.log(error)
      setPaymentStatus('Le paiement a échoué')

    }

  }

  console.log(makePayment)


  console.log(response)
  const paymentUI = (props) => {

    if (!makePayment) {

      return (
        <View style={styles.container}>
          <Text style={styles.text}>Signalement pris en compte !</Text>
          <View style={styles.connected}>
            <Text style={styles.text3}>Restez connectés !</Text>
            <Fontisto name="smiley" size={20} color="black" style={styles.smiley}/>
          </View>

          <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')}>
            <Text style={styles.bouton1}>Retour au menu principal</Text>
          </TouchableOpacity>
          {!isAbonne && (
            <View>
              <Text style={styles.text}>Pour que votre numéro apparaisse vous devez être abonné ou payer 2 € !</Text>

              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Feather name="phone-call" size={24} color="white"/>
                </View>
                <TouchableOpacity onPress={() => {
                  props.navigation.navigate('AbonnementScreen')
                }}>
                  <Text style={styles.text1}>Choisir mon abonnement</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Feather name="phone-call" size={24} color="white"/>
                </View>
                <TouchableOpacity onPress={() => {
                  setMakePayment(true)
                }}>
                  <Text style={styles.text2}>Payer 2 €</Text>
                </TouchableOpacity>
              </View>

            </View>
          )}
        </View>
      )


      // show to make payment
    } else {

      if (response !== undefined) {
        return <View style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
          marginTop: 50
        }}>
          {paymentStatus === 'Votre paiement est en cours de traitement' ?
            <View>
              <Text>{paymentStatus}</Text>
              <ActivityIndicator/>
            </View> : <Text></Text>}

          {paymentStatus === 'Votre paiement a été validé ! Les utilisateurs vont pouvoir désormais voir votre numéro' ?
            <View>
              <Text style={styles.text}>{paymentStatus}</Text>
              <TouchableOpacity style={styles.startContainer} onPress={() => props.navigation.navigate("ChoiceScreen")}>
                <Text style={styles.whiteText}>Retour au menu principal</Text>
              </TouchableOpacity>
            </View> : <Text></Text>}
        </View>

      } else {
        return <PaymentView onCheckStatus={onCheckStatus} product={"Paiement unique"} amount={2}/>
      }

    }

  }


  return (<View style={styles.container}>
    {paymentUI(props)}
  </View>)
}


const styles = StyleSheet.create({
  suivantContainer: {
    position: 'absolute',
    top: '92%',
    width: '100%',
    paddingVertical: '3%',
    alignItems: 'center',
    backgroundColor: '#0d1b3d'
  },
  connected: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  startContainer: {
    paddingVertical: '3%',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor
  },
  whiteText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
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
    fontFamily: 'Calibri'
  },
  paiementContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '20%'
  },
  textEntrainement: {
    color: 'white',
    fontSize: 16
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
    height: '15%',
    borderColor: '#ccc',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3%',
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
    textAlign: 'center',
    fontSize: 17,
    marginLeft: '10%',
    fontFamily: 'Calibri'
  },
  text2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginLeft: '30%',
    fontFamily: 'Calibri'
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
})

export default RecapBloqueurScreen;



/* import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Colors from "../constants/Colors";
import {Feather} from "@expo/vector-icons";
import {windowHeight} from "../components/FormInput";
import { Fontisto } from '@expo/vector-icons';
import {PaymentView} from "../components/PaymentView";
import axios from "axios";

const RecapBloqueurScreen = props => {

  const [response, setResponse ] = useState()
  const [ makePayment, setMakePayment ] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  const cartInfo = {
    id: '5eruyt35eggr76476236523t3',
    description: 'T Shirt - With react Native Logo',
    amount: 1
  }

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus('Votre paiement est en cours de traitement')
    setResponse(paymentResponse)

    let jsonResponse = JSON.parse(paymentResponse);
    console.log('paymentresponse', paymentResponse)
    // perform operation to check payment status

    try {

      const stripeResponse = await axios.post('https://stopgene.herokuapp.com/payment', {
        email: 'hadrien.jaubert99@gmail.com',
        product: cartInfo,
        authToken: jsonResponse,
        amount: 2
      })

      console.log('TSRIPE RESPONSE', stripeResponse)

      if(stripeResponse){

        const { paid } = stripeResponse.data;
        if(paid === true){
          setPaymentStatus('Votre paiement a été validé ! Les utilisateurs vont pouvoir désormais voir votre numéro')
        }else{
          setPaymentStatus('Le paiement a échoué')
        }

      }else{
        setPaymentStatus('Le paiement a échoué')
      }


    } catch (error) {

      console.log(error)
      setPaymentStatus('Le paiement a échoué')

    }

  }

  console.log(makePayment)


  console.log(response)
  const paymentUI = (props) => {

    if(!makePayment){

      return (
        <View style={styles.container}>
          <Text style={styles.text}>Signalement pris en compte !</Text>
          <View style={styles.connected}>
            <Text style={styles.text3}>Restez connectés !</Text>
            <Fontisto name="smiley" size={20} color="black" style={styles.smiley}/>
          </View>

          <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')}>
            <Text style={styles.bouton1}>Retour au menu principal</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
              <Feather name="phone-call" size={24} color="white" />
            </View>
            <TouchableOpacity style={styles.bouton} onPress={() => {
              setMakePayment(true)
            }}>
              <Text style={styles.text1}>Pour que votre numéro apparaisse vous devez payer 2€</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Votre avis compte pour nous !</Text>
          <TouchableOpacity>
            <Text style={styles.bouton1}>Donnez votre avis</Text>
          </TouchableOpacity>
        </View>
      )



      // show to make payment
    }else{

      if(response !== undefined){
        return <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 300, marginTop: 50}}>
          {paymentStatus === 'Votre paiement est en cours de traitement' ?
            <View>
              <Text>{ paymentStatus}</Text>
              <ActivityIndicator />
            </View> : <Text></Text>}

          {paymentStatus === 'Votre paiement a été validé ! Les utilisateurs vont pouvoir désormais voir votre numéro' ?
            <View>
              <Text >{paymentStatus}</Text>
              <TouchableOpacity style={styles.startContainer} onPress={() => props.navigation.navigate("AccueilScreen")}>
                <Text>Commencer l'entrainement</Text>
              </TouchableOpacity>
            </View> : <Text></Text>}
        </View>

      }else{
        return <PaymentView onCheckStatus={onCheckStatus} product={"Abonnement annuel"} amount={2}/>
      }

    }

  }


  return (<View style={styles.container}>
    {paymentUI(props)}
  </View>)

};

const styles = StyleSheet.create({
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
  container: {
    marginTop: 20
  },
  text: {
    fontSize: 18,
    marginTop: 14,
    textAlign: 'center',
    marginLeft: 7,
  },
  connected: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  text3: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    marginLeft: 7,
    color: 'blue'
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 40,
    width: '90%',
    height: windowHeight / 12,
    borderColor: '#ccc',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3%',
    backgroundColor: Colors.primaryColor,

  },
  smiley : {
    marginLeft: 80,
    position: 'relative',
    bottom: 20
  },
  text1: {
    color: 'white',
    fontWeight: 'bold',
    maxWidth: '90%',
    textAlign: 'center',
    fontSize: 18
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
});

export default RecapBloqueurScreen;

 */

