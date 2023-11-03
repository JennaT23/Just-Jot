import { StyleSheet } from "react-native";

export const entryTemplatestyle = theme => StyleSheet.create({
    dateText: {
        padding: 10,
        fontSize: 15,
        flex: 1,
        marginBottom: 5,
        // backgroundColor: '#f5e9c1',
    },
    cardText: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        margin: 5,
        padding: 10,
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
        alignItems: 'baseline',
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
        // backgroundColor: theme.colors.BACKGROUND,
    },
    camera: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    cameraContainer: {
        display: 'flex',
    },

})