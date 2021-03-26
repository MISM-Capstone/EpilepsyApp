import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../pages/Home/Home";
import DailySurvey from "../pages/Home/DailySurvey";
import SurveyHistory from "../pages/Home/SurveyHistory";
import LogSeizure from "../pages/Home/LogSeizure";
import RecordMedication from "../pages/Home/RecordMedication";

import HeaderStyle from "../styles/HeaderStyle";
import HealthKitTest from '../pages/Home/HealthKitTest';
import AddLocation from '../pages/Home/AddLocation';

type EditProps ={
    date?:Date;
}

export type EditSeizureProps = {
    location_id?:number;
} 

export type EditMedicationProps = {
    medication_id?:number;
    dosage_unit_id?:number;
}

export type AddProps = {
    previousPage?: keyof HomeStackParamList
}

export type HomeStackParamList = {
    Home: undefined;
    DailySurvey: undefined;
    SurveyHistory: undefined;
    LogSeizure: EditSeizureProps & EditProps;
    RecordMedication: EditMedicationProps & EditProps;
    HealthKitTest: undefined;
    AddLocation:AddProps;
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
                <Stack.Screen
                    name="AddLocation"
                    component={AddLocation}
                    options={{
                        title: 'Add Location'
                    }}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
