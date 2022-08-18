import React, { useMemo } from "react";
import { Text, Button } from "react-native";
import Animated, { FadeIn, FadeOut, Layout, LightSpeedInLeft, LightSpeedOutRight } from "react-native-reanimated";
import CheckBox from "@react-native-community/checkbox";
import { getStyle } from "./styles";

export const MenuItem = ({ item, onPress, isMultiSelect, itemList, setItemList }) => {
    const styles = useMemo(() => getStyle(), []);

    const onMultipleSelect = (id: string) => {
        const filteredData = itemList.map(newItem => {
            if (newItem.id == id) {
                return { ...newItem, selected: !newItem.selected }
            }
            return { ...newItem, selected: newItem.selected }
        });
        setItemList(filteredData);
    };

    return (
        <Animated.View
            layout={Layout.springify().stiffness(40)}
            exiting={LightSpeedOutRight}
            entering={LightSpeedInLeft}
            style={styles.container}>
            <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
            <Button title="remove" onPress={onPress} color={"#BA3939"} />
            {isMultiSelect
                ? <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} layout={Layout.springify()}>
                    <CheckBox onAnimationType="stroke" onValueChange={() => onMultipleSelect(item.id)} tintColor="white" onFillColor="transparent" onTintColor="white" onCheckColor="white" />
                </Animated.View>
                : null}
        </Animated.View>
    )
}