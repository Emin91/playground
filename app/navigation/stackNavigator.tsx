import React, { FC } from "react";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { TransitionPresets } from "@react-navigation/stack";
import { MovieDetails } from "../screen13/moviesDetails";
import { HomeView } from "../homeView";
import { Screen_1 } from "../screen1";
import { Screen_2 } from "../screen2";
import { Screen_3 } from "../screen3";
import { Screen_4 } from "../screen4";
import { Screen_5 } from "../screen5";
import { Screen_6 } from "../screen6";
import { Screen_7 } from "../screen7";
import { Screen_8 } from "../screen8";
import { Screen_9 } from "../screen9";
import { Screen_10 } from "../screen10";
import { Screen_11 } from "../screen11";
import { Screen_12 } from "../screen12";
import { Screen_13 } from "../screen13";
import { Screen_14 } from "../screen14";
import { Screen_15 } from "../screen15";
import { Screen_16 } from "../screen16";

const Stack = createSharedElementStackNavigator();

export const StacksNavigator: FC = () => {
    return (
        <Stack.Navigator initialRouteName={"HomeView"} screenOptions={() => ({
            headerShown: true,
            gestureEnabled: false,
            headerMode: "screen",
            headerBackTitleStyle: { fontSize: 12 },
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "black" },
            ...TransitionPresets.ScaleFromCenterAndroid
        })}>
            <Stack.Screen options={{ headerShown: false }} name={"HomeView"} component={HomeView} />
            <Stack.Screen name={"Reanimated - square"} component={Screen_1} />
            <Stack.Screen name={"Police siren"} component={Screen_2} />
            <Stack.Screen name={"iPhone sounde slider"} component={Screen_3} />
            <Stack.Screen name={"PanHandler - moving square"} component={Screen_4} />
            <Stack.Screen name={"Tacking status"} component={Screen_5} />
            <Stack.Screen name={"Card flip"} component={Screen_6} />
            <Stack.Screen name={"Reanimated - layout animation"} component={Screen_7} />
            <Stack.Screen name={"animated"} component={Screen_8} />
            <Stack.Screen name={"React native skia - bouncing ball"} component={Screen_9} />
            <Stack.Screen name={"React native local server"} component={Screen_10} />
            <Stack.Screen name={"Custom slider"} component={Screen_11} />
            <Stack.Screen name={"Custom round slider"} component={Screen_12} />
            <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: "black" }, headerTitleStyle: { color: "white" } }} name={"Parallax slider"} component={Screen_13} />
            <Stack.Screen name={"Box animation with gestures"} component={Screen_14} />
            <Stack.Screen name={"Animated custom tab bar"} component={Screen_15} />
            <Stack.Screen name={"MovieDetails"} component={MovieDetails} sharedElements={(route, otherRoute, showing) => {
                const { item } = route.params;
                console.log({item: item.id});
                
                return [`item.${item.id}.photo`, `item.${item.id}.title`];
            }} />
            <Stack.Screen options={{ headerShown: false, headerStyle: { backgroundColor: "white" }, headerTitleStyle: { color: "black" } }} name={"Voice commands"} component={Screen_16} />
        </Stack.Navigator>
    );
};