import React, { useState, useEffect } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeOptions, HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import MedicationLogDao from '../../_services/database/dao/MedicationLogDao';
import SurveyStyles from '../../styles/SurveyStyles';
import MedicationLog from '../../models/Medication/MedicationLog';
import { GetAuthContext } from '../../_services/Providers/AuthProvider';
import { returnToPreviousPage, updateValue, updateValues } from '../../functions';
import { RouteProp } from '@react-navigation/native';
import MedicationDao from '../../_services/database/dao/MedicationDao';
import Medication from '../../models/Medication/Medication';
import DosageUnit from '../../models/DosageUnits';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import { Picker } from '@react-native-picker/picker';
import { InputContainer } from '../../components/Inputs/InputComponents';
import { SingleInput } from '../../components/Inputs/Input';
import { TabOptions } from "../../components/TabOptions";
import { GetUpdateContext } from '../../_services/Providers/UpdateProvider';
import { TrendOptions, TrendsStackParamList } from '../../navigation/Trends/TrendsNavProps';

type HomeNavProp = StackNavigationProp<HomeStackParamList, HomeOptions.RecordMedication>;
type HomeRouteProps = RouteProp<HomeStackParamList, HomeOptions.RecordMedication>;

type trendNavProp = StackNavigationProp<TrendsStackParamList, TrendOptions.UpdateMedLog>;
type trendRouteProp = RouteProp<TrendsStackParamList, TrendOptions.UpdateMedLog>;

type Props = {
    navigation: HomeNavProp | trendNavProp;
    route: HomeRouteProps | trendRouteProp;
};


