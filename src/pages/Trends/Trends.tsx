import React from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { TrendsStackParamList } from "../../navigation/TrendsNavigation";

import styles from "../../styles/ButtonStyles";
import { default as mainStyle } from "../../styles/MainStyles";
import { CalendarList } from 'react-native-calendars';

type TrendsScreenNavigationProp = StackNavigationProp<
    TrendsStackParamList,
    'Trends'
>;

type Props = {
    navigation: TrendsScreenNavigationProp;
};

const Trends = (props: Props) => {
    return (
        <SafeAreaView style={mainStyle.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.surveyButtonContainer}>
                <Text>Trends</Text>
            </View>
            {/* Docs: https://github.com/wix/react-native-calendars */}
            <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
            />
        </SafeAreaView>
    );
}

export default Trends;
