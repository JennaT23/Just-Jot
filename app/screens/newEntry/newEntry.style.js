import { StyleSheet } from "react-native"

export const newEntrystyle = theme => StyleSheet.create({
    noteBodyContainer: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: '#b5b5b5',
        
    },
    noteBody: {
        textAlignVertical: 'top',
        backgroundColor: '#fcf6e1',
        padding: 10,
        flex: 1,
        fontSize: 16,
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
    cardTitle: {
        marginTop: 5,
        padding: 10,
        fontSize: 20,
        backgroundColor: '#f5e9c1',
    
    },
    toolBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        columnGap: -20,
        backgroundColor: theme.colors.BACKGROUND
    },
    saveButton: {
        backgroundColor: theme.colors.PRIMARY,
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