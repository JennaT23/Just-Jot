import { StyleSheet } from "react-native"
import spacingInstance from "react-native-ui-lib/src/style/spacings"

export const newEntrystyle = theme => StyleSheet.create({
    noteBodyContainer: {
        flex: 1,
        borderTopWidth: 1,
        //borderColor: '#b5b5b5',
    },
    noteBody: {
        textAlignVertical: 'top',
        // backgroundColor: '#fcf6e1',
        flex: 1,
        fontSize: 18,
        color: theme.colors.TEXT,
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
    },
    toolBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        columnGap: -20,
        backgroundColor: theme.colors.BACKGROUND,
        alignContent: "space-between"
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
        color: theme.colors.TEXT,
    },
    iconButton: {
        marginHorizontal: 5,
    },
    
})