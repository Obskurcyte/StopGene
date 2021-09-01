import React, { useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
import { PaymentView } from '../components/PaymentView'
import axios  from 'axios';
import {Feather} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import CountDown from 'react-native-countdown-component';
import call from 'react-native-phone-call';

import { Entypo } from '@expo/vector-icons';
import * as Notifications from "expo-notifications";
import firebase from "firebase";


const AlerteScreen = (props) => {

  const [response, setResponse] = useState()
  const [makePayment, setMakePayment] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);


  const token = props.route.params.numtoken;
  console.log(token);
  const notifHandler = () => {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: token,
        title: "Vous gênez quelqu'un !",
        body: "Revenez rapidement à votre emplacement !"
      })
    }).then(() => props.navigation.navigate('PaiementScreen')).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    })
  };


  const indexes = props.route.params.indexes
  const numphone = props.route.params.numphone;
  const numtime = props.route.params.numtime;


  const args = {
    number: `${numphone}`, // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
  }

  const goodTime = (numtime.replace('minutes', ''))
  const cartInfo = {
    id: '5eruyt35eggr76476236523t3',
    description: 'T Shirt - With react Native Logo',
    amount: 1
  }


  const [myabonnement, setMyAbonnement] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [appel, setAppel] = useState(false);
  console.log(appel)
  useEffect(() => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setMyAbonnement(snapshot.data().abonnement)
          setSubscriptionId(snapshot.data().subscriptionId)
        } else {
          console.log('does not exists')
        }
      })
  })

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

      if (stripeResponse) {

        const {paid} = stripeResponse.data;
        if (paid === true) {
          setPaymentStatus('Votre paiement a été validé ! Bienvenue chez RoundPower')
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

  console.log(paymentStatus)

  if (myabonnement === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.titre2}>La plaque du bloqueur a bien été trouvée dans notre base de données !</Text>
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <Entypo name="message" size={24} color="white"/>
          </View>
          <TouchableOpacity onPress={notifHandler}>
            <Text style={styles.text1}>Envoyer une notification au bloqueur</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <Feather name="phone-call" size={24} color="white"/>
          </View>
          <TouchableOpacity onPress={() => {
            props.navigation.navigate('AbonnementScreen')
          }}>
            <Text style={styles.text1}>Pour le contacter directement,</Text>
            <Text style={styles.text1}>Abonnez-vous !</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  if (myabonnement === 'hebdomadaire' || myabonnement === 'mensuel' || myabonnement === 'annuel') {
    return (
      <View style={styles.container}>
        <Text style={styles.titre2}>La plaque du bloqueur a bien été trouvée dans notre base de données !</Text>
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <Entypo name="message" size={24} color="white"/>
          </View>
          <TouchableOpacity onPress={notifHandler}>
            <Text style={styles.text1}>Envoyer une notification au bloqueur</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <Feather name="phone-call" size={24} color="white"/>
          </View>
          <TouchableOpacity onPress={() => {
            props.navigation.navigate('AppelScreen', {numtime, numphone})
          }}>
            <Text style={styles.text1}>Contactez-le directement !</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return null
}

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
    marginBottom: 40,
    fontFamily: 'Calibri'
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
    color: 'blue',
    fontFamily: 'Calibri'
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
    textAlign: 'center',
    fontSize: 17,
    marginLeft: '6%',
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

export default AlerteScreen;


/*<Text style={styles.titre2}>Voici le numéro de téléphone de votre bloqueur : {numphone}</Text>
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
<View>
  <TouchableOpacity style={styles.bouton3} onPress={() => props.navigation.navigate('ChoiceScreen')}>
    <Text style={styles.text4}>Retourner au menu principal</Text>
  </TouchableOpacity>
</View>

 */

/*import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import Colors from "../constants/Colors";
import {windowHeight} from "../components/FormInput";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as plaqueActions from '../store/actions/plaque';
import {useDispatch, useSelector} from "react-redux";
import {SET_TOKEN} from "../store/actions/plaque";
import * as Notifications from "expo-notifications";
import {PaymentView} from "../components/PaymentView";

const AlerteScreen = props  => {


    const availablePlaques = useSelector(state => state.plaque.plaqueArray);


  const [response, setResponse ] = useState()
  const [ makePayment, setMakePayment ] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')


  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);


  const token = props.route.params.numtoken;
  console.log(token);
  const notifHandler = () => {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: token,
        title: "Vous gênez quelqu'un !",
        body: "Revenez rapidement à votre emplacement !"
      })
    }).then(() => props.navigation.navigate('PaiementScreen')).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    })};




  const indexes = props.route.params.indexes
  const numphone = props.route.params.numphone;
  const numtime = props.route.params.numtime;

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
          setPaymentStatus('Votre paiement a été validé ! Les utilisateurs vont pouvoir désormais voir votre plaque')
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


  const paymentUI = (props) => {

    if(!makePayment){

      return (
        <View style={styles.container}>
          <Text style={styles.titre2}>La plaque du bloqueur a bien été trouvée dans notre base de données !</Text>
          <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
              <Entypo name="message" size={24} color="white" />
            </View>
            <TouchableOpacity style={styles.bouton} onPress={notifHandler}>
              <Text style={styles.text1}>Envoyer une notification au bloqueur</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
              <Feather name="phone-call" size={24} color="white" />
            </View>
            <TouchableOpacity style={styles.bouton} onPress={() => {
              setMakePayment(true)
      }}>
              <Text style={styles.text1}>Contacter directement (2€)</Text>
            </TouchableOpacity>
          </View>
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

          {paymentStatus === 'Votre paiement a été validé ! Les utilisateurs vont pouvoir désormais voir votre plaque' ?
            <View>
              <Text>{paymentStatus}</Text>
              <TouchableOpacity style={styles.startContainer} onPress={() => props.navigation.navigate("AccueilScreen")}>
                <Text>Retour au menu principal</Text>
              </TouchableOpacity>
            </View> : <Text></Text>}
        </View>

      }else{
          return <PaymentView onCheckStatus={onCheckStatus} amount={2.00}/>
      }

    }

  }


  return (<View style={styles.container}>
    {paymentUI(props)}
  </View>)}

  ;

  props.navigation.navigate('ContactScreen', {
              index: indexes, numphone: numphone, numtime: numtime
            })
            */

/*
const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    container1: {
        width: 350,
        height: 220,
        backgroundColor: 'lightgrey',
        marginLeft: 30,
    },
    titre2: {
        fontSize: 18,
        marginTop: 14,
        textAlign: 'center',
        marginLeft: 7,
        marginBottom: 40
    },
    bouton: {
      backgroundColor: Colors.primaryColor,
        height: '100%',
        width: '87%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    text1: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '2%'
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

export default AlerteScreen;
*/
