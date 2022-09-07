import React, { FC, useMemo, memo } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { getStyle } from "./styles";


interface Props {
    pickerSize?: number;
    sliderColor?: string;
    progressWidth?: number;
    progressHeight?: number;
}

export const Slider: FC<Props> = memo(({ progressWidth, sliderColor = "#d2d2d2", progressHeight = 40, pickerSize = 40 }: Props) => {
    const { width: scrWidth } = useWindowDimensions();
    const knobScale = useSharedValue(1);
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const isSliding = useSharedValue(false);
    const sliderWidth = progressWidth || scrWidth;
    const styles = useMemo(() => getStyle(sliderWidth, progressHeight, sliderColor, pickerSize), [sliderWidth, progressHeight, sliderColor, pickerSize]);

    const adjustedTranslateX = useDerivedValue(() => {
        return Math.min(Math.max(translateX.value, 0), sliderWidth - progressHeight)
    }, [sliderWidth, progressHeight]);

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(event: any, context: any) {
            context.offsetX = translateX.value;
        },
        onActive(event, context) {
            translateX.value = event.translationX + context.offsetX;
            translateY.value = withSpring(-progressHeight - 5);
            knobScale.value = withSpring(1.2);
        },
        onEnd(event, context) {
            isSliding.value = false;
            translateY.value = withSpring(0);
            knobScale.value = withSpring(1);
        },
    })

    const animStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: knobScale.value },
                { translateY: translateY.value },
                { translateX: adjustedTranslateX.value }
            ]
        }
    })

    return (
        <View>
            <Animated.View style={[styles.container]} />
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.knob, animStyle]}>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
});
