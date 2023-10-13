import { StyleSheet } from "react-native"

export const registerstyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#c8b9e4"
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#fceae3',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {                                // login button
        backgroundColor: "#805dc0",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {                        // text on the button (login button so far)
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 20,
    },
    // logo: {                          // size of the logo, uncomment when logo inserted, can change styling to logo here
    //     width: 350, 
    //     height: 200, 
    // },
    forgotPassword: {
        padding: 10,
        textDecorationLine: 'underline',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end'
    },
    clickableText: {
        padding: 15,
        textDecorationLine: 'underline',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        justifyContent: 'center',
        textAlign: 'center'
    },
})