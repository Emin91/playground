import React, { FC, useMemo, memo, useState } from "react";
import { View, Text, LayoutAnimation, Button, } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getStyle } from "./styles";

interface Props {
    navigation: StackNavigationProp<any>;
}

export const Screen_5: FC<Props> = memo(({ }: Props) => {
    const activeColor = "white";
    const data = new Array(7).fill("step ");
    const [activeIndex, setActiveIndex] = useState(0);
    const styles = useMemo(() => getStyle(activeColor), [activeColor]);
    const marginLeft = (((100 / (data.length - 1)) * activeIndex) - 100) + "%";

    const setCurrentActiveIndex = (v: number) => {
        LayoutAnimation.easeInEaseOut();
        setActiveIndex(v);
    };

    return (
        <View style={styles.container}>
            <View style={styles.statusWrapper}>
                <View style={styles.line}>
                    <View style={[styles.activeLine, { marginLeft }]} />
                </View>
                {data.map((item, index) => (
                    <View key={index} style={styles.dot}>
                        <View style={[styles.innerDot, { height: index <= activeIndex ? "100%" : "50%", width: index <= activeIndex ? "100%" : "50%" }]} />
                    </View>
                ))}
                <View style={styles.labelWrapper}>
                    {data.map((item, index) => (
                        <Text key={index} style={[styles.label, { top: index % 2 ? 20 : -20 }]}>{item + (index + 1)}</Text>
                    ))}
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Button title="Prev" disabled={activeIndex <= 0} onPress={() => setCurrentActiveIndex(activeIndex - 0.5)} />
                <Button title="Next" disabled={activeIndex >= data.length - 1} onPress={() => setCurrentActiveIndex(activeIndex + 0.5)} />
            </View>
        </View>
    );
});
