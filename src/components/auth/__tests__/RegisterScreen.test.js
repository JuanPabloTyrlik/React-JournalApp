import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from '../RegisterScreen';
import { TYPES } from '../../../types/types';

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

describe('Tests on <RegisterScreen />', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
    );
    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('should update error messages', () => {
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(store.getActions()[0]).toEqual({
            type: TYPES.UI_SET_ERROR,
            payload: 'Name cannot be empty',
        });
        wrapper.find('input[name="name"]').simulate('change', {
            target: { name: 'name', value: 'Test User' },
        });
        form.simulate('submit');
        expect(store.getActions()[1]).toEqual({
            type: TYPES.UI_SET_ERROR,
            payload: 'Email must be valid',
        });
        wrapper.find('#email').simulate('change', {
            target: {
                name: 'email',
                value: 'test.user@testing.com',
            },
        });
        form.simulate('submit');
        expect(store.getActions()[2]).toEqual({
            type: TYPES.UI_SET_ERROR,
            payload: 'Password must be at least 6 characters',
        });
        wrapper.find('#password').simulate('change', {
            target: {
                name: 'password',
                value: '123456',
            },
        });
        form.simulate('submit');
        expect(store.getActions()[3]).toEqual({
            type: TYPES.UI_SET_ERROR,
            payload: "Passwords don't match",
        });
    });
    test('should render error messages', () => {
        const store = mockStore({
            ui: {
                loading: false,
                msgError: 'Email must be valid',
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find('.MuiAlert-message').text()).toBe(
            'Email must be valid'
        );
    });
});
