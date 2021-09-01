import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, Keyboard, KeyboardAvoidingView} from 'react-native';
import FlatButton from "../components/FlatButton"
import AlerteScreen from "./AlerteScreen";
import {Formik} from "formik";
import {windowHeight} from "../components/FormInput";
import {useDispatch} from "react-redux";
import * as plaqueActions from '../store/actions/plaque';
import {useSelector} from 'react-redux'
import * as Yup from 'yup';

const BloqueScreen = props => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(plaqueActions.fetchPlaques())
    }, [dispatch]);


    const availablePlaques = useSelector(state => state.plaque.plaqueArray);

    console.log(availablePlaques)

    const bloqueurSchema = Yup.object().shape({
      plaque : Yup.string().required('Veuillez rentrer une plaque')
    })
    const initialValues = {
        plaque: '',
        phone:'',
        time:''
    }

    const plaques = [];
    const phones = [];
    const times = [];
    const tokens = []

    return(

        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
          <KeyboardAvoidingView
            behavior="padding"
          >
            <Formik
                initialValues={initialValues}
                validationSchema={bloqueurSchema}
                onSubmit={(values) => {
                    console.log(values)
                    for (let i=0; i < availablePlaques.length; i++) {
                        plaques.push(availablePlaques[i].num)
                        phones.push(availablePlaques[i].phone)
                        times.push(availablePlaques[i].time)
                        tokens.push(availablePlaques[i].ownerToken)
                    }
                        if (plaques.includes(values.plaque)) {
                            const indexPlaque = plaques.indexOf(values.plaque)
                            const phone = phones[indexPlaque]
                            const time = times[indexPlaque]
                            const token = tokens[indexPlaque]
                            console.log(phone)
                            console.log(time)
                            props.navigation.navigate('AlerteScreen', {
                                indexes: indexPlaque,
                                numphone: phone,
                                numtime: time,
                                numtoken: token,
                            })
                        }
                    else {
                        props.navigation.navigate('NoAnnonceScreen')
                    }
                }}
            >
                {(props) => (
        <View style={styles.container}>
            <Text style={styles.text}>Veuillez entrer l'immatriculation du véhicule qui vous bloque</Text>
            <View style={styles.inputContainer}>
                <View style={styles.iconStyle}/>
                <TextInput
                    style={styles.input}
                    value={props.values.plaque}
                    onChangeText={props.handleChange('plaque')}
                    placeholder="ex : HT-545-TY"
                />
                <View style={styles.iconStyle2}/>
            </View>
          {props.errors.plaque && props.touched.plaque ? (
            <Text style={styles.errorText}>{props.errors.plaque}</Text>
          ) : null}
            <FlatButton style={styles.button} onPress={props.handleSubmit}>Lancer la recherche</FlatButton>
        </View>
                )}
            </Formik>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: '40%'
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        marginLeft: '25%',
        marginTop: '5%'
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 10,
        width: '85%',
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '7%'
    },
    inputContainer2: {
        marginTop: 20,
        marginBottom: 10,
        width: '85%',
        height: windowHeight / 15,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '7%'
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        backgroundColor: 'darkblue',
        width: 50,
    },
    iconStyle2: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftColor: '#ccc',
        borderLeftWidth: 1,
        backgroundColor: 'darkblue',
        width: 50,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 20,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '13%'
    },
    input2: {
        padding: 10,
        flex: 1,
        fontSize: 20,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '25%'
    },

  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20
  }
});

export default BloqueScreen;
