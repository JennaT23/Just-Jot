import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";

export const editTemplatestyle = (theme) =>
  StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.BACKGROUND,
    },
    toolBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        columnGap: -20,
        backgroundColor: theme.colors.BACKGROUND,
        height: 40,
        marginBottom: 10,
    },
    help: {
        flex: 1,
        // height: '100%',
    },
    content: {
        // marginBottom: 50,
        marginTop: 30,
        padding: 5,
        // paddingBottom: 50,
        flex: 1,
        width: '100%',
        height: '100%',
    },
    card: {
        marginBottom: 10,
        flex: 1,
        height: '100%',
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
        flexGrow: 1,
    },
    scrollContainer: {
        borderColor: theme.colors.TEXTBOXBORDER,
        backgroundColor: theme.colors.CARD_BACKGROUND,
        borderWidth: 2,
        marginLeft: 3,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 5,
        flex: 1,
        height: '100%',
        width: '100%',
    },
    entryContainer: {
        flex: 1,
        alignItems: 'flex-start',
        width: '100%',
    },
    entry: {
        flex: 1,
    },
    entryText: {
        textAlignVertical: 'top',
        flex: 1,
    },
  })