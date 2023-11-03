import React, { useState, useEffect } from 'react'
import { editMemoriesToFirebase } from '../../firebase/editMemoriesToFirebase';
import { MemoryTemplate } from '../../../templates/memoryTemplate';


export const EditMemory = ({ navigation, route }) => {
    const memory = route.params.memory;
    console.log("editDate entry: ", memory);
    const displayDateCreated = memory.DateCreated;
    const displayDateMarked = memory.DateMarked;
    const entry = { DateCreated: new Date(memory.DateCreated), DateMarked: new Date(memory.DateMarked), Title: memory.Title, Location: memory.Location, Text: memory.Text, uid: memory.uid, id: memory.id };

    return (
        <MemoryTemplate navigation={navigation} memoryData={memory} pickerDisplayDate={displayDate} writeToFirebase={editMemoriesToFirebase} />
    )
}