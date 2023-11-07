import React, { useState, useEffect } from 'react'
import { editJournalEntriesToFirebase } from '../../../firebase/editJournalEntriesToFirebase'
import { EntryTemplate } from '../../../../templates/entryTemplate'


export const EditEntry = ({ navigation, route }) => {
    const entry1 = route.params.entry;
    // console.log("editDate entry: ", entry1);
    const displayDate = entry1.Date;
    const entry = { Date: new Date(entry1.Date), Title: entry1.Title, Location: entry1.Location, Text: entry1.Text, Images: entry1.Images, uid: entry1.uid, id: entry1.id };

    return (
        <EntryTemplate navigation={navigation} entryData={entry} pickerDisplayDate={displayDate} writeToFirebase={editJournalEntriesToFirebase} />
    )
}