import { Paragraph } from "react-native-paper";
import useThemedStyles from "../appStyles/useThemedStyles";
import { useState } from "react";
import { Card, Title, Subheading } from "react-native-paper";
import { TouchableOpacity, Image, Alert } from "react-native";
import useTheme from "../appStyles/useTheme";
import { viewTemplateStyle as viewTemplate_style } from "./viewTemplate.style";


export const ViewTemplate = ({ navigation, data, index, handleExitView, location, screen }) => {
    const theme = useTheme();
    const viewTemplatestyle = useThemedStyles(viewTemplate_style);
    const [expanded, setExpanded] = useState(false);
    console.log('data', data);

    const toggleExpansion = () => {
        setExpanded(!expanded);
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
        if(screen === 'memory')
        {
            editScreen = 'EditMemory';
        }
        else if(screen === 'journal')
        {
            editScreen = 'EditEntry';
            
        }
        else{
            Alert.alert('Error with navigation');
            return;
        }

        navigation.navigate(editScreen, { data, screen, handleExitView });
    };

    return (
        <Card key={index} style={viewTemplatestyle.card}>
            <Card.Content>
                <TouchableOpacity onPress={() => handleView()}>
                    <Title style={viewTemplatestyle.title}>{data.Title}</Title>
                    <Subheading style={viewTemplatestyle.subheading}>Created: {formatDate(data.DateCreated)}</Subheading>
                    {screen === 'memory' && (<Subheading style={viewTemplatestyle.subheading}>Marked: {formatDate(data.DateMarked)}</Subheading>)}
                    <Subheading style={viewTemplatestyle.subheading}>Location: {location}</Subheading>
                    <Paragraph style={{color: theme.colors.TEXT}} numberOfLines={expanded ? undefined : 1}>{data.Text}</Paragraph>
                    {data.Image && expanded && (
                        <Image style={{ height: 200, width: 200 }} source={{ uri: data.Image }} />
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