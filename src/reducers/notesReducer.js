import { TYPES } from '../types/types';

const initialState = {
    notes: [],
    active: null,
};

export const notesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.NOTES_NEW_ENTRY:
            return {
                ...state,
                notes: [payload, ...state.notes],
                active: {
                    ...payload,
                },
            };
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
                notes: [...payload.sort((a, b) => b.date - a.date)],
            };
        case TYPES.NOTES_UPDATE_ENTRY:
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === payload.id ? payload : note
                ),
            };
        case TYPES.NOTES_DELETE_ENTRY:
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== payload.id),
                active: null,
            };
        case TYPES.NOTES_LOGOUT_CLEANING:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
