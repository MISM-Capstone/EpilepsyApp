import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { TrendOptions, TrendsStackParamList } from "../../navigation/Trends/TrendsNavProps";

import { default as mainStyle } from "../../styles/MainStyles";
import { CalendarList } from 'react-native-calendars';
import HistoryDao from '../../_services/database/dao/HistoryDao';
import LargeButton from '../../components/LargeButton';
import { TabOptions } from "../../components/TabOptions";
import { useIsFocused } from '@react-navigation/core';

type TrendsScreenNavigationProp = StackNavigationProp<
    TrendsStackParamList,
    TrendOptions.Trends
>;

type Props = {
    navigation: TrendsScreenNavigationProp;
};

const Trends = (props: Props) => {
    const isFocused = useIsFocused();
    const [markedDates, setMarkedDates] = useState<any>({});

    useEffect(() => {
        async function getMarkedDates() {
            let dates = await HistoryDao.getAllEventDates();
            setMarkedDates(dates);
        }

        if (isFocused) {
            getMarkedDates();
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={mainStyle.container}>
            <View style={{paddingBottom: 20}}>
                <LargeButton title="View Charts" navigate={() => props.navigation.navigate(TrendOptions.Charts, {tab:TabOptions.trends})} />
            </View>
            {/* Docs: https://github.com/wix/react-native-calendars */}
            <CalendarList
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}

                onDayPress={(day) => {
                    props.navigation.navigate(TrendOptions.DateHistory, {
                        tab:TabOptions.trends,
                        date: day
                    });
                }}
                markedDates={markedDates}
            />
        </SafeAreaView>
    );
}

export default Trends;
