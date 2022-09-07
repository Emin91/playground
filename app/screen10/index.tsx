import React, { FC, useMemo, memo, useState, useEffect } from "react";
import { View, useWindowDimensions, Text, Button, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';
import WebView from "react-native-webview";
import { getStyle } from "./styles";


interface Props {
    navigation: StackNavigationProp<any>;
}

export const Screen_10: FC<Props> = memo(({ }: Props) => {
    const styles = useMemo(() => getStyle(), []);
    const { width } = useWindowDimensions();
    const [isEnabled, setIsEnabled] = useState(true);
    const [url, setUrl] = useState("");
    let path = RNFS.MainBundlePath + '/www';
    let server = new StaticServer(8080, path);

    const onStopServer = async () => {
        server.stop();
        const isRunning = await server.isRunning()
        setUrl("")
        console.log({ isRunning });
    }

    const onStartServer = async () => {
        server.start().then((url) => {
            console.log("Serving at URL", url);
            setUrl(url)
        });
        const isRunning = await server.isRunning()
        console.log({ isRunning });
    }

    return (
        <View style={styles.container}>
            <Button title="start" onPress={onStartServer} />
            <Button title="stop" onPress={onStopServer} />
            {url
                ? <WebView
                    style={{ flex: 1 }}
                    source={{ uri: url }}
                />
                : <View style={styles.serverStoped}>
                    <Text>Server stoped</Text>
                </View>
            }
        </View>
    );
});
