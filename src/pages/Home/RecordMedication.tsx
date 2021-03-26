import React, { useState, useEffect } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import MedicationLogDao from '../../_services/database/dao/MedicationLogDao';
import SurveyStyles from '../../styles/SurveyStyles';
import MedicationLog, { MedicationLogDb } from '../../models/Medication/MedicationLog';
import { GetAuthContext } from '../../_services/Providers/AuthProvider';
import { CopyAndSetKey } from '../../functions';
import { RouteProp } from '@react-navigation/native';
import MedicationDao from '../../_services/database/dao/MedicationDao';
import Medication from '../../models/Medication/Medication';
import DosageUnit from '../../models/DosageUnits';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import { Picker } from '@react-native-picker/picker';

type RecordMedicationScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'RecordMedication'>;
type LogSeizureScreenRouteProp = RouteProp<HomeStackParamList, 'RecordMedication'>;

type Props = {
    navigation: RecordMedicationScreenNavigationProp;
    route: LogSeizureScreenRouteProp;
};


export default function RecordMedication(props: Props) {
    const {user} = GetAuthContext();
    const [medicationLog, setMedicationLog] = useState<MedicationLog>(new MedicationLog(user!.id!));
    const [medications, setMedications] = useState<Medication[]>([]);
    const [dosageUnits, setDosageUnits] = useState<DosageUnit[]>([]);

    function updateValue(key:string, value:any){
        const seizLog = CopyAndSetKey(medicationLog, key, value) as MedicationLog;
        setMedicationLog(seizLog);
    }
    
    useEffect(() => {
        if (props.route.params && props.route.params.date) {
            // TODO - Figure out what object type date is
            let date: any = props.route.params.date;
            let paramDate = new Date(date.dateString.replace(/-/g, '\/'));
            updateValue(MedicationLogDb.fields.date, paramDate);
        }
    }, []);

    useEffect(() => {
        if (props.route.params.medication_id) {
            updateValue(MedicationLogDb.fields.medication_id, props.route.params.medication_id);
        }
        (async () => {
            const meds = await MedicationDao.getAll();
            const currentMed = meds.find((med) => {
                return med.id === medicationLog.medication_id;
            });
            if (meds.length > 0 && !currentMed && medicationLog.medication_id === 0) {
                updateValue(MedicationLogDb.fields.medication_id, meds[0].id)
            }
            setMedications(meds);
        })();
    }, [props.route.params.medication_id]);

    useEffect(() => {
        if (props.route.params.dosage_unit_id) {
            updateValue(MedicationLogDb.fields.dosage_unit_id, props.route.params.dosage_unit_id);
        }
        (async () => {
            const dosages = await DosageUnitDao.getAll();
            const currentDos = dosages.find((dos) => {
                return dos.id === medicationLog.dosage_unit_id;
            });
            if (dosages.length > 0 && !currentDos && medicationLog.dosage_unit_id === 0) {
                updateValue(MedicationLogDb.fields.dosage_unit_id, dosages[0].id)
            }
            setDosageUnits(dosages);
        })();
    }, [props.route.params.dosage_unit_id]);



    const onChangeDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || medicationLog.date;
        updateValue(MedicationLogDb.fields.date, currentDate);
    };

    const onChangeTime = (_event: Event, selectedDate: Date | undefined) => {
        const currentTime = selectedDate || medicationLog.date;
        console.log(selectedDate);
        updateValue(MedicationLogDb.fields.time, currentTime.toLocaleTimeString());
        updateValue(MedicationLogDb.fields.date, currentTime);
    };

    const insertQuery = async () => {
        let results = await MedicationLogDao.insert(medicationLog);
        console.log('inserted: ', results);
        props.navigation.goBack();
    }

    return (
        <SafeAreaView>
            <View style={SurveyStyles.surveyContainer}>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Date of Medication</Text>
                    <DateTimePicker
                        testID="datePicker"
                        value={medicationLog.date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        maximumDate={new Date()}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Time of Medication</Text>
                    <DateTimePicker
                        testID="timePicker"
                        value={medicationLog.date}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Medication</Text>
                    <Button title="Add Medication" onPress={() => {
                        props.navigation.navigate("AddLocation", {previousPage:"RecordMedication"})
                    }} />
                    {
                        medications.length ?
                            <Picker
                                selectedValue={medicationLog.medication_id}
                                onValueChange={(itemValue, itemIndex) => {
                                    updateValue(MedicationLogDb.fields.medication_id, itemValue);
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
                    
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Dosage</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={(value) => {
                            updateValue(MedicationLogDb.fields.dosage_unit_id, value);
                        }}
                        value={medicationLog.dosage.toString()} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Medication</Text>
                    <Button title="Add Dosage Unit" onPress={() => {
                        props.navigation.navigate("AddLocation", {previousPage:"RecordMedication"})
                    }} />
                    {
                        dosageUnits.length ?
                            <Picker
                                selectedValue={medicationLog.dosage_unit_id}
                                onValueChange={(itemValue, itemIndex) => {
                                    updateValue(MedicationLogDb.fields.dosage_unit_id, itemValue);
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
                    
                </View>
            </View>
            <Button title="Save" onPress={() => insertQuery()} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
