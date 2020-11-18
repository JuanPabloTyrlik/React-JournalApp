import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector((state) => state.notes);
    const [formValues, handleChange, reset] = useForm(note);
    const { title, body, imageUrl } = formValues;

    const activeId = useRef(note.id);
    const activeUrl = useRef(note.imageUrl);

    useEffect(() => {
        if (
            activeId.current !== note.id ||
            activeUrl.current !== note.imageUrl
        ) {
            activeId.current = note.id;
            activeUrl.current = note.imageUrl;
            reset(note);
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [dispatch, formValues]);

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    value={title}
                    onChange={handleChange}
                />
                <textarea
                    name="body"
                    id="text-area"
                    cols="20"
                    rows="5"
                    placeholder="What happened today?"
                    className="notes__text-area"
                    value={body}
                    onChange={handleChange}
                ></textarea>
                {formValues.imageUrl && (
                    <div className="notes__image">
                        <img src={imageUrl} alt="image" />
                    </div>
                )}
            </div>
        </div>
    );
};
