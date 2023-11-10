import { StyleSheet } from "react-native";

export const viewEntryStyle = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND,
    },
    view: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    subheading: {
        color: theme.colors.SUBHEADING,
    },
    text: {
        fontSize: 18,
    },
    deleteButton: {

    },
})