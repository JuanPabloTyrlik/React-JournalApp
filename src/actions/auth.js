import { TYPES } from '../types/types';

export const login = (uid, displayName) => {
    return {
        type: TYPES.LOGIN,
        payload: {
            uid,
            displayName,
        },
    };
};
