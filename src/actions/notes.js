import { db } from '../firebase/config';
import { TYPES } from '../types/types';

export const startNewEntry = () => (dispatch, getState) => {
    const {
        auth: { uid },
    } = getState();

    const newNote = {
        title: '',
        body: '',
        imageUrl: '',
        date: new Date().getTime(),
    };

    db.collection(`${uid}/journal/notes`)
        .add(newNote)
        .then((doc) => dispatch(activeNote(doc.id, newNote)));
};

export const activeNote = (id, note) => {
    return {
        type: TYPES.NOTES_ACTIVE_ENTRY,
        payload: {
            id,
            ...note,
        },
    };
};
