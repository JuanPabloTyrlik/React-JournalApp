const { TYPES } = require('../../types/types');
const { authReducer } = require('../authReducer');

describe('Tests on authReducer', () => {
    test('should return a valid Login state', () => {
        expect(
            authReducer(
                {},
                {
                    type: TYPES.LOGIN,
                    payload: { uid: '123456', displayName: 'John Doe' },
                }
            )
        ).toEqual({ uid: '123456', name: 'John Doe' });
    });
    test('should renew the state on Logout', () => {
        expect(authReducer({}, { type: TYPES.LOGOUT, payload: null })).toEqual(
            {}
        );
    });
});
