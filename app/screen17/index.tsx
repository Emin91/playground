import React, { useState, useEffect, useRef, FC, useMemo } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import { getStyle } from "./styles";

interface Props { };

const imageLink = "https://cdn.cbeditz.com/cbeditz/preview/nice-red-gradient-background-wallpaper-7-11614352808xhulfvwt87.jpg";
const { width, height } = Dimensions.get("window");
export const Screen_17: FC<Props> = ({ }) => {
    const styles = useMemo(() => getStyle(), []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.playerWrapper]}>
            
            </Animated.View>
        </View>
    );
};
