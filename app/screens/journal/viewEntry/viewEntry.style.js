import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";

// const screenHeight = Dimensions.get("window").height;
const getHeight = () => {
  const {height, width} = useWindowDimensions();
  return height*(2/3);
}

export const viewEntryStyle = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: theme.colors.BACKGROUND,
    },
    view: {
      padding: 20,
    },
    title: {
      marginTop: 5,
      paddingTop: 5,
      fontWeight: "bold",
      fontSize: 22,
    },
    subheading: {
      color: theme.colors.SUBHEADING,
    },
    text: {
      fontSize: 18,
    },
    deleteButton: {
      alignItems: "center",
      marginTop: 20,
    },
    deleteButtonText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
      },
    topCard: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: theme.colors.BACKGROUND,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 10,
      },
    bottomCard: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        backgroundColor: theme.colors.BACKGROUND,
        borderTopWidth: 1,
        borderTopColor: '#000000',
        // flex: 1,
        height: getHeight(),
      },
    entry: {
      flex: 1,
    },
  });
