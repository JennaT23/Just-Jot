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
    profile: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex',
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
        color: '#000',
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: '400',
        color: '#858585',
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
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 12,
        paddingRight: 12,
        paddingBottom: 12,
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
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
    },
    rowLabel: {
        fontSize: 17,
        color: '#000',
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
        margin: 1
    },
    selectedColor: {
        fontSize: 16,
        color:"#999DA0"
    },
})