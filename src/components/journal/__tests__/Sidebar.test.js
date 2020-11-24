import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Sidebar } from '../Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewEntry } from '../../../actions/notes';

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

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));
jest.mock('../../../actions/notes', () => ({
    startNewEntry: jest.fn(),
}));

describe('Tests on Sidebar', () => {
    const wrapper = mount(
        <Provider store={store}>
            <Sidebar />
        </Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions();
    });

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('should logout', () => {
        wrapper.find('button').simulate('click');
        expect(startLogout).toHaveBeenCalled();
    });
    test('should create a new note', () => {
        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewEntry).toHaveBeenCalled();
    });
});
