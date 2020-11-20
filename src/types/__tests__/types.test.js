const { TYPES } = require('../types');

describe('Tests on TYPES', () => {
    test('should have the correct values', () => {
        const types = {
            LOGIN: '[Auth] Login',
            LOGOUT: '[Auth] Logout',
            UI_SET_ERROR: '[UI] SetError',
            UI_REMOVE_ERROR: '[UI] RemoveError',
            UI_START_LOADING: '[UI] Start Loading',
            UI_FINISH_LOADING: '[UI] Finish Loading',
            NOTES_NEW_ENTRY: '[Notes] New Note',
            NOTES_UPDATE_ENTRY: '[Notes] Update Note',
            NOTES_UPDATE_FILE_URL: '[Notes] Update Note File Url',
            NOTES_DELETE_ENTRY: '[Notes] Delete Note',
            NOTES_LOAD_ENTRIES: '[Notes] Load Notes',
            NOTES_ACTIVE_ENTRY: '[Notes] Set Active Note',
            NOTES_LOGOUT_CLEANING: '[Notes] Logout Cleaning',
        };
        expect(TYPES).toEqual(types);
    });
});
