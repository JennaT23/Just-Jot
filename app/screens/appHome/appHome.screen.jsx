import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, ScrollView, Modal} from 'react-native'
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
import { NewEntry } from '../newEntry/newEntry.screen'
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
    const [sortByOldest, setSortByOldest] = useState(true);  // true for oldest to newest, false for newest to oldest
    const [filterModalVisible, setFilterModalVisible] = useState(false);

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

    const moveNewMemory = () => {
        const memory = { Text: '', Title: '', Location: '', MakeDate: new Date(), ShowDate: new Date(), uid: user.uid };
        navigation.navigate('NewMemory', { memory });
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

    const handleFilter = (oldestToNewest) => {
        const sortedEntries = [...journalEntries].sort((a, b) => {
            const dateA = new Date(a.Date);
            const dateB = new Date(b.Date);
            return oldestToNewest ? dateA - dateB : dateB - dateA;
        });
        setJournalEntries(sortedEntries);
        setFilterModalVisible(false);
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

        const formattedLocation = "["+lat+", "+lng+"]";
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
                <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                    <FAB style={appHomestyle.iconButton} icon={'filter'} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                // transparent={true}
                visible={filterModalVisible}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View style={appHomestyle.modalContainer}>
                    <TouchableOpacity style={appHomestyle.modalDropdownOption} onPress={() => handleFilter(true)}>
                        <Text>Oldest to Newest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={appHomestyle.modalDropdownOption} onPress={() => handleFilter(false)}>
                        <Text>Newest to Oldest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={appHomestyle.modalDropdownOption} onPress={() => setFilterModalVisible(false)}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

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