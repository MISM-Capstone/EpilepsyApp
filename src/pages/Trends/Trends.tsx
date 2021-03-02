import React, { useEffect, useState } from 'react';
import { Pressable, StatusBar, Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { TrendsStackParamList } from "../../navigation/TrendsNavigation";

import styles from "../../styles/ButtonStyles";
import { default as mainStyle } from "../../styles/MainStyles";
import { CalendarList } from 'react-native-calendars';
import calendarService from '../../_services/Calendar/calendar.service';
import SeizureHistoryDao from '../../_services/database/dao/SeizureHistoryDao';

type TrendsScreenNavigationProp = StackNavigationProp<
    TrendsStackParamList,
    'Trends'
>;

type Props = {
    navigation: TrendsScreenNavigationProp;
};

const Trends = (props: Props) => {
    const [markedDates, setMarkedDates] = useState<any>();

    useEffect(() => {
        (async () => {
            const seizures: any[] = await SeizureHistoryDao.getLogs();
            let marked_dates = seizures.reduce((c: any, v: any) => Object.assign(c, {[v.date]: {marked: true}}), {}); // TODO: this is putting quotes around marked when it shouldn't
            console.log("-----------------------------------------")
            console.log("Dates Marked: ",marked_dates);
            setMarkedDates(marked_dates);
        })();
    }, []);
    return (
        <SafeAreaView style={mainStyle.container}>
            <View>
                <Button title="View Chart" onPress={() => props.navigation.navigate("Chart")} />
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
                    props.navigation.navigate('DateHistory', {
                        date: day
                    });
                }}
                markedDates={markedDates}
            />
        </SafeAreaView>
    );
}

export default Trends;
