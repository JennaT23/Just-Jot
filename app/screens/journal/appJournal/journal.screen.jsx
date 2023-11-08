import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appJournalStyle as appJournal_style } from './journal.style'
import { appstyle as app_style } from '../../../../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
import Text from '../../../../appStyles/customStyle'
import useThemedStyles from '../../../../appStyles/useThemedStyles'
import { useNavigation } from '@react-navigation/core'
import { Card, Title, Paragraph, Button, FAB, Subheading, IconButton } from 'react-native-paper'
import { fetchJournalEntriesFromFirebase } from '../../../firebase/fetchJournalEntriesFromFirebase'
import { newEntrystyle as newEntry_style } from '../newEntry/newEntry.style'
import useTheme from '../../../../appStyles/useTheme'
import { getLocation } from '../../../location/getLocation'

export const Journal = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const appJournalstyle = useThemedStyles(appJournal_style);
    const newEntrystyle = useThemedStyles(newEntry_style);

    const { navigate } = useNavigation()

    const auth = getAuth()
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [journalEntries, setJournalEntries] = useState([]);
    const [refreshData, setRefreshData] = useState(0);

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
        }
        fetchJournalEntries();
    }, [refreshData])

    const handleExitView = () => {
        navigation.navigate('NavBar');
        setRefreshData((prev) => prev + 1);
    };

    const moveNewEntry = () => {
        const entry = { Text: '', Title: '', Location: null, Images: '', Date: new Date(), uid: user.uid };
        navigation.navigate('NewEntry', { entry, handleExitView });
    }

    const fetchJournalEntries = async () => {
        try {
            const entries = await fetchJournalEntriesFromFirebase();
            setJournalEntries(entries);
        } catch (error) {
            console.log('Error fetching', error);
        }
    };

    function formatDate(date) {
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

    const formatGeoPoint = (geopoint) => {
        const lat = geopoint.latitude.toString();
        const lng = geopoint.longitude.toString();

        const formattedLocation = "[" + lat + ", " + lng + "]";
        return formattedLocation;
    }

    const handleView = (entry) => {
        navigation.navigate('ViewEntry', { entry, handleExitView });
    };

    return (
        // <SafeAreaView style={appstyle.pageContainer}>
        <SafeAreaView style={appJournalstyle.container}>
            <View>
                <Text style={appstyle.title}>Hello {username}!</Text>
            </View>
            <ScrollView>
                {journalEntries.map((entry, index) => (
                    <Card key={index} style={appJournalstyle.card}>
                        <Card.Content>
                            <TouchableOpacity onPress={() => handleView(entry)}>
                                <Title style={appJournalstyle.title}>{entry.Title}</Title>
                                <Subheading style={appJournalstyle.subheading}>{entry.Date && formatDate(new Date(entry.Date))}</Subheading>
                                <Subheading style={appJournalstyle.subheading}>Location: {entry.Location && formatGeoPoint(entry.Location)}</Subheading>
                                <Paragraph>{entry.Text}</Paragraph>
                                <Image style={{ height: 200, width: 200 }} source={{ uri: entry.Images }} />
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
                onPress={moveNewEntry} />
        </SafeAreaView >
    )
}