import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 12,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d2d2d2",
        },
        inputWrapper: {
            width: "100%",
            height: 55,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#242424"
        },
        input: {
            padding: 0,
            width: "100%",
            height: "100%",
            paddingLeft: 12,
            paddingRight: 60,
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
        },
        torch: {
            position: "absolute",
            zIndex: 1,
            right: 0,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
            borderTopRightRadius: 12,
            borderBottomEndRadius: 12,
            backgroundColor: "#242424",
        },
        flashLight: {
            height: 20,
            right: 0,
            shadowColor: "white",
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 4,
            paddingVertical: 12,
            position: "absolute",
        },
        passPowerWrapper: {
            width: "100%",
            height: 40,
        },
        passPower: {
            width: "100%",
            height: 10,
            borderRadius: 100,
            backgroundColor: "#242424",
        },
        passPowerFill: {
            width: "10%",
            position: "absolute",
            borderRadius: 100,
            zIndex: 1,
            height: 10,
            backgroundColor: "green",
        },
    });
    return styles;
};
