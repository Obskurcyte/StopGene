import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { BloqueNavigator, AuthNavigator, DrawerNavigator } from './BloqueNavigator';
import StartupScreen from '../screens/StartupScreen';
import firebase from "firebase";

const AppNavigator = props => {


  const [loaded, setIsLoaded] = useState(false);
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setIsLoaded(true);
        setIsLoggedIn(false)
      } else {
        setIsLoaded(true);
        setIsLoggedIn(true)
      }
    })
  })


    return (
        <NavigationContainer>
          {loggedIn ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigator;
