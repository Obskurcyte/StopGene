import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
export const CREATE_PLAQUE = 'CREATE_PLAQUE';
export const SET_PLAQUE = 'SET_PLAQUE';
export const SET_TOKEN ='SET_TOKEN';
import {id_firebase} from "../../config";


export const createPlaque = (num, phone, time) => {
    return async dispatch => {

        let pushToken;
        let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (statusObj.status !== 'granted') {
            statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        if (statusObj.status !== 'granted') {
            pushToken = null
        } else {
            pushToken = (await Notifications.getExpoPushTokenAsync()).data;
        }

        const response = await fetch(`https://${id_firebase}.firebaseio.com/plaques.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                num: num,
                phone: phone,
                time: time,
                ownerToken: pushToken
            })
        });

        const resData = response.json();
        console.log(resData)

        dispatch({
            type: CREATE_PLAQUE,
            plaqueData: {
                num,
                phone,
                time,
                pushToken
            }
        })
    }
}

export const fetchPlaques = () => {
    return async dispatch => {
        const response = await fetch(`https://${id_firebase}.firebaseio.com/plaques.json`, {
            method: 'GET',
        });

        const resData = await response.json();


        const loadedPlaque = [];
        for (const key in resData ) {
            loadedPlaque.push(resData[key]);
        }

        dispatch({type: SET_PLAQUE, plaquess : loadedPlaque})
    }
}



