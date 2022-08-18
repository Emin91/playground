import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 50,
            marginBottom: 4,
            paddingHorizontal: 10,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0EBCF2"
        },
        title: {
            flex: 1,
            fontSize: 18,
        },
    });
    return styles;
};
