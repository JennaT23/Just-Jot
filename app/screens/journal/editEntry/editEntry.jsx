import React, { useState, useEffect } from 'react'
import { editJournalEntriesToFirebase } from '../../../firebase/editJournalEntriesToFirebase'
import { EntryTemplate } from '../../../../templates/entryTemplate'
import { EditTemplate } from '../../../../templates/editTemplate';


export const EditEntry = ({ navigation, route }) => {
    const entry1 = route.params.entry;
    const screen = route.params.screen;
    const displayDate = entry1.Date;
    const entry = { Date: new Date(entry1.Date), Title: entry1.Title, Location: entry1.Location, Text: entry1.Text, Images: entry1.Images, uid: entry1.uid, id: entry1.id };

    return (
        // <EntryTemplate navigation={navigation} entryData={entry} pickerDisplayDate={displayDate} writeToFirebase={editJournalEntriesToFirebase} />
        <EditTemplate navigation={navigation} data={entry} screen={screen} writeToFirebase={editJournalEntriesToFirebase} />
    )
}