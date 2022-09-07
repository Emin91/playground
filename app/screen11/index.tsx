import React, { FC, useMemo, memo } from "react";
import { View } from "react-native";
import { getStyle } from "./styles";
import { Slider } from "../components/slider";


interface Props {
}

export const Screen_11: FC<Props> = memo(({ }: Props) => {
    const styles = useMemo(() => getStyle(), []);

    return (
        <View style={styles.container}>
            <View style={{ width: "100%",marginTop: 100, alignItems: "center" }}>
                <Slider />
            </View>
        </View>
    );
});
