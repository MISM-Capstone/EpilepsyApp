import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../pages/Home/Home";
import DailySurvey from "../pages/Home/DailySurvey";
import SurveyHistory from "../pages/Home/SurveyHistory";
import LogSeizure from "../pages/Home/LogSeizure";
import RecordMedication from "../pages/Home/RecordMedication";

import HeaderStyle from "../styles/HeaderStyle";
import HealthKitTest from '../pages/Home/HealthKitTest';

export type EditSeizureProps = {
    date?:Date;
}

export type HomeStackParamList = {
    Home: undefined;
    DailySurvey: undefined;
    SurveyHistory: undefined;
    LogSeizure: EditSeizureProps;
    RecordMedication: undefined;
    HealthKitTest: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={HeaderStyle}
                // mode="modal"
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
                <Stack.Screen
                    name="HealthKitTest"
                    component={HealthKitTest}
                    options={{
                        title: 'Health Kit Test'
                    }}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
