import React, { useState, useEffect } from 'react'
import { editMemoriesToFirebase } from '../../../firebase/editMemoriesToFirebase';
import { MemoryTemplate } from '../../../../templates/memoryTemplate';
import { EditTemplate } from '../../../../templates/editTemplate';


export const EditMemory = ({ navigation, route }) => {
    const memory = route.params.data;
    const screen = route.params.screen;
    const editMemory = { DateCreated: new Date(memory.DateCreated), DateMarked: new Date(memory.DateMarked), Title: memory.Title, Location: memory.Location, Text: memory.Text, Images: memory.Images, uid: memory.uid, id: memory.id };

    return (
        // <MemoryTemplate navigation={navigation} memory={editMemory} writeToFirebase={editMemoriesToFirebase} />
        <EditTemplate navigation={navigation} data={editMemory} screen={screen} writeToFirebase={editMemoriesToFirebase} handleExitView={route.params.handleExitView}/>
    )
}