import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { TYPES } from '../../types/types';
import {
    startLoadingNotes,
    startNewEntry,
    startSaveNote,
    startUploading,
} from '../notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() =>
        Promise.resolve('https://dummy-image-storage.com/dummy-image.png')
    ),
}));

describe('Tests on Notes', () => {
    const store = mockStore({
        auth: {
            uid: 'TESTING',
        },
        notes: {
            notes: [],
            active: {
                id: 'tg4fuodQFxdhtX2c38eW',
                title: 'Test Title',
                body: 'body',
            },
        },
        ui: {
            loading: false,
            msgError: null,
        },
    });
    beforeEach(() => {
        store.clearActions();
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
        await db.doc(`TESTING/journal/notes/${action[0].payload.id}`).delete();
    });
    test('should load existing notes', async () => {
        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: TYPES.NOTES_LOAD_ENTRIES,
            payload: expect.any(Array),
        });
        expect(actions[0].payload[0]).toMatchObject({
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        });
    });
    test('should edit a note', async () => {
        await store.dispatch(startSaveNote());
        const actions = store.getActions();
        expect(actions[0].type).toBe(TYPES.NOTES_UPDATE_ENTRY);
    });
    test('should upload a picture', async () => {
        const file = new File([], 'dummy-image.png');
        await store.dispatch(startUploading(file));
        const docRef = await db
            .doc(`TESTING/journal/notes/${store.getState().notes.active.id}`)
            .get();
        expect(docRef.data().imageUrl).toBe(
            'https://dummy-image-storage.com/dummy-image.png'
        );
    });
});