export default function RecordMedication(props: Props) {
    const {user} = GetAuthContext();
    const updateContext = GetUpdateContext();
    const [medicationLog, setMedicationLog] = useState<MedicationLog>(new MedicationLog(user!.id!));
    const [medications, setMedications] = useState<Medication[]>([]);
    const [dosageUnits, setDosageUnits] = useState<DosageUnit[]>([]);
    const id = props.route.params.id;

    useEffect(() => {
        (async () => {
            if (id) {
                const foundMedLog = await MedicationLogDao.getById(id);
                if (foundMedLog) {
                    setMedicationLog(foundMedLog);
                }
            }
        })();
    }, [props.route.params.id]);

    function update<TProp extends keyof MedicationLog>(key:TProp, value:MedicationLog[TProp]){
        updateValue(medicationLog, key, value, setMedicationLog);
    }

    function updateMedication(medication:Medication) {
        let keyList:(keyof MedicationLog)[] = [];
        let valueList:any[] = [];

        if (medicationLog.medication_id !== medication.id) {
            keyList.push(medicationLog.db.fields.medication_id);
            valueList.push(medication.id!);
        }

        if (medicationLog.dosage === 0 || (medication.dosage !== medicationLog.dosage)) {
            keyList.push(medicationLog.db.fields.dosage);
            valueList.push(medication.dosage);
        }
        if (medicationLog.dosage_unit_id === 0 || (medication.dosage_unit_id !== medicationLog.dosage_unit_id)) {
            keyList.push(medicationLog.db.fields.dosage_unit_id);
            valueList.push(medication.dosage_unit_id);
        }

        updateValues(medicationLog, keyList, valueList, setMedicationLog);
    }

    async function getMedications() {
        const meds = await MedicationDao.getAll();
        const currentMed = meds.find((med) => {
            return med.id === medicationLog.medication_id;
        });
        if (meds.length > 0 && !currentMed && medicationLog.medication_id === 0) {
            updateMedication(meds[0]);
        } else if (currentMed) {
            updateMedication(currentMed);
        }
        setMedications(meds);
    }

    async function getDosageUnits() {
        const dosages = await DosageUnitDao.getAll();
        const currentDos = dosages.find((dos) => {
            return dos.id === medicationLog.dosage_unit_id;
        });
        if (dosages.length > 0 && !currentDos && medicationLog.dosage_unit_id === 0) {
            update(medicationLog.db.fields.dosage_unit_id, dosages[0].id!)
        }
        setDosageUnits(dosages);
    }

    useEffect(() => {
        if (!id || id === medicationLog.id) {
            getDosageUnits();
        }
    }, [medicationLog.dosage_unit_id])

    useEffect(() => {
        if (!id || id === medicationLog.id) {
            getMedications();
        }
    }, [medicationLog.medication_id]);

    useEffect(() => {
        if (props.route.params.tab === TabOptions.home && props.route.params.date) {
            // TODO - Figure out what object type date is
            let date: any = props.route.params.date;
            let paramDate = new Date(date.dateString.replace(/-/g, '\/'));
            update(medicationLog.db.fields.date, paramDate);
            updateValue(medicationLog, medicationLog.db.fields.date, paramDate, setMedicationLog);
        }
    }, []);

    useEffect(() => {
        const updatedObj = updateContext.getUpdatedObjbyType(props.route.name, Medication);
        if (updatedObj) {
            update(medicationLog.db.fields.medication_id, updatedObj.id);
        }
    }, [updateContext.hasObject]);

    useEffect(() => {
        const updatedObj = updateContext.getUpdatedObjbyType(props.route.name, DosageUnit);
        if (updatedObj) {
            update(medicationLog.db.fields.dosage_unit_id, updatedObj.id);
        }
    }, [updateContext.hasObject]);

    const onChangeDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || medicationLog.date;
        update(medicationLog.db.fields.date, currentDate);
    };

    const onChangeTime = (_event: Event, selectedDate: Date | undefined) => {
        const currentTime = selectedDate || medicationLog.date;
        update(medicationLog.db.fields.time, currentTime.toLocaleTimeString());
        update(medicationLog.db.fields.date, currentTime);
    };

    const insertQuery = async () => {
        let results = await MedicationLogDao.save(medicationLog);
        if (results) {
            returnToPreviousPage(
                medicationLog,
                results,
                updateContext,
                props.navigation.goBack
            );
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={SurveyStyles.surveyContainer}>
                    <InputContainer title="Date of Medication">
                        <DateTimePicker
                            testID="datePicker"
                            value={medicationLog.date}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                            maximumDate={new Date()}
                        />
                    </InputContainer>
                    <InputContainer title="Time of Medication">
                        <DateTimePicker
                            testID="timePicker"
                            value={medicationLog.date}
                            mode="time"
                            display="default"
                            onChange={onChangeTime}
                        />
                    </InputContainer>
                    <InputContainer title="Medication">
                        <Button title="Add Medication" onPress={() => {
                            updateContext.setPageToUpdate(props.route.name)
                            if (props.route.params.tab ===  TabOptions.home) {
                                const nav = props.navigation as HomeNavProp;
                                nav.navigate(HomeOptions.AddMedication, {tab:TabOptions.home});
                            } else {
                                const nav = props.navigation as trendNavProp;
                                nav.navigate(TrendOptions.UpdateMed, {tab:TabOptions.trends});
                            }
                        }} />
                        {
                            medications.length ?
                                <Picker
                                    selectedValue={medicationLog.medication_id}
                                    onValueChange={(_, itemIndex) => {
                                        updateMedication(medications[itemIndex]);
                                }}>
                                    {
                                        medications.map((med) => {
                                            return <Picker.Item key={med.id} label={med.name} value={med.id!} />
                                        })
                                    }
                                </Picker>
                            :
                                <Text>Please Add a Medication</Text>
                        }
                        
                    </InputContainer>
                    <SingleInput
                        title="Dosage"
                        onChange={(value) => {
                            update(medicationLog.db.fields.dosage, parseFloat(value));
                        }}
                        value={medicationLog.dosage.toString()}
                    />
                    <InputContainer title="Dosage Unit">
                        <Button title="Add Dosage Unit" onPress={() => {
                            updateContext.setPageToUpdate(props.route.name)
                            if (props.route.params.tab ===  TabOptions.home) {
                                const nav = props.navigation as HomeNavProp;
                                nav.navigate(HomeOptions.AddDosageUnit, {tab:TabOptions.home});
                            } else {
                                const nav = props.navigation as trendNavProp;
                                nav.navigate(TrendOptions.UpdateDosageUnit, {tab:TabOptions.trends});
                            }
                        }} />
                        {
                            dosageUnits.length ?
                                <Picker
                                    selectedValue={medicationLog.dosage_unit_id}
                                    onValueChange={(itemValue) => {
                                        update(medicationLog.db.fields.dosage_unit_id, itemValue);
                                }}>
                                    {
                                        dosageUnits.map((units) => {
                                            return <Picker.Item key={units.id} label={units.name} value={units.id!} />
                                        })
                                    }
                                </Picker>
                            :
                                <Text>Please Add a Dosage Unit</Text>
                        }
                        
                    </InputContainer>
                </View>
                <Button title="Save" onPress={() => insertQuery()} />
                <Button title="Cancel" onPress={props.navigation.goBack} />
            </ScrollView>
        </SafeAreaView>
    )
}
