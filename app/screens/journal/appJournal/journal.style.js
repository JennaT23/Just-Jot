import { StyleSheet } from "react-native";

export const appJournalStyle = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND,
        padding: 16,
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
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
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
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // flex: 1,
    },
    searchIcon: {
        backgroundColor: theme.colors.BACKGROUND,
    },

    iconButton: {
        // marginHorizontal: 5,
        // marginVertical: 5,
        // color: '#fff',
        tintColor: '#fff',
        backgroundColor: theme.colors.BUTTON_COLOR,
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
        backgroundColor: theme.colors.BACKGROUND,
        margin: 'auto',
        height: 50,
        
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,  will uncomment when i get the modal window size to change
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