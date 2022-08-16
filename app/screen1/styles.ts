import { StyleSheet } from "react-native";

export const getStyle = (width: number, height: number, borderRadius: number, squareColor: string) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
        },
        square: {
            width,
            height,
            borderRadius,
            shadowColor: squareColor,
            shadowOpacity: 0.8,
            shadowRadius: 50,
            shadowOffset: { width: 0, height: 0 },
            backgroundColor: squareColor,
        },
        contentContainer: {
            flex: 1,
            paddingHorizontal: 10,
        },
        settingsLabel: {
            fontSize: 18,
            lineHeight: 22,
            marginVertical: 10,
            textAlign: "center",
        },
        itemWrapper: {
            width: "100%",
            borderRadius: 8,
            paddingVertical: 4,
            paddingHorizontal: 16,
            marginVertical: 4,
        },
        colorsWrapper: {
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
        },
        colorsItem: {
            width: 50,
            height: 50,
            borderWidth: 4,
            borderColor: "white",
            marginVertical: 10,
            borderRadius: 100,
        },
        checkBoxWrapper: {
            flex: 1
        },
        menuItem: {
            paddingVertical: 4,
            alignItems: "center",
            flexDirection: "row",
        }
    });
    return styles;
};