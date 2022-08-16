import React, { FC, useMemo, memo, useCallback, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, ScrollView, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import BottomSheet from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";
import { getStyle } from "./styles";
import { SwitchButton } from "../switch";

interface Props {
    navigation: StackNavigationProp<any>;
}

export const Screen_1: FC<Props> = memo(({ navigation }: Props) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const rotate = useSharedValue(0);

    const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['1%', '80%'], []);
    const [damping, setDamping] = useState({ min: 1, max: 100, value: 10, step: 1 });
    const [mass, setMass] = useState({ min: 1, max: 100, value: 1, step: 1 });
    const [velocity, setVelocity] = useState({ min: 1, max: 100, value: 1, step: 1 });
    const [stiffness, setStiffness] = useState({ min: 1, max: 100, value: 100, step: 1 });
    const [overshoot, setOvershoot] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const [width, setWidth] = useState({ min: 1, max: Math.floor(screenWidth), value: 100, step: 1 });
    const [height, setHeight] = useState({ min: 1, max: Math.floor(screenHeight), value: 100, step: 1 });
    const [borderRadius, setBorderRadius] = useState({ min: 1, max: 100, value: 12, step: 1 });
    const [squareColor, setSquareColor] = useState("#168df5");
    const [isOpacity, setIsOpacity] = useState(true);
    const [isRotation, setIsRotation] = useState(false);
    const [isScale, setIsScale] = useState(false);
    const [isAnimationInverted, setIsAnimationInverted] = useState(true);
    const [selectedItemName, setSelectedItemName] = useState("");
    const colors = ["#c0392b", "#168df5", "#16a085", "#8e44ad", "#f1c40f"];
    const styles = useMemo(() => getStyle(width.value, height.value, borderRadius.value, squareColor), [width, height, borderRadius, squareColor]);

    const onStart = () => {
        rotate.value = withRepeat(withSpring(isRotation ? 360 : 0, {
            mass: mass.value,
            damping: damping.value,
            velocity: velocity.value,
            stiffness: stiffness.value,
            overshootClamping: overshoot,
        }), Infinity, isAnimationInverted)
        opacity.value = withRepeat(withSpring(!isOpacity ? 1 : 0, {
            mass: mass.value,
            damping: damping.value,
            velocity: velocity.value,
            stiffness: stiffness.value,
            overshootClamping: overshoot,
        }), Infinity, isAnimationInverted)
        scale.value = withRepeat(withSpring(isScale ? 2 : 1, {
            mass: mass.value,
            damping: damping.value,
            velocity: velocity.value,
            stiffness: stiffness.value,
            overshootClamping: overshoot,
        }), Infinity, isAnimationInverted)
    };

    const onReset = () => {
        opacity.value = withTiming(1);
        rotate.value = withSpring(0);
        scale.value = withSpring(1);
    };

    const onSliderActive = (state: "Start" | "Stop", name: string) => {
        setSelectedItemName(state === "Start" ? name : "");
        setIsSliding(state === "Start");
    };

    const animStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { rotate: `${rotate.value}deg` },
                { scale: scale.value },
            ]
        }
    });

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const animationSettings = [
        { label: "Damping", state: damping, onChange: setDamping },
        { label: "Mass", state: mass, onChange: setMass },
        { label: "Velocity", state: velocity, onChange: setVelocity },
        { label: "Stiffness", state: stiffness, onChange: setStiffness },
        { label: "Overshoot clamping", active: overshoot, onPress: () => setOvershoot(!overshoot) },
    ];
    
    const cubeSettings = [
        { label: "Width", state: width, onChange: setWidth },
        { label: "Height", state: height, onChange: setHeight },
        { label: "Border radius", state: borderRadius, onChange: setBorderRadius },
    ];

    const cubeAnimatedSettings = [
        { label: "Opacity", active: isOpacity, onPress: () => setIsOpacity(!isOpacity) },
        { label: "Rotation", active: isRotation, onPress: () => setIsRotation(!isRotation) },
        { label: "Scaling", active: isScale, onPress: () => setIsScale(!isScale) },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Animated.View style={[styles.square, animStyle]} />
            </View>
            <View style={{ flexDirection: "row" }}>
                <Button title="start" onPress={onStart} />
                <Button title="reset" onPress={onReset} />
            </View>
            <BottomSheet
                index={0}
                ref={bottomSheetRef}
                backgroundStyle={{ opacity: Number(!isSliding) }}
                handleStyle={{ opacity: Number(!isSliding) }}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <View style={[styles.contentContainer]}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 10 }}>
                        <View style={{ opacity: Number(!isSliding) }}>
                        </View>
                        <Text numberOfLines={1} style={[styles.settingsLabel, { opacity: Number(!isSliding) }]}>Cube animation settings</Text>
                        <View style={[styles.checkBoxWrapper, { opacity: Number(!isSliding) }]}>
                            {cubeAnimatedSettings.map((item, index) => (
                                <View key={index} style={styles.menuItem}>
                                    <Text style={{ flex: 1, marginVertical: 10 }}>Animate {item.label}</Text>
                                    <SwitchButton {...{ isActive: item.active, setIsActive: item.onPress }} />
                                </View>
                            ))}
                        </View>
                        <Text numberOfLines={1} style={[styles.settingsLabel, { opacity: Number(!isSliding) }]}>Animation settings</Text>
                        {animationSettings.map((item, index) => (
                            <View key={index} style={[styles.itemWrapper, { opacity: !isSliding || item.label === selectedItemName ? 1 : 0, backgroundColor: !isSliding ? "#e6e6e6" : "transparent" }]}>
                                {item.state && item.label !== "OvershootClamping"
                                    ? <>
                                        <Text numberOfLines={1} style={{ color: !isSliding ? "black" : "white", marginTop: 10 }}>{item.label}: {item.state?.value}</Text>
                                        <Slider
                                            thumbTintColor="white"
                                            step={item.state.step}
                                            value={item.state?.value}
                                            minimumValue={item.state?.min}
                                            maximumValue={item.state?.max}
                                            onSlidingStart={() => onSliderActive("Start", item.label)}
                                            onSlidingComplete={() => onSliderActive("Stop", item.label)}
                                            minimumTrackTintColor={!isSliding ? "#168df5" : "#0a70c9"}
                                            maximumTrackTintColor="#a6a6a6"
                                            style={{ width: "100%", height: 40 }}
                                            onValueChange={(v) => item.onChange({ ...item.state, value: v })}
                                        />
                                    </>
                                    : <View key={index} style={[styles.menuItem, { marginVertical: 6 }]}>
                                        <Text style={{ flex: 1 }}>{item.label}</Text>
                                        <SwitchButton {...{ isActive: item.active, setIsActive: item.onPress }} />
                                    </View>}
                            </View>
                        ))}
                        <View style={[styles.menuItem, styles.itemWrapper, { paddingVertical: 14, backgroundColor: "#e6e6e6", opacity: Number(!isSliding) }]}>
                            <Text style={{ flex: 1 }}>{"Inverted"}</Text>
                            <SwitchButton {...{ isActive: isAnimationInverted, setIsActive: setIsAnimationInverted }} />
                        </View>
                        <Text numberOfLines={1} style={[styles.settingsLabel, { opacity: Number(!isSliding) }]}>Cube settings</Text>
                        {cubeSettings.map((item, index) => (
                            <View key={index} style={[styles.itemWrapper, { opacity: !isSliding || item.label === selectedItemName ? 1 : 0, backgroundColor: !isSliding ? "#e6e6e6" : "transparent" }]}>
                                <Text numberOfLines={1} style={{ color: !isSliding ? "black" : "white", marginTop: 10 }}>{item.label}: {item.state.value}</Text>
                                <Slider
                                    thumbTintColor="white"
                                    step={1}
                                    value={item.state?.value}
                                    minimumValue={item.state?.min}
                                    maximumValue={item.state?.max}
                                    onSlidingStart={() => onSliderActive("Start", item.label)}
                                    onSlidingComplete={() => onSliderActive("Stop", item.label)}
                                    minimumTrackTintColor={!isSliding ? "#168df5" : "#0a70c9"}
                                    maximumTrackTintColor="#a6a6a6"
                                    style={{ width: "100%", height: 40 }}
                                    onValueChange={(v) => item.onChange({ ...item.state, value: v })}
                                />
                            </View>
                        ))}
                        <View style={[styles.colorsWrapper, styles.itemWrapper, { opacity: !isSliding ? 1 : 0, backgroundColor: "#e6e6e6" }]}>
                            {colors.map((item, index) => (
                                <TouchableOpacity onPress={() => setSquareColor(item)} key={index} style={[styles.colorsItem, { backgroundColor: item }]} />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </BottomSheet>
        </View>
    );
});
