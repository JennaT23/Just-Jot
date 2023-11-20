import { appJournalStyle as appJournal_style } from "./journal.style";
import useThemedStyles from "../../../../appStyles/useThemedStyles";
import { useState } from "react";
import { Card, Title, Subheading, Paragraph } from "react-native-paper";
import { TouchableOpacity, Image } from "react-native";
import useTheme from "../../../../appStyles/useTheme";

export const JournalEntry = ({ navigation, entry, index, handleExitView, title, date, location, text, image }) => {
    const theme = useTheme();
    const appJournalstyle = useThemedStyles(appJournal_style);
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    const handleView = (entry) => {
        navigation.navigate("ViewEntry", { entry, handleExitView });
    };

    return (
        <Card key={index} style={appJournalstyle.card}>
            <Card.Content>
                <TouchableOpacity onPress={() => handleView(entry)}>
                    <Title style={appJournalstyle.title}>{title}</Title>
                    <Subheading style={appJournalstyle.subheading}>{date}</Subheading>
                    <Subheading style={appJournalstyle.subheading}>Location: {location}</Subheading>
                    <Paragraph style={{ color: theme.colors.TEXT }} numberOfLines={expanded ? undefined : 1}>{text}</Paragraph>
                    {image && expanded && (
                        <Image style={{ height: 200, width: 200 }} source={{ uri: image }} />
                    )}
                    {!expanded && (
                        <TouchableOpacity onPress={toggleExpansion}>
                            <Subheading style={{ color: theme.colors.SUBHEADING }}>Show more...</Subheading>
                        </TouchableOpacity>
                    )}
                    {expanded && (
                        <TouchableOpacity onPress={toggleExpansion}>
                            <Subheading style={{ color: theme.colors.SUBHEADING }}>Show less...</Subheading>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </Card.Content>
        </Card>
    );
}