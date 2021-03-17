import { Dimensions, StyleSheet } from 'react-native';

const LoadingStyles = StyleSheet.create({
    activityIndicatorWrapper: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 250,
    },
});

export default LoadingStyles;
