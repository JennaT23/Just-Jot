import { StyleSheet } from "react-native";

export const appJournalStyle = theme => StyleSheet.create({
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
        bottom: 10,
        right: 20,
        alignSelf: 'flex-end',
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // flex: 1,
    },
    iconButton: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        alignSelf: 'flex-end',
        margin: -10
    },
    modalDropdownOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        textAlign: 'center',
        fontSize: 22,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 'auto',
        height: 50,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,  will uncomment when i get the modal window size to change
      },
})