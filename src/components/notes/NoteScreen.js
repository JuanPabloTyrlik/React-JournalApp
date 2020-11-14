import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
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
                />
                <textarea
                    name="text-area"
                    id="text-area"
                    cols="20"
                    rows="5"
                    placeholder="What happened today?"
                    className="notes__text-area"
                ></textarea>
                <div className="notes__image">
                    <img
                        src="https://www.w3schools.com/w3css/img_forest.jpg"
                        alt="forest"
                    />
                </div>
            </div>
        </div>
    );
};
