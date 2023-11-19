import { StyleSheet } from "react-native";

export const viewTemplateStyle = (theme) => StyleSheet.create({
    card: {
        margin: 5,
        elevation: 1,
        backgroundColor: theme.colors.SPACE,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: theme.colors.TEXT,
        marginTop: 0,
        paddingTop: 0,
    },
    subheading: {
        color: theme.colors.SUBHEADING,
    },
    iconContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "flex-end",
        columnGap: -20,
        marginTop: -20,
        marginBottom: -15,
        marginRight: -10,
    },
    iconButton: {
        marginHorizontal: 5,
    },
})