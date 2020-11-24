import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../AppRouter';
import { act } from '@testing-library/react';
import { firebase } from '../../firebase/config';
import { login } from '../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    ui: {
        loading: false,
        msgError: null,
    },
    auth: {},
    notes: {
        notes: [],
        active: null,
    },
});

store.dispatch = jest.fn();

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

describe('Tests on <RegisterScreen />', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });
    test('should login corretly', async () => {
        let user;
        await act(async () => {
            const userCred = await firebase
                .auth()
                .signInWithEmailAndPassword(
                    'test.user@testing.com',
                    '3948861595'
                );
            user = userCred.user;
            mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });
        expect(login).toHaveBeenCalledWith(
            '5AQAMmjnFhWrXN7Yvsj3QPevFe83',
            null
        );
    });
});
