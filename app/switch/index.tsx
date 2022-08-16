import React, { FC, useMemo } from "react";
import { LayoutAnimation, Platform, Pressable, UIManager, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getStyle } from "./styles";

interface Props {
    isActive: boolean;
    setIsActive: (type: boolean) => void;
}

export const SwitchButton: FC<Props> = ({ isActive, setIsActive }) => {
    const { colors }: any = useTheme();
    const styles = useMemo(() => getStyle(isActive), [isActive]);
    Platform.OS == "ios" && UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

    const onPressToggle = (): void => {
        LayoutAnimation.easeInEaseOut();
        setIsActive(!isActive);
    };

    return (
        <Pressable onPress={onPressToggle} style={styles.container}>
            <View style={styles.switchButton} />
        </Pressable>
    );
};