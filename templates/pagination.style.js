import { StyleSheet } from 'react-native';

export const paginationStyle = (theme) => StyleSheet.create({
    containerLayout: {
        flex: 'column',
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
      },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-end',
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
