import React from 'react';
import { StatusBar, Pressable, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import {RootStackParamList} from "../navigation/HomeNavigation"

import styles from "../styles/ButtonStyles";
import {default as mainStyle} from "../styles/MainStyles";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'DailySurvey'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};


const DailySurvey = (props:Props) => {
    return (
        <>
            <SafeAreaView style={mainStyle.container}>
                <View style={styles.surveyButtonContainer}>
                    <Text>Survey</Text>
                </View>

            </SafeAreaView>
        </>
    );
}

export default DailySurvey;
