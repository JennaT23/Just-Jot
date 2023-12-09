import { StyleSheet } from "react-native";

export const profileStyle = (theme) => StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.BACKGROUND,
    },
    input: {
        backgroundColor: theme.colors.SPACE,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    fieldContainer: {
        width: 250,
        marginTop: 15,
    },
    userInfo: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40,
    },
    button: { 
        backgroundColor: theme.colors.BUTTON_COLOR,
        width: 150,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 50,
    },
    buttonText: {
        color: theme.colors.BUTTON_TEXT,
        fontWeight: '700',
        fontSize: 20,
    },
    profileImageContainer: {
        width: '100%',
        justifyContent: 'flex-end',
    },
    profileImage: {
        width: '100%',
        height: 110,
    },
    iconButton: {
    //    position: 'absolute',
    //    alignSelf: 'flex-end',
    },
    iconContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        margin: 40,
    },
    PassButton: {
        backgroundColor: theme.colors.BUTTON_COLOR,
        width: 150,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    }
})