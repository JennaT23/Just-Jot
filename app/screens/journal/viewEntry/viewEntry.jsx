import { Paragraph, Subheading, Title, IconButton, Card } from "react-native-paper";
import { appstyle } from "../../../../appStyles/appstyle";
import Text from "../../../../appStyles/customStyle";
import React from "react";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { viewEntryStyle } from "./viewEntry.style";
import useThemedStyles from "../../../../appStyles/useThemedStyles";
import { ScrollView, View, Image } from "react-native";
import { newEntrystyle as newEntry_style } from "../newEntry/newEntry.style";
import useTheme from "../../../../appStyles/useTheme";
import { HeaderBackButton } from "@react-navigation/elements";
import { TouchableOpacity, Alert } from "react-native";
import { deleteJournalEntryFromFirebase } from "../../../firebase/deleteJournalEntryFromFirebase";
import { fetchJournalEntriesFromFirebase } from "../../../firebase/fetchJournalEntriesFromFirebase";
import { Button } from "react-native";
import { useState } from "react";
import { displayAddress } from "../../../location/geocode";

export const ViewEntry = ({ navigation, route }) => {
    const viewstyle = useThemedStyles(viewEntryStyle);
    const newEntrystyle = useThemedStyles(newEntry_style);
    const handleExitView = route.params.handleExitView;
    const theme = useTheme();
    const entry = route.params.entry;
    const screen = route.params.screen;
    const [displayLocation, setDisplayLocation] = useState('');
    const [displaySubtitle, setDisplaySubtitle] = useState('');

    useEffect(() => {
        const fetchDisplayAddress = async () => {
            const address = await displayAddress(entry.Location);
            setDisplayLocation(address || '');
            setDisplaySubtitle((entry.DateCreated && formatCustomDateTime(new Date(entry.DateCreated))) + "\nLocation: " + displayLocation);
        };

        fetchDisplayAddress();
    }, [entry.Location]);

    useEffect(() => {
        fetchJournalEntriesFromFirebase();
    }, []);

    const formatCustomDateTime = (dateTime) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const day = days[dateTime.getDay()];
        const month = months[dateTime.getMonth()];
        const date = dateTime.getDate();
        const year = dateTime.getFullYear();

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;

        return `${day} ${month} ${date} ${year} ${formattedTime}`;
    };

    const moveToEditEntry = () => {
        navigation.navigate("EditEntry", { entry, screen });
    };

    const formatGeoPoint = (geopoint) => {
        const lat = geopoint.latitude.toString();
        const lng = geopoint.longitude.toString();

        const formattedLocation = "[" + lat + ", " + lng + "]";
        return formattedLocation;
    };

    const handleDeleteEntry = async (entryId) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this entry?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await deleteJournalEntryFromFirebase(entryId);

                            // fetchJournalEntriesFromFirebase();            // refresh journal entries after deleting
                            handleExitView();
                            navigation.navigate("Journal");               // go back to main page of journal
                        } catch (error) {
                            console.error("Error deleting entry:", error);
                        }
                    },
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton
                    onPress={() => {
                        handleExitView();
                        navigation.navigate("NavBar");
                    }}
                    title="Journal"
                />
            ),
        });
    }, [navigation]);

    return (
        <ScrollView style={viewstyle.container}>
            <View style={newEntrystyle.toolBar}>
                <IconButton
                    icon="delete-forever"
                    size={31}
                    onPress={() => handleDeleteEntry(entry.id)}
                    style={newEntrystyle.iconButton}
                    iconColor={theme.colors.TEXT}
                />
                <IconButton
                    icon="pencil"
                    size={31}
                    onPress={moveToEditEntry}
                    style={newEntrystyle.iconButton}
                    iconColor={theme.colors.TEXT}
                />
            </View>
            <View style={viewstyle.entry}>
                <Card style={viewstyle.topCard}>
                    <Card.Title
                        title={entry.Title}
                        titleStyle={viewstyle.title}
                        subtitleNumberOfLines={2}
                        subtitle={displaySubtitle}
                        subtitleStyle={viewstyle.subheading}
                    />
                </Card>
                <Card style={viewstyle.bottomCard}>
                    <Card.Content>
                        <View style={viewstyle.view}>
                            <Paragraph style={viewstyle.text}>{entry.Text}</Paragraph>
                            {entry.Images && expanded && (
                                <Image style={{ height: 200, width: 200 }} source={{ uri: entry.Images }} />
                            )}
                        </View>
                        {/* <View style={viewstyle.deleteButton}>
                            <Button
                                title="Delete Entry"
                                onPress={() => handleDeleteEntry(entry.id)}
                                color="red"
                            />
                        </View> */}
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    );
};

// ViewEntry.navigationOptions = ({ navigation }) => {
//     return {
//         headerLeft: () => (
//             <HeaderBackButton
//                 onPress={() => { handleExitView(); navigation.navigate('Journal'); }}
//             />
//         )
//     }
// }
