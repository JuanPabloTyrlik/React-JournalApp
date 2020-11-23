import { db } from '../firebase/config';
import { loadNotes } from '../helpers/loadNotes';
import { TYPES } from '../types/types';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const startNewEntry = () => async (dispatch, getState) => {
    const {
        auth: { uid },
    } = getState();

    const newNote = {
        title: '',
        body: '',
        imageUrl: '',
        date: new Date().getTime(),
    };

    await db
        .collection(`${uid}/journal/notes`)
        .add(newNote)
        .then((doc) => dispatch(newEntry(doc.id, newNote)));
};

export const newEntry = (id, note) => {
    return {
        type: TYPES.NOTES_NEW_ENTRY,
        payload: {
            id,
            ...note,
        },
    };
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

export const startLoadingNotes = (uid) => async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
};

export const setNotes = (notes) => {
    return {
        type: TYPES.NOTES_LOAD_ENTRIES,
        payload: notes,
    };
};

export const startSaveNote = () => async (dispatch, getState) => {
    const {
        auth: { uid },
        notes: { active: note },
    } = getState();
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    await db
        .doc(`${uid}/journal/notes/${note.id}`)
        .update(noteToFirestore)
        .then(() => {
            dispatch(refreshNote(note.id, noteToFirestore));
            Swal.fire('Saved', note.title, 'success');
        })
        .catch((e) => Swal.fire('Error', e.message, 'error'));
};

export const refreshNote = (id, note) => {
    return {
        type: TYPES.NOTES_UPDATE_ENTRY,
        payload: {
            id,
            ...note,
        },
    };
};

export const startUploading = (file) => async (dispatch, getState) => {
    Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        },
    });
    const {
        notes: { active: note },
    } = getState();
    const url = await fileUpload(file);
    note.imageUrl = url;
    dispatch(refreshNote(note.id, note));
    dispatch(startSaveNote());
};

export const startDeleteNote = () => (dispatch, getState) => {
    const {
        auth: { uid },
        notes: { active: note },
    } = getState();
    db.doc(`${uid}/journal/notes/${note.id}`)
        .delete()
        .then(() => {
            dispatch(deleteNote(note.id));
            Swal.fire({
                title: `${note.title || 'Note'} deleted`,
                icon: 'success',
            });
        })
        .catch((e) => Swal.fire('Error', e.message, 'error'));
};

export const deleteNote = (id) => {
    return {
        type: TYPES.NOTES_DELETE_ENTRY,
        payload: {
            id,
        },
    };
};

export const cleanNotes = () => {
    return {
        type: TYPES.NOTES_LOGOUT_CLEANING,
        payload: null,
    };
};
