import React, { FC, useMemo, memo, useRef, useState } from "react";
import { View, Text, Animated, PanResponder, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getStyle } from "./styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { SwitchButton } from "../switch";

interface Props {
    navigation: StackNavigationProp<any>;
}

export const Screen_4: FC<Props> = memo(({ }: Props) => {
    const styles = useMemo(() => getStyle(), []);
    let panValue = { x: 0, y: 0 };
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['1%', '40%'], []);
    const [invertOnPress, setInvertOnPress] = useState(false);
    const [isDecay, setIsDecay] = useState(false);
    const pan = new Animated.ValueXY(isDecay ? panValue : { x: 0, y: 0 });
    const scale = useRef(new Animated.Value(1)).current;
    isDecay && pan.addListener(v => { panValue = v });

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponder: () => true,
        onPanResponderStart: () => {
            Animated.spring(scale, {
                toValue: !invertOnPress ? 1.3 : 0.7,
                bounciness: 1,
                useNativeDriver: true
            }).start()
        },
        onPanResponderEnd: () => {
            Animated.spring(scale, {
                toValue: 1,
                friction: 2,
                useNativeDriver: true
            }).start()
        },
        onPanResponderGrant: () => {
            if (isDecay) {
                pan.setOffset({ x: panValue.x, y: panValue.y });
            } else {
                pan.setOffset({ x: pan.x._value, y: pan.y._value });
            }
            pan.setValue({ x: 0, y: 0 })
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false
        }),
        onPanResponderRelease: (e, g) => {
            pan.flattenOffset();
            if (isDecay) {
                Animated.decay(pan, {
                    velocity: { x: g.vx, y: g.vy },
                    deceleration: 0.99,
                    useNativeDriver: true,
                }).start()
            }
        },
    })

    const menuItems = [
        { label: "Invert on press", active: invertOnPress, onPress: () => setInvertOnPress(!invertOnPress) },
        { label: "Decay on release", active: isDecay, onPress: () => setIsDecay(!isDecay) },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.line1} />
            <View style={styles.line2} />
            <Animated.View style={[styles.box1, { transform: [{ translateX: pan.x }] }]} />
            <Animated.View style={[styles.box2, { transform: [{ translateY: pan.y }] }]} />
            <Animated.View style={[styles.mainBox, { transform: [...pan.getTranslateTransform(), { scale }] }]} {...panResponder.panHandlers}>
                <Text style={styles.text}>Drag me!</Text>
            </Animated.View>
            <BottomSheet
                index={0}
                ref={bottomSheetRef}
                snapPoints={snapPoints}>
                <View style={[styles.contentContainer]}>
                    {menuItems.map((item, index) => (
                        <View key={index} style={styles.menuItem}>
                            <Text style={{ flex: 1 }}>{item.label}</Text>
                            <SwitchButton {...{ isActive: item.active, setIsActive: item.onPress }} />
                        </View>
                    ))}
                </View>
                <Button title="reset position" onPress={() => pan.setValue({ x: 0, y: 0 })} />
            </BottomSheet>
        </View>
    );
});
