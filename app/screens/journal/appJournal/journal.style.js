import { StyleSheet } from "react-native";

export const appJournalStyle = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 12, // padding to adjust space between buttons
    },
    card: {
        padding: 5,
        margin: 5,
        elevation: 1,
        backgroundColor: theme.colors.SPACE,

    },
    journalTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: -10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: theme.colors.TEXT
    },
    subheading: {
        color: theme.colors.SUBHEADING,
    },
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.BUTTON_COLOR,
        // color: theme.colors.TEXT,
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // flex: 1,
    },

    iconButton: {
        // marginHorizontal: 5,
        // marginVertical: 5,
        color: theme.colors.TEXT,
        borderRadius: 30,
        // tintColor: '#fff',
        backgroundColor: theme.colors.BUTTON_COLOR,
    },
    filterDropdown: {
        height: 40,
        width: 150,
        marginRight: 10,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: theme.colors.ACCENT,
        borderRadius: 9,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.SPACE,
    },
    searchBar: {
        flex: 1,
        paddingVertical: 8,
    },
})