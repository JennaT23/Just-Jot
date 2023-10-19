import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, ScrollView, Pressable, Platform } from 'react-native'
import { IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import { newEntrystyle as newEntry_style } from './newEntry.style'
import useTheme from '../../../appStyles/useTheme'
import { writeJournalEntryToFirebase } from '../../firebase/writeJournalEntriesToFirebase'
import { PickDate } from '../../useful/datePicker'


export const NewEntry = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const newEntrystyle = useThemedStyles(newEntry_style);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [entryDate, setEntryDate] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const auth = getAuth()
    const user = auth.currentUser;
    const displayDate = new Date().toDateString();

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }
    
    const getDate = (selectedDate) => {
        const newDate = new Date(selectedDate);
        const chosenDate = new Date(newDate.toDateString());

        setEntryDate(chosenDate.toDateString());
        toggleDatePicker();
    }

    const renderPickDate = showPicker ? <PickDate displayDate={displayDate} sendDate={getDate} /> : null;

    // const setLocation = () => {

    // }

    const saveEntry = () => {
        const location = "[0 N, 0 E]"; // change to get actual geolocation
        const uid = user.uid;
        const entry = {entryDate, location, title, text, uid};

        writeJournalEntryToFirebase(entry);
    }

    return (
        <SafeAreaView style={[newEntrystyle.container, newEntrystyle.entryContainer]}>
            <View style={newEntrystyle.toolBar}>
                <IconButton
                    icon="image-plus"
                    size={30}
                    onPress={() => console.log('Pressed')}
                    style={newEntrystyle.iconButton}
                    iconColor={theme.colors.TEXT}
                />
                <IconButton
                    icon="camera"
                    size={30}
                    iconColor={theme.colors.TEXT}
                    onPress={() => console.log('Pressed')}
                    style={newEntrystyle.iconButton}
                />
                <TouchableOpacity
                    onPress={saveEntry}
                    style={newEntrystyle.saveButton}>
                    <Text style={[appstyle.buttonText, newEntrystyle.buttonText]}>SAVE</Text>
                </TouchableOpacity>
            </View>
            <View style={newEntrystyle.container}>
                {/* {!showPicker && PickDate(displayDate, getDate)} */}
                
                <Pressable onPress={toggleDatePicker}>
                    <TextInput value={entryDate} editable={true} onTextChange={setEntryDate} onPressIn={toggleDatePicker} style={newEntrystyle.cardTitle} placeholder='date:'/>
                </Pressable>

                { renderPickDate }

                {/* <Pressable onPress={toggleDatePicker}>
                    <TextInput value={date} editable={false} onTextChange={setEntryDate} onPressIn={toggleDatePicker} style={newEntrystyle.cardTitle} placeholder='date:'/>
                </Pressable> */}
                
                {/* {showPicker && PickDate(displayDate, getDate)} */}
                {/* <TextInput value={date} editable onChange={setPick} style={newEntrystyle.cardTitle} placeholder='date:'/> */}
                {/* onFocus={() => setShow(true)} */}
                <TextInput value={location} onChangeText={text => setLocation(text)} style={newEntrystyle.cardTitle} placeholder='location:'/>
                <TextInput value={title} onChangeText={text => setTitle(text)} style={newEntrystyle.cardTitle} editable placeholder='Title' />
                <ScrollView contentContainerStyle={newEntrystyle.scrollView} style={newEntrystyle.scroll}>
                    <View style={newEntrystyle.noteBodyContainer}>
                        <TextInput value={text} onChangeText={text => setText(text)} style={newEntrystyle.noteBody} multiline editable placeholder='Start entry' /> 
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
