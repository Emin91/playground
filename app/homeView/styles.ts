import { StyleSheet } from "react-native";

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor: "white",
        },
        itemWrapper: {
            width: "100%",
            height: 52,
            marginBottom: 6,
            borderRadius: 8,
            paddingHorizontal: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d2d2d2",
        }
    });
    return styles;
};