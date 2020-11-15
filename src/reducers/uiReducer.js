import { TYPES } from '../types/types';

const initialState = {
    loading: false,
    msgError: null,
};

export const uiReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.UI_SET_ERROR:
        case TYPES.UI_REMOVE_ERROR:
            return {
                ...state,
                msgError: payload,
            };
        case TYPES.UI_START_LOADING:
        case TYPES.UI_FINISH_LOADING:
            return {
                ...state,
                loading: payload,
            };
        default:
            return state;
    }
};
