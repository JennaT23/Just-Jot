import { Paragraph } from "react-native-paper";
import useThemedStyles from "../appStyles/useThemedStyles";
import { useState, useEffect } from "react";
import { Card, Title, Subheading, IconButton } from "react-native-paper";
import { TouchableOpacity, Image, Alert, View } from "react-native";
import useTheme from "../appStyles/useTheme";
import { viewTemplateStyle as viewTemplate_style } from "./viewTemplate.style";
import { deleteJournalEntryFromFirebase } from "../app/firebase/deleteJournalEntryFromFirebase";
import { deleteMemoryFromFirebase } from "../app/firebase/deleteMemoryFromFirebase";
import { displayAddress } from '../app/location/geocode';


export const ViewTemplate = ({ navigation, data, index, handleExitView, location, screen }) => {
    const theme = useTheme();
    const viewTemplatestyle = useThemedStyles(viewTemplate_style);
    const [expanded, setExpanded] = useState(false);
    const [coordinates, setCoordinates] = useState(data.Location);
    const [loc, setLoc] = useState();
    // console.log('data', data);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    const fetchAndDisplayAddress = async () => {
        const address = await displayAddress(coordinates);
        setLoc(address);
    };

    useEffect(() => {
        fetchAndDisplayAddress();
    }, [coordinates]);

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
                            let homeScreen;
                            if (screen === 'journal') {
                                await deleteJournalEntryFromFirebase(entryId);
                                homeScreen = "Journal";
                            }
                            else if (screen === 'memory') {
                                await deleteMemoryFromFirebase(entryId);
                                homeScreen = "Memories";
                            }
                            else {
                                Alert.alert("Error reloading page");
                            }
                            handleExitView();
                            navigation.navigate(homeScreen);

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

        const formattedDate = `${dayOfWeek}. ${month}. ${day}, ${year} ${formattedHours}:${String(
            minutes
        ).padStart(2, "0")} ${amPm}`;

        return formattedDate;
    }

    const handleView = () => {
        let editScreen;
        if (screen === 'memory') {
            editScreen = 'EditMemory';
        }
        else if (screen === 'journal') {
            editScreen = 'EditEntry';

        }
        else {
            Alert.alert('Error with navigation');
            return;
        }

        navigation.navigate(editScreen, { data, screen, handleExitView });
    };

    return (
        <Card key={index} style={viewTemplatestyle.card}>
            <Card.Content>
                <TouchableOpacity onPress={() => handleView()}>
                    <Card.Content style={viewTemplatestyle.iconContainer}>
                        {/* <View style={viewTemplatestyle.iconContainer}> */}
                        <Title style={viewTemplatestyle.title}>{data.Title}</Title>
                        <IconButton
                            icon="pencil"
                            size={30}
                            onPress={handleView}
                            style={viewTemplatestyle.iconButton}
                            iconColor={theme.colors.TEXT}
                        />
                        <IconButton
                            icon="delete-forever"
                            size={31}
                            onPress={() => handleDeleteEntry(data.id)}
                            style={viewTemplatestyle.iconButton}
                            iconColor={theme.colors.DELETE}
                        />
                        {/* </View> */}
                    </Card.Content>
                    <Subheading style={viewTemplatestyle.subheading}>Created: {formatDate(data.DateCreated)}</Subheading>
                    {screen === 'memory' && (<Subheading style={viewTemplatestyle.subheading}>Marked: {formatDate(data.DateMarked)}</Subheading>)}
                    <Subheading style={viewTemplatestyle.subheading}>Location: {loc}</Subheading>
                    <Paragraph style={{ color: theme.colors.TEXT }} numberOfLines={expanded ? undefined : 1}>{data.Text}</Paragraph>
                    {data.Images && expanded && (
                        <Image style={{ height: 200, width: 200 }} source={{ uri: data.Images }} />
                    )}
                    {!expanded && (
                        <TouchableOpacity onPress={toggleExpansion}>
                            <Subheading style={{ color: '#ccc' }}>Show more...</Subheading>
                        </TouchableOpacity>
                    )}
                    {expanded && (
                        <TouchableOpacity onPress={toggleExpansion}>
                            <Subheading style={{ color: '#ccc' }}>Show less...</Subheading>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </Card.Content>
        </Card>
    );
}