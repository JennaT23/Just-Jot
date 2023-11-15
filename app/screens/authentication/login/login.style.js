import { Platform, StyleSheet } from "react-native"

const font = () => {
    if(Platform.OS === 'android')
    {
        return 'serif';
    }
    else if(Platform.OS === 'ios')
    {
        return 'Georgia';
    }
}

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
        height: 90,
        paddingLeft: 20,
    },
    appName: {
        fontSize: 30,
        marginTop: -10,
        fontFamily: font(),
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 80,
    },
})