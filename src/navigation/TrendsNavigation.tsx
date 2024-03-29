import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Trends from "../pages/Trends/Trends";

import HeaderStyle from "../styles/HeaderStyle";
import DateHistory from '../pages/Trends/DateHistory';
import { DateObject } from 'react-native-calendars';
import Charts from '../pages/Trends/Charts';
import UpdateSeizureLog from '../pages/Trends/UpdateLogs/UpdateSeizureLog';

export type TrendsStackParamList = {
    Trends: undefined;
    DateHistory: { date: DateObject };
    Charts: undefined;
    UpdateSeizureLog: { seizure_id: number};
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
                    options={() => ({title: "Update"})}
                    component={UpdateSeizureLog}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
