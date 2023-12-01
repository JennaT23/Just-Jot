import { StyleSheet } from 'react-native';

export const paginationStyle = (theme) => StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
      },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    pageText: {
        alignSelf: 'center',
        color: theme.colors.TEXT,
    },
    buttonText: {
        color:theme.colors.TEXT,
    },
})
