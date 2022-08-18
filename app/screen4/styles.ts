import { Dimensions, StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'black',
        },
        line1: {
            height: 1,
            position: "absolute",
            width: "100%",
            backgroundColor: "#044bd6"
        },
        line2: {
            height: "100%",
            position: "absolute",
            width: 1,
            backgroundColor: "#044bd6"
        },
        box1: {
            height: 10,
            width: 10,
            borderRadius: 2,
            position: "absolute",
            backgroundColor: "#044bd6",
        },
        box2: {
            height: 10,
            width: 10,
            borderRadius: 2,
            position: "absolute",
            backgroundColor: "#044bd6",
        },
        mainBox: {
            width: 100,
            height: 100,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#044bd6",
            position: "absolute"
        },
        text: {
            fontSize: 16,
            color: "white",
        },
        contentContainer: {
            flex: 1,
            paddingHorizontal: 10,
        },
        menuItem: {
            backgroundColor: "#d2d2d2",
            borderRadius: 12,
            marginBottom: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: "center",
            flexDirection: "row",
        }
    });
    return styles;
};
