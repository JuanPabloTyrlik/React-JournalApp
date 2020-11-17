import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setLoading(false);
        });
    }, [dispatch, setLoading, setIsLoggedIn]);

    return loading ? (
        <div className="center">
            <CircularProgress />
        </div>
    ) : (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        isLoggedIn={isLoggedIn}
                        component={AuthRouter}
                    />
                    <PrivateRoute
                        path="/"
                        isLoggedIn={isLoggedIn}
                        component={JournalScreen}
                    />
                </Switch>
            </div>
        </Router>
    );
};
