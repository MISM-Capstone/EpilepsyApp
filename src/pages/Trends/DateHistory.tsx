import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import HistoryDao from '../../_services/database/dao/HistoryDao';

type Props = {
    navigation: any;
    route: any
};

type RenderProps = {
    log: any;
}

function SeizureCard(props: RenderProps) {
    return (
        <View style={{ backgroundColor: `#ccc`, padding: 12, borderColor: `#000`, margin: 16 }}>
            <View>
                <Text>Time: {props.log.time}</Text>
                <Text>Location: {props.log.location}</Text>
                <Text>Notes: {props.log.notes}</Text>
            </View>
        </View>
    )
}

function SurveyCard(props: RenderProps) {
    return (
        <View style={{ backgroundColor: `#ccc`, padding: 12, borderColor: `#000`, margin: 16 }}>
            <View>
                <Text>Sleep: {props.log.sleep}</Text>
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
        <View style={{ backgroundColor: `#ccc`, padding: 12, borderColor: `#000`, margin: 16 }}>
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
            console.log('&&&&&&&&&&&&&&&&&');
            console.log('DATE: ', date.dateString);
            const results = await HistoryDao.getAllLogsByDate(date.dateString);
            console.log("RESULTS: ", results['seizures']);
            setSeizures(results['seizures']);
            setSurveys(results['surveys']);
            setMedications(results['medications']);
        })();
    }, []);

    return (
        // TODO: can't use flat list inside of scroll view
        <SafeAreaView>
            <Text style={{ fontSize: 24, fontWeight: `bold`, paddingTop: 10 }}>Seizures</Text>
            {seizures.length > 0 ?
                <FlatList
                    data={seizures}
                    renderItem={({ item }) => <SeizureCard log={item} />}
                    keyExtractor={(item) => item.seizure_id.toString()}
                />
                :
                <Text>No Seizure Events recorded for this date.</Text>
            }
            <Text style={{ fontSize: 24, fontWeight: `bold`, paddingTop: 10 }}>Surveys</Text>
            {surveys.length > 0 ?
                <FlatList
                    data={surveys}
                    renderItem={({ item }) => <SurveyCard log={item} />}
                    keyExtractor={(item) => item.survey_entry_id.toString()}
                />
                :
                <Text>No Surveys recorded for this date.</Text>}

            <Text style={{ fontSize: 24, fontWeight: `bold`, paddingTop: 10 }}>Medications</Text>
            {medications.length > 0 ?
                <FlatList
                    data={medications}
                    renderItem={({ item }) => <MedicationCard log={item} />}
                    keyExtractor={(item) => item.medication_id.toString()}
                />
                :
                <Text>No Medications recorded for this date.</Text>
            }

        </SafeAreaView >
    )
}

export default DateHistory;