import React, { FC, useMemo, memo } from "react";
import { FlatList, View, Image, Text, Dimensions } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { MOVIES_LIST } from "./moviesList";
import { getStyle } from "./styles";


interface Props {}

const { height } = Dimensions.get('window');
const MIN_HEIGHT = 250;
const MAX_HEIGHT = height / 1.8;

export const MovieItem = ({ item, index, translateY }) => {
    const styles = useMemo(() => getStyle(), []);
    const inputRange = [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT];

    const rContainerStyle = useAnimatedStyle(() => ({
        height: interpolate(translateY.value, inputRange, [MIN_HEIGHT, MAX_HEIGHT], Extrapolate.CLAMP)
    }));

    const rTextWrapperStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateY.value, inputRange, [0, 1], Extrapolate.CLAMP)
    }));

    const rTextStyle = useAnimatedStyle(() => ({
        transform: [
            {translateY: interpolate(translateY.value, inputRange, [-100, 200], Extrapolate.CLAMP)}
        ]
    }));

    return (
        <Animated.View style={[{ width: "100%" }, rContainerStyle]}>
            <Image source={{ uri: item.url }} style={{ width: "100%", height: MAX_HEIGHT }} />
            <Animated.View style={[styles.textWrapper, rTextWrapperStyle]}>
                <Animated.View style={[styles.textBackground, rTextStyle]}>
                    <Text numberOfLines={1} style={styles.text}>{item.title}</Text>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    )
}

export const Screen_13: FC<Props> = memo(({ }: Props) => {
    const styles = useMemo(() => getStyle(), []);
    const translateY = useSharedValue(0);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event, context) => {
            translateY.value = event.contentOffset.y
        }
    })

    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    return (
        <View style={styles.container}>
            <AnimatedFlatList
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
                data={MOVIES_LIST}
                snapToInterval={MAX_HEIGHT}
                decelerationRate="fast"
                contentContainerStyle={{ height: (MOVIES_LIST.length + 1) * MAX_HEIGHT }}
                renderItem={(({ item, index }) => (
                    <MovieItem {...{ item, index, translateY }} />
                ))}
            />
        </View>
    );
});
