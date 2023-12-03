import { StyleSheet } from 'react-native';

export const paginationStyle = (theme) => StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16,
        paddingTop: 1,
      },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
        paddingBottom: 10,
    },
    pageText: {
        fontSize: 14,
        alignSelf: 'center',
        color:theme.colors.TEXT,
    },
    moveButton: {
        color:theme.colors.TEXT,
    },
})
