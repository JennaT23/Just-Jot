import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";

// const screenHeight = Dimensions.get("window").height;
const getHeight = () => {
  const {height, width} = useWindowDimensions();
  return height*(0.6);
}

export const viewEntryStyle = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    view: {
      padding: 15,
    },
    title: {
      marginTop: 5,
      paddingTop: 5,
      fontWeight: "bold",
      fontSize: 22,
      color: theme.colors.TEXT,
    },
    subheading: {
      color: theme.colors.SUBHEADING,
    },
    text: {
      fontSize: 18,
      color: theme.colors.TEXT,
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
        backgroundColor: theme.colors.SPACE,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.BACKGROUND,
        paddingBottom: 10,
      },
    bottomCard: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        backgroundColor: theme.colors.SPACE,
        borderTopWidth: 1,
        borderTopColor:  theme.colors.BACKGROUND,
        // flex: 1,
        height: getHeight(),
      },
    entry: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
    },
  });
