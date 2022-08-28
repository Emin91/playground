import React, { FC } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { HomeView } from "../homeView";
import { Screen_1 } from "../screen1";
import { Screen_2 } from "../screen2";
import { Screen_3 } from "../screen3";
import { Screen_4 } from "../screen4";
import { Screen_5 } from "../screen5";
import { Screen_6 } from "../screen6";
import { Screen_7 } from "../screen7";
import { Screen_8 } from "../screen8";

const Stack = createStackNavigator();

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
            <Stack.Screen name={"Input with animatied show password"} component={Screen_8} />
        </Stack.Navigator>
    );
};