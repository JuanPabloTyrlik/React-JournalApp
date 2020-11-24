import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    ui: {
        loading: false,
        msgError: null,
    },
    auth: {},
    notes: {
        notes: [
            {
                id: 'kOs0NIVIeAeDQL5xEWg4',
                imageUrl:
                    'https://res.cloudinary.com/dxd81c3e7/image/upload/v1606084697/h2iks4zr4bjcxtj13k6g.png',
                body: 'Dummy Text',
                date: 1605738681205,
                title: 'New Note',
            },
            {
                id: 'MSe9uD5X6lcVEBG82YnW',
                date: 1605650153830,
                body: 'lorem ipsium',
                title: 'Nota 11',
                imageUrl:
                    'https://res.cloudinary.com/dxd81c3e7/image/upload/v1606084704/wxdq8dbsr6wii77ojwz7.webp',
            },
        ],
        active: {
            id: 'kOs0NIVIeAeDQL5xEWg4',
            title: 'New Note',
            body: 'Dummy Text',
            imageUrl:
                'https://res.cloudinary.com/dxd81c3e7/image/upload/v1606084697/h2iks4zr4bjcxtj13k6g.png',
            date: 1605738681205,
        },
    },
});

store.dispatch = jest.fn();

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}));

describe('Tests on JournalEntry', () => {
    const wrapper = mount(
        <Provider store={store}>
            <JournalEntry {...store.getState().notes.active} />
        </Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions();
    });
    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('should set active note', () => {
        wrapper.find('.journal__entry').simulate('click');
        expect(activeNote).toHaveBeenLastCalledWith('kOs0NIVIeAeDQL5xEWg4', {
            body: 'Dummy Text',
            date: 1605738681205,
            imageUrl:
                'https://res.cloudinary.com/dxd81c3e7/image/upload/v1606084697/h2iks4zr4bjcxtj13k6g.png',
            title: 'New Note',
        });
    });
});
