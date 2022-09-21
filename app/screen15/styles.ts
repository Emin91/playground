import {StyleSheet} from 'react-native';

export const getStyle = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: 'white',
    },
    contentWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    textWrapper: {
      width: "100%",
      height: 40,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    selectedMenuText: {
      fontSize: 34,
      color: "#212135",
    },
    tabBarWrapper: {
      width: "100%",
      height: 60,
      borderWidth: 1,
      borderColor: '#EDEDED',
      flexDirection: "row",
    },
    buttonWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 14,
      color: "#212135",
      textAlign: "center"
    }
  });
  return styles;
};
