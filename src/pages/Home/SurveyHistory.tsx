import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import HistoryDao from '../../_services/database/dao/HistoryDao';

type Props = {
    navigation: any;
};

type RenderProps = {
    log: any;
}

function SeizureCard(props: RenderProps) {
    return (
        <View style={{ backgroundColor: `#ccc`, padding: 12, borderColor: `#000`, margin: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: `bold` }}>{props.log.date}</Text>
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
            <Text style={{ fontSize: 16, fontWeight: `bold` }}>{props.log.date}</Text>
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
            <Text style={{ fontSize: 16, fontWeight: `bold` }}>{props.log.date}</Text>
            <View>
                <Text>Time: {props.log.time}</Text>
                <Text>Medication: {props.log.medication}</Text>
                <Text>Dosage: {props.log.dosage}</Text>
                <Text>Notes: {props.log.notes}</Text>
            </View>
        </View>
    )
}

export default function SurveyHistory(props: Props) {
    const [seizures, setSeizures] = useState<any[]>([]);
    const [surveys, setSurveys] = useState<any[]>([]);
    const [medications, setMedications] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const results = await HistoryDao.getAllLogs();
            console.log(results);
            setSeizures(results['seizures']);
            setSurveys(results['surveys']);
            setMedications(results['medications']);
        })();
    }, []);


    return (
        // TODO: can't use flat list inside of scroll view
        <SafeAreaView>
            <Text style={{ fontSize: 24, fontWeight: `bold`, paddingTop: 10}}>Seizures</Text>
            {seizures.length > 0 ?
                <FlatList
                    data={seizures}
                    renderItem={({ item }) => <SeizureCard log={item} />}
                    keyExtractor={(item) => item.seizure_id.toString()}
                />
                :
                <Text>No Seizure Events Recorded.</Text>
            }
            <Text style={{ fontSize: 24, fontWeight: `bold`, paddingTop: 10}}>Surveys</Text>
            {surveys.length > 0 ?
                <FlatList
                    data={surveys}
                    renderItem={({ item }) => <SurveyCard log={item} />}
                    keyExtractor={(item) => item.survey_entry_id.toString()}
                />
                :
                <Text>No Surveys Recorded.</Text>}

            <Text style={{ fontSize: 24, fontWeight: `bold`, paddingTop: 10}}>Medications</Text>
            {medications.length > 0 ?
                <FlatList
                    data={medications}
                    renderItem={({ item }) => <MedicationCard log={item} />}
                    keyExtractor={(item) => item.medication_id.toString()}
                />
                :
                <Text>No Medications Recorded.</Text>
            }

        </SafeAreaView >
    )
}