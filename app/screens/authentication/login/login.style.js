import { StyleSheet } from "react-native"


export const loginstyle = theme => StyleSheet.create({
    forgotPassword: {
        padding: 10,
        //textDecorationLine: 'underline',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
    },
    logoImg: {
        flex: 1,
        resizeMode: 'contain',
        transform: [{rotate: '25deg'}],
    },
    logoImgContainer: {
        height: 120,
        paddingLeft: 50,
    },
    appName: {
        fontSize: 30,
        marginTop: -10,
        fontFamily: 'serif',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 80,
    },
})