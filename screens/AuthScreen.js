import React, {  useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Text,
  TouchableOpacity,
  TextInput, KeyboardAvoidingView
} from 'react-native';

import Colors from "../constants/Colors";
import firebase from "firebase";
import AntDesign from "react-native-vector-icons/AntDesign";
import {windowHeight} from "../components/FormInput";
import {Formik} from "formik";


const AuthScreen = props => {


    const [isSignup, setIsSignup] = useState(false);


    const initialValuesConnection = {
      email: '',
      password: ''
    }

  const initialValuesInscription = {
    email: '',
    password: ''
  }

  const [errorPassword, setErrorPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [errorMessageInscription, setErrorMessageInscription] = useState('')

  const forgetPasswordNav = () => {
      props.navigation.navigate('Password')
  }

  if (!isSignup) {
    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.background}
        >
        <View style={styles.background}>
          <Image source={require('../logo_bonne_police.png')}
                 style={styles.image}/>
          <ScrollView>
            <View style={styles.authentification}>
              <Formik
                initialValues={initialValuesConnection}
                onSubmit={(values) => {
                  firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                    .then((result) => {
                      console.log(result)
                    })
                    .catch(err => {
                      const errorMessage = err.message
                      const errorCode = err.code
                      if (errorCode === 'auth/user-not-found') {
                        setErrorMessage("Cet utilisateur n'existe pas")
                      }
                      if (errorCode === 'auth/wrong-password') {
                        setErrorPassword("Le mot de passe est incorrect")
                      }
                      console.log(errorMessage)
                      console.log(errorCode)
                    })
                }}
              >
                {props => (
                  <View>
                    <View style={styles.inputContainer}>
                      <View style={styles.iconStyle}>
                        <AntDesign name="user" size={25} color="#666" />
                      </View>
                      <TextInput
                        {...props}
                        placeholder="Email"
                        placeholderTextColor="white"
                        style={styles.input}
                        value={props.values.email}
                        onChangeText={props.handleChange('email')}
                      />
                    </View>
                    {errorMessage ? <Text style={{color: 'red'}}>{errorMessage}</Text> : <Text></Text>}
                    <View style={styles.inputContainer}>
                    <View style={styles.iconStyle}>
                      <AntDesign name="lock" size={25} color="#666" />
                    </View>
                    <TextInput
                      {...props}
                      placeholder="Mot de passe"
                      placeholderTextColor="white"
                      style={styles.input}
                      secureTextEntry={true}
                      value={props.values.password}
                      onChangeText={props.handleChange('password')}
                    />
                  </View>
                    {errorPassword ? <Text style={{color: 'red'}}>{errorPassword}</Text> : <Text></Text>}
                    <TouchableOpacity onPress={() => forgetPasswordNav} style={{marginTop: 10}}>
                      <Text style={{color: 'black'}}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                      <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                    <View style={styles.container}>
                      <Text style={styles.inscrit}>Pas encore inscrit</Text>
                      <TouchableOpacity onPress={() => {
                        setIsSignup(true)
                      }}>
                        <Text style={styles.inscrit2}>S'inscrire</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>

          </ScrollView>
        </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.background}
      >
        <View style={styles.background}>
          <Image source={require('../logo_bonne_police.png')}
                 style={styles.image}/>
          <ScrollView>
            <View style={styles.authentification}>
              <Formik
                initialValues={initialValuesInscription}
                onSubmit={(values) => {
                  firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                    .then(result => {
                      firebase.firestore().collection("users")
                        .doc(firebase.auth().currentUser.uid)
                        .set({
                          email: values.email
                        })
                      console.log(result)
                      console.log(firebase.auth().currentUser.uid)
                    })
                    .catch(err => {
                        if (err.code === 'auth/email-already-in-use') {
                          setErrorMessageInscription('Cette adresse mail est déjà utilisée')
                        }
                      console.log(err.code)
                      console.log(errorMessageInscription)
                    })
                }}
              >
                {props => (
                  <View>
                    <View style={styles.inputContainer}>
                      <View style={styles.iconStyle}>
                        <AntDesign name="user" size={25} color="#666" />
                      </View>
                      <TextInput
                        {...props}
                        placeholder="Email"
                        placeholderTextColor="white"
                        style={styles.input}
                        value={props.values.email}
                        onChangeText={props.handleChange('email')}
                      />
                    </View>
                    {errorMessageInscription ? <Text style={{color: 'red'}}>{errorMessageInscription}</Text> : <Text />}
                    <View style={styles.inputContainer}>
                      <View style={styles.iconStyle}>
                        <AntDesign name="lock" size={25} color="#666" />
                      </View>
                      <TextInput
                        {...props}
                        placeholder="Mot de passe"
                        placeholderTextColor="white"
                        style={styles.input}
                        secureTextEntry={true}
                        value={props.values.password}
                        onChangeText={props.handleChange('password')}
                      />
                    </View>
                    {errorPassword ? <Text style={{color: 'red'}}>{errorPassword}</Text> : <Text />}
                    <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                      <Text style={styles.buttonText}>S'inscrire</Text>
                    </TouchableOpacity>
                    <View style={styles.container}>
                      <Text style={styles.inscrit}>Déjà inscrit ?</Text>
                      <TouchableOpacity onPress={() => {
                        setIsSignup(false)
                      }}>
                        <Text style={styles.inscrit2}>Se connecter</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

};

export const screenOptions = {
    title: 'Authentification',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitleAlign: 'center'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: 'white'
    },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
    image: {
        width: '30%',
        height: '36%',
        resizeMode: 'contain',
        marginLeft: '33%',
    },
    authentification: {
        backgroundColor: 'white',
        marginLeft: '5%',
        width: '90%',
        borderRadius: 15,
        padding: 10,
    },
    button: {
        marginTop: 30,
      backgroundColor: Colors.primaryColor,
      paddingHorizontal: 5,
      paddingVertical: 7,
      width: 200,
      height: 40,
      borderRadius: 10,
      marginLeft: '20%',
    },
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: '17%',
        marginBottom: 20
    },
    inscrit: {
        fontSize: 16,
        color: 'black'
    },
    inscrit2: {
        fontSize: 16,
        marginLeft: 10,
        textDecorationLine: 'underline',
        color: 'darkblue'
    },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A7370',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    backgroundColor: Colors.primaryColor,
    width: 50,
  },
});

export default AuthScreen;
