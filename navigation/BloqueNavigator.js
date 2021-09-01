import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import BloqueScreen from "../screens/BloqueScreen";
import BloqueurScreen from "../screens/BloqueurScreen";
import AuthScreen from "../screens/AuthScreen";
import ChoiceScreen from "../screens/ChoiceScreen";
import ParameterScreen from "../screens/ParameterScreen";
import AlerteScreen from "../screens/AlerteScreen";
import PaiementScreen from "../screens/PaiementScreen"
import RecapBloqueurScreen from "../screens/RecapBloqueurScreen";
import HelpScreen from "../screens/HelpScreen";
import SuggestionScreen from "../screens/SuggestionScreen";
import NoAnnonceScreen from "../screens/NoAnnonceScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import Colors from "../constants/Colors";
import DrawerContent from "../components/DrawerContent";
import OnboardingScreen from "../screens/OnBoardingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactScreen from "../screens/ContactScreen";
import FriendScreen from "../screens/FriendScreen";
import AbonnementScreen from "../screens/AbonnementScreen";
import GererAbonnementScreen from "../screens/GererAbonnementScreen";
import AppelScreen from "../screens/AppelScreen";
import {Feather} from "@expo/vector-icons";
import JeBloqueTutoScreen from "../screens/JeBloqueTutoScreen";
import BloqueurTutoScreen from "../screens/BloqueurTutoScreen";
import AlerteTutoScreen from "../screens/AlerteTutoScreen";



const AlerteStackNavigator = createStackNavigator();

