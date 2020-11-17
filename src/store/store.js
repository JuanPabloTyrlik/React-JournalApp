import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';
import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';

const reducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    notes: notesReducer,
});

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);
