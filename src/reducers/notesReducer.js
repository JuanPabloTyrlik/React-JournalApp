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
        case TYPES.NOTES_LOAD_ENTRIES:
            return {
                ...state,
                notes: [...payload],
            };
        case TYPES.NOTES_UPDATE_ENTRY:
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === payload.id ? payload : note
                ),
            };
        default:
            return state;
    }
};
