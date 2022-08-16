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

	return (
		<View style={styles.container}>
			<FlatList
				data={homeMenuList}
				style={{ paddingVertical: 16 }}
				renderItem={(({ item }) => (
					<TouchableOpacity onPress={() => navigation.navigate(item.screenName)} activeOpacity={0.5} style={styles.itemWrapper}>
						<Text numberOfLines={1}>{item.title}</Text>
					</TouchableOpacity>
				))}
			/>
		</View>
	);
});