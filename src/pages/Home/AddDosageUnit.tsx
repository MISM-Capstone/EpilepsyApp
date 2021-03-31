import React, { useState } from 'react';

import { View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import { CopyAndSetKey } from '../../functions';
import { RouteProp } from '@react-navigation/native';
import DosageUnit, { DosageUnitDb } from '../../models/DosageUnits';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';
import { MultiInput, SingleInput } from '../../components/Inputs/Input';
import { TabOptions } from "../../components/TabOptions";

type DosageUnitScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'AddDosageUnit'>;
type DosageUnitScreenRouteProp = RouteProp<HomeStackParamList, 'AddDosageUnit'>;

type Props = {
    navigation: DosageUnitScreenNavigationProp;
    route: DosageUnitScreenRouteProp;
};


export default function AddDosageUnit(props: Props) {
    const [dosageUnit, setDosageUnit] = useState(new DosageUnit());
    function updateValue(key:keyof DosageUnit, value:any){
        const dos = CopyAndSetKey(dosageUnit, key, value);
        setDosageUnit(dos);
    }

    // TODO: find way for errors to be displayed
    const checkErrors = () => {
        insertQuery();
    }

    const insertQuery = async () => {
        let results = await DosageUnitDao.save(dosageUnit);
        if (results) {
            if (props.route.params.previousPage) {
                props.navigation.navigate(props.route.params.previousPage, {tab:TabOptions.home, dosage_unit_id:results.insertId});
            } else {
                props.navigation.goBack();
            }
        }
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <SingleInput
                    title="Name"
                    onChange={(value) => {
                        updateValue(DosageUnitDb.fields.name, value);
                    }}
                    value={dosageUnit.name}
                />
                <MultiInput
                    title="Description"
                    onChange={(value) => {
                        updateValue(DosageUnitDb.fields.description, value);
                    }}
                    value={dosageUnit.description}
                />
            </View>
            <Button title="Save" onPress={() => checkErrors()} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
