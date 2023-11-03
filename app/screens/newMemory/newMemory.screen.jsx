import React, { useState, useEffect } from 'react'
import { writeMemoryToFirebase } from '../../firebase/writeMemoryToFirebase'
import { EntryTemplate } from '../../../templates/entryTemplate'
import { getLocation } from '../../location/getLocation'
import { View } from 'react-native'
import Text from '../../../appStyles/customStyle'
import { GeoPoint } from "firebase/firestore";
import { MemoryTemplate } from '../../../templates/memoryTemplate'


export const NewMemory = ({ navigation, route }) => {
    const memory = route.params.memory;
    console.log('memory in newmemory:', memory);
    const displayDate = new Date().toDateString();
    const location = getLocation();
    if (location === null) {
        return <View><Text>Loading...</Text></View>;
    }
    const loc = new GeoPoint(location.coords.latitude, location.coords.longitude);
    memory.Location = loc;

    return (
        <MemoryTemplate navigation={navigation} memory={memory} pickerDisplayDate={displayDate} writeToFirebase={writeMemoryToFirebase} handleExitView={route.params.handleExitView} />
    )
}