import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";

export const editTemplateStyle = (theme) => StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.BACKGROUND,
    },
    toolBar: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        columnGap: -20,
        backgroundColor: theme.colors.BACKGROUND,
        marginLeft: 10,
        marginRight: 10,
        paddingRight: 5,
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.SEPARATIONLINE,
        borderRadius: 5,
    },
    content: {
        marginTop: 30,
        padding: 5,
        paddingTop: 25,
        width: '100%',
        height: '90%',
        minHeight: '90%',
    },
    card: {
        height: '90%',
        minHeight: 450,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: theme.colors.SPACE,
    },
    textBox: {
        borderColor: theme.colors.TEXTBOXBORDER,
        borderWidth: 2,
        marginLeft: 3,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 5,
        height: 35,
        width: '100%',
    },
    titleContainer: {
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    label: {
        fontSize: 18,
    },
    dateContainer: {
        marginBottom: 5,
        alignItems: 'flex-start',
    },
    textInput: {
        color: theme.colors.TEXT,
        fontSize: 18,
    },
    scrollView: {
        minHeight: '55%',
    },
    scrollContainer: {
        borderColor: theme.colors.TEXTBOXBORDER,
        backgroundColor: theme.colors.SPACE,
        borderWidth: 2,
        marginLeft: 3,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 5,
        height: '55%',
        maxHeight: 200,
        width: '100%',
    },
    entryContainer: {
        alignItems: 'flex-start',
    },
    entry: {
        flex: 1,
    },
    entryText: {
        textAlignVertical: 'top',
        flex: 1,
    },
    image: {
        width: 200,
        height: 200,
    },
    searchResults: {
        backgroundColor: '#ccc',
        margin: 5,
        marginTop: -5,
    },
    searchItems: {
        margin: 5,
    },
    iconButton: {
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: theme.colors.BUTTON_COLOR,
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
  })