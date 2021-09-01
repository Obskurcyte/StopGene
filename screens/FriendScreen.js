import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {Formik} from 'formik';
import Colors from "../constants/Colors";
import email from 'react-native-email'
import * as SMS from 'expo-sms';


const FriendScreen = () => {

  const initialValues = {
    email1 : '',

  }

  const initialValues2 = {
    phone: ''
  }

  const [envoyer, setEnvoyer] = useState('')

    return(

      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        {/* <ScrollView>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values)
              const to = [`${values.email1}`] // string or array of email addresses
              email(to, {
                // Optional additional arguments
                 // string or array of email addresses
                // string or array of email addresses
                subject: 'Bienvenue chez Stopgene',
                body: 'Venez nous rejoindre !'
              }).catch(console.error)

              setEnvoyer('Votre email a été envoyé !')
            }}
          >
            {(props) => (
              <View style={styles.container}>
                <Text style={styles.text}>Veuillez entrer l'adresse email à laquelle vous souhaitez envoyer un email</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}/>
                  <TextInput
                    style={styles.input}
                    value={props.values.email1}
                    onChangeText={props.handleChange('email1')}
                    placeholder="email"
                  />
                  <View style={styles.iconStyle2}/>
                </View>


                <TouchableOpacity onPress={props.handleSubmit}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Envoyer un email</Text>
                  </View>
                </TouchableOpacity>

                <Text>{envoyer}</Text>
              </View>
            )}
          </Formik>


          <Formik
            initialValues={initialValues2}
            onSubmit={async (values) => {
              console.log(values)

            await SMS.sendSMSAsync(
                [`${values.phone}`],
                'Bienvenue chez Stopgene'
              );
            }}
          >
            {(props) => (
              <View style={styles.container}>
                <Text style={styles.text}>Veuillez entrer le numéro de téléphone auquel vous souhaitez envoyer un SMS</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}/>
                  <TextInput
                    style={styles.input}
                    value={props.values.phone}
                    onChangeText={props.handleChange('phone')}
                    placeholder="téléphone"
                  />
                  <View style={styles.iconStyle2}/>
                </View>

                <TouchableOpacity onPress={props.handleSubmit}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Envoyer un SMS</Text>
                  </View>
                </TouchableOpacity>

                <Text>{envoyer}</Text>
              </View>
            )}
          </Formik>
        </ScrollView>
*/}
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Inviter</Text>
          </View>
        </TouchableOpacity>

      </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input: {
      padding: 10,
      flex: 1,
      fontSize: 20,
      color: '#333',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '5%'
    },
  text: {
      textAlign: 'center',
      fontSize: 18,
      marginTop: 20
  },
  container: {
      alignItems: 'center',
    marginTop: '10%'
  },
  boutonContainer: {
      alignItems: 'center'
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: '85%',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 5,
    paddingVertical: 7,
    width: 300,
    height: 40,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '5%'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});


export default FriendScreen;
