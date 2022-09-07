import { StyleSheet } from 'react-native';

export const getStyle = (sliderWidth: number, progressHeight: number, sliderColor: string, pickerSize: number) => {
    const styles = StyleSheet.create({
        container: {
            width: sliderWidth,
            height: progressHeight,
            borderRadius: 100,
            backgroundColor: sliderColor
        },
        progress: {
            height: progressHeight,
            position: "absolute",
            zIndex: 1,
            borderRadius: 100,
            backgroundColor: "red"
        },
        knob: {
            width: progressHeight,
            height: progressHeight,
            borderRadius: progressHeight,
            position: "absolute",
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "orange"
        }
    });
    return styles;
};