import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import { useNavigation } from '@react-navigation/core'
import { Card, Title, Paragraph, Button, FAB, Subheading, IconButton } from 'react-native-paper'
import { fetchMemoriesFromFirebase } from '../../firebase/fetchMemoriesFromFirebase'
import { newEntrystyle as newEntry_style } from '../newEntry/newEntry.style'
import useTheme from '../../../appStyles/useTheme'
import { appJournalStyle as appJournal_style } from '../appJournal/journal.style'
import { GeoPoint } from "firebase/firestore";
import { getLocation } from '../../location/getLocation';

export const Memories = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const appJournalstyle = useThemedStyles(appJournal_style);
    const newEntrystyle = useThemedStyles(newEntry_style);

    const { navigate } = useNavigation()

    const auth = getAuth()
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [memories, setMemories] = useState([]);
    const [refreshData, setRefreshData] = useState(0);

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
        }
        fetchMemories();
    }, [refreshData]);

    const handleExitView = () => {
        navigation.navigate('NavBar');
        setRefreshData((prev) => prev + 1);
    };

    const moveNewMemory = () => {
        const memory = { Text: '', Title: '', Location: null, DateCreated: new Date(), DateMarked: new Date(), uid: user.uid };
        console.log('memory in move:', memory)
        navigation.navigate('NewMemory', { memory, handleExitView });
    }

    const fetchMemories = async () => {
        try {
            const entries = await fetchMemoriesFromFirebase();
            setMemories(entries);
            console.log("fetch", memories);
        } catch (error) {
            console.log('Error fetching', error);
        }
    };

    function formatDate(date) {
        console.log("date", date);

        if (!(date instanceof Date)) {
            throw new Error("Invalid date object");
        }

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const dayOfWeek = daysOfWeek[date.getDay()];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Format the time to be in 12-hour format
        const amPm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;

        const formattedDate = `${dayOfWeek}. ${month}. ${day}, ${year} ${formattedHours}:${String(minutes).padStart(2, '0')} ${amPm}`;

        return formattedDate;
    }

    const handleView = (newMemory) => {
        console.log("Journal entry: ", newMemory);
        console.log("Journal date: ", newMemory.DateCreated);
        navigation.navigate('ViewMemory', { newMemory, handleExitView });
    };

    const formatGeoPoint = (geopoint) => {
        const lat = geopoint.latitude.toString();
        const lng = geopoint.longitude.toString();

        const formattedLocation = "[" + lat + ", " + lng + "]";
        return formattedLocation;
    };

    return (
        // <SafeAreaView style={appstyle.pageContainer}>
        <SafeAreaView style={appJournalstyle.container}>
            <View>
                <Text style={appstyle.title}>Hello {username}!</Text>
            </View>
            <ScrollView>
                {memories.map((memory, index) => (
                    <Card key={index} style={appJournalstyle.card}>
                        <Card.Content>
                            <TouchableOpacity onPress={() => handleView(memory)}>
                                <Title style={appJournalstyle.title}>{memory.Title}</Title>
                                <Subheading style={appJournalstyle.subheading}>Created: {memory.DateCreated && formatDate(new Date(memory.DateCreated))}</Subheading>
                                <Subheading style={appJournalstyle.subheading}>Marked: {memory.DateMarked && formatDate(new Date(memory.DateMarked))}</Subheading>
                                <Subheading style={appJournalstyle.subheading}>Location: {memory.Location && formatGeoPoint(memory.Location)}</Subheading>
                                <Paragraph>{memory.Text}</Paragraph>
                            </TouchableOpacity>
                            {/* <Card.Actions>
                                <TouchableOpacity onPress={() => handleView(entry)}>
                                    <Text>View</Text>
                                </TouchableOpacity>
                            </Card.Actions> */}
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
            <FAB style={appJournalstyle.fab} icon="plus"
                onPress={moveNewMemory} />
        </SafeAreaView >
    )
}