import { StyleSheet } from "react-native"

export const appstyle = theme => StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.BACKGROUND,
    },
    settingsContainer: {
        backgroundColor: theme.colors.BACKGROUND,
        flex: 1,
    },
    input: {
        backgroundColor: theme.colors.SPACE,
        // textShadowColor: theme.colorS.SUBHEADING,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    button: {                                // login button
        backgroundColor: theme.colors.BUTTON_COLOR,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {                        // text on the button (login button so far)
        color: theme.colors.BUTTON_TEXT,
        fontWeight: '700',
        fontSize: 20,
    },
    // logo: {                          // size of the logo, uncomment when logo inserted, can change styling to logo here
    //     width: 350, 
    //     height: 200, 
    // },
    text: {
        color: theme.colors.TEXT,
    },

    headerText: {
        fontSize: 13,
        fontWeight: '500',
        color: theme.colors.TEXT,
        textTransform: 'uppercase',
    },

    clickableText: {
        padding: 10,
        textDecorationLine: 'underline',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: -20,
        marginBottom: 15,
        justifyContent: 'center',
        textAlign: 'center'
    },
});