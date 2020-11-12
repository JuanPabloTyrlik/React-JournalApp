import React from 'react';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
    const entries = [...new Array(5).keys()];
    return (
        <div className="journal__entries">
            {entries.map((value) => (
                <JournalEntry key={value} />
            ))}
        </div>
    );
};
