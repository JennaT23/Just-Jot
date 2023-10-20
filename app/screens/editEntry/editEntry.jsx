import React, { useState, useEffect } from 'react'
import { editJournalEntriesToFirebase } from '../../firebase/editJournalEntriesToFirebase'
import { EntryTemplate } from '../../../templates/entryTemplate'


export const EditEntry = ({ navigation, route }) => {
    const entry = route.params.entry;
    console.log("editDate entry: ", entry);
    const displayDate = entry.Date;

    return (
        <EntryTemplate navigation={navigation} entryData={entry} pickerDisplayDate={displayDate} writeToFirebase={editJournalEntriesToFirebase}/>
    )
}