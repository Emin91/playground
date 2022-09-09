import React, { FC, useMemo, memo, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector, } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { AddItemIcon } from "../assets/svg/addItemIcon";
import { ProfileIcon } from "../assets/svg/profileIcon";
import { getStyle } from "./styles";

interface Props { };

const TabBarButton = ({ item, index, selectedMenu, setSelectedMenu }) => {
    const styles = useMemo(() => getStyle(), []);
    const translateY = useSharedValue(0);
    const translateIconY = useSharedValue(0);
    const isSelected = selectedMenu === item.title;

    const rIconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateIconY.value }
            ]
        }
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value }
            ]
        }
    });

    useEffect(() => {
        translateY.value = withSpring(isSelected ? 0 : 30, { stiffness: 150 });
        translateIconY.value = withSpring(isSelected ? 0 : 10, { stiffness: 150 });
    }, [isSelected]);

    return (
        <TouchableOpacity
            disabled={isSelected}
            activeOpacity={1}
            onPress={() => setSelectedMenu(item.title)}
            style={[styles.buttonWrapper, { backgroundColor: isSelected ? "#34495e" : "#2c3e50" }]}>
            <Animated.View style={[rIconStyle]}>
                {item.icon}
            </Animated.View>
            <Animated.View style={[rStyle]}>
                <Text style={styles.text}>{item.title}</Text>
            </Animated.View>
        </TouchableOpacity>
    )
}

export const Screen_15: FC<Props> = memo(({ }: Props) => {
    const styles = useMemo(() => getStyle(), []);
    const translateVisibleY = useSharedValue(0);
    const translateHiddenY = useSharedValue(0);
    const [selectedMenu, setSelectedMenu] = useState("Home");
    const [stateText, setStateText] = useState(new Map());

    const menuItems = [
        { title: "Home", icon: <ProfileIcon isActive={selectedMenu === "Home"} /> },
        { title: "Search", icon: <ProfileIcon isActive={selectedMenu === "Search"} /> },
        { title: "Reels", icon: <ProfileIcon isActive={selectedMenu === "Reels"} /> },
        { title: "Profile", icon: <ProfileIcon isActive={selectedMenu === "Profile"} /> },
    ];

    const rTextStyleVisible = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateVisibleY.value }
            ]
        }
    });

    const rTextStyleHidden = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateHiddenY.value }
            ]
        }
    });


    useEffect(() => {
          setStateText(prevState => prevState.set( prevState, selectedMenu ) )
          console.log(stateText.get(selectedMenu))
    }, [selectedMenu])

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                {true
                    ? <Animated.Text style={[{ fontSize: 40 }, rTextStyleVisible]}>{"stateText"}</Animated.Text>
                    : <Animated.Text style={[{ fontSize: 40 }, rTextStyleHidden]}>{selectedMenu}</Animated.Text>
                }
            </View>
            <View style={styles.tabBarWrapper}>
                {menuItems.map((item, index) => {
                    return <TabBarButton key={index} {...{ item, index, selectedMenu, setSelectedMenu }} />
                })}
            </View>
        </View>
    );
});
