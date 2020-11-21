const { TYPES } = require('../../types/types');
const { setError, removeError, startLoading, finishLoading } = require('../ui');

describe('Tests on UI Actions', () => {
    test('setError', () => {
        expect(setError('HELP!')).toEqual({
            type: TYPES.UI_SET_ERROR,
            payload: 'HELP!',
        });
    });
    test('removeError', () => {
        expect(removeError().type).toBe(TYPES.UI_REMOVE_ERROR);
    });
    test('startLoading', () => {
        expect(startLoading().type).toBe(TYPES.UI_START_LOADING);
    });
    test('finishLoading', () => {
        expect(finishLoading().type).toBe(TYPES.UI_FINISH_LOADING);
    });
});
