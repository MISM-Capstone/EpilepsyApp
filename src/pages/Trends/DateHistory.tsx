import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MedicationLogCard from '../../components/SummaryCards/MedicationLogCard';
import SeizureLogCard from '../../components/SummaryCards/SeizureLogCard';
import { TabOptions } from "../../components/TabOptions";
import DosageUnit from '../../models/DosageUnits';
import Location from '../../models/Location';
import Medication from '../../models/Medication/Medication';
import MedicationLog from '../../models/Medication/MedicationLog';
import SeizureLog from '../../models/SeizureLog';
import SurveyLog from '../../models/Surveys/SurveyLog';
import { TrendOptions, TrendsStackParamList } from "../../navigation/Trends/TrendsNavProps";
import HistoryStyles from '../../styles/HistoryStyles';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import HistoryDao from '../../_services/database/dao/HistoryDao';
import LocationDao from '../../_services/database/dao/LocationDao';
import MedicationDao from '../../_services/database/dao/MedicationDao';
import sleepDatesService from '../../_services/helpers/sleepDates.service';
import { GetUpdateContext } from '../../_services/Providers/UpdateProvider';

type DateHistNavProp = StackNavigationProp<TrendsStackParamList, TrendOptions.DateHistory>;
type DateHistRouteProp = RouteProp<TrendsStackParamList, TrendOptions.DateHistory>;

type Props = {
    navigation: DateHistNavProp;
    route: DateHistRouteProp;
};

type RenderProps = {
    log: any;
    key: number;
    navigation: DateHistNavProp;
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

const DateHistory = (props: Props) => {
    const updateContext = GetUpdateContext();
    const { date } = props.route.params;

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
        let sendDate = new Date(date.year, date.month - 1, date.day);
        const results = await HistoryDao.getAllLogsByDate(sendDate);
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
                    results.seizures.map(function (seizure) {
                        return (
                            <SeizureLogCard
                                key={seizure.id}
                                seizure={seizure}
                                locations={locations}
                                onClick={() => {
                                    updateContext.setPageToUpdate(props.route.name);
                                    props.navigation.navigate(
                                        TrendOptions.UpdateSeizureLog,
                                        {
                                            tab:TabOptions.trends,
                                            id:seizure.id!,
                                        }
                                    );
                                }}
                            />
                        )
                    })
                    :
                    <View>
                        <Text style={HistoryStyles.HistoryAlternateText}>No Seizure Events recorded for this date.</Text>
                    </View>
                }
                <Button
                    title="Record Seizure for this date."
                    onPress={() => {
                        updateContext.setPageToUpdate(props.route.name);
                        props.navigation.navigate(
                            TrendOptions.UpdateSeizureLog,
                            {
                                tab:TabOptions.trends,
                            }
                        );
                    }}
                />
                <Text style={HistoryStyles.SectionHeader}>Surveys</Text>
                {results.surveys.length > 0 ?
                    results.surveys.map(function (survey, key) {
                        return <SurveyCard log={survey} key={key} navigation={props.navigation} />
                    })
                    :
                    <View>
                        <Text style={HistoryStyles.HistoryAlternateText}>No Surveys recorded for this date.</Text>
                    </View>
                }
                <Button
                    title="Record Survey for this date."
                    onPress={() => {
                        updateContext.setPageToUpdate(props.route.name);
                        props.navigation.navigate(
                            TrendOptions.UpdateSurveyLog,
                            {
                                tab:TabOptions.trends,
                            }
                        );
                    }}
                />
                <Text style={HistoryStyles.SectionHeader}>Medications</Text>
                {results.medications.length > 0 ?
                    results.medications.map(function (medication) {
                        return (
                            <MedicationLogCard
                                key={medication.id}
                                medicationLog={medication}
                                medications={meds}
                                dosageUnits={dosageUnits}
                                onClick={() => {
                                    updateContext.setPageToUpdate(props.route.name);
                                    props.navigation.navigate(
                                        TrendOptions.UpdateMedLog,
                                        {
                                            tab:TabOptions.trends,
                                            id:medication.id!,
                                        }
                                    );
                                }}
                            />
                        )
                    })
                    :
                    <View>
                        <Text style={HistoryStyles.HistoryAlternateText}>No Medications recorded for this date.</Text>
                    </View>
                }
                <Button
                    title="Record Medication for this date."
                    onPress={() => {
                        updateContext.setPageToUpdate(props.route.name);
                        props.navigation.navigate(
                            TrendOptions.UpdateMedLog,
                            {
                                tab:TabOptions.trends,
                            }
                        );
                    }}
                />
            </ScrollView>
        </SafeAreaView >
    )
}

export default DateHistory;