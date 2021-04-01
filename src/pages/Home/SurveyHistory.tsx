import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DosageUnit from '../../models/DosageUnits';
import Location from '../../models/Location';
import Medication from '../../models/Medication/Medication';
import MedicationLog from '../../models/Medication/MedicationLog';
import SeizureLog from '../../models/SeizureLog';
import SurveyLog from '../../models/Surveys/SurveyLog';
import HistoryStyles from '../../styles/HistoryStyles';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import HistoryDao from '../../_services/database/dao/HistoryDao';
import LocationDao from '../../_services/database/dao/LocationDao';
import MedicationDao from '../../_services/database/dao/MedicationDao';
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
            <Text style={HistoryStyles.HistoryCardTitle}>{props.seizure.date.toString()}</Text>
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

type RenderMedicationLog = {
    log:MedicationLog;
    medications:Medication[];
    dosageUnits:DosageUnit[];
}

function MedicationCard(props: RenderMedicationLog) {
    const currentMed = props.medications.find((med) => {
        return med.id === props.log.medication_id;
    });
    const medication = currentMed?currentMed.name:"";

    const currentDos = props.dosageUnits.find((dos) => {
        return dos.id === props.log.dosage_unit_id;
    });
    const dosageUnit = currentDos?currentDos.name:"";
    return (
        <View style={HistoryStyles.HistoryEventCard}>
            <Text style={HistoryStyles.HistoryCardTitle}>{props.log.date}</Text>
            <View>
                <Text>Time: {props.log.time}</Text>
                <Text>Medication: {medication}</Text>
                <Text>Dosage: {props.log.dosage} {dosageUnit}</Text>
            </View>
        </View>
    )
}

export default function SurveyHistory(props: Props) {
    const [results, setResults] = useState(
        {
            seizures: [] as SeizureLog[],
            surveys: [] as SurveyLog[],
            medications: [] as MedicationLog[],
        }
    );
    const [locations, setLocations] = useState<Location[]>([]);
    const [medications, setMedications] = useState<Medication[]>([]);
    const [dosageUnits, setDosageUnits] = useState<DosageUnit[]>([]);

    useEffect(() => {
        (async () => {
            const results = await HistoryDao.getAllLogs();
            setResults(results);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const locs = await LocationDao.getAll();
            setLocations(locs);
            const meds = await MedicationDao.getAll();
            setMedications(meds);
            const dos = await DosageUnitDao.getAll();
            setDosageUnits(dos);
        })();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={HistoryStyles.SectionHeader}>Seizures</Text>
                {results.seizures.length > 0 ?
                    results.seizures.map(function (seizure, key) {
                        return (
                            <SeizureCard
                                seizure={seizure}
                                locations={locations}
                                key={key}
                            />
                        );
                    })
                    :
                    <Text style={HistoryStyles.HistoryAlternateText}>
                        No Seizure Events recorded for this date.
                    </Text>
                }
                <Text style={HistoryStyles.SectionHeader}>Surveys</Text>
                {results.surveys.length > 0 ?
                    results.surveys.map(function (survey, key) {
                        return <SurveyCard log={survey} key={key} />
                    })
                    :
                    <Text style={HistoryStyles.HistoryAlternateText}>
                        No Surveys recorded for this date.
                    </Text>
                }
                <Text style={HistoryStyles.SectionHeader}>Medications</Text>
                {results.medications.length > 0 ?
                    results.medications.map(function (medication, key) {
                        return (
                            <MedicationCard
                                log={medication}
                                dosageUnits={dosageUnits}
                                medications={medications}
                                key={key}
                            />
                        );
                    })
                    :
                    <Text style={HistoryStyles.HistoryAlternateText}>
                        No Medications recorded for this date.
                    </Text>
                }
            </ScrollView>
        </SafeAreaView >
    )
}