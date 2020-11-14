import { TYPES } from '../types/types';

export const authReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case TYPES.LOGIN:
            return {
                uid: payload.uid,
                name: payload.displayName,
            };
        case TYPES.LOGOUT:
            return {};
        default:
            return state;
    }
};
