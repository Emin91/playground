import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#d2d2d2",
        },
        canvas: {
            height: "280",
            width: "100%",
            backgroundColor: "#FEFEFE",
        },
        serverStoped: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    });
    return styles;
};
