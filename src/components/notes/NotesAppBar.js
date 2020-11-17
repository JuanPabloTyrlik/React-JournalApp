import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startSaveNote } from '../../actions/notes';

export const NotesAppBar = () => {
    const { active: note } = useSelector((state) => state.notes);

    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(startSaveNote());
    };

    return (
        <div className="notes__app-bar">
            <span>{moment(note.date).format('MMMM Do YYYY')}</span>
            <div>
                <button className="btn">Picture</button>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};
