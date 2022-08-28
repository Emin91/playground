import React, { FC, useMemo, memo, useState, useRef, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import { MenuItem } from "./menuItem";
import { AddItemIcon } from "../assets/svg/addItemIcon";
import { getStyle } from "./styles";
import { PlusIcon } from "../assets/svg/plusIcon";
import { RemoveIcon } from "../assets/svg/removeIcon";

interface Props {
    navigation: StackNavigationProp<any>;
}

export const Screen_7: FC<Props> = memo(({ }: Props) => {
    const scrollRef = useRef<any>(null);
    const emptyOpacity = useSharedValue(1);
    const emptyScale = useSharedValue(1.5);
    const addButtonBottom = useSharedValue(10)
    const rotate = useSharedValue(0);
    const [isMultiSelect, setIsMultiSelect] = useState(false);
    const [itemList, setItemList] = useState<any[]>([]);
    const [isListEmpty, setIsListEmpty] = useState(Boolean(itemList.length));
    const [count, setCount] = useState(1);
    const styles = useMemo(() => getStyle(isMultiSelect), [isMultiSelect]);
    const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity);

    const onAddNewItem = () => {
        rotate.value = withTiming(1);
        emptyScale.value = withSpring(1);
        setCount(p => p + 1);
        setItemList([{ name: `item: ${count}`, id: Date.now().toString() }, ...itemList]);
    };

    const onRemoveItem = (id: string) => {
        rotate.value = withTiming(1);
        setItemList(itemList.filter((item) => item.id !== id));
    };

    const onRemoveSelectedItems = () => {
        rotate.value = withTiming(1);
        setItemList(itemList.filter((item) => !item.selected));
        setIsMultiSelect(false);
    };

    const animAddButtonStyle = useAnimatedStyle(() => {
        const bottom = interpolate(addButtonBottom.value, [50, 100], [20, -100], Extrapolate.CLAMP);
        return {
            bottom,
            transform: [
                { rotate: `${rotate.value}deg` }
            ]
        }
    });

    const animEmptyStyle = useAnimatedStyle(() => {
        return {
            opacity: emptyOpacity.value,
            transform: [
                { scale: emptyScale.value },
            ]
        }
    });

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll(event, context) {
            addButtonBottom.value = event.contentOffset.y
        },
    })

    useEffect(() => {
        rotate.value = withRepeat(withSpring(360, { stiffness: 40 }), Infinity, false);
        emptyScale.value = withSpring(1, { stiffness: 100 });
    }, []);

    useEffect(() => {
        emptyScale.value = withSpring(!itemList.length ? 1 : 0);
        emptyOpacity.value = withTiming(!itemList.length ? 1 : 0.4, { duration: 500 }, () => runOnJS(setIsListEmpty)(Boolean(itemList.length)));
    }, [itemList.length]);

    return (
        <View style={styles.container}>
            {isListEmpty
                ? <Animated.ScrollView
                    ref={scrollRef}
                    scrollEventThrottle={16}
                    onScroll={onScrollHandler}
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}>
                    {itemList.map((item) => (
                        <MenuItem key={item.id} {...{ item, isMultiSelect, itemList, setItemList, onPress: () => onRemoveItem(item.id) }} />
                    ))}
                </Animated.ScrollView>
                : <Animated.View style={[styles.emptyState, animEmptyStyle]}>
                    <AddItemIcon />
                </Animated.View>
            }
            <TouchableOpacityAnimated
                activeOpacity={0.7}
                onLongPress={() => isListEmpty && setIsMultiSelect(!isMultiSelect)}
                onPress={() => { !isMultiSelect ? onAddNewItem() : onRemoveSelectedItems() }}
                style={[styles.addButton, animAddButtonStyle]}>
                {!isMultiSelect ? <PlusIcon /> : <RemoveIcon />}
            </TouchableOpacityAnimated>
        </View>
    );
});
