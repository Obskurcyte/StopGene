import React from "react";
import {StyleSheet, Image} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = props => {


    return(
        <Onboarding
            nextLabel="Suivant"
            skipLabel="Passer"
            onSkip={() => props.navigation.replace('AuthScreen')}
            onDone={() => props.navigation.navigate('AuthScreen')}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/OnboardingImage3.jpg')} style={styles.image}/>,
                    title: 'Stop Gene',
                    subtitle: "L'application qui vous permet de signaler des véhicules bloquants",
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/OnboardingImage2.jpg')} style={styles.image}/>,
                    title: 'Vous vous garer sur un endroit inaproprié ?',
                    subtitle: 'Signalez le aux autres utilisateurs !',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/OnboardingImage1.jpg')} style={styles.image}/>,
                    title: 'Vous êtes bloqués par une voiture ?',
                    subtitle: "Vous pouvez appeler le bloqueur afin qu'il déplace son véhicule",
                },
            ]}
        />
    )
};

const styles = StyleSheet.create({
    image : {
        width: 300,
        height: 300
    }

});

export default OnboardingScreen;