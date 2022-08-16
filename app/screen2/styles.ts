import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'black',
        },
        lightsWrapper: {
            width: '100%',
            paddingHorizontal: 20,
            flexDirection: 'row',
        },
        leftLight: {
            flex: 1,
            height: 60,
            borderWidth: 6,
            borderColor: '#ba0404',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 50,
            shadowColor: '#e30b0b',
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 0 },
            backgroundColor: '#e30b0b',
        },
        middleWrapper: {
            flex: 1,
            borderWidth: 4,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            borderColor: '#8c8b8b',
            backgroundColor: '#5c5c5c',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
        },
        rightLight: {
            flex: 1,
            height: 60,
            borderWidth: 6,
            borderColor: '#043594',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 50,
            shadowColor: '#044bd6',
            shadowOpacity: 1,
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 0 },
            backgroundColor: '#044bd6',
        },
        dots: {
            width: 7,
            height: 7,
            margin: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 7,
        },
        linesWrapper: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            paddingHorizontal: 6,
            justifyContent: 'center',
        },
        lines: {
            width: '100%',
            marginBottom: 4,
            height: 4,
            backgroundColor: '#4d4d4d',
        },
        whiteLine: {
            width: '70%',
            height: 10,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            backgroundColor: 'white',
        },
        maskedView: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: '100%',
            justifyContent: 'center',
        },
        bottomLineWrapper: {
            width: '90%',
            alignSelf: 'center',
            height: 10,
            borderRadius: 4,
            backgroundColor: 'white',
        },
        actionButtons: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
        },
    });
    return styles;
};
