import { Dimensions, StyleSheet } from 'react-native';

export const getStyle = (activeColor: string) => {
    const bgColor = "black";
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
            backgroundColor: bgColor,
        },
        statusWrapper: {
            flexDirection: 'row',
            alignItems: "center",
            width: "100%",
            height: 70,
            justifyContent: "space-between",
        },
        line: {
            height: 3,
            width: "100%",
            backgroundColor: "#16a085",
            position: "absolute",
            borderRadius: 5,
            overflow: "hidden"
        },
        innerDot: {
            backgroundColor: activeColor, 
            borderRadius: 30,
            borderWidth: 2,
            borderColor: "white"
        },
        dot: {
            height: 20,
            width: 20,
            borderWidth: 4,
            borderColor: bgColor,
            backgroundColor: "#16a085",
            borderRadius: 100,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center"
        },
        activeLine: {
            height: "100%",
            width: "100%",
            borderRadius: 5,
            backgroundColor: activeColor,
        },
        btns: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
        },
        labelWrapper: {
            width: "100%",
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        label: {
            color: "white",
            fontSize: 12,
        },
        prop: {
            marginBottom: 20,
            width: 100,
            textAlign: "center"
        }
    });
    return styles;
};
