import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from "react-native";
import Colors from "../constants/Colors";

const FlatButton = props => {
    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
             <Text style={{...styles.buttonText}}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 5,
        paddingVertical: 7,
        width: 200,
        height: 40,
        borderRadius: 10,
        marginLeft: '20%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default FlatButton;
