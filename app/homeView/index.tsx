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
				showsVerticalScrollIndicator={false}
				style={{ paddingVertical: 16 }}
				contentContainerStyle={{ paddingBottom: 100 }}
				renderItem={(({ item, index }) => (
					<TouchableOpacity onPress={() => onNavigate(item.screenName)} activeOpacity={0.5} style={styles.itemWrapper}>
						<Text numberOfLines={1}>{`${index + 1}: ${item.screenName}`}</Text>
					</TouchableOpacity>
				))}
			/>
		</View>
	);
});
