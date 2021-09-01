import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Notifications from 'expo-notifications'
import authReducer from './store/reducers/auth';
import plaqueReducer from "./store/reducers/plaque";
import AppNavigator from "./navigation/AppNavigator";
import firebase from 'firebase';
import {useFonts} from "expo-font";
import AppLoading from 'expo-app-loading';

const firebaseConfig = {
  apiKey: "AIzaSyCSPnU8f0Okaz9OUMJ09zZW80xWRIKVdyw",
  authDomain: "stopgene-68a58.firebaseapp.com",
  databaseURL: "https://stopgene-68a58.firebaseio.com",
  projectId: "stopgene-68a58",
  storageBucket: "stopgene-68a58.appspot.com",
  messagingSenderId: "742944138967",
  appId: "1:742944138967:web:fef2ff173903561adef292",
  measurementId: "G-8QGGH8SX2R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true};
  },
})


const rootReducer = combineReducers({
  auth: authReducer,
  plaque: plaqueReducer
});



const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App () {
  let [fontsLoaded] = useFonts({
    'Calibri': require('./assets/fonts/calibril.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <Provider store={store}>
          <AppNavigator/>
        </Provider>
    )
  }
};



