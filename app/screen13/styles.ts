import {StyleSheet} from 'react-native';

export const getStyle = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    textWrapper: {
      position: 'absolute',
      width: '100%',
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textBackground: {
        width: "95%",
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    text: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        textShadowColor: "black",
        textShadowOffset: {width: 2, height:2},
        textShadowRadius: 6,
    }
  });
  return styles;
};
