import { StyleSheet } from "react-native";

export const appHomeStyle = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND,
    },
    card: {
        padding: 5,
        margin: 5,
    },
    title: {
        fontWeight: 'bold'
    },
    subheading: {
        color: theme.colors.SUBHEADING,
    },
    fab: {
        position: 'absolute',
        bottom: 25,
        right: 20,
        alignSelf: 'center',
    }
})