import React, { useState, useEffect } from 'react'
import { writeJournalEntryToFirebase } from '../../firebase/writeJournalEntriesToFirebase'


export const NewEntry = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const newEntrystyle = useThemedStyles(newEntry_style);

    const [title, setTitle] = useState('');
    const [text, setContent] = useState('');

    const auth = getAuth()
    const user = auth.currentUser;

    const scrollViewRef = useRef(null);
    const textInputRef = useRef(null);

    const saveEntry = () => {
        const date = new Date();
        const location = "[0 N, 0 E]"; // change to get actual geolocation
        const uid = user.uid;
        const journal = { date, location, title, text, uid };
        console.log(journal);
        writeJournalEntryToFirebase(journal);
        navigation.replace('Home');
    }

    // supposed to make the TextInput component scroll as you are typing
    useEffect(() => {
        if (scrollViewRef.current && textInputRef.current) {
            scrollViewRef.current.scrollTo({
                y: textInputRef.current.measureInWindow((x, y, width, height) => {
                    return y;
                }),
                animated: true,
            });
        }
    }, [text]);

    return (
        <EntryTemplate entryData={entry} pickerDisplayDate={displayDate} writeToFirebase={writeJournalEntryToFirebase}/>
    )
}