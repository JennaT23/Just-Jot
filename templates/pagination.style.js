import { StyleSheet } from 'react-native';

export const paginationStyle = (theme) => StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
      },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'stretch',
        padding: 10,
    },
    pageText: {
        alignSelf: 'center',
        color: theme.colors.TEXT,
    },
    previousText: {
        alignContent:'flex-start',
        color:theme.colors.TEXT,
        textDecorationLine: 'underline',
    },
    nextText: {
        alignSelf: 'flex-end',
        color:theme.colors.TEXT,
        textDecorationLine: 'underline',
    },
})
