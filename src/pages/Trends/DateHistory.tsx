import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Button, Pressable } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { TrendsStackParamList } from '../../navigation/TrendsNavigation';
import HistoryStyles from '../../styles/HistoryStyles';
import HistoryDao from '../../_services/database/dao/HistoryDao';
import sleepDatesService from '../../_services/helpers/sleepDates.service';
import UpdateSeizureLog from './UpdateLogs/UpdateSeizureLog';

type Props = {
    navigation: any;
    route: any
};

type RenderProps = {
    log: any;
    key: number;
    navigation: TrendsScreenNavigationProp;
}

type TrendsScreenNavigationProp = StackNavigationProp<
    TrendsStackParamList,
    'Trends'
>;

function SeizureCard(props: RenderProps) {
    return (
        <View style={HistoryStyles.HistoryEventCard}>
            <View>
                <Text>Time: {props.log.time}</Text>
                <Text>Location: {props.log.location}</Text>
                <Text>Notes: {props.log.notes}</Text>
            </View>
            <Button
                title="Update"
                onPress={() => props.navigation.navigate("UpdateSeizureLog", { seizure_id: props.log.seizure_id })}
            />
        </View>
    )
}

function SurveyCard(props: RenderProps) {
    const sleepTime = sleepDatesService.getSleepTime(props.log.sleep_start_date, props.log.sleep_end_date);
    return (
        <View style={HistoryStyles.HistoryEventCard}>
            <View>
                <Text>Sleep Time: {sleepTime.hours} hours {sleepTime.minutes} minutes</Text>
                <Text>Stress Level: {props.log.stress_level}</Text>
                <Text>Felt Illness: {props.log.illness ? 'Yes' : 'No'}</Text>
                <Text>Had a Fever: {props.log.fever ? 'Yes' : 'No'}</Text>
                <Text>Missed a Meal: {props.log.miss_meal ? 'Yes' : 'No'}</Text>
                <Text>Took Medication: {props.log.medication ? 'Yes' : 'No'}</Text>
            </View>
        </View>
    )
}

function MedicationCard(props: RenderProps) {
    return (
        <View style={HistoryStyles.HistoryEventCard}>
            <View>
                <Text>Time: {props.log.time}</Text>
                <Text>Medication: {props.log.medication}</Text>
                <Text>Dosage: {props.log.dosage}</Text>
                <Text>Notes: {props.log.notes}</Text>
            </View>
        </View>
    )
}

const DateHistory = (props: Props) => {
    const { date } = props.route.params;

    const [seizures, setSeizures] = useState<any[]>([]);
    const [surveys, setSurveys] = useState<any[]>([]);
    const [medications, setMedications] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const results = await HistoryDao.getAllLogsByDate(date.dateString);
            setSeizures(results['seizures']);
            setSurveys(results['surveys']);
            setMedications(results['medications']);
        })();
    }, [date]);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={HistoryStyles.SectionHeader}>Seizures</Text>
                {seizures.length > 0 ?
                    seizures.map(function (seizure, key) {
                        return <SeizureCard log={seizure} key={key} navigation={props.navigation}/>
                    })
                    :
                    <View>
                        <Text style={HistoryStyles.HistoryAlternateText}>No Seizure Events recorded for this date.</Text>
                        { }
                        <Button
                            title="Record Seizure for this date."
                            onPress={() => props.navigation.navigate('LogSeizure', { date: date })}
                        ></Button>
                    </View>
                }
                <Text style={HistoryStyles.SectionHeader}>Surveys</Text>
                {surveys.length > 0 ?
                    surveys.map(function (survey, key) {
                        return <SurveyCard log={survey} key={key} navigation={props.navigation}/>
                    })
                    :
                    <View>
                        <Text style={HistoryStyles.HistoryAlternateText}>No Surveys recorded for this date.</Text>
                        <Button
                            title="Record Survey for this date."
                            onPress={() => props.navigation.navigate('DailySurvey', { date: date })}
                        ></Button>
                    </View>
                }
                <Text style={HistoryStyles.SectionHeader}>Medications</Text>
                {medications.length > 0 ?
                    medications.map(function (medication, key) {
                        return <MedicationCard log={medication} key={key} navigation={props.navigation} />
                    })
                    :
                    <View>
                        <Text style={HistoryStyles.HistoryAlternateText}>No Medications recorded for this date.</Text>
                        <Button
                            title="Record Medications for this date."
                            onPress={() => props.navigation.navigate('DailySurvey', { date: date })}
                        ></Button>
                    </View>

                }
            </ScrollView>
        </SafeAreaView >
    )
}

export default DateHistory;