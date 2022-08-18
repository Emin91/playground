import React, { FC, useMemo, memo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getStyle } from "./styles";
import { homeMenuList } from "./homeMenuList";

interface Props {
	navigation: StackNavigationProp<any>;
}

export const HomeView: FC<Props> = memo(({ navigation }: Props) => {
	const styles = useMemo(() => getStyle(), []);

	const onNavigate = (screenName: string) => {
		navigation.navigate(screenName);
		navigation.setOptions({})
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={homeMenuList}
				style={{ paddingVertical: 16 }}
				renderItem={(({ item }) => (
					<TouchableOpacity onPress={() => onNavigate(item.screenName)} activeOpacity={0.5} style={styles.itemWrapper}>
						<Text numberOfLines={1}>{item.screenName}</Text>
					</TouchableOpacity>
				))}
			/>
		</View>
	);
});
