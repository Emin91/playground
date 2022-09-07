import React, { FC, useMemo, memo, useEffect } from "react";
import { useWindowDimensions, View, Text, TouchableOpacity } from "react-native";
import Animated, { AnimateProps, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Circle, CircleProps } from "react-native-svg";
import { getStyle } from "./styles";


interface Props {
}

export const Screen_12: FC<Props> = memo(({ }: Props) => {
    const styles = useMemo(() => getStyle(), []);
    const progress = useSharedValue(0);
    const { width, height } = useWindowDimensions();
    const Circle_Length = 1000;
    const Radius = Circle_Length / (2 * Math.PI);
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const animatedProps = useAnimatedProps<AnimateProps<CircleProps>>(() => ({
        strokeDashoffset: Circle_Length * (1 - progress.value)
    }));

    const getRandomValue = () => {
        const value = Number(Math.random().toFixed(1));
        progress.value = withTiming(value, { duration: 600 });
    };

    useEffect(() => {
        getRandomValue();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Svg>
                    <AnimatedCircle
                        cx={width / 2}
                        cy={height / 3}
                        r={Radius}
                        stroke="#2c3e50"
                        strokeDasharray={Circle_Length}
                        strokeLinecap="round"
                        animatedProps={animatedProps}
                        strokeWidth={30}
                    />
                </Svg>
            </View>
            <TouchableOpacity onPress={getRandomValue} style={styles.button}>
                <Text>Get random value</Text>
            </TouchableOpacity>
        </View>
    );
});
