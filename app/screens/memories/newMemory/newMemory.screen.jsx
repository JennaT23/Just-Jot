import React, { useState, useEffect } from 'react'
import { writeMemoryToFirebase } from '../../../firebase/writeMemoryToFirebase'
import { EntryTemplate } from '../../../../templates/entryTemplate'
import { getLocation } from '../../../location/getLocation'
import { View } from 'react-native'
import Text from '../../../../appStyles/customStyle'
import { GeoPoint } from "firebase/firestore";
import { MemoryTemplate } from '../../../../templates/memoryTemplate'
import { appstyle as app_style } from "../../../../appStyles/appstyle";
import useThemedStyles from '../../../../appStyles/useThemedStyles';

export const NewMemory = ({ navigation, route }) => {
    const appstyle = useThemedStyles(app_style);
    const memory = route.params.memory;
    const displayDate = new Date().toDateString();
    const location = getLocation();
    if (location === null) {
        return <View style={appstyle.loadingContainer}><Text style={appstyle.loadingText}>Loading...</Text></View>;
    }
    const loc = new GeoPoint(location.coords.latitude, location.coords.longitude);
    memory.Location = loc;

    return (
        <MemoryTemplate navigation={navigation} memory={memory} writeToFirebase={writeMemoryToFirebase} handleExitView={route.params.handleExitView} />
    )
}