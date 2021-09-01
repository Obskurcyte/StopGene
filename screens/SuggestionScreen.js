import React from 'react';
import { WebView } from 'react-native-webview';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';


const SuggestionScreen = props => {
    return(

     <View style={styles.container}>
       <ScrollView>
         <View style={styles.container}>
         <Image source={require('../assets/images/tuto1.jpg')} style={styles.img}/>
         <Text style={styles.text}>A votre arrivée sur l'application, si vous bloquez une voiture, cliquez sur "Je bloque"</Text>

         <Image source={require('../assets/images/tuto2.jpg')} style={styles.img}/>
         <Text style={styles.text}>Rentrez ensuite votre plaque d'immatriculation, votre numéro de téléphone et le temps pendant lequel vous pensez vous absenter</Text>

           <Image source={require('../assets/images/tuto3.jpg')} style={styles.img}/>
           <Text style={styles.text}>Une fois votre signalement pris en compte, vous devez vous abonner pour que votre apparaisse où payer 2€</Text>

           <Image source={require('../assets/images/tuto4.jpg')} style={styles.img}/>
           <Text style={styles.text}>Vous pouvez choisir trois abonnements différents avec différents tarifs</Text>

           <Image source={require('../assets/images/tuto5.jpg')} style={styles.img}/>
           <Text style={styles.text}>Si maintenant une voiture vous bloque, rentrez la plaque d'immatriculation de cette voiture. </Text>

           <Image source={require('../assets/images/tuto6.jpg')} style={styles.img}/>
           <Text style={styles.text}>Si cette dernière est dans notre base de données, vous pourrez envoyer une notification au bloqueur ou alors voir son numéro en vous abonnant !</Text>

           <Image source={require('../assets/images/tuto5.jpg')} style={styles.img}/>
           <Text style={styles.text}>Vous pouvez également directement cliquer sur "Alerte" pour trouver une plaque !</Text>
         </View>
       </ScrollView>
     </View>

    )
};

const styles = StyleSheet.create({
  img: {
    height: 400,
    width: 200
  },
  container: {
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    marginVertical: '6%',
    textAlign: 'center'
  }

})

export default SuggestionScreen;
