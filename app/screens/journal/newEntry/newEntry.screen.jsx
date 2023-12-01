import React, { useState, useEffect } from 'react'
import { writeJournalEntryToFirebase } from '../../../firebase/writeJournalEntriesToFirebase'
import { EntryTemplate } from '../../../../templates/entryTemplate'
import { getLocation } from '../../../location/getLocation'
import { View } from 'react-native'
import Text from '../../../../appStyles/customStyle'
import { GeoPoint } from "firebase/firestore";
import { appstyle as app_style } from "../../../../appStyles/appstyle";
import useThemedStyles from '../../../../appStyles/useThemedStyles';
import { EditTemplate } from '../../../../templates/editTemplate';


export const NewEntry = ({ navigation, route }) => {
    const appstyle = useThemedStyles(app_style);
    const entry = route.params.newEntry;
    const screen = route.params.screen;
    const displayDate = new Date().toDateString();
    const location = getLocation();
    if (location === null) {
        return <View style={appstyle.loadingContainer}><Text style={appstyle.loadingText}>Loading...</Text></View>;
    }
    const loc = new GeoPoint(location.coords.latitude, location.coords.longitude);
    entry.Location = loc;

    console.log("entry:", entry);

    return (
        // <EntryTemplate navigation={navigation} entryData={entry} pickerDisplayDate={displayDate} writeToFirebase={writeJournalEntryToFirebase} handleExitView={route.params.handleExitView} />
        <EditTemplate navigation={navigation} data={entry} screen={screen} writeToFirebase={writeJournalEntryToFirebase} handleExitView={route.params.handleExitView} />
    )
}