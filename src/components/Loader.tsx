import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import LoadingStyles from '../styles/LoadingStyles';

type LoaderProps = {
    isLoading:boolean;
}

export default function Loader(props:LoaderProps){
    return (
        <View style={LoadingStyles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" animating={props.isLoading} color={"#2E4D9E"} />
        </View>
    );
}