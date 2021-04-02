import React, { useEffect, useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import { CopyAndSetKey, returnToPreviousPage } from '../../functions';
import { RouteProp } from '@react-navigation/native';
import Medication, { MedicationDb } from '../../models/Medication/Medication';
import MedicationDao from '../../_services/database/dao/MedicationDao';
import DosageUnit from '../../models/DosageUnits';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import { Picker } from '@react-native-picker/picker';
import { SingleInput, MultiInput } from '../../components/Inputs/Input';
import { InputContainer } from '../../components/Inputs/InputComponents';
import { TabOptions } from "../../components/TabOptions";
import { GetUpdateContext } from '../../_services/Providers/UpdateProvider';

type MedicationcreenNavigationProp = StackNavigationProp<HomeStackParamList, 'AddMedication'>;
type MedicationScreenRouteProp = RouteProp<HomeStackParamList, 'AddMedication'>;

type Props = {
    navigation: MedicationcreenNavigationProp;
    route: MedicationScreenRouteProp;
};


export default function AddMedication(props: Props) {
    const updateContext = GetUpdateContext();
    const [medication, setMedication] = useState(new Medication());
    const [dosageUnits, setDosageUnits] = useState<DosageUnit[]>([]);

    function updateValue(key:keyof Medication, value:any){
        const med = CopyAndSetKey(medication, key, value);
        setMedication(med);
    }
    
    async function getDosages() {
        const dosages = await DosageUnitDao.getAll();
        const currentDos = dosages.find((dos) => {
            return dos.id === medication.dosage_unit_id;
        });
        if (dosages.length > 0 && !currentDos && medication.dosage_unit_id === 0) {
            updateValue(MedicationDb.fields.dosage_unit_id, dosages[0].id)
        }
        setDosageUnits(dosages);
    }

    useEffect(() => {
        getDosages();
    },[medication.dosage_unit_id]);

    useEffect(() => {
        const updatedObj = updateContext.getUpdatedObj(props.route.name, DosageUnit);
        if (updatedObj) {
            updateValue(MedicationDb.fields.dosage_unit_id, updatedObj.id);
        }
    }, [updateContext.hasObject]);

    // TODO: find way for errors to be displayed
    const checkErrors = () => {
        insertQuery();
    }

    const insertQuery = async () => {
        let results = await MedicationDao.save(medication);
        if (results) {
            returnToPreviousPage(
                medication,
                results,
                updateContext,
                props.navigation.goBack
            );
        }
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <SingleInput
                    title="Name"
                    onChange={(value) => {
                        updateValue(MedicationDb.fields.name, value);
                    }}
                    value={medication.name}
                />
                <MultiInput
                    title="Description"
                    onChange={(value) => {
                        updateValue(MedicationDb.fields.description, value);
                    }}
                    value={medication.description}
                />
                <SingleInput
                    title="Dosage"
                    onChange={(value) => {
                        updateValue(MedicationDb.fields.dosage, value);
                    }}
                    value={medication.dosage.toString()}
                />
                <InputContainer title="Dosage Unit">
                    <Button title="Add Dosage Unit" onPress={() => {
                        updateContext.setPageToUpdate(props.route.name);
                        props.navigation.navigate("AddDosageUnit", {tab:TabOptions.home})
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
                </InputContainer>
            </View>
            <Button title="Save" onPress={() => checkErrors()} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
