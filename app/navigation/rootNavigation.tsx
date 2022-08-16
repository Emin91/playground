import React, { FC } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StacksNavigator } from "./stackNavigator";

export const RootNavigation: FC = () => {

    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <StacksNavigator />
            </NavigationContainer>
        </View>
    );
};
