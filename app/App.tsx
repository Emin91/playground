import React, { FC } from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { RootNavigation } from "./navigation/rootNavigation";
import { store } from "./store";

const App: FC = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            {/* <Provider {...{ store }}> */}
                <RootNavigation />
            {/* </Provider> */}
        </SafeAreaView>
    );
};

export default App;
