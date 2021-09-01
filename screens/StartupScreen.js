import React, {useEffect} from 'react';
import { StyleSheet, AsyncStorage, Image} from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from '../store/actions/auth';
import Onboarding from "react-native-onboarding-swiper";

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData) {
               // props.navigation.navigate('AuthScreen');
                dispatch(authActions.setDidTryAL());
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
               // props.navigation.navigate('AuthScreen');
                dispatch(authActions.setDidTryAL());
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();
           // props.navigation.navigate('ChoiceScreen');
            dispatch(authActions.authenticate(userId, token));
        };
        tryLogin();
    }, [dispatch]);
    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/OnboardingImage1.jpg')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/OnboardingImage2.jpg')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/OnboardingImage3.jpg')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
            ]}
        />
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
