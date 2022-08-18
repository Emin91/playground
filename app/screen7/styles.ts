import { StyleSheet } from 'react-native';

export const getStyle = (isMultiSelect: boolean) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 5,
            paddingHorizontal: 10,
            backgroundColor: 'black',
        },
        cardWrapper: {
            width: 350,
            height: 180,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scroll: {
            marginTop: 5,
            marginBottom: 20,
        },
        addButton: {
            width: 60,
            height: 60,
            zIndex: 10,
            bottom: 10,
            right: 10,
            borderRadius: 60,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: !isMultiSelect ? 'orange' : '#BA3939',
        },
        addTitle: {
            color: 'white',
            fontSize: isMultiSelect ? 20 : 35,
        },
        emptyState: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
    return styles;
};
