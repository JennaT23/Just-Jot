import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appHomeStyle as appHome_style } from './appHome.style'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import { useNavigation } from '@react-navigation/core'
import { Card, Title, Paragraph, Button, FAB, Subheading, IconButton } from 'react-native-paper'
import { fetchJournalEntriesFromFirebase } from '../../firebase/fetchJournalEntriesFromFirebase'
import { newEntrystyle as newEntry_style } from '../newEntry/newEntry.style'
import useTheme from '../../../appStyles/useTheme'
import { getLocation } from '../../location/getLocation'

export const Home = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const appHomestyle = useThemedStyles(appHome_style);
    const newEntrystyle = useThemedStyles(newEntry_style);

    const { navigate } = useNavigation()

    const auth = getAuth()
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [journalEntries, setJournalEntries] = useState([]);

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
        }
        fetchJournalEntries();
    }, [user])

    const moveNewEntry = () => {
        const entry = { Text: '', Title: '', Location: null, Date: new Date(), uid: user.uid };
        navigation.navigate('NewEntry', { entry });
    }

    const fetchJournalEntries = async () => {
        try {
            const entries = await fetchJournalEntriesFromFirebase();
            setJournalEntries(entries);
            console.log("fetch", journalEntries);
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

    const formatGeoPoint = (geopoint) => {
        const lat = geopoint.latitude.toString();
        const lng = geopoint.longitude.toString();

        const formattedLocation = "[" + lat + ", " + lng + "]";
        return formattedLocation;
    }

    const handleView = (entry) => {
        console.log("home entry: ", entry);
        console.log("home date: ", entry.Date);
        navigation.navigate('ViewEntry', { entry });
    };

    return (
        // <SafeAreaView style={appstyle.pageContainer}>
        <SafeAreaView style={appHomestyle.container}>
            <View>
                <Text style={appstyle.title}>Hello {username}!</Text>
            </View>
            <ScrollView>
                {journalEntries.map((entry, index) => (
                    <Card key={index} style={appHomestyle.card}>
                        <Card.Content>
                            <TouchableOpacity onPress={() => handleView(entry)}>
                                <Title style={appHomestyle.title}>{entry.Title}</Title>
                                <Subheading style={appHomestyle.subheading}>{entry.Date && formatDate(new Date(entry.Date))}</Subheading>
                                <Subheading style={appHomestyle.subheading}>Location: {entry.Location && formatGeoPoint(entry.Location)}</Subheading>
                                <Paragraph>{entry.Text}</Paragraph>
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
            <FAB style={appHomestyle.fab} icon="plus"
                onPress={moveNewEntry} />
        </SafeAreaView >
    )
}