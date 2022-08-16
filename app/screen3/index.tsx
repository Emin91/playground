import React, { FC, useMemo, memo, useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import Slider from "@react-native-community/slider";
import { getStyle } from "./styles";

interface Props {
    navigation: StackNavigationProp<any>;
}

export const Screen_3: FC<Props> = memo(({ }: Props) => {
    const fntSize = useSharedValue(10);
    const innerHeight = useSharedValue(50);
    const bgColor = useSharedValue(0);
    const width = useSharedValue(8);
    const height = useSharedValue(200);
    const [isSliding, setIsSliding] = useState(false);
    const { width: screenWidth } = Dimensions.get("screen");
    const translateX = useSharedValue(screenWidth / 1.1);
    const [volume, setVolume] = useState(20);
    const styles = useMemo(() => getStyle(), []);

    const mainWrapperStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
            width: width.value,
            transform: [
                { translateX: translateX.value }
            ],
        }
    });

    const innerWrapperStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(bgColor.value, [80, 100], ["#ededed", "#ed3424"])
        return {
            height: `${innerHeight.value}%`,
            backgroundColor,
        }
    });

    const textWrapperStyle = useAnimatedStyle(() => {
        return {
            fontSize: fntSize.value
        }
    });

    const onSliderActive = (state: "Start" | "Stop") => {
        setIsSliding(state === "Start")
        fntSize.value = withTiming(state === "Start" ? 20 : 10);
        height.value = withSpring(state === "Start" ? 300 : 200, { stiffness: 70 });
        width.value = withSpring(state === "Start" ? 40 : 8, { stiffness: 70 });
        translateX.value = withSpring(screenWidth / (state === "Start" ? 1.3 : 1.1), { stiffness: 70 });
    };

    const onValueChange = (value: number) => {
        setVolume(value);
    };

    useEffect(() => {
        innerHeight.value = withSpring(volume, { stiffness: 70, overshootClamping: true });
        bgColor.value = withTiming(volume)
    }, [volume]);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Animated.View style={[styles.sliderWrapper, mainWrapperStyle]}>
                    <Animated.View style={[styles.sliderInnerWrapper, innerWrapperStyle]} />
                    <Animated.Text style={[styles.title, textWrapperStyle]}>{isSliding ? volume : ""}</Animated.Text>
                </Animated.View>
            </View>
            <View style={styles.actionButtons}>
                <Slider
                    thumbTintColor="white"
                    step={1}
                    value={0}
                    minimumValue={0}
                    maximumValue={100}
                    onSlidingStart={() => onSliderActive("Start")}
                    onSlidingComplete={() => onSliderActive("Stop")}
                    minimumTrackTintColor="#168df5"
                    maximumTrackTintColor="#a6a6a6"
                    style={{ width: "100%", height: 40 }}
                    onValueChange={(v) => onValueChange(v)}
                />
            </View>
        </View>
    );
});
