import { firebase, googleAuthProvider } from '../firebase/config';
import { TYPES } from '../types/types';

export const startLoginEmailPassword = (email, password) => (dispatch) => {
    setTimeout(() => {
        dispatch(login(email, password));
    }, 3500);
};

export const startGoogleLogin = () => (dispatch) => {
    firebase
        .auth()
        .signInWithPopup(googleAuthProvider)
        .then(({ user: { displayName, uid } }) =>
            dispatch(login(uid, displayName))
        );
};

export const login = (uid, displayName) => {
    return {
        type: TYPES.LOGIN,
        payload: {
            uid,
            displayName,
        },
    };
};
