import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/config';
import { TYPES } from '../../types/types';
import { startNewEntry } from '../notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Tests on Notes', () => {
    const store = mockStore({
        auth: {
            uid: 'TESTING',
        },
    });
    test('should create a new note', async () => {
        await store.dispatch(startNewEntry());

        const action = store.getActions();
        expect(action[0]).toEqual({
            type: TYPES.NOTES_NEW_ENTRY,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                imageUrl: '',
                date: expect.any(Number),
            },
        });
        db.doc(`TESTING/journal/notes/${action[0].payload.id}`).delete();
    });
});
