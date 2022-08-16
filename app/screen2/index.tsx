import React, { FC, useMemo, memo } from "react";
import { View, Text, Button } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import MaskedView from '@react-native-masked-view/masked-view';
import { getStyle } from "./styles";

interface Props {
    navigation: StackNavigationProp<any>;
}

export const Screen_2: FC<Props> = memo(({ }: Props) => {
    const redOpacity = useSharedValue(0);
    const blueOpacity = useSharedValue(0);
    const styles = useMemo(() => getStyle(), []);

    const redAnimStyle = useAnimatedStyle(() => {
        return {
            shadowRadius: redOpacity.value
        }
    });

    const blueAnimStyle = useAnimatedStyle(() => {
        return {
            shadowRadius: blueOpacity.value
        }
    });

    const onStart = () => {
        redOpacity.value = withDelay(0, withRepeat(withTiming(40, { duration: 150 }), Infinity, true));
        blueOpacity.value = withDelay(200, withRepeat(withTiming(40, { duration: 150 }), Infinity, true));
    };

    const onReset = () => {
        redOpacity.value = withTiming(0, { duration: 300 });
        blueOpacity.value = withTiming(0, { duration: 500 });
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.lightsWrapper}>
                    <Animated.View style={[styles.leftLight, redAnimStyle]}>
                        <MaskedView
                            style={[styles.leftLight, { borderWidth: 2 }]}
                            maskElement={<View style={[styles.leftLight, { borderTopLeftRadius: 45 }]} />}>
                            <View style={styles.maskedView}>
                                {new Array(66).fill(1).map((_, index) => (
                                    <View key={index} style={styles.dots} />
                                ))}
                            </View>
                        </MaskedView>
                    </Animated.View>
                    <Animated.View style={styles.middleWrapper}>
                        <View style={styles.linesWrapper}>
                            {new Array(6).fill(1).map((item, index) => (
                                <View key={index} style={styles.lines} />
                            ))}
                        </View>
                        <Text style={styles.title}>POLICE</Text>
                    </Animated.View>
                    <Animated.View style={[styles.rightLight, blueAnimStyle]}>
                        <MaskedView
                            style={[styles.rightLight, { borderWidth: 2 }]}
                            maskElement={<View style={[styles.rightLight, { borderTopRightRadius: 45 }]} />}>
                            <View style={styles.maskedView}>
                                {new Array(66).fill(1).map((_, index) => (
                                    <View key={index} style={[styles.dots, { backgroundColor: "rgba(255, 255, 255, 0.05)" }]} />
                                ))}
                            </View>
                        </MaskedView>
                    </Animated.View>
                </View>
                <View style={styles.bottomLineWrapper} />
            </View>
            <View style={styles.actionButtons}>
                <Button title="start" onPress={onStart} />
                <Button title="reset" onPress={onReset} />
            </View>
        </View>
    );
});
