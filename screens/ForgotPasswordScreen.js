import {
    StyleSheet,
    Text,
    View,
    TextInput, TouchableOpacity,
} from 'react-native';
import React from "react";
import * as firebase from "firebase";
import { Formik} from 'formik';
import * as Yup from 'yup';
import Colors from "../constants/Colors";


const ForgotPasswordScreen = props => {


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .label('Email')
            .email('Enter a valid email')
            .required('Please enter a registered email')
    });

    return (
        <View>
            <Text style={styles.text}>Mot de passe oublié ?</Text>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    const email = values.email;
                    firebase.auth().sendPasswordResetEmail(email).catch((err) => {
                        alert('Cette adresse mail est invalide')}
                    );
                    props.navigation.navigate('Auth');
                }}
            >
                {(props) => (
                    <View>
                        <View style={{marginTop: 40}}>
                            <Text style={styles.text2}>Veuillez saisir votre adresse mail : </Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Email'
                                onChangeText={props.handleChange('email')}
                                value={props.values.nom}
                                onBlur={props.handleBlur('email')}
                            />
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.bouton}>Envoyer un mail</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>

    )
};


const styles = StyleSheet.create({
    inputContainer: {
        margin: 15
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 150
    },
    text: {
        color: '#333',
        fontSize: 24,
        marginLeft: 70,
        marginTop: 60
    },
    text2: {
        marginBottom: 30,
        fontSize: 16
    },
    buttonContainer: {
        margin: 25
    },
    input: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        padding: 10,
        marginTop: 0,
        fontSize: 18,
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
        fontSize: 20,
        opacity: 1,
        marginTop: '20%',
        marginLeft: '22%'
    },
});

export default ForgotPasswordScreen;
