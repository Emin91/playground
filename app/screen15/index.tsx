import React, { FC, useMemo, memo, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInUp, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { DirectIcon } from "../assets/svg/directIcon";
import { SettingsIcon } from "../assets/svg/settingsIcon";
import { TvIcon } from "../assets/svg/tvIcon";
import { WalletIcon } from "../assets/svg/walletIcon";
import { getStyle } from "./styles";

interface Props { };

const TabBarButton = ({ item, selectedMenu, setSelectedMenu }) => {
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
            style={[styles.buttonWrapper, { backgroundColor: isSelected ? "#EDEDED" : "white" }]}>
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
    const [selectedMenu, setSelectedMenu] = useState("Home");

    const menuItems = [
        { title: "Home", icon: <TvIcon isActive={selectedMenu === "Home"} /> },
        { title: "Search", icon: <DirectIcon isActive={selectedMenu === "Search"} /> },
        { title: "Reels", icon: <WalletIcon isActive={selectedMenu === "Reels"} /> },
        { title: "Profile", icon: <SettingsIcon isActive={selectedMenu === "Profile"} /> },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.textWrapper}>
                    <Animated.Text key={selectedMenu} entering={SlideInUp} style={styles.selectedMenuText}>
                        {selectedMenu}
                    </Animated.Text>
                </View>
            </View>
            <View style={styles.tabBarWrapper}>
                {menuItems.map((item, index) => {
                    return <TabBarButton key={index} {...{ item, index, selectedMenu, setSelectedMenu }} />
                })}
            </View>
        </View>
    );
});
