import {AsyncStorage} from "react-native";
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const LOGOUT = 'LOGOUT';
import {firebase_uri} from '../../config'


export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL}
};

export const authenticate = (userId, token) => {
    return ({ type: AUTHENTICATE, userId: userId, token })
};


export const signup = (email, password) => {
    return async dispatch => {
       const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebase_uri}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
            );


        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            console.log(errorResData.error)
            let message = 'Oups ! Une erreur est survenue';
            if (errorId === 'EMAIL_EXISTS') {
                message = "Cet email existe déjà"
            }
            throw new Error(message);
        }
       const resData = await response.json();
       console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken));
        const expirationDate = (new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebase_uri}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
          console.log(process.env.FIREBASE_URI);
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Oups ! Une erreur est survenue';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = "Cet email n'a pas été trouvé"
            } else if (errorId === 'INVALID_PASSWORD') {
                message = "Ce mot de passe n'est pas valide"
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken));
        const expirationDate = (new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};


export const logout = () => {
    return {type: LOGOUT}
};




const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate
    }))
};

