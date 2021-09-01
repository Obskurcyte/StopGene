import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import Colors from "../constants/Colors";
import {useDispatch} from "react-redux";
import * as authActions from "../store/actions/auth";
import firebase from "firebase";
const ParameterScreen = props => {

    const list = [
        {
            title: 'Suggestions'
        },
        {
            title: 'Mentions légales',
        },
        {
            title: 'Politique de Confidentialité'
        },
        {
            title: "Conditions générales d'utilisation"
        }
    ];

  const logout = () => {
    firebase.auth().signOut()
  }


    const pressHandler = () => {
        props.navigation.navigate('AlerteScreen')
    };

    const dispatch = useDispatch();
    return(
        <View style={styles.global}>
            <View style={styles.list}>
                {
                    list.map((item, i) => (
                      <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                          <ListItem.Title>{item.title}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                      </ListItem>
                    ))
                }
            </View>
            <TouchableOpacity
                style={styles.logout}
                onPress={() => {logout()}}
            >
                <Text style={ { fontSize: 18, color: Colors.primaryColor, marginLeft: 130 }}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    )
};


const styles=StyleSheet.create({
    list: {
        marginTop: 100,
        backgroundColor: Colors.primaryColor
    },
    itemlist: {
        backgroundColor: Colors.primaryColor
    },
    global: {
        backgroundColor: 'lightgrey',
        flex: 1
    },
    cardContent : {
        flexDirection: 'column',
        marginTop: 30
    },
    logout: {
        backgroundColor: 'white',
        marginTop: 100,
        padding: 10
    },
    avatar: {
        width: 70,
        height: 70,
        marginTop: 30,
        marginLeft: 30,
        borderRadius: 40,
        marginRight: 10

    }
});


export default ParameterScreen;
