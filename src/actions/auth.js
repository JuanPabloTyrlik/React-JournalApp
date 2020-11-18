import { firebase, googleAuthProvider } from '../firebase/config';
import { TYPES } from '../types/types';
import { cleanNotes } from './notes';
import { finishLoading, setError, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => (dispatch) => {
    dispatch(startLoading());
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
            dispatch(login(user.uid, user.displayName));
        })
        .catch((e) => {
            if (e.code === 'auth/user-not-found') {
                dispatch(setError('Email is not registered'));
            } else {
                dispatch(setError(e.message));
            }
        })
        .finally(() => dispatch(finishLoading()));
};

export const startRegisterWithEmailPasswordName = (
    email,
    password,
    displayName
) => (dispatch) => {
    dispatch(startLoading());
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async ({ user }) => {
            await user.updateProfile({ displayName });
            dispatch(login(user.uid, user.displayName));
        })
        .catch((e) => {
            dispatch(setError(e.message));
        })
        .finally(() => dispatch(finishLoading()));
};

export const startGoogleLogin = () => (dispatch) => {
    dispatch(startLoading());
    firebase
        .auth()
        .signInWithPopup(googleAuthProvider)
        .then(({ user: { displayName, uid } }) =>
            dispatch(login(uid, displayName))
        )
        .catch((e) => {
            dispatch(setError(e.message));
        })
        .finally(() => dispatch(finishLoading()));
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

export const logout = () => {
    return {
        type: TYPES.LOGOUT,
        payload: null,
    };
};

export const startLogout = () => (dispatch) => {
    firebase
        .auth()
        .signOut()
        .then(dispatch(cleanNotes()))
        .then(dispatch(logout()));
};
