import { StyleSheet } from "react-native";

export const appJournalStyle = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND,
        // padding: 10,
        // paddingTop: 0,
        margin: 0,
        //alignItems: 'center',
    },
    headingContainer: {
        backgroundColor: theme.colors.HEADING,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        // height: '35%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 35,
        marginTop: -30,
        marginBottom: 45,
    },
    header: {
        position: 'absolute',
        marginTop: 110,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16, 
        marginBottom: 10,
      },
    scrollView: {
        padding: 16,
        paddingTop: 0,
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
        marginBottom: 20,
        //marginTop:-10,
    },
    journalMessage: {
        fontSize: 14,
        textAlign: 'center',
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
        // height: 40,
        width: 150,
        // marginRight: 10,
        marginLeft: -80,
        marginTop: 60,
        position: 'absolute',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
        //borderWidth: 1,
        //borderColor: "#ffffff",//theme.colors.ACCENT,
        borderRadius: 9,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.SPACE,
      },
    searchBar: {
        flex: 1,
        paddingVertical: 8,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 10,
        backgroundColor: theme.colors.BACKGROUND,
        borderRadius: 20,
        padding: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },
    openButton: {
        backgroundColor: theme.colors.BUTTON_COLOR,
        borderRadius: 20,
        padding: 15,
        margin: 7,
        elevation: 0
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    sortButton: {
        borderRadius: 10,
    },
})
