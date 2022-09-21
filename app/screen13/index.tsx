import React, { FC, useMemo, memo, useEffect, useState } from "react";
import { FlatList, View, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import * as cheerio from 'cheerio';
import { getStyle } from "./styles";
import Axios from 'axios';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from "@react-navigation/native";

interface Props { }

const { height } = Dimensions.get('window');
const MIN_HEIGHT = 250;
const MAX_HEIGHT = height / 1.3;

export const MovieItem = ({ item, index, translateY }) => {
    const styles = useMemo(() => getStyle(), []);
    const navigation: any = useNavigation();
    const inputRange = [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT];

    const rContainerStyle = useAnimatedStyle(() => ({
        height: interpolate(translateY.value, inputRange, [MIN_HEIGHT, MAX_HEIGHT], Extrapolate.CLAMP)
    }));

    const rTextWrapperStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateY.value, inputRange, [0, 1], Extrapolate.CLAMP)
    }));

    const rTextStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: interpolate(translateY.value, inputRange, [-100, 280], Extrapolate.CLAMP) }
        ]
    }));

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("MovieDetails", { item })}>
            <Animated.View style={[{ width: "100%" }, rContainerStyle]}>
                <SharedElement id={`item.${item.id}.photo`}>
                    <Image source={{ uri: item.postImage }} style={{ width: "100%", height: MAX_HEIGHT }} />
                </SharedElement>
                <Animated.View style={[styles.textWrapper, rTextWrapperStyle]}>
                    <Animated.View style={[styles.textBackground, rTextStyle]}>
                        <SharedElement id={`item.${item.id}.title`}>
                            <Text numberOfLines={1} style={styles.text}>{item.postTitle}</Text>
                        </SharedElement>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    )
}

export const Screen_13: FC<Props> = memo(({ }: Props) => {
    const styles = useMemo(() => getStyle(), []);
    const translateY = useSharedValue(0);
    const [moviesList, setMoviesList] = useState<any>([])

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            translateY.value = event.contentOffset.y
        }
    })

    const getNewsFromSite = async () => {
        const { data } = await Axios.get("https://www.ivi.az/movies/foreign");
        const $ = cheerio.load(data);

        const findView = (index, element) => {
            return $('.gallery__item.gallery__item_virtual').eq(index).find(element).text();
        };

        let newArray: any = [];
        $('#root > section.pageSection.pageSection_virtual.genre__pageSection.genre__pageSection_virtual > div > div > div > div > ul').map((i, e) => {
            e.children.map((_index, _elem) => {
                const postTitle = findView(_elem, ".nbl-slimPosterBlock__title");
                const postImage = $('.gallery__item.gallery__item_virtual').eq(_elem).find(".nbl-poster__image").attr("src");
                postTitle && postImage && newArray.push({ id: Math.random() * 9999, postTitle, postImage });
            });
            return newArray;
        })
        setMoviesList(newArray);
    };

    useEffect(() => {
        getNewsFromSite();
    }, []);

    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    return (
        <View style={styles.container}>
            <AnimatedFlatList
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
                data={moviesList}
                snapToInterval={MAX_HEIGHT}
                decelerationRate="fast"
                keyExtractor={item => item.id}
                contentContainerStyle={{ height: (moviesList.length + 1) * MAX_HEIGHT }}
                renderItem={(({ item, index }) => (
                    <MovieItem {...{ item, index, translateY }} />
                ))}
            />
        </View>
    );
});
