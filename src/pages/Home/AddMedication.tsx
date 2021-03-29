import React, { useEffect, useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SurveyStyles from '../../styles/SurveyStyles';
import { CopyAndSetKey } from '../../functions';
import { RouteProp } from '@react-navigation/native';
import Medication, { MedicationDb } from '../../models/Medication/Medication';
import MedicationDao from '../../_services/database/dao/MedicationDao';
import DosageUnit from '../../models/DosageUnits';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import { Picker } from '@react-native-picker/picker';

type MedicationcreenNavigationProp = StackNavigationProp<HomeStackParamList, 'AddMedication'>;
type MedicationScreenRouteProp = RouteProp<HomeStackParamList, 'AddMedication'>;

type Props = {
    navigation: MedicationcreenNavigationProp;
    route: MedicationScreenRouteProp;
};


export default function AddMedication(props: Props) {
    const [medication, setMedication] = useState(new Medication());
    const [dosageUnits, setDosageUnits] = useState<DosageUnit[]>([]);

    function updateValue(key:keyof Medication, value:any){
        const med = CopyAndSetKey(medication, key, value);
        setMedication(med);
    }

    useEffect(() => {
        if (props.route.params.dosage_unit_id) {
            updateValue(MedicationDb.fields.dosage_unit_id, props.route.params.dosage_unit_id);
        }
        (async () => {
            const dosages = await DosageUnitDao.getAll();
            const currentDos = dosages.find((dos) => {
                return dos.id === medication.dosage_unit_id;
            });
            if (dosages.length > 0 && !currentDos && medication.dosage_unit_id === 0) {
                updateValue(MedicationDb.fields.dosage_unit_id, dosages[0].id)
            }
            setDosageUnits(dosages);
        })();
    }, [props.route.params.dosage_unit_id]);

    // TODO: find way for errors to be displayed
    const checkErrors = () => {
        insertQuery();
    }

    const insertQuery = async () => {
        let results = await MedicationDao.insert(medication);
        if (results) {
            console.log('inserted: ', results);
            if (props.route.params.previousPage) {
                props.navigation.navigate(props.route.params.previousPage, {medication_id:results.insertId});
            } else {
                props.navigation.goBack();
            }
        }
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Name</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={(value) => {
                            updateValue(MedicationDb.fields.name, value);
                        }}
                        value={medication.name} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Description</Text>
                    <TextInput
                        style={{ backgroundColor: 'lightgray', height: 100 }}
                        onChangeText={(value) => {
                            updateValue(MedicationDb.fields.description, value);
                        }}
                        value={medication.description}
                        multiline
                        numberOfLines={5} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Dosage</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={(value) => {
                            updateValue(MedicationDb.fields.dosage, value);
                        }}
                        value={medication.dosage.toString()} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Dosage Unit</Text>
                    <Button title="Add Dosage Unit" onPress={() => {
                        props.navigation.navigate("AddDosageUnit", {previousPage:"AddMedication"})
                    }} />
                    {
                        dosageUnits.length ?
                            <Picker
                                selectedValue={medication.dosage_unit_id}
                                onValueChange={(itemValue, itemIndex) => {
                                    updateValue(MedicationDb.fields.dosage_unit_id, itemValue);
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
            <Button title="Save" onPress={() => checkErrors()} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
