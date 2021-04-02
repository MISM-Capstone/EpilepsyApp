import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MedicationLogCard from '../../components/SummaryCards/MedicationLogCard';
import SeizureLogCard from '../../components/SummaryCards/SeizureLogCard';
import { TabOptions } from '../../components/TabOptions';
import DosageUnit from '../../models/DosageUnits';
import Location from '../../models/Location';
import Medication from '../../models/Medication/Medication';
import MedicationLog from '../../models/Medication/MedicationLog';
import SeizureLog from '../../models/SeizureLog';
import SurveyLog from '../../models/Surveys/SurveyLog';
import { HomeOptions, HomeStackParamList } from '../../navigation/Home/HomeNavProps';
import HistoryStyles from '../../styles/HistoryStyles';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import HistoryDao from '../../_services/database/dao/HistoryDao';
import LocationDao from '../../_services/database/dao/LocationDao';
import MedicationDao from '../../_services/database/dao/MedicationDao';
import sleepDatesService from '../../_services/helpers/sleepDates.service';
import { GetUpdateContext } from '../../_services/Providers/UpdateProvider';

type HistNavProp = StackNavigationProp<HomeStackParamList, HomeOptions.SurveyHistory>;
type HistRouteProp = RouteProp<HomeStackParamList, HomeOptions.SurveyHistory>;

type Props = {
    navigation: HistNavProp;
    route: HistRouteProp;
};

type RenderProps = {
    log: any;
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

export default function SurveyHistory(props: Props) {
    const updateContext = GetUpdateContext();
    const [results, setResults] = useState(
        {
            seizures: [] as SeizureLog[],
            surveys: [] as SurveyLog[],
            medications: [] as MedicationLog[],
        }
    );
    const [locations, setLocations] = useState<Location[]>([]);
    const [meds, setMeds] = useState<Medication[]>([]);
    const [dosageUnits, setDosageUnits] = useState<DosageUnit[]>([]);

    async function setEverything() {
        const results = await HistoryDao.getAllLogs();
        setResults(results);
        const locs = await LocationDao.getAll();
        setLocations(locs);
        const dbMeds = await MedicationDao.getAll();
        setMeds(dbMeds);
        const dos = await DosageUnitDao.getAll();
        setDosageUnits(dos);
    }

    useEffect(() => {
        setEverything()
    }, []);

    useEffect(() => {
        const updateObj = updateContext.getUpdatedObj(props.route.name);
        if (updateObj) {
            setEverything();
        }
    }, [updateContext.hasObject]);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={HistoryStyles.SectionHeader}>Seizures</Text>
                {results.seizures.length > 0 ?
                    results.seizures.map(function (seizure, key) {
                        return (
                            <SeizureLogCard
                                key={key}
                                seizure={seizure}
                                locations={locations}
                                onClick={() => {
                                    updateContext.setPageToUpdate(props.route.name);
                                    props.navigation.navigate(
                                        HomeOptions.LogSeizure,
                                        {
                                            tab:TabOptions.home,
                                            id:seizure.id!,
                                        }
                                    );
                                }}
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
                            <MedicationLogCard
                                key={key}
                                medicationLog={medication}
                                medications={meds}
                                dosageUnits={dosageUnits}
                                onClick={() => {
                                    updateContext.setPageToUpdate(props.route.name);
                                    props.navigation.navigate(
                                        HomeOptions.RecordMedication,
                                        {
                                            tab:TabOptions.home,
                                            id:medication.id!,
                                        }
                                    );
                                }}
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