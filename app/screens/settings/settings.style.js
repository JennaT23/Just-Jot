import { StyleSheet } from "react-native";

export const settingsStyle = theme => StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f1f1f',
    },
    section: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    sectionHeader: {
        padding: 8,
        paddingLeft: 12,
    },
    sectionBody: {
        borderRadius: 12,
        shadowColor: 'rgba(0,0,0,0.25)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    profileContainer: {
        padding: 12,
        backgroundColor: theme.colors.SPACE,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileInfo: {
        flexDirection: 'row',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        marginRight: 12,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.TEXT,
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: '400',
        color: theme.colors.SUBHEADING,
    },
    profileAction: {
        marginTop: 16,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        borderRadius: 12,
    },
    profileActionText: {
        marginRight: 8,
        fontSize: 15,
        fontWeight: '600',
        color: theme.colors.TEXT,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingRight: 12,
        paddingBottom: 10,
        paddingLeft: 0,
    },
    rowFirst: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    rowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    rowWrapper: {
        paddingLeft: 16,
        backgroundColor: theme.colors.SPACE,
        borderTopWidth: 0.8,
        borderColor: theme.colors.BACKGROUND,
    },
    rowLabel: {
        fontSize: 17,
        color: theme.colors.TEXT,
    },
    rowValue: {
        fontSize: 17,
        color: '#ababab',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    dropdown: {
        borderWidth: 1,
        padding: 8,
        marginTop: 5,
        borderRadius: 5,
        borderBlockColor:"transparent"
    },
    dropdownTextStyle: {
        fontSize: 18,
        margin: 1,
        backgroundColor: '#fff'
    },
    selectedColor: {
        fontSize: 16,
        color: theme.colors.SUBHEADING
    },
    iconButton: {
       
    },
    deleteButton: {
        backgroundColor: theme.colors.DELETE,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: theme.colors.BUTTON_TEXT,
        fontWeight: '700',
        fontSize: 20,
    },
})