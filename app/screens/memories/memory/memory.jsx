import { Paragraph } from "react-native-paper";
import { appJournalStyle as appJournal_style } from "../../journal/appJournal/journal.style";
import useThemedStyles from "../../../../appStyles/useThemedStyles";
import { useState } from "react";
import { Card, Title, Subheading } from "react-native-paper";
import { TouchableOpacity, Image } from "react-native";
import useTheme from '../../../../appStyles/useTheme';


export const Memory = ({ navigation, memory, index, handleExitView, title, dateCreated, dateMarked, location, text, image }) => {
    const theme = useTheme();
    const appJournalstyle = useThemedStyles(appJournal_style);
    const [expanded, setExpanded] = useState(false);
    const [newMemory, setNewMemory] = useState(memory);
    console.log('new memory', newMemory);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    const handleView = (newMemory) => {
        navigation.navigate("ViewMemory", { newMemory, handleExitView });
    };

    return (
        <Card key={index} style={appJournalstyle.card}>
            <Card.Content>
                <TouchableOpacity onPress={() => handleView(newMemory)}>
                    <Title style={appJournalstyle.title}>{title}</Title>
                    <Subheading style={appJournalstyle.subheading}>Created: {dateCreated}</Subheading>
                    <Subheading style={appJournalstyle.subheading}>Marked: {dateMarked}</Subheading>
                    <Subheading style={appJournalstyle.subheading}>Location: {location}</Subheading>
                    <Paragraph style={{color: theme.colors.TEXT}} numberOfLines={expanded ? undefined : 1}>{text}</Paragraph>
                    {image && expanded && (
                        <Image style={{ height: 200, width: 200 }} source={{ uri: image }} />
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