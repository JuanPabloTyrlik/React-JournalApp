import { TYPES } from '../types/types';

export const setError = (errorMessage) => {
    return {
        type: TYPES.UI_SET_ERROR,
        payload: errorMessage,
    };
};

export const removeError = () => {
    return {
        type: TYPES.UI_REMOVE_ERROR,
        payload: null,
    };
};

export const startLoading = () => {
    return {
        type: TYPES.UI_START_LOADING,
        payload: true,
    };
};

export const finishLoading = () => {
    return {
        type: TYPES.UI_FINISH_LOADING,
        payload: false,
    };
};
