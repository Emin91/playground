import React, { useState, useEffect, useRef, FC, useMemo } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import Voice, { SpeechErrorEvent } from "@react-native-voice/voice";
import validateColor from "validate-color";
import { getStyle } from "./styles";

interface Props { };

const imageLink = "https://cdn.cbeditz.com/cbeditz/preview/nice-red-gradient-background-wallpaper-7-11614352808xhulfvwt87.jpg";
const { width, height } = Dimensions.get("window");
export const Screen_16: FC<Props> = ({ }) => {
    const boxSize = 100;
    const [results, setResults] = useState<string[]>(["Listening..."]);
    const [isSquare, setIsSquare] = useState(true);
    const [isRotated, setIsRotated] = useState(true);
    const [isColor, setIsColor] = useState(false);
    const [isLightMode, setIsLightMode] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [isBlur, setIsBlur] = useState(true);
    const [color, setColor] = useState("transparent");
    const translateX = useSharedValue((width - boxSize) / 2);
    const translateY = useSharedValue(((height / 1.5) + boxSize) / 2);
    const translateLabelY = useSharedValue(-200);
    const scale = useSharedValue(1.2);
    const rotate = useSharedValue(0);
    const bgColor = useSharedValue(0);
    const boxRadius = useSharedValue(12);
    const boxWAndH = useSharedValue(100);
    const textValue = useRef("");
    const styles = useMemo(() => getStyle(isLightMode), [isLightMode]);

    const rLabelStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: translateLabelY.value
            }],
        }
    })

    const rMainStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(bgColor.value, [0, 1], ["#fff", "#000"])
        return {
            backgroundColor,
        }
    })

    const rImageBlurStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: color,
            borderRadius: withSpring(boxRadius.value, { damping: 30, stiffness: 60, }),
            width: boxWAndH.value,
            height: boxWAndH.value,
            transform: [
                { translateX: withSpring(translateX.value, { damping: 30, stiffness: 60, }) },
                { translateY: withSpring(translateY.value, { damping: 30, stiffness: 60, }) },
                { rotate: withSpring(`${rotate.value}deg`, { damping: 30, stiffness: 60, }) },
                { scale: withSpring(scale.value,) },
            ]
        }
    })

    const rImageStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: color,
            borderRadius: withSpring(boxRadius.value, { damping: 15, stiffness: 70, }),
            width: boxWAndH.value,
            height: boxWAndH.value,
            transform: [
                { translateX: withSpring(translateX.value, { damping: 15, stiffness: 70, }) },
                { translateY: withSpring(translateY.value, { damping: 15, stiffness: 70, }) },
                { rotate: withSpring(`${rotate.value}deg`, { damping: 15, stiffness: 70, }) },
                { scale: withSpring(scale.value,) },
            ]
        }
    })

    const stopSpeech = async () => {
        translateX.value = withSpring(((width - boxSize) / 2));
        translateY.value = withSpring((((height / 1.5) + boxSize) / 2));
        scale.value = withSpring(1.2);
        bgColor.value = withTiming(0);
        setIsLightMode(true);
        setIsColor(false);
        setIsRotated(false);
        return await Voice.destroy(), setIsListening(false);
    };

    const onAnimateBox = async (result: string) => {
        const text = result?.value[0];

        if (text !== textValue.current) {
            textValue.current = text;
            const latsWord: any = text.split(" ").splice(-1).join();
            switch (latsWord) {
                case "stop":
                    await stopSpeech();
                    setResults([latsWord]);
                    return;
                case "up": case "top":
                case "down": case "bottom": {
                    translateY.value = ["top", "up"].includes(latsWord) ? 0 : (height / 1.52) + boxSize;
                    setResults([latsWord]);
                    return;
                };
                case "left": case "right": {
                    translateX.value = latsWord === "left" ? 0 : width - boxSize;
                    setResults([latsWord]);
                    return;
                };
                case "circle": case "round":
                case "square": case "box": {
                    setIsSquare(!["circle", "round"].includes(latsWord));
                    boxRadius.value = ["circle", "round"].includes(latsWord) ? boxSize / 2 : 8;
                    setResults([latsWord]);
                    return;
                };
                case "middle": case "center": {
                    translateX.value = (width - boxSize) / 2;
                    translateY.value = ((height / 1.52) + boxSize) / 2;
                    setResults([latsWord]);
                    return;
                };
                case "rotate": {
                    !isSquare && (boxRadius.value = 8);
                    rotate.value = withSpring(isRotated ? 360 : 0, {}, () => runOnJS(setIsRotated)(!isRotated))
                    setResults([latsWord]);
                    return;
                };
                case "grow": case "scale": {
                    scale.value = withSpring(scale.value == 0.7 ? 1.2 : 1.6);
                    setResults([latsWord]);
                    return;
                };
                case "shrink": case "small": {
                    scale.value = withSpring(scale.value == 1.6 ? 1 : 0.7);
                    setResults([latsWord]);
                    return;
                };
                case "wiggle": case "shake": {
                    !isSquare && (boxRadius.value = 8);
                    rotate.value = withSequence(
                        withTiming(-80, { duration: 20 }),
                        withRepeat(withTiming(80, { duration: 100 }), 6, true),
                        withTiming(0, { duration: 20 })
                    );
                    setResults([latsWord]);
                    return;
                };
                case "jump": {
                    scale.value = withSequence(
                        withSpring(1.9, { stiffness: 40 }),
                        withSpring(1, { stiffness: 200, damping: 8 }),
                    )
                    setResults([latsWord]);
                    return;
                };
                case "gradient": {
                    setIsColor(false);
                    setResults([latsWord]);
                    return;
                };
                case "light": case "dark": {
                    setIsLightMode(latsWord === "light");
                    bgColor.value = withTiming(latsWord === "light" ? 0 : 1, { duration: 400 });
                    setResults([latsWord]);
                    return;
                };
                case "double": case "single": {
                    setIsBlur(latsWord === "double");
                    setResults([latsWord]);
                    return;
                };
                case validateColor(latsWord) && latsWord: {
                    setIsColor(true);
                    setColor(latsWord);
                    setResults([latsWord]);
                    return;
                };
                default: {
                    console.log("default");
                    break;
                }
            }
        }
    };

    useEffect(() => {
        isLightMode && color === "white" && setColor("transparent");
        !isLightMode && color === "black" && setColor("transparent");
    }, [color, isLightMode])

    useEffect(() => {
        translateLabelY.value = withSpring(isListening ? 0 : -100)
    }, [isListening]);


    useEffect(() => {
        const onSpeechResults = async (event: any) => {
            onAnimateBox(event);
        }

        const onSpeechError = (event: SpeechErrorEvent) => {
            console.error(event);
        }

        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const toggleListening = async () => {
        try {
            if (isListening) {
                stopSpeech();
                setResults([]);
            } else {
                await Voice.start("en-US");
                setIsListening(true);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Animated.View style={[styles.container, rMainStyle]}>
            {isBlur ? <Animated.View style={[styles.imageBox, StyleSheet.absoluteFill, rImageBlurStyle]}>
                {!isColor || ["transparent",].includes(color) ? <Image blurRadius={50} source={{ uri: imageLink }} style={styles.image} /> : null}
            </Animated.View> : null}
            <Animated.View style={[styles.imageBox, rImageStyle]}>
                {!isColor || ["transparent",].includes(color) ? <Image source={{ uri: imageLink }} style={styles.image} /> : null}
            </Animated.View>
            <TouchableOpacity style={styles.button} onPress={toggleListening} />
            <Animated.View style={[styles.labelWrapper, rLabelStyle]}>
                {results.map((result, index) => (
                    <Text key={result + index} style={[styles.state]}>
                        {result}
                    </Text>
                ))}
            </Animated.View>
        </Animated.View>
    );
};
