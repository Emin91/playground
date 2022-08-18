import React, { FC, useMemo, memo, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Animated, { FlipInEasyY, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { getStyle } from "./styles";

interface Props {
    navigation: StackNavigationProp<any>;
}

export const Screen_6: FC<Props> = memo(({ }: Props) => {
    const rotateY = useSharedValue(0);
    const styles = useMemo(() => getStyle(), []);
    const [isFront, setIsFront] = useState(true);

    const animStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(rotateY.value, [90, 180], ["#d3d3d3", "green"]);
        return {
            backgroundColor,
            transform: [
                { rotateY: `${rotateY.value}deg` }
            ]
        }
    }, []);

    const onPressCard = () => {
        setIsFront(!isFront);
        rotateY.value = withTiming(isFront ? 180 : 0, { duration: 1500 });
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <TouchableOpacity onPress={onPressCard}>
                    <Animated.View entering={FlipInEasyY.duration(800)} style={[styles.cardWrapper, animStyle]} />
                </TouchableOpacity>
            </View>
        </View>
    );
});
