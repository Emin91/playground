import { StyleSheet } from 'react-native';

export const getStyle = (isActive: boolean) => {
    const styles = StyleSheet.create({
        container: {
            width: 49,
            height: 32,
            padding: 3,
            borderRadius: 16,
            overflow: 'hidden',
            justifyContent: 'center',
            backgroundColor: !isActive ? "#a6a6a6" : "#168df5",
        },
        switchButton: {
            width: 26,
            height: 26,
            borderWidth: 2,
            borderRadius: 20,
            borderColor: "white",
            backgroundColor: "white",
            alignSelf: isActive ? 'flex-end' : 'flex-start',
        },
    });
    return styles;
};