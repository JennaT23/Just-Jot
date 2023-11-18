import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";

export const editTemplatestyle = (theme) =>
  StyleSheet.create({
    pageContainer: {
        flex: 1,
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.BACKGROUND,
    },
    toolBar: {
        // width: '95%',
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        columnGap: -20,
        backgroundColor: theme.colors.BACKGROUND,
        // height: 40,
        // marginBottom: 10,
        // paddingBottom: 10,
        // borderBottomWidth: 2,
        // borderBottomColor: theme.colors.SEPARATIONLINE,
        marginLeft: 10,
        marginRight: 10,
        paddingRight: 5,
        // borderColor: theme.colors.SEPARATIONLINE,
        // borderWidth: 2,
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.SEPARATIONLINE,
        borderRadius: 5,
    },
    help: {
        // flex: 1,
        // height: '100%',
        // flexGrow: 1,
        // minHeight: '55%',
    },
    content: {
        // marginBottom: 50,
        marginTop: 30,
        padding: 5,
        paddingTop: 25,
        // paddingBottom: 60,
        // flex: 1,
        width: '100%',
        height: '90%',
        // height: '100%',
        minHeight: '90%',
    },
    card: {
        // marginBottom: 10,
        // flex: 1,
        height: '90%',
        // height: '80%',
        minHeight: 450,
        // height: '100%',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: theme.colors.CARD_BACKGROUND,
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
        // flexGrow: 1,
        // maxHeight: 200,
        // height: '50%',
        // paddingBottom: 30,
        minHeight: '55%',
    },
    scrollContainer: {
        borderColor: theme.colors.TEXTBOXBORDER,
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderWidth: 2,
        marginLeft: 3,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 5,
        // flex: 1,
        height: '55%',
        // maxHeight: '55%',
        // minHeight: '55%',
        maxHeight: 200,
        width: '100%',
    },
    entryContainer: {
        // flex: 1,
        // height: '80%',
        alignItems: 'flex-start',
        // minHeight: '55%',
        // width: '100%',
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
  })