import React, { useState, useEffect, useRef } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import MedicationLogDao from '../../_services/database/dao/MedicationLogDao';
import SurveyStyles from '../../styles/SurveyStyles';
import MedicationLog, { MedicationLogDb } from '../../models/Medication/MedicationLog';
import { GetAuthContext } from '../../_services/Providers/AuthProvider';
import { updateValue, updateValues } from '../../functions';
import { RouteProp } from '@react-navigation/native';
import MedicationDao from '../../_services/database/dao/MedicationDao';
import Medication from '../../models/Medication/Medication';
import DosageUnit from '../../models/DosageUnits';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import { Picker } from '@react-native-picker/picker';
import { InputContainer } from '../../components/Inputs/InputComponents';
import { SingleInput } from '../../components/Inputs/Input';
import { TabOptions } from "../../components/TabOptions";

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
    const [newMedication, setNewMedication] = useState<Medication>();

    function update<TProp extends keyof MedicationLog>(key:TProp, value:MedicationLog[TProp]){
        updateValue(medicationLog, key, value, setMedicationLog);
    }

    function updateMedication(medication:Medication) {
        let keyList:(keyof MedicationLog)[] = [];
        let valueList:any[] = [];

        if (medicationLog.medication_id !== medication.id) {
            keyList.push(MedicationLogDb.fields.medication_id);
            valueList.push(medication.id!);
        }

        const oldMedication = medications.find((med) => {
            return med.id === medicationLog.medication_id;
        });

        if (medicationLog.dosage === 0 || (oldMedication && medicationLog.dosage === oldMedication.dosage)) {
            keyList.push(MedicationLogDb.fields.dosage);
            valueList.push(medication.dosage);
        }
        if (medicationLog.dosage_unit_id === 0 || (oldMedication && medicationLog.dosage_unit_id === oldMedication.dosage_unit_id)) {
            keyList.push(MedicationLogDb.fields.dosage_unit_id);
            valueList.push(medication.dosage_unit_id);
        }


        updateValues(medicationLog, keyList, valueList, setMedicationLog);
    }
    
    useEffect(() => {
        if (props.route.params && props.route.params.date) {
            // TODO - Figure out what object type date is
            let date: any = props.route.params.date;
            let paramDate = new Date(date.dateString.replace(/-/g, '\/'));
            update(MedicationLogDb.fields.date, paramDate);
            updateValue(medicationLog, MedicationLogDb.fields.date, paramDate, setMedicationLog);
        }
    }, []);

    useEffect(() => {
        const medId = props.route.params.medication_id;
        if (medId) {
            (async () => {
                const med = await MedicationDao.getById(medId);
                if (med) {
                    updateMedication(med);
                }
                setNewMedication(med);
            })();
        }
    }, [props.route.params.medication_id]);

    useEffect(() => {
        (async () => {
            const meds = await MedicationDao.getAll();
            setMedications(meds);
        })();
    }, [newMedication]);

    useEffect(() => {
        const currentMed = medications.find((med) => {
            return med.id === medicationLog.medication_id;
        });
        if (medications.length > 0 && !currentMed && medicationLog.medication_id === 0) {
            updateMedication(medications[0]);
        } else if (currentMed) {
            updateMedication(currentMed);
        }
    }, [medications]);

    useEffect(() => {
        if (props.route.params.dosage_unit_id) {
            update(MedicationLogDb.fields.dosage_unit_id, props.route.params.dosage_unit_id);
        }
        (async () => {
            const dosages = await DosageUnitDao.getAll();
            setDosageUnits(dosages);
        })();
    }, [props.route.params.dosage_unit_id, newMedication]);

    useEffect(() => {
        const currentDos = dosageUnits.find((dos) => {
            return dos.id === medicationLog.dosage_unit_id;
        });
        if (dosageUnits.length > 0 && !currentDos && medicationLog.dosage_unit_id === 0) {
            update(MedicationLogDb.fields.dosage_unit_id, dosageUnits[0].id!)
        } else if (currentDos) {
            update(MedicationLogDb.fields.dosage_unit_id, currentDos.id!)
        }
    }, [dosageUnits]);



    const onChangeDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || medicationLog.date;
        update(MedicationLogDb.fields.date, currentDate);
    };

    const onChangeTime = (_event: Event, selectedDate: Date | undefined) => {
        const currentTime = selectedDate || medicationLog.date;
        console.log(selectedDate);
        update(MedicationLogDb.fields.time, currentTime.toLocaleTimeString());
        update(MedicationLogDb.fields.date, currentTime);
    };

    const insertQuery = async () => {
        let results = await MedicationLogDao.save(medicationLog);
        console.log('inserted: ', results);
        props.navigation.goBack();
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
                            props.navigation.navigate("AddMedication", {tab:TabOptions.home, previousPage:"RecordMedication"})
                        }} />
                        {
                            medications.length ?
                                <Picker
                                    selectedValue={medicationLog.medication_id}
                                    onValueChange={(itemValue, itemIndex) => {
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
                            update(MedicationLogDb.fields.dosage, parseFloat(value));
                        }}
                        value={medicationLog.dosage.toString()}
                    />
                    <InputContainer title="Dosage Unit">
                        <Button title="Add Dosage Unit" onPress={() => {
                            props.navigation.navigate("AddDosageUnit", {tab:TabOptions.home, previousPage:"RecordMedication"})
                        }} />
                        {
                            dosageUnits.length ?
                                <Picker
                                    selectedValue={medicationLog.dosage_unit_id}
                                    onValueChange={(itemValue, itemIndex) => {
                                        update(MedicationLogDb.fields.dosage_unit_id, itemValue);
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
