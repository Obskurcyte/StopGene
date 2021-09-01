import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import firebase from "firebase";
import Colors from "../constants/Colors";
import axios from "axios";
import {PaymentView} from "../components/PaymentView";


const GererAbonnementScreen = (props) => {

    const [response, setResponse] = useState()
    const [annuel, setAnnuel] = useState(false);
    const [makePayment, setMakePayment] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState('')
    const [makePaymentSemaine, setMakePaymentSemaine] = useState(false)
    const [makePaymentMois, setMakePaymentMois] = useState(false)
    const [makePaymentAnnee, setMakePaymentAnnee] = useState(false)


  const [myabonnement, setMyAbonnement] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('')
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

  console.log(myabonnement)

    console.log(firebase.auth().currentUser);

    const onCheckStatusSemaine = async (paymentResponse) => {
      setPaymentStatus('Votre paiement est en cours de traitement')
      setResponse(paymentResponse)

      let jsonResponse = JSON.parse(paymentResponse);
      console.log('paymentresponse', paymentResponse)
      // perform operation to check payment status

      try {

        const stripeResponse = await axios.post('https://stopgene.herokuapp.com/payment', {
          email: firebase.auth().currentUser.email,
          authToken: jsonResponse,
          planId: 'price_1Imf3rE4O07UQhcfasxQsjQA',
        })

        console.log('TSRIPE RESPONSE', stripeResponse)

        if (stripeResponse) {

          console.log(stripeResponse.data.items.data[0].plan.active)
          const paid = stripeResponse.data.items.data[0].plan.active;
          if (paid === true) {
            await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              abonnement: 'hebdomadaire',
              subscriptionId: stripeResponse.data.id
            })
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

    const onCheckStatusMois = async (paymentResponse) => {
      setPaymentStatus('Votre paiement est en cours de traitement')
      setResponse(paymentResponse)

      let jsonResponse = JSON.parse(paymentResponse);
      console.log('paymentresponse', paymentResponse)
      // perform operation to check payment status

      try {

        const stripeResponse = await axios.post('https://stopgene.herokuapp.com/payment', {
          email: firebase.auth().currentUser.email,
          authToken: jsonResponse,
          planId: 'price_1Imf4HE4O07UQhcfRSK3AcP6',
        })

        console.log('TSRIPE RESPONSE', stripeResponse)

        if (stripeResponse) {

          console.log(stripeResponse.data.items.data[0].plan.active)
          const paid = stripeResponse.data.items.data[0].plan.active;
          if (paid === true) {
            await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              abonnement: 'mensuel',
              subscriptionId: stripeResponse.data.id
            })
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

    const onCheckStatusAnnee = async (paymentResponse) => {
      setPaymentStatus('Votre paiement est en cours de traitement')
      setResponse(paymentResponse)

      let jsonResponse = JSON.parse(paymentResponse);
      console.log('paymentresponse', paymentResponse)
      // perform operation to check payment status

      try {

        const stripeResponse = await axios.post('https://stopgene.herokuapp.com/payment', {
          email: firebase.auth().currentUser.email,
          authToken: jsonResponse,
          planId: 'price_1Imf4ZE4O07UQhcfS1LhpvYs',
        })

        console.log('TSRIPE RESPONSE', stripeResponse)

        if (stripeResponse) {

          console.log(stripeResponse.data.items.data[0].plan.active)
          const paid = stripeResponse.data.items.data[0].plan.active;
          if (paid === true) {
            await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              abonnement: 'annuel',
              subscriptionId: stripeResponse.data.id
            })
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


  const onCheckStatusUpdateHebdomadaire = async (paymentResponse) => {
    setPaymentStatus('Votre paiement est en cours de traitement')
    setResponse(paymentResponse)

    let jsonResponse = JSON.parse(paymentResponse);
    console.log('paymentresponse', paymentResponse)
    // perform operation to check payment status

    try {

      const stripeResponse = await axios.post('https://stopgene.herokuapp.com/payment', {
        email: firebase.auth().currentUser.email,
        authToken: jsonResponse,
        planId: 'price_1Imf3rE4O07UQhcfasxQsjQA',
      })

      console.log('TSRIPE RESPONSE', stripeResponse)

      if(stripeResponse){
        const paid = stripeResponse.data.items.data[0].plan.active;
        if(paid === true){
          try {

            const stripeResponse = await axios.post('https://stopgene.herokuapp.com/paymentdelete', {
              subscriptionId : subscriptionId
            })

            console.log('TSRIPE RESPONSE', stripeResponse)

            if(stripeResponse){
              const paid = stripeResponse.data.items.data[0].plan.active;
              if(paid === true){
                await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
                  abonnement: 'hebdomadaire'
                })
                setPaymentStatus('ok')
              }else{
                setPaymentStatus('pas ok')
              }
              console.log(stripeResponse)

            }} catch (error) {
            console.log(error)
          }
          setPaymentStatus('Votre paiement a été validé et votre ancien abonnement a été annulé !')
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

  const onCheckStatusUpdateMensuel = async (paymentResponse) => {
    setPaymentStatus('Votre paiement est en cours de traitement')
    setResponse(paymentResponse)

    let jsonResponse = JSON.parse(paymentResponse);
    console.log('paymentresponse', paymentResponse)
    // perform operation to check payment status

    try {

      const stripeResponse = await axios.post('https://stopgene.herokuapp.com/payment', {
        email: firebase.auth().currentUser.email,
        authToken: jsonResponse,
        planId: 'price_1Imf4HE4O07UQhcfRSK3AcP6',
      })

      console.log('TSRIPE RESPONSE', stripeResponse)

      if(stripeResponse){
        const paid = stripeResponse.data.items.data[0].plan.active;
        if(paid === true){
          try {

            const stripeResponse = await axios.post('https://stopgene.herokuapp.com/paymentdelete', {
              subscriptionId : subscriptionId
            })

            console.log('TSRIPE RESPONSE', stripeResponse)

            if(stripeResponse){
              const paid = stripeResponse.data.items.data[0].plan.active;
              if(paid === true){
                await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
                  abonnement: 'mensuel'
                })
                setPaymentStatus('ok')
              }else{
                setPaymentStatus('pas ok')
              }
              console.log(stripeResponse)

            }} catch (error) {
            console.log(error)
          }
          setPaymentStatus('Votre paiement a été validé et votre ancien abonnement a été annulé !')
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


  const onCheckStatusUpdateAnnuel = async (paymentResponse) => {
    setPaymentStatus('Votre paiement est en cours de traitement')
    setResponse(paymentResponse)

    let jsonResponse = JSON.parse(paymentResponse);
    console.log('paymentresponse', paymentResponse)
    // perform operation to check payment status

    try {

      const stripeResponse = await axios.post('https://stopgene.herokuapp.com/payment', {
        email: firebase.auth().currentUser.email,
        authToken: jsonResponse,
        planId: 'price_1Imf4ZE4O07UQhcfS1LhpvYs',
      })

      console.log('TSRIPE RESPONSE', stripeResponse)

      if(stripeResponse){
        const paid = stripeResponse.data.items.data[0].plan.active;
        if(paid === true){
          try {

            const stripeResponse = await axios.post('https://stopgene.herokuapp.com/paymentdelete', {
              subscriptionId : subscriptionId
            })

            console.log('TSRIPE RESPONSE', stripeResponse)

            if(stripeResponse){
              const paid = stripeResponse.data.items.data[0].plan.active;
              if(paid === true){
                await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
                  abonnement: 'annuel'
                })
                setPaymentStatus('ok')
              }else{
                setPaymentStatus('pas ok')
              }
              console.log(stripeResponse)

            }} catch (error) {
            console.log(error)
          }
          setPaymentStatus('Votre paiement a été validé et votre ancien abonnement a été annulé !')
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

      if (!makePaymentSemaine && !makePaymentMois && !makePaymentAnnee) {

        return (
          <View>
            <Text style={styles.title}>Vous n'avez pas encore d'abonnement</Text>
            <Text style={styles.title}>Choisissez votre abonnement !</Text>
            <TouchableOpacity style={styles.bouton1} onPress={() => {
              setMakePaymentSemaine(true)
            }}>
              <Text style={styles.bouton1Text}>6€/semaine</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bouton1} onPress={() => {
              setMakePaymentMois(true)
            }}>
              <Text style={styles.bouton1Text}>15€/mois</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bouton1} onPress={() => {
              setMakePaymentAnnee(true)
            }}>
              <Text style={styles.bouton1Text}>80€/an</Text>
            </TouchableOpacity>

          </View>
        )
      }

      if (makePaymentSemaine && !makePaymentMois && !makePaymentAnnee) {
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
                <Text style={styles.paymentStatusText}>{paymentStatus}</Text>
                <ActivityIndicator/>
              </View> : <Text></Text>}

            {paymentStatus === 'Votre paiement a été validé ! Bienvenue chez RoundPower' ?
              <View>
                <View style={styles.finContainer}>
                  <Text style={styles.paymentStatusText2}>Votre paiement a été validé ! Votre numéro de téléphone est
                    désormais disponible !</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')} style={styles.button}>
                  <Text style={styles.buttonText}>Retour au menu principal</Text>
                </TouchableOpacity>
              </View> : <Text></Text>}
          </View>

        } else {
          return <PaymentView onCheckStatus={onCheckStatusSemaine}/>
        }
      }

      if (!makePaymentSemaine && makePaymentMois && !makePaymentAnnee) {
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
                <Text style={styles.paymentStatusText}>{paymentStatus}</Text>
                <ActivityIndicator/>
              </View> : <Text></Text>}

            {paymentStatus === 'Votre paiement a été validé ! Bienvenue chez RoundPower' ?
              <View>
                <View style={styles.finContainer}>
                  <Text style={styles.paymentStatusText2}>Votre paiement a été validé ! Votre numéro de téléphone est
                    désormais disponible !</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')} style={styles.button}>
                  <Text style={styles.buttonText}>Retour au menu principal</Text>
                </TouchableOpacity>
              </View> : <Text></Text>}
          </View>

        } else {
          return <PaymentView onCheckStatus={onCheckStatusMois}/>
        }
      }

      if (!makePaymentSemaine && !makePaymentMois && makePaymentAnnee) {
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
                <Text style={styles.paymentStatusText}>{paymentStatus}</Text>
                <ActivityIndicator/>
              </View> : <Text></Text>}

            {paymentStatus === 'Votre paiement a été validé ! Bienvenue chez RoundPower' ?
              <View>
                <View style={styles.finContainer}>
                  <Text style={styles.paymentStatusText2}>Votre paiement a été validé !</Text>
                  <Text style={styles.paymentStatusText2}>Votre numéro de téléphone est désormais disponible !</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')} style={styles.button}>
                  <Text style={styles.buttonText}>Retour au menu principal</Text>
                </TouchableOpacity>
              </View> : <Text></Text>}
          </View>

        } else {
          return <PaymentView onCheckStatus={onCheckStatusAnnee}/>
        }
      }

    }

    const paymentUI2 = (props) => {

      if (!makePaymentMois && !makePaymentAnnee) {

        return (
          <View>
            <Text style={styles.title}>Vous avez un abonnement {myabonnement}</Text>
            <Text style={styles.title}>Changer mon abonnement</Text>

            <TouchableOpacity style={styles.bouton1} onPress={() => {
              setMakePaymentMois(true)
            }}>
              <Text style={styles.bouton1Text}>15€/mois</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bouton1} onPress={() => {
              setMakePaymentAnnee(true)
            }}>
              <Text style={styles.bouton1Text}>80€/an</Text>
            </TouchableOpacity>

          </View>
        )
      }

      if (makePaymentMois && !makePaymentAnnee) {
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
                <Text style={styles.paymentStatusText}>{paymentStatus}</Text>
                <ActivityIndicator/>
              </View> : <Text></Text>}

            {paymentStatus === 'Votre paiement a été validé ! Bienvenue chez RoundPower' ?
              <View>
                <View style={styles.finContainer}>
                  <Text style={styles.paymentStatusText2}>Votre paiement a été validé ! Votre numéro de téléphone est
                    désormais disponible !</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')} style={styles.button}>
                  <Text style={styles.buttonText}>Retour au menu principal</Text>
                </TouchableOpacity>
              </View> : <Text></Text>}
          </View>

        } else {
          return <PaymentView onCheckStatus={onCheckStatusUpdateMensuel}/>
        }
      }

      if (!makePaymentMois && makePaymentAnnee) {
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
                <Text style={styles.paymentStatusText}>{paymentStatus}</Text>
                <ActivityIndicator/>
              </View> : <Text></Text>}

            {paymentStatus === 'Votre paiement a été validé ! Bienvenue chez RoundPower' ?
              <View>
                <View style={styles.finContainer}>
                  <Text style={styles.paymentStatusText2}>Votre paiement a été validé ! Votre numéro de téléphone est
                    désormais disponible !</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')} style={styles.button}>
                  <Text style={styles.buttonText}>Retour au menu principal</Text>
                </TouchableOpacity>
              </View> : <Text></Text>}
          </View>

        } else {
          return <PaymentView onCheckStatus={onCheckStatusUpdateAnnuel}/>
        }
      }
    }

    const paymentUI3 = (props) => {

      if (!makePaymentSemaine && !makePaymentAnnee) {

        return (
          <View>
            <Text style={styles.title}>Vous avez un abonnement {myabonnement}</Text>
            <Text style={styles.title}>Changer mon abonnement</Text>

            <TouchableOpacity style={styles.bouton1} onPress={() => {
              setMakePaymentSemaine(true)
            }}>
              <Text style={styles.bouton1Text}>6€/semaine</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bouton1} onPress={() => {
              setMakePaymentAnnee(true)
            }}>
              <Text style={styles.bouton1Text}>80€/an</Text>
            </TouchableOpacity>

          </View>
        )
      }

      if (makePaymentSemaine && !makePaymentAnnee) {
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
                <Text style={styles.paymentStatusText}>{paymentStatus}</Text>
                <ActivityIndicator/>
              </View> : <Text></Text>}

            {paymentStatus === 'Votre paiement a été validé ! Bienvenue chez RoundPower' ?
              <View>
                <View style={styles.finContainer}>
                  <Text style={styles.paymentStatusText2}>Votre paiement a été validé ! Votre numéro de téléphone est
                    désormais disponible !</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')} style={styles.button}>
                  <Text style={styles.buttonText}>Retour au menu principal</Text>
                </TouchableOpacity>
              </View> : <Text></Text>}
          </View>

        } else {
          return <PaymentView onCheckStatus={onCheckStatusUpdateHebdomadaire}/>
        }
      }

      if (!makePaymentSemaine && makePaymentAnnee) {
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
                <Text style={styles.paymentStatusText}>{paymentStatus}</Text>
                <ActivityIndicator/>
              </View> : <Text></Text>}

            {paymentStatus === 'Votre paiement a été validé ! Bienvenue chez RoundPower' ?
              <View>
                <View style={styles.finContainer}>
                  <Text style={styles.paymentStatusText2}>Votre paiement a été validé ! Votre numéro de téléphone est
                    désormais disponible !</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')} style={styles.button}>
                  <Text style={styles.buttonText}>Retour au menu principal</Text>
                </TouchableOpacity>
              </View> : <Text></Text>}
          </View>

        } else {
          return <PaymentView onCheckStatus={onCheckStatusUpdateAnnuel}/>
        }
      }
    }

  const paymentUI4 = (props) => {

    if (!makePaymentSemaine && !makePaymentMois) {

      return (
        <View>
          <Text style={styles.title}>Vous avez un abonnement {myabonnement}</Text>
          <Text style={styles.title}>Changer mon abonnement</Text>

          <TouchableOpacity style={styles.bouton1} onPress={() => {
            setMakePaymentSemaine(true)
          }}>
            <Text style={styles.bouton1Text}>6€/semaine</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bouton1} onPress={() => {
            setMakePaymentMois(true)
          }}>
            <Text style={styles.bouton1Text}>15€/mois</Text>
          </TouchableOpacity>

        </View>
      )
    }

    if (makePaymentSemaine && !makePaymentMois) {
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
              <Text style={styles.paymentStatusText}>{paymentStatus}</Text>
              <ActivityIndicator/>
            </View> : <Text></Text>}

          {paymentStatus === 'Votre paiement a été validé ! Bienvenue chez RoundPower' ?
            <View>
              <View style={styles.finContainer}>
                <Text style={styles.paymentStatusText2}>Votre paiement a été validé ! Votre numéro de téléphone est
                  désormais disponible !</Text>
              </View>
              <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')} style={styles.button}>
                <Text style={styles.buttonText}>Retour au menu principal</Text>
              </TouchableOpacity>
            </View> : <Text></Text>}
        </View>

      } else {
        return <PaymentView onCheckStatus={onCheckStatusUpdateHebdomadaire}/>
      }
    }

    if (!makePaymentSemaine && makePaymentMois) {
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
              <Text style={styles.paymentStatusText}>{paymentStatus}</Text>
              <ActivityIndicator/>
            </View> : <Text></Text>}

          {paymentStatus === 'Votre paiement a été validé ! Bienvenue chez RoundPower' ?
            <View>
              <View style={styles.finContainer}>
                <Text style={styles.paymentStatusText2}>Votre paiement a été validé ! Votre numéro de téléphone est
                  désormais disponible !</Text>
              </View>
              <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceScreen')} style={styles.button}>
                <Text style={styles.buttonText}>Retour au menu principal</Text>
              </TouchableOpacity>
            </View> : <Text></Text>}
        </View>

      } else {
        return <PaymentView onCheckStatus={onCheckStatusUpdateMensuel}/>
      }
    }
  }



    if (myabonnement === undefined) {
      return (
        <View style={styles.container}>
          {paymentUI(props)}
        </View>
      )
    }
    if (myabonnement === 'hebdomadaire') {

      return (
        <View style={styles.container}>
          {paymentUI2(props)}
        </View>
      )
    }

    if (myabonnement === 'mensuel') {
      return (
        <View style={styles.container}>
          {paymentUI3(props)}
        </View>
      )
    }
    if (myabonnement === 'annuel') {

      return (
        <View style={styles.container}>
          {paymentUI4(props)}
        </View>
      )
    }
    return null
  }
;

const styles = StyleSheet.create({
  abonnementText: {
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 30,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  suivantContainer: {
    position: 'absolute',
    top: '92%',
    width: '100%',
    paddingVertical: '3%',
    alignItems: 'center',
    backgroundColor: '#0d1b3d'
  },
  startContainer: {
    position: 'absolute',
    top: '900%',
    width: '100%',
    paddingVertical: '3%',
    alignItems: 'center',
    backgroundColor: '#0d1b3d'
  },
  suivantText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  bouton1Text: {
    fontFamily: 'Calibri',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 7
  },
  paiementstatus: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  paymentStatusText2: {
    fontSize: 20,
    textAlign: 'center'
  },
  container: {
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
    color: 'white',
    fontSize: 16,
    borderBottomWidth: 5,
    borderBottomColor: 'white'
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
  paymentStatusText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20
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
    marginBottom: 30,
    fontFamily: 'Calibri'
  },
  title: {
    fontSize: 20,
    marginVertical: 30,
    textAlign: 'center',
    fontFamily: 'Calibri'
  }
})


export default GererAbonnementScreen;
