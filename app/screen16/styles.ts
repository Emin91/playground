import { StyleSheet } from 'react-native';

export const getStyle = (isLightMode: boolean) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    imageBox: {
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    button: {
      width: 70,
      height: 70,
      backgroundColor: "orange",
      position: "absolute",
      bottom: 10,
      right: 10,
      borderRadius: 70,
    },
    labelWrapper: {
      position: "absolute",
      zIndex: 10,
      top: 10,
      left: 10,
      right: 10,
      borderRadius: 8,
      paddingVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isLightMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 1)"
    },
    state: {
      fontSize: 20,
      color: !isLightMode ? "black" : "white"
    }
  });
  return styles;
};
