import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    const { active: note } = useSelector((state) => state.notes);
    const dispatch = useDispatch();

    const input = useRef();

    const handleSave = () => {
        dispatch(startSaveNote());
    };

    const handleUpload = (e) => {
        input.current.click();
    };

    const handleUploadChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            dispatch(startUploading(file));
            input.current.value = '';
        }
    };

    return (
        <div className="notes__app-bar">
            <span>{moment(note.date).format('MMMM Do YYYY')}</span>
            <input
                type="file"
                name="picture"
                id="picture"
                ref={input}
                onChange={handleUploadChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <div>
                <button className="btn" onClick={handleUpload}>
                    Picture
                </button>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};
