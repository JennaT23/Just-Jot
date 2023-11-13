import { StyleSheet } from "react-native";

export const entryTemplatestyle = theme => StyleSheet.create({
    dateText: {
        padding: 10,
        fontSize: 15,
        flex: 1,
        marginBottom: 5,
        //backgroundColor: '#f5e9c1',
    },
    cardText: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        margin: 5,
        fontSize: 15,
        //backgroundColor: '#f5e9c1',
    },
    textInput: {
        margin: 5,
        padding: 10,
        fontSize: 16,
        flex: 1,
    },
    date: {
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: "row",
        //alignItems: 'baseline',
    },
    search: {
        margin: 5,
        flexDirection: "row",
        //alignItems: 'baseline',
    },
    searchResults: {
        backgroundColor: '#ccc',
        margin: 5,
        marginTop: -5,
    },
    searchItems: {
        margin: 5,
    },
    calendarIcon: {
    },
    selectedImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },
    noCameraAccessContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraButtonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center',
        // alignSelf: 'flex-end',
        // justifyContent: 'flex-end',
        // backgroundColor: theme.colors.BACKGROUND,
    },
    camera: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    cameraContainer: {
        display: 'flex',
    },
    cancelContainer: {
        // position: 'absolute',
        marginTop: 5,
        marginRight: 10,
    },
    cancelButton: {
        color: theme.colors.CAPTURE,
        fontSize: 26,
        alignSelf: 'flex-end',
    },

})