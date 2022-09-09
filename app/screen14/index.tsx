import React, { FC, useMemo, memo, useState, useEffect } from "react";
import { Text } from "react-native";
import { Gesture, GestureDetector, } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { getStyle } from "./styles";

interface Props { };

export const Screen_14: FC<Props> = memo(({ }: Props) => {
    const styles = useMemo(() => getStyle(), []);
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const savedRotation = useSharedValue(0);
    const bgColor = useSharedValue(0);
    const boxBorderRadius = useSharedValue(10);
    const [isSquare, setIsSquare] = useState(true);

    const rBoxStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 2], [1, 2], Extrapolate.CLAMP);
        const colorPlate = isSquare ? ["#0AD7D1", "#EB1A6E"] : ["#EB1A6E", "#0AD7D1"];
        const backgroundColor = interpolateColor(bgColor.value, [0, 2], colorPlate);
        return {
            backgroundColor,
            borderRadius: boxBorderRadius.value,
            transform: [
                { scale: scaleValue },
                { rotateZ: `${(rotation.value / Math.PI) * 180}deg` }
            ]
        }
    });

    const tapGesture = Gesture.Tap().numberOfTaps(2).onStart(() => {
        runOnJS(setIsSquare)(!isSquare);
        boxBorderRadius.value = withSpring(!isSquare ? 12 : 150, { stiffness: !isSquare ? 40 : 20 });
    });

    const rotationGesture = Gesture.Rotation()
        .onUpdate((e) => {
            rotation.value = withSpring(savedRotation.value + e.rotation, { stiffness: 200 });
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = withSpring(savedScale.value * e.scale, { stiffness: 300 });
            bgColor.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            savedScale.value = withSpring(scale.value);
            bgColor.value = scale.value;
        });

    useEffect(() => {
        alert("Tips: Use rotate and pinch gestures");
    }, []);

    const composedGestures = Gesture.Simultaneous(rotationGesture, pinchGesture, tapGesture);
    return (
        <GestureDetector gesture={composedGestures}>
            <Animated.View style={styles.container}>
                <Animated.View style={[styles.box, rBoxStyle]}>
                    <Text style={styles.text}>Double tap to change {!isSquare ? "square" : "circle"}</Text>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
});
