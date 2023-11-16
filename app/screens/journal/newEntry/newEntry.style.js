import { StyleSheet } from "react-native"

export const newEntrystyle = theme => StyleSheet.create({
    noteBodyContainer: {
        flex: 1,
        borderTopWidth: 1,
        //borderColor: '#b5b5b5',
    },
    noteBody: {
        textAlignVertical: 'top',
        //backgroundColor: '#fcf6e1',
        flex: 1,
        fontSize: 18,
    },
    scroll: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
    },
    entryContainer: {
        marginTop: -25,
        backgroundColor: theme.colors.SPACE,
    },
    cardTitle: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        margin: 5,
        padding: 10,
        fontSize: 24,
        // backgroundColor: '#f5e9c1',
        fontWeight: 'bold',
        color: theme.colors.TEXT,
        textDecorationColor: theme.colors.TEXT,
    },
    toolBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        columnGap: -20,
        backgroundColor: theme.colors.BACKGROUND
    },
    saveButton: {
        backgroundColor: theme.colors.SPACE,
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
    iconButton: {
        marginHorizontal: 5,
    },
})