import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../pages/Home";
import DailySurvey from "../pages/DailySurvey";
import SurveyHistory from "../pages/SurveyHistory";
import LogSeizure from "../pages/LogSeizure";
import RecordMedication from "../pages/RecordMedication";

import HeaderStyle from "../styles/HeaderStyle";

export type HomeStackParamList = {
    Home: undefined;
    DailySurvey: undefined;
    SurveyHistory: undefined;
    LogSeizure: undefined;
    RecordMedication: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={HeaderStyle}
                mode="modal"
            >
                <Stack.Screen
                        name="Home"
                        component={Home}
                />
                <Stack.Screen
                        name="DailySurvey"
                        component={DailySurvey}
                        options={{
                          title: 'Daily Survey'
                        }}
                />
                <Stack.Screen
                        name="SurveyHistory"
                        component={SurveyHistory}
                        options={{
                          title: 'Survey History'
                        }}
                />
                <Stack.Screen
                        name="LogSeizure"
                        component={LogSeizure}
                        options={{
                          title: 'Log a Seizure'
                        }}
                />
                <Stack.Screen
                        name="RecordMedication"
                        component={RecordMedication}
                        options={{
                          title: 'Record Medication'
                        }}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
