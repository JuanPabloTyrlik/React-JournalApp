import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { TYPES } from '../../types/types';
import { login, logout, startLoginEmailPassword, startLogout } from '../auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: '',
        name: '',
    },
});

describe('Tests on Auth Actions', () => {
    beforeEach(() => {
        store.clearActions();
    });

    test('should create login and logout actions', () => {
        const loginAction = login('test', 'user');
        const logoutAction = logout();
        expect(loginAction).toEqual({
            type: TYPES.LOGIN,
            payload: { uid: 'test', displayName: 'user' },
        });
        expect(logoutAction).toEqual({ type: TYPES.LOGOUT, payload: null });
    });

    test('should logout of the application', async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();
        expect(actions[0].type).toMatch(TYPES.NOTES_LOGOUT_CLEANING);
        expect(actions[1].type).toMatch(TYPES.LOGOUT);
    });
    test('should login to the application', async () => {
        await store.dispatch(
            startLoginEmailPassword('test.user@testing.com', '3948861595')
        );
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: TYPES.UI_START_LOADING,
            payload: true,
        });
        expect(actions[1]).toEqual({
            type: TYPES.LOGIN,
            payload: {
                uid: expect.any(String),
                displayName: null,
            },
        });
        expect(actions[2]).toEqual({
            type: TYPES.UI_FINISH_LOADING,
            payload: false,
        });
    });
});
