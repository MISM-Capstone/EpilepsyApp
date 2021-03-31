import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Trends from "../pages/Trends/Trends";

import HeaderStyle from "../styles/HeaderStyle";
import DateHistory from '../pages/Trends/DateHistory';
import { DateObject } from 'react-native-calendars';
import Charts from '../pages/Trends/Charts';
import LogSeizure from '../pages/Home/LogSeizure';
import { TabOptions } from "../components/TabOptions";

type TabProps = {
    tab: TabOptions.trends
}

export type TrendsStackParamList = {
    Trends: TabProps;
    DateHistory: TabProps & { date: DateObject };
    Charts: TabProps;
    UpdateSeizureLog: TabProps & { seizure_id: number};
};

const Stack = createStackNavigator<TrendsStackParamList>();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Trends"
                screenOptions={HeaderStyle}
            >
                <Stack.Screen
                    name="Trends"
                    component={Trends}
                />
                <Stack.Screen
                    name="DateHistory"
                    component={DateHistory}
                    options={({ route }) => ({title: route.params.date.dateString})}
                />
                <Stack.Screen
                    name="Charts"
                    component={Charts}
                />
                <Stack.Screen
                    name="UpdateSeizureLog"
                    options={() => ({title: "Update Seizure"})}
                    component={LogSeizure}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
