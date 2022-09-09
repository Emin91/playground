import {StyleSheet} from 'react-native';

export const getStyle = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'white',
    },
    box: {
      width: 150,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "green"
    },
    text: {
      fontSize: 10,
      textAlign: "center"
    }
  });
  return styles;
};
