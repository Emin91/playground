import React, { FC, useMemo, memo, useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Animated, { Extrapolate, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { getStyle } from "./styles";
import { FlashLightIcon } from "../assets/svg/flashLightIcon";

interface Props {
    navigation: StackNavigationProp<any>;
}

export const Screen_8: FC<Props> = memo(({ }: Props) => {
    const progress = useSharedValue(0);
    const lineWidth = useSharedValue(15);
    const strongWidth = useSharedValue(0);
    const strongLineOpacity = useSharedValue(0);
    const strongLinePaddingTop = useSharedValue(0);
    const [isEnabled, setIsEnabled] = useState(true);
    const [passLength, setPassLength] = useState("");
    const styles = useMemo(() => getStyle(), []);

    const animLightStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(progress.value, [0, 1], ["#242424", "#FFFFFF"])
        return {
            backgroundColor,
            width: `${lineWidth.value}%`,
            shadowOpacity: progress.value
        }
    })

    const animStrongWrapperStyle = useAnimatedStyle(() => {
        return {
            paddingTop: strongLinePaddingTop.value,
            opacity: strongLineOpacity.value
        }
    })

    const animStrongWithStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(strongWidth.value, [0, 4, 4.01, 8, 8.01, 12, 12.01, 16], ["#ff1100", "#ff1100", "#ff8800","#ff8800", "#007dd6", "#007dd6", "#109e00", "#109e00"])
        const width = interpolate(strongWidth.value, [0, 4, 8, 16], [0, 20, 60, 100], Extrapolate.CLAMP)
        return {
            backgroundColor,
            width: `${width}%`,
        }
    })

    const onShowPassword = () => {
        progress.value = withTiming(isEnabled ? 1 : 0, { duration: 350 }, () => runOnJS(setIsEnabled)(!isEnabled))
        lineWidth.value = withTiming(isEnabled ? 100 : 15, { duration: 150 })
    }

    const onGeneratePassword = () => {
        strongWidth.value = withTiming(passLength.length, {})
    }

    useEffect(() => {
        strongLineOpacity.value = withTiming(passLength.length ? 1 : 0);
        strongLinePaddingTop.value = withTiming(passLength.length ? 20 : 0);
        onGeneratePassword();
    }, [passLength])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.inputWrapper]}>
                <Animated.View style={[styles.flashLight, animLightStyle]} />
                <TextInput onChangeText={(text) => setPassLength(text)} secureTextEntry={isEnabled} style={[styles.input, { color: isEnabled ? "white" : "black" }]} numberOfLines={1} />
                <TouchableOpacity activeOpacity={1} onPress={onShowPassword} style={styles.torch}>
                    <FlashLightIcon {...{ isEnabled }} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.passPowerWrapper, animStrongWrapperStyle]}>
                <View>
                    <Animated.View style={[styles.passPower]} />
                    <Animated.View style={[styles.passPowerFill, animStrongWithStyle]} />
                </View>
            </Animated.View>
        </View>
    );
});
