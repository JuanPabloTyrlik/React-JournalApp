import { TYPES } from '../types/types';

const initialState = {
    notes: [],
    active: null,
};

export const notesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.NOTES_ACTIVE_ENTRY:
            return {
                ...state,
                active: {
                    ...payload,
                },
            };
        default:
            return state;
    }
};
