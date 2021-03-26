import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Location from '../../models/Location';
import SeizureLog from '../../models/SeizureLog';
import HistoryStyles from '../../styles/HistoryStyles';
import HistoryDao from '../../_services/database/dao/HistoryDao';
import LocationDao from '../../_services/database/dao/LocationDao';
import sleepDatesService from '../../_services/helpers/sleepDates.service';

type Props = {
    navigation: any;
};

type RenderProps = {
    log: any;
}

type RenderSeizureLog = {
    seizure:SeizureLog;
    locations:Location[];
}

function SeizureCard(props: RenderSeizureLog) {

    const currentLocation = props.locations.find((loc) => {
        return loc.id === props.seizure.location_id;
    });
    const location = currentLocation?currentLocation.name:"";
    return (
        <View style={HistoryStyles.HistoryEventCard}>
            <Text style={HistoryStyles.HistoryCardTitle}>{props.seizure.date}</Text>
            <View>
                <Text>Time: {props.seizure.time}</Text>
                <Text>Location: {location}</Text>
                <Text>Notes: {props.seizure.notes}</Text>
            </View>
        </View>
    )
}

function SurveyCard(props: RenderProps) {
    const sleepTime = sleepDatesService.getSleepTime(props.log.sleep_start_date, props.log.sleep_end_date);
    return (
        <View style={HistoryStyles.HistoryEventCard}>
            <Text style={HistoryStyles.HistoryCardTitle}>{props.log.date}</Text>
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
            <Text style={HistoryStyles.HistoryCardTitle}>{props.log.date}</Text>
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
    const [seizures, setSeizures] = useState<SeizureLog[]>([]);
    const [surveys, setSurveys] = useState<any[]>([]);
    const [medications, setMedications] = useState<any[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        (async () => {
            const results = await HistoryDao.getAllLogs();
            console.log(results);
            setSeizures(results.seizures);
            setSurveys(results.surveys);
            setMedications(results.medications);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const locs = await LocationDao.getAll();
            setLocations(locs);
        })();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={HistoryStyles.SectionHeader}>Seizures</Text>
                {seizures.length > 0 ?
                    seizures.map(function (seizure, key) {
                        return <SeizureCard seizure={seizure} locations={locations} key={key} />
                    })
                    :
                    <Text style={HistoryStyles.HistoryAlternateText}>No Seizure Events recorded for this date.</Text>
                }
                <Text style={HistoryStyles.SectionHeader}>Surveys</Text>
                {surveys.length > 0 ?
                    surveys.map(function (survey, key) {
                        return <SurveyCard log={survey} key={key} />
                    })
                    :
                    <Text style={HistoryStyles.HistoryAlternateText}>No Surveys recorded for this date.</Text>
                }
                <Text style={HistoryStyles.SectionHeader}>Medications</Text>
                {medications.length > 0 ?
                    medications.map(function (medication, key) {
                        return <MedicationCard log={medication} key={key} />
                    })
                    :
                    <Text style={HistoryStyles.HistoryAlternateText}>No Medications recorded for this date.</Text>
                }
            </ScrollView>
        </SafeAreaView >
    )
}