export const AlerteNavigator = props =>  {
    return (
        <AlerteStackNavigator.Navigator>
            <AlerteStackNavigator.Screen
                name="BloqueScreen"
                component={BloqueScreen}
                options={{
                    title: 'Bloqué',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <AlerteStackNavigator.Screen
                name="ChoiceScreen"
                component={ChoiceScreen}
                options={{
                    title: 'Choix',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon.Button
    name='navicon'
    size={25}
    backgroundColor={Colors.primaryColor}
    onPress={() => props.navigation.openDrawer()}
    />
                    )
                }}
            />
            <AlerteStackNavigator.Screen
                name="BloqueurScreen"
                component={BloqueurScreen}
                options={{
                    title: 'Je bloque',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <AlerteStackNavigator.Screen
                name="AlerteScreen"
                component={AlerteScreen}
                options={{
                    title: 'Je suis bloqué',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <AlerteStackNavigator.Screen
                name="PaiementScreen"
                component={PaiementScreen}
                options={{
                    title: 'Je suis bloqué',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <AlerteStackNavigator.Screen
                name="Paramètres"
                component={ParameterScreen}
                options={{
                    title: 'Paramètres',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <AlerteStackNavigator.Screen
                name="Password"
                component={ForgotPasswordScreen}
                options={{
                    title: 'Mot de passe oublié',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <AlerteStackNavigator.Screen
                name="RecapBloqueurScreen"
                component={RecapBloqueurScreen}
                options={{
                    title: 'Annonce envoyée !',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <AlerteStackNavigator.Screen
                name="NoAnnonceScreen"
                component={NoAnnonceScreen}
                options={{
                    title: 'Pas de plaque trouvée...',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <AlerteStackNavigator.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={{
                    title: 'Contact',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <AlerteStackNavigator.Screen
                name="SuggestionScreen"
                component={SuggestionScreen}
                options={{
                    title: 'Tutoriel',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
          <AlerteStackNavigator.Screen
            name="FriendScreen"
            component={FriendScreen}
            options={{
              title: 'Invitez des amis !',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
              headerTitleAlign: 'center'
            }}
          />
          <AlerteStackNavigator.Screen
            name="AbonnementScreen"
            component={AbonnementScreen}
            options={{
              title: 'Abonnement',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
              headerTitleAlign: 'center'
            }}
          />
        </AlerteStackNavigator.Navigator>
    )
};

const ParameterStackNavigator = createStackNavigator();

export const  ParameterNavigator = props => {
    return (
        <ParameterStackNavigator.Navigator>
            <ParameterStackNavigator.Screen
                name="Paramètres"
                component={ParameterScreen}
                options={{
                    title: 'Paramètres',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <ParameterStackNavigator.Screen
                name="BloqueurScreen"
                component={BloqueurScreen}
                options={{
                    title: 'Je bloque',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <ParameterStackNavigator.Screen
                name="AlerteScreen"
                component={AlerteScreen}
                options={{
                    title: 'Notification',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <ParameterStackNavigator.Screen
                name="BloqueScreen"
                component={BloqueScreen}
                options={{
                    title: 'Bloqué',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <ParameterStackNavigator.Screen
                name="ChoiceScreen"
                component={ChoiceScreen}
                options={{
                    title: 'Choix',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon.Button
    name='navicon'
    size={25}
    backgroundColor={Colors.primaryColor}
    onPress={() => props.navigation.openDrawer()}
    />
                    )
                }}
            />
            <ParameterStackNavigator.Screen
                name="PaiementScreen"
                component={PaiementScreen}
                options={{
                    title: 'Paiement',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <ParameterStackNavigator.Screen
                name="RecapBloqueurScreen"
                component={RecapBloqueurScreen}
                options={{
                    title: 'Annonce envoyée !',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <ParameterStackNavigator.Screen
                name="Password"
                component={ForgotPasswordScreen}
                options={{
                    title: 'Mot de passe oublié',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <ParameterStackNavigator.Screen
                name="NoAnnonceScreen"
                component={NoAnnonceScreen}
                options={{
                    title: 'Pas de plaque trouvée...',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <ParameterStackNavigator.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={{
                    title: 'Contact',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <ParameterStackNavigator.Screen
                name="SuggestionScreen"
                component={SuggestionScreen}
                options={{
                    title: 'Tutoriel',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
          <ParameterStackNavigator.Screen
            name="FriendScreen"
            component={FriendScreen}
            options={{
              title: 'Invitez des amis !',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
              headerTitleAlign: 'center'
            }}
          />
          <ParameterStackNavigator.Screen
            name="AbonnementScreen"
            component={AbonnementScreen}
            options={{
              title: 'Invitez des amis !',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
              headerTitleAlign: 'center'
            }}
          />
        </ParameterStackNavigator.Navigator>
    )
};


const BloqueurStackNavigator = createStackNavigator();

export const BloqueurNavigator = props => {
    return (
        <BloqueurStackNavigator.Navigator>
            <BloqueurStackNavigator.Screen
                name="BloqueurScreen"
                component={BloqueurScreen}
                options={{
                    title: 'Je bloque',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <BloqueurStackNavigator.Screen
                name="ChoiceScreen"
                component={ChoiceScreen}
                options={{
                    title: 'Choix',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon.Button
    name='navicon'
    size={25}
    backgroundColor={Colors.primaryColor}
    onPress={() => props.navigation.openDrawer()}
    />
                    )
                }}
            />
            <BloqueurStackNavigator.Screen
                name="AlerteScreen"
                component={AlerteScreen}
                options={{
                    title: 'Je bloque',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <BloqueurStackNavigator.Screen
                name="Paramètres"
                component={ParameterScreen}
                options={{
                    title: 'Paramètres',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <BloqueurStackNavigator.Screen
                name="BloqueScreen"
                component={BloqueScreen}
                options={{
                    title: 'Bloqué',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <BloqueurStackNavigator.Screen
                name="PaiementScreen"
                component={PaiementScreen}
                options={{
                    title: 'Paiement',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <BloqueurStackNavigator.Screen
                name="RecapBloqueurScreen"
                component={RecapBloqueurScreen}
                options={{
                    title: 'Annonce envoyée !',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <BloqueurStackNavigator.Screen
                name="Password"
                component={ForgotPasswordScreen}
                options={{
                    title: 'Mot de passe oublié',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <BloqueurStackNavigator.Screen
                name="NoAnnonceScreen"
                component={NoAnnonceScreen}
                options={{
                    title: 'Pas de plaque trouvée...',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <BloqueurStackNavigator.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={{
                    title: 'Contact',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <BloqueurStackNavigator.Screen
                name="SuggestionScreen"
                component={SuggestionScreen}
                options={{
                    title: 'Tutoriel',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
          <BloqueurStackNavigator.Screen
            name="FriendScreen"
            component={FriendScreen}
            options={{
              title: 'Invitez des amis !',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
              headerTitleAlign: 'center'
            }}
          />
        </BloqueurStackNavigator.Navigator>
    )
};


const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = props => {
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen
                name="ChoiceScreen"
                component={ChoiceScreen}
                options={{
                    title: 'Choix',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon.Button
    name='navicon'
    size={25}
    backgroundColor={Colors.primaryColor}
    onPress={() => props.navigation.openDrawer()}
    />
                    )
                }}
            />
            <HomeStackNavigator.Screen
                name="BloqueurScreen"
                component={BloqueurScreen}
                options={{
                    title: 'Je bloque',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStackNavigator.Screen
                name="Paramètres"
                component={ParameterScreen}
                options={{
                    title: 'Paramètres',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStackNavigator.Screen
                name="AlerteScreen"
                component={AlerteScreen}
                options={{
                    title: 'Notification',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
          <HomeStackNavigator.Screen
            name="AppelScreen"
            component={AppelScreen}
            options={{
              title: 'Appel',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
              headerTitleAlign: 'center'
            }}
          />
            <HomeStackNavigator.Screen
                name="PaiementScreen"
                component={PaiementScreen}
                options={{
                    title: 'Paiement',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStackNavigator.Screen
                name="BloqueScreen"
                component={BloqueScreen}
                options={{
                    title: 'Bloqué',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStackNavigator.Screen
                name="RecapBloqueurScreen"
                component={RecapBloqueurScreen}
                options={{
                    title: 'Annonce envoyée !',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStackNavigator.Screen
                name="Password"
                component={ForgotPasswordScreen}
                options={{
                    title: 'Mot de passe oublié',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStackNavigator.Screen
                name="NoAnnonceScreen"
                component={NoAnnonceScreen}
                options={{
                    title: 'Pas de plaque trouvée...',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStackNavigator.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={{
                    title: 'Contact',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
          <HomeStackNavigator.Screen
            name="FriendScreen"
            component={FriendScreen}
            options={{
              title: 'Inviter des amis',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
              headerTitleAlign: 'center'
            }}
          />
            <HomeStackNavigator.Screen
                name="SuggestionScreen"
                component={SuggestionScreen}
                options={{
                    title: 'Tutoriel',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
          <HomeStackNavigator.Screen
            name="AbonnementScreen"
            component={AbonnementScreen}
            options={{
              title: 'Abonnement',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
              headerTitleAlign: 'center'
            }}
          />
          <HomeStackNavigator.Screen
            name="GererAbonnementScreen"
            component={GererAbonnementScreen}
            options={{
              title: 'Mon abonnement',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
              headerTitleAlign: 'center'
            }}
          />
            <HomeStackNavigator.Screen
                name="JeBloqueTutoScreen"
                component={JeBloqueTutoScreen}
                options={{
                    title: 'Tutoriel',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStackNavigator.Screen
                name="BloqueurTutoScreen"
                component={BloqueurTutoScreen}
                options={{
                    title: 'Tutoriel',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStackNavigator.Screen
                name="AlerteTutoScreen"
                component={AlerteTutoScreen}
                options={{
                    title: 'Tutoriel',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerTitleAlign: 'center'
                }}
            />
        </HomeStackNavigator.Navigator>
    )
};

const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name="Inviter" component={BloqueNavigator}/>
            {/*  <Drawer.Screen name="Comment ça marche ?" component={HelpScreen}/> */}
        </Drawer.Navigator>
    )
}

const BloqueTabNavigator = createBottomTabNavigator();

export const BloqueNavigator = () => {
    return (
        <BloqueTabNavigator.Navigator
            tabBarOptions={{
              activeTintColor: "blue",
              inactiveTintColor: "grey",
            }}
        >
            <BloqueTabNavigator.Screen
                name="Accueil"
                component={HomeNavigator}
                options={{
                    tabBarLabel: 'Statut',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color="blue" />
                    ),
                }}/>
          <BloqueTabNavigator.Screen
            name="Alerte"
            component={AlerteNavigator}
            options={{
              tabBarLabel: 'Alerte',
              tabBarIcon: ({ color, size }) => (
                <Feather name="alert-triangle" size={24} color="blue" />
              ),
            }}/>
            <BloqueTabNavigator.Screen
                name = "Paramètres"
                component={ParameterNavigator}
                options={{
                    tabBarLabel: 'Paramètres',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" size={size} color="blue" />
                    ),
                }}
            />
        </BloqueTabNavigator.Navigator>
        )
};


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {

  /*  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if(value === null) {
                AsyncStorage.setItem('alreadyLaunched', 'true')
                setIsFirstLaunch(true);
            }
            else {
                setIsFirstLaunch(false)
            }
        })
    }, []);


    if (isFirstLaunch === null) {
        return null;
    } else if (isFirstLaunch===true) {
        return (
            <AuthStackNavigator.Navigator>
                <AuthStackNavigator.Screen
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStackNavigator.Screen
                    name="AuthScreen"
                    component={AuthScreen}
                    options={{
                        title: 'Authentification',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                        headerTitleAlign: 'center'
                    }}
                />
                <AuthStackNavigator.Screen
                    name="Password"
                    component={ForgotPasswordScreen}
                    options={{
                        title: 'Mot de passe oublié',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                        headerTitleAlign: 'center'
                    }}
                />
                <AuthStackNavigator.Screen
                    name="ChoiceScreen"
                    component={ChoiceScreen}
                    options={{
                        title: 'Mot de passe oublié',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                        headerTitleAlign: 'center'
                    }}
                />

            </AuthStackNavigator.Navigator>
        )
    } else { */
        return(
            <AuthStackNavigator.Navigator>
                <AuthStackNavigator.Screen
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStackNavigator.Screen
                    name="AuthScreen"
                    component={AuthScreen}
                    options={{
                        title: 'Authentification',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                        headerTitleAlign: 'center'
                    }}
                />
                <AuthStackNavigator.Screen
                    name="Password"
                    component={ForgotPasswordScreen}
                    options={{
                        title: 'Mot de passe oublié',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                        headerTitleAlign: 'center'
                    }}
                />
            </AuthStackNavigator.Navigator>
        )
    }




