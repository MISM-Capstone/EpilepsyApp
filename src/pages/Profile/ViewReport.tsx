import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';
import ReportDao from '../../_services/database/dao/ReportDao';

type ViewReportScreenNavigationProp = StackNavigationProp<
    ProfileStackParamList,
    "ViewReport"
>;

type ViewReportScreenRouteProp = RouteProp<
    ProfileStackParamList,
    "ViewReport"
>;

type Props = {
    route: ViewReportScreenRouteProp;
    navigation: ViewReportScreenNavigationProp;
};


type RenderProps = {
    log: any;
}

function RenderSeizure(props:RenderProps) {
    return (
        <View>
            <Text>ID: {props.log.seizure_id}</Text>
            <Text>Date: {props.log.date}</Text>
            <Text>Time: {props.log.time}</Text>
            <Text>Location: {props.log.location}</Text>
            <Text>Notes: {props.log.notes}</Text>
            <Text>------</Text>
        </View>
    )
}

function RenderSurvey(props:RenderProps) {
    return (
        <View>
            <Text>ID: {props.log.survey_entry_id}</Text>
            <Text>Date: {props.log.date}</Text>
            <Text>Sleep: {props.log.sleep}</Text>
            <Text>Stress Level: {props.log.stress_level}</Text>
            <Text>Illness: {props.log.illness}</Text>
            <Text>Fever: {props.log.fever}</Text>
            <Text>Missed Meal: {props.log.miss_meal}</Text>
            <Text>Medication: {props.log.medication}</Text>
            <Text>------</Text>
        </View>
    )
}

function RenderMedication(props:RenderProps) {
    return (
        <View>
            <Text>ID: {props.log.medication_id}</Text>
            <Text>------</Text>
        </View>
    )
}

const ViewReport = (props:Props) => {
    console.log("View the report ------------------------")
    const [seizures, setSeizures] = useState<any[]>([]);
    const [surveys, setSurveys] = useState<any[]>([]);
    const [medication, setMedication] = useState<any[]>([]);
    const startDate = new Date(props.route.params.start);
    const endDate = new Date(props.route.params.end);
    useEffect(() => {
        (async () => {
            const dbSeizures = await ReportDao.getSeizuresInDateRange(startDate, endDate);
            const dbSurveys = await ReportDao.getSurveysInDateRange(startDate, endDate);
            const dbMedication = await ReportDao.getMedicationInDateRange(startDate, endDate);
            setSeizures(dbSeizures);
            setSurveys(dbSurveys);
            setMedication(dbMedication);
        })();
    
    },[props.route.params.start, props.route.params.end]);
    
    console.log("Seizures",seizures);
    console.log("Surveys",surveys);
    console.log("Medication",medication);

    return (
        <SafeAreaView style={{ padding: 12 }}>
            <StatusBar barStyle="dark-content" />
            <View>
                <Text>View Report</Text>
            </View>
            <View>
                <Text>-------------------------</Text>
                <Text>Survey</Text>
                <Text>-------------------------</Text>
            </View>
            <FlatList 
                data={surveys}
                renderItem={({item}) => <RenderSurvey log={item} />}
                keyExtractor={(item) => item.survey_entry_id.toString()}
            />
            <View>
                <Text>-------------------------</Text>
                <Text>Seizures</Text>
                <Text>-------------------------</Text>
            </View>
            <FlatList 
                data={seizures}
                renderItem={({item}) => <RenderSeizure log={item} />}
                keyExtractor={(item) => item.seizure_id.toString()}
            />
            <View>
                <Text>-------------------------</Text>
                <Text>Medication</Text>
                <Text>-------------------------</Text>
            </View>
            <FlatList 
                data={medication}
                renderItem={({item}) => <RenderMedication log={item} />}
                keyExtractor={(item) => item.medication_id.toString()}
            />
        </SafeAreaView>
    );
}

export default ViewReport;
