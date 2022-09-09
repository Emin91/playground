import {StyleSheet} from 'react-native';

export const getStyle = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: 'white',
    },
    tabBarWrapper: {
      width: "100%",
      height: 60,
      flexDirection: "row",
    },
    buttonWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 14,
      color: "white",
      textAlign: "center"
    }
  });
  return styles;
};
