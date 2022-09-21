import {StyleSheet} from 'react-native';

export const getStyle = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textShadowColor: "black",
        textShadowOffset: {width: 2, height:2},
        textShadowRadius: 6,
    }
  });
  return styles;
};
