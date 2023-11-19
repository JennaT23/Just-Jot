import { StyleSheet } from "react-native";

export const viewTemplateStyle = (theme) => StyleSheet.create({
    card: {
        padding: 5,
        margin: 5,
        elevation: 1,
        backgroundColor: theme.colors.SPACE,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: theme.colors.TEXT
    },
    subheading: {
        color: theme.colors.SUBHEADING,
    },
})