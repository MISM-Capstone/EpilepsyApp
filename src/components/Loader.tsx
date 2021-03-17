import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../constants';
import LoadingStyles from '../styles/LoadingStyles';

type LoaderProps = {
    isLoading:boolean;
}

export default function Loader(props:LoaderProps){
    return (
        <View style={LoadingStyles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" animating={props.isLoading} color={COLORS.darkBlue} />
        </View>
    );
}