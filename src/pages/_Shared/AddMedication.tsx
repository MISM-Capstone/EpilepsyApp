import React, { useEffect, useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeOptions, HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import { CopyAndSetKey, returnToPreviousPage } from '../../functions';
import { RouteProp } from '@react-navigation/native';
import Medication, { MedicationDb } from '../../models/Medication/Medication';
import MedicationDao from '../../_services/database/dao/MedicationDao';
import DosageUnit from '../../models/DosageUnits';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import { SingleInput, MultiInput } from '../../components/Inputs/Input';
import { InputContainer } from '../../components/Inputs/InputComponents';
import { TabOptions } from "../../components/TabOptions";
import { GetUpdateContext } from '../../_services/Providers/UpdateProvider';
import { TrendOptions, TrendsStackParamList } from '../../navigation/Trends/TrendsNavProps';
import RNPickerSelect from 'react-native-picker-select';
import PickerStyles from '../../styles/PickerStyles';
import { PickerItem } from '../../models/PickerItem';

type HomeNavProp = StackNavigationProp<HomeStackParamList, HomeOptions.AddMedication>;
type HomeRouteProp = RouteProp<HomeStackParamList, HomeOptions.AddMedication>;

type TrendNavProp = StackNavigationProp<TrendsStackParamList, TrendOptions.UpdateMed>;
type TrendRouteProp = RouteProp<TrendsStackParamList, TrendOptions.UpdateMed>;

type Props = {
    navigation: HomeNavProp | TrendNavProp;
    route: HomeRouteProp | TrendRouteProp;
};


export default function AddMedication(props: Props) {
    const updateContext = GetUpdateContext();
    const [medication, setMedication] = useState(new Medication());
    const [dosageUnits, setDosageUnits] = useState<DosageUnit[]>([]);
    const [dosageAsItems, setDosageAsItems] = useState<PickerItem[]>([]);

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

        const dosAsItems: PickerItem[] = new Array<PickerItem>();
        dosages.forEach((dos: DosageUnit) => {
            let dosAsItem: PickerItem = {
                label: dos.name,
                value: dos.id,
            }
            dosAsItems.push(dosAsItem)
        });
        setDosageAsItems(dosAsItems);
    }

    useEffect(() => {
        getDosages();
    },[medication.dosage_unit_id]);

    useEffect(() => {
        const updatedObj = updateContext.getUpdatedObjbyType(props.route.name, DosageUnit);
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
                <Text style={{fontStyle: 'italic', color: '#555'}}>Add the name and details about any medications you take to manage your epilepsy.</Text>
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
                        if (props.route.params.tab ===  TabOptions.home) {
                            const nav = props.navigation as HomeNavProp;
                            nav.navigate(HomeOptions.AddDosageUnit, {tab:TabOptions.home});
                        } else {
                            const nav = props.navigation as TrendNavProp;
                            nav.navigate(TrendOptions.UpdateDosageUnit, {tab:TabOptions.trends});
                        }
                    }} />
                    {
                        dosageUnits.length ?
                            <View style={{marginVertical: 4}}>
                                <RNPickerSelect
                                    onValueChange={(itemValue) => {
                                        updateValue(MedicationDb.fields.dosage_unit_id, itemValue);
                                    }}
                                    items={dosageAsItems}
                                    style={PickerStyles}
                                />
                            </View>
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
