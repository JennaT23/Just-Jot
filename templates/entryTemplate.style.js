import { StyleSheet } from "react-native";

export const entryTemplatestyle = theme => StyleSheet.create({
    dateText: {
        padding: 10,
        fontSize: 15,
        flex: 1,
        // backgroundColor: '#f5e9c1',
        textAlign: 'left',
        marginTop: 5
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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: "row",
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
    
})