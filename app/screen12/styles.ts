import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#34495e",
        },
        button: {
            width: "100%",
            paddingVertical: 20,
            backgroundColor: "#2c3e50",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50
        }
    });
    return styles;
};
