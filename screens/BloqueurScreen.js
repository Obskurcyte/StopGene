import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    TextInput, ScrollView
} from 'react-native';
import Colors from "../constants/Colors";
import {Picker} from '@react-native-picker/picker';
import { Formik } from 'formik';
import {windowHeight} from "../components/FormInput";
import { useDispatch } from "react-redux";
import * as plaqueActions from '../store/actions/plaque';
import * as Yup from 'yup';

const BloqueurScreen = props => {

    const dispatch = useDispatch();

    let disabled = true
    const initialValues = {
        plaque: '',
        phone: '',
        time:'',
    }

    const [plaque, setPlaque] = useState(false);
    const [phone, setPhone] = useState(false);
    const [time, setTime] = useState(false);

    if (time === true && phone === true && plaque === true) {
      disabled = false
    }



    const bloqueurSchema = Yup.object().shape({
      phone : Yup.string().matches(/^0[1-7]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/, "Entrez un numéro valide")
    })
    console.log(plaque)
    return(

        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView>
            <Formik
                initialValues={initialValues}
                validationSchema={bloqueurSchema}
                onSubmit={(values) => {
                  console.log(values)
                    dispatch(plaqueActions.createPlaque(values.plaque, values.phone, values.time))
                    props.navigation.navigate('RecapBloqueurScreen')
                }}
                >
                {(props) => (
            <View style={styles.container}>
                <Text style={styles.text}>Veuillez entrer l'immatriculation de votre véhicule</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.iconStyle}/>
                    <TextInput
                        style={styles.input}
                        value={props.values.plaque}
                        onChangeText={props.handleChange('plaque')}
                        onBlur={() => setPlaque(true)}
                        placeholder="ex : HT-545-TY"
                    />
                    <View style={styles.iconStyle2}/>
                </View>
                <Text style={styles.text}>Veuillez entrer votre numéro de téléphone</Text>
                <View style={styles.inputContainer2}>
                    <TextInput
                        style={styles.input2}
                        value={props.values.phone}
                        onChangeText={props.handleChange('phone')}
                        placeholder="ex : 0642238059"
                        keyboardType="numeric"
                        onBlur={() => setPhone(true)}
                    />

                </View>
              {props.errors.phone && props.touched.phone ? (
                <Text style={styles.errorText}>{props.errors.phone}</Text>
              ) : null}
                <Text style={styles.text}>Combien de temps pensez-vous vous absenter ?</Text>
                <Picker
                    selectedValue={props.values.time}
                    style={styles.widget}
                    onValueChange={itemValue => {
                      props.setFieldValue('time', itemValue)
                      setTime(true)
                    }}
                >
                    <Picker.Item label="Temps d'absence"
                                 style={{display: 'none'}} value={"Temps d'absence"}/>
                    <Picker.Item label="5 minutes" value={"5 minutes"}/>
                    <Picker.Item label="10 minutes" value={"10 minutes"}/>
                    <Picker.Item label="20 minutes" value={"20 minutes"}/>
                    <Picker.Item label="30 minutes" value={"30 minutes"}/>
                    <Picker.Item label="40 minutes" value={"40 minutes"}/>
                    <Picker.Item label="50 minutes" value={"50 minutes"}/>
                    <Picker.Item label="Plus d'une heure" value={"60 minutes"}/>
                </Picker>
                <TouchableOpacity onPress={props.handleSubmit} disabled={disabled}>
                    <View style={disabled ? styles.button2 : styles.button}>
                        <Text style={styles.buttonText}>Je signale mon blocage</Text>
                    </View>
                </TouchableOpacity>
            </View>
                )}
        </Formik>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: '5%'
    },
    container: {
        marginTop: '10%'
    },
    button: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 5,
        paddingVertical: 7,
        width: 300,
        height: 40,
        fontFamily: 'Calibri',
        borderRadius: 10,
        marginLeft: '14%',
        marginTop: 40
    },
  button2: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: 5,
    paddingVertical: 7,
    width: 300,
    height: 40,
      fontFamily: 'Calibri',
    borderRadius: 10,
    marginLeft: '14%',
    marginTop: 40
  },
    widget: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Calibri'
    },
    widget1: {
        borderBottomWidth: 1,
        marginTop: 10
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 10,
        width: '85%',
        borderColor: 'black',

        borderWidth: 1,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '7%'
    },
    inputContainer2: {
        marginTop: 20,
        marginBottom: 10,
        width: '85%',
        height: 50,
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1
      ,
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
        marginLeft: '13%',
        height: windowHeight / 15,
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

export default BloqueurScreen;
