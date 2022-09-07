import React, { FC, useMemo, memo, useState, useEffect } from "react";
import { View, useWindowDimensions, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getStyle } from "./styles";
import { useSharedValue } from "react-native-reanimated";
import { Canvas, Circle, Fill, Line, runSpring, Spring, useComputedValue, useTouchHandler, useValue, } from "@shopify/react-native-skia";

interface Props {
    navigation: StackNavigationProp<any>;
}

const FgColor = "#DC4C4C";
const BgColor = "#EC795A";
const Size = 20;
const Padding = 10;

export const Screen_9: FC<Props> = memo(({ }: Props) => {
    const { width } = useWindowDimensions();
    const [isEnabled, setIsEnabled] = useState(true);
    const styles = useMemo(() => getStyle(), []);
    const centerX = useMemo(() => width / 2 - (Size * 2 - Padding), [width]);
    const rectX = useValue(centerX);
    const rectY = useValue(Size);

    const offsetX = useValue(0);
    const offsetY = useValue(0);

    const rectCenter = useComputedValue(
        () => ({ x: rectX.current + Size, y: rectY.current + Size }),
        [rectX, rectY]
    );

    const touchHandler = useTouchHandler({
        onStart: ({ x, y }) => {
            offsetX.current = x - rectX.current;
            offsetY.current = y - rectY.current;
        },
        onActive: ({ x, y }) => {
            rectX.current = Math.max(
                Size,
                Math.min(width - Size - Padding, x - offsetX.current)
            );
            rectY.current = y - offsetY.current;
        },
        onEnd: ({ velocityX, velocityY }) => {
            runSpring(rectX, centerX, Spring.Gentle({ velocity: velocityX }));
            runSpring(rectY, Size, Spring.Gentle({ velocity: velocityY }));
        },
    });

    return (
        <View style={styles.container}>
            <Canvas style={styles.container} onTouch={touchHandler}>
                <Fill color="white" />
                <Line
                    p1={{ x: width / 2 - (Size - Padding), y: 0 }}
                    p2={rectCenter}
                    color={BgColor}
                    strokeWidth={2}
                    style="fill"
                />
                <Circle c={rectCenter} r={Size} color={FgColor} />
                <Circle
                    c={rectCenter}
                    r={Size}
                    color={BgColor}
                    strokeWidth={5}
                    style="stroke"
                />
            </Canvas>
        </View>
    );
});
