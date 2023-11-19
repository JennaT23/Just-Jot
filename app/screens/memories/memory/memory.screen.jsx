import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appstyle as app_style } from '../../../../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
import Text from '../../../../appStyles/customStyle'
import useThemedStyles from '../../../../appStyles/useThemedStyles'
import { useNavigation } from '@react-navigation/core'
import { Card, Title, Paragraph, Button, FAB, Subheading, IconButton } from 'react-native-paper'
import { fetchMemoriesFromFirebase } from '../../../firebase/fetchMemoriesFromFirebase'
import { newEntrystyle as newEntry_style } from '../../journal/newEntry/newEntry.style'
import useTheme from '../../../../appStyles/useTheme'
import { appJournalStyle as appJournal_style } from '../../journal/appJournal/journal.style'
import { GeoPoint } from "firebase/firestore";
import { displayAddress } from '../../../location/geocode'
import { Memory } from './memory'
import { ViewTemplate } from '../../../../templates/viewTemplate'

export const Memories = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const appJournalstyle = useThemedStyles(appJournal_style);
    const newEntrystyle = useThemedStyles(newEntry_style);

    const { navigate } = useNavigation()
    const screen = 'memory';

    const auth = getAuth()
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [memories, setMemories] = useState([]);
    const [refreshData, setRefreshData] = useState(0);
    const [displayedAddresses, setDisplayedAddresses] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);


    // const fetchMemories = async () => {
    //     try {
    //         const entries = await fetchMemoriesFromFirebase();
    //         setMemories(entries);
    //     } catch (error) {
    //         console.log('Error fetching', error);
    //     }
    // };

    const fetchMemories = async (page = 1) => {
        try {
            const entries = await fetchMemoriesFromFirebase(page);
            setMemories((prevMemories) => [...prevMemories, ...entries]);
        } catch (error) {
            console.log('Error fetching', error);
        }
    };
    

    const fetchMoreMemories = () => {
        if (memories.length > 0) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
        }
        fetchMemories();
    }, [refreshData]);

    // const fetchAndDisplayAddresses = async () => {
    //     const addresses = await Promise.all(
    //         memories.map(async (memory) => {
    //             const address = await displayAddress(memory.Location);
    //             return address;
    //         })
    //     );
    //     setDisplayedAddresses(addresses);
    // };

    // useEffect(() => {
    //     fetchAndDisplayAddresses();
    // }, [memories]);
    const fetchAndDisplayAddresses = async () => {
        const addresses = await Promise.all(
            memories.map(async (memory) => {
                const address = await displayAddress(memory.Location);
                return address;
            })
        );
        setDisplayedAddresses((prevAddresses) => [...prevAddresses, ...addresses]);
    };
    useEffect(() => {
        fetchMemories(currentPage);
    }, [currentPage]);
    

    const handleExitView = () => {
        navigation.navigate('NavBar');
        setRefreshData((prev) => prev + 1);
    };

    const moveNewMemory = () => {
        const memory = { Text: '', Title: '', Location: null, Images: "", DateCreated: new Date(), DateMarked: new Date(), uid: user.uid };
        navigation.navigate('NewMemory', { memory, screen, handleExitView });
    }

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

    const handleView = (newMemory) => {
        navigation.navigate('ViewMemory', { newMemory, screen, handleExitView });
    };

    const formatGeoPoint = (geopoint) => {
        const lat = geopoint.latitude.toString();
        const lng = geopoint.longitude.toString();

        const formattedLocation = "[" + lat + ", " + lng + "]";
        return formattedLocation;
    };



    return (
        <SafeAreaView style={appJournalstyle.container}>
            <View>
                <Text style={appstyle.title}>Hello {username}!</Text>
            </View>
            {/* <ScrollView>
                {memories.map((memory, index) => (
                    <ViewTemplate
                        navigation={navigation}
                        data={memory}
                        index={index}
                        handleExitView={handleExitView}
                        location={displayedAddresses[index]}
                        screen={screen}
                    />
                ))}
            </ScrollView> */}

            <FlatList
                data={memories}
                keyExtractor={(index) => index.id}
                renderItem={( memory, index ) => (
                    <ViewTemplate
                        navigation={navigation}
                        data={memory}
                        index={index}
                        handleExitView={handleExitView}
                        location={displayedAddresses[index]}
                        screen={screen}
                    />
                )}
                onEndReached={fetchMoreMemories} // Load more memories when reaching the end
                onEndReachedThreshold={0.1} // Trigger onEndReached when the scroll position is 10% from the bottom
            />

            <FAB style={appJournalstyle.fab} color={theme.colors.TEXT} icon="plus" onPress={moveNewMemory} />
        </SafeAreaView >
    )
}