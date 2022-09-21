import React, { FC, useMemo, memo, useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import * as cheerio from 'cheerio';
import { getStyle } from "./styles";
import { SharedElement } from 'react-navigation-shared-element';


interface Props {
    route: any
}

export const MovieDetails: FC<Props> = memo(({ route }: Props) => {
    const { item } = route.params;
    const styles = useMemo(() => getStyle(), []);

    return (
        <View style={styles.container}>
            <SharedElement id={`item.${item.id}.photo`}>
                <Image style={{ width: "100%", height: "90%" }} source={{ uri: item.postImage }} />
            </SharedElement>
            <SharedElement id={`item.${item.id}.title`}>
                <Text style={styles.text}>{item.postTitle}</Text>
            </SharedElement>
        </View>
    );
});
