import React, { useState, useEffect } from 'react'
import { writeJournalEntryToFirebase } from '../../firebase/writeJournalEntriesToFirebase'
import { EntryTemplate } from '../../../templates/entryTemplate'


export const NewEntry = ({ navigation, route }) => {
    const entry = route.params.entry;
    const displayDate = new Date().toDateString();

    return (
        <EntryTemplate entryData={entry} pickerDisplayDate={displayDate} writeToFirebase={writeJournalEntryToFirebase}/>
    )
}
