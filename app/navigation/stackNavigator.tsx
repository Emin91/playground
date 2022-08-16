import React, { FC } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { HomeView } from "../homeView";
import { Screen_1 } from "../screen1";
import { Screen_2 } from "../screen2";
import { Screen_3 } from "../screen3";

const Stack = createStackNavigator();

export const StacksNavigator: FC = () => {
    return (
        <Stack.Navigator initialRouteName={"HomeView"} screenOptions={() => ({
            headerShown: false,
            gestureEnabled: false,
            ...TransitionPresets.ScaleFromCenterAndroid
        })}>
            <Stack.Screen name={"HomeView"} component={HomeView} />
            <Stack.Screen name={"Screen_1"} component={Screen_1} />
            <Stack.Screen name={"Screen_2"} component={Screen_2} />
            <Stack.Screen name={"Screen_3"} component={Screen_3} />
        </Stack.Navigator>
    );
};