import React from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import {TrendsStackParamList} from "../../navigation/TrendsNavigation";

import styles from "../../styles/ButtonStyles";
import {default as mainStyle} from "../../styles/MainStyles";

type TrendsScreenNavigationProp = StackNavigationProp<
  TrendsStackParamList,
  'Trends'
>;

type Props = {
  navigation: TrendsScreenNavigationProp;
};

const Trends = (props:Props) => {
    return (
        <SafeAreaView style={mainStyle.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.surveyButtonContainer}>
                <Text>Trends</Text>
            </View>
        </SafeAreaView>
    );
}

export default Trends;
