import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import { IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appstyle as app_style } from '../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
import Text from '../appStyles/customStyle'
import useThemedStyles from '../appStyles/useThemedStyles'
import { newEntrystyle as newEntry_style } from '../app/screens/newEntry/newEntry.style'
import useTheme from '../appStyles/useTheme'
import { PickDate } from '../app/useful/datePicker'
import { entryTemplatestyle as entryTemplate_style} from './entryTemplate.style'
import DateTimePicker from '@react-native-community/datetimepicker'


export const EntryTemplate = ({ navigation, entryData, pickerDisplayDate, writeToFirebase }) => {
    console.log("template entry: ", entryData);

    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const newEntrystyle = useThemedStyles(newEntry_style);
    const entryTemplatestyle = useThemedStyles(entryTemplate_style);

    const [title, setTitle] = useState(entryData.Title);
    const [text, setText] = useState(entryData.Text);
    const [location, setLocation] = useState(entryData.Location);
    const [entryDate, setEntryDate] = useState(new Date(entryData.Date.toDateString()));
    const [entryTime, setEntryTime] = useState(entryData.Date);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const auth = getAuth()
    const user = auth.currentUser;
    const displayDate = new Date(pickerDisplayDate).toDateString();

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setEntryDate(selectedDate);
        }
        setShowDatePicker(false);
    };

    const handleTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            setEntryTime(selectedTime);
        }
        setShowTimePicker(false);
    };

    // const getLocation = () => {

    // }

    const saveEntry = () => {
        const location = "[0 N, 0 E]"; // change to get actual geolocation
        const uid = user.uid;
        const entry = {Date: entryDate, Location: location, Title: title, Text: text, uid: uid, id: entryData.id};

        console.log("hello firebase1");
        writeToFirebase(entry);
        console.log("hello firebase2");

        navigation.navigate('ViewEntry', { entry });
    }

    // const formattedTime = entryTime.toLocaleTimeString('en-US', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    // });


    const formatCustomDateTime = (dateTime) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const day = days[dateTime.getDay()];
        const month = months[dateTime.getMonth()];
        const date = dateTime.getDate();
        const year = dateTime.getFullYear();

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        return `${day} ${month} ${date} ${year} ${formattedTime}`;
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
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={entryTemplatestyle.cardText}>Date: {entryDate.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        testID='datePicker'
                        value={entryDate}
                        mode='date'
                        is24Hour={false}
                        display='spinner'
                        onChange={handleDateChange}
                    />
                )}
                <TextInput value={location} onChangeText={text => setLocation(text)} style={entryTemplatestyle.cardText} placeholder='Location:' />
                <TextInput value={title} onChangeText={text => setTitle(text)} style={newEntrystyle.cardTitle} editable placeholder='Title' />
                <ScrollView contentContainerStyle={newEntrystyle.scrollView} style={newEntrystyle.scroll}>
                    <View style={newEntrystyle.noteBodyContainer}>
                        <TextInput value={text} onChangeText={text => setText(text)} style={newEntrystyle.noteBody} multiline editable placeholder='Start entry' />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
