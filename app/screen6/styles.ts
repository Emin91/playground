import { Dimensions, StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
        },
        cardWrapper: {
            width: 350,
            height: 180,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d3d3d3"
        }
    });
    return styles;
};
