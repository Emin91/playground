import { Dimensions, StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black',
        },
        sliderWrapper: {
            position: "absolute",
            borderRadius: 16,
            bottom: Dimensions.get("screen").height / 3.5,
            backgroundColor: "#333333",
            justifyContent: "flex-end",
        },
        title: {
            position: "absolute",
            alignSelf: "center",
            bottom: 5,
        },
        sliderInnerWrapper: {
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
        },
        actionButtons: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
        },
    });
    return styles;
};
