import React, { useState, useEffect } from 'react'
import { writeJournalEntryToFirebase } from '../../firebase/writeJournalEntriesToFirebase'
import { EntryTemplate } from '../../../templates/entryTemplate'
import { getLocation } from '../../location/getLocation'
import { View } from 'react-native'
import Text from '../../../appStyles/customStyle'
import { GeoPoint } from "firebase/firestore";


export const NewEntry = ({ navigation, route }) => {
    const entry = route.params.entry;
    const displayDate = new Date().toDateString();
    const location = getLocation();
    if (location === null) {
        return <View><Text>Loading...</Text></View>;
    }
    const loc = new GeoPoint(location.coords.latitude, location.coords.longitude);
    entry.Location = loc;

    return (
        <EntryTemplate navigation={navigation} entryData={entry} pickerDisplayDate={displayDate} writeToFirebase={writeJournalEntryToFirebase} />
    )
}