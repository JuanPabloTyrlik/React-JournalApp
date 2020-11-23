import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { LoginScreen } from '../LoginScreen';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import {
    startGoogleLogin,
    startLoginEmailPassword,
} from '../../../actions/auth';

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

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}));

store.dispatch = jest.fn();

describe('Tests on <LoginScreen />', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    );
    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('should open Google Login dialog', () => {
        wrapper.find('.google-btn').simulate('click');
        expect(startGoogleLogin).toHaveBeenCalled();
    });
    test('should login with Email and Password', () => {
        wrapper.find('#email').simulate('change', {
            target: { name: 'email', value: 'test.user@testing.com' },
        });
        wrapper.find('#password').simulate('change', {
            target: { name: 'password', value: '3948861595' },
        });
        wrapper.find('form').simulate('submit');
        expect(startLoginEmailPassword).toHaveBeenCalled();
        expect(startLoginEmailPassword).toHaveBeenCalledWith(
            'test.user@testing.com',
            '3948861595'
        );
    });
});
