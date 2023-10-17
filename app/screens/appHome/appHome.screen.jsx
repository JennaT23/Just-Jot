import React, { useState, useEffect } from 'react'
import { Button, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appHomeStyle as appHome_style } from './appHome.style'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import { useNavigation } from '@react-navigation/core'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import { fetchJournalEntriesFromFirebase } from '../../firebase/fetchJournalEntriesFromFirebase'

export const Home = ({ navigation }) => {
    const appstyle = useThemedStyles(app_style);
    const appHomestyle = useThemedStyles(appHome_style);

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

    // temporary
    const movePage = () => {
        navigate("NewEntry");
    }
    const fetchJournalEntries = async () => {
        try {
            const entries = await fetchJournalEntriesFromFirebase();
            setJournalEntries(entries);
            console.log(journalEntries);
        } catch (error) {
            console.log('Error fetching', error);
        }
    };

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
    };

    const handleView = (entry) => {
        console.log(entry);
        navigation.navigate('ViewEntry', { entry });
    };

    return (
        // <SafeAreaView style={appstyle.pageContainer}>
        <SafeAreaView>
            <View>
                <Text style={appstyle.title}>Hello {username}!</Text>

                {/* temporary */}
                <TouchableOpacity
                    onPress={movePage}
                    style={appstyle.button}
                />

            </View>
            <View>
                {journalEntries.map((entry, index) => (
                    <Card key={index}>
                        <Card.Content>
                            <Title>{entry.Date && formatCustomDateTime(entry.Date.toDate())}</Title>
                            <Paragraph>{entry.Text}</Paragraph>
                            <Card.Actions>
                                <Button onPress={() => handleView(entry)}>View</Button>
                            </Card.Actions>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </SafeAreaView >
    )
}