import React, { useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SurveyStyles from '../../styles/SurveyStyles';
import { CopyAndSetKey } from '../../functions';
import { RouteProp } from '@react-navigation/native';
import DosageUnit, { DosageUnitDb } from '../../models/DosageUnits';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';

type DosageUnitScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'AddDosageUnit'>;
type DosageUnitScreenRouteProp = RouteProp<HomeStackParamList, 'AddDosageUnit'>;

type Props = {
    navigation: DosageUnitScreenNavigationProp;
    route: DosageUnitScreenRouteProp;
};


export default function AddDosageUnit(props: Props) {
    const [dosageUnit, setDosageUnit] = useState(new DosageUnit());
    console.log("------------------", dosageUnit);
    function updateValue(key:keyof DosageUnit, value:any){
        const dos = CopyAndSetKey(dosageUnit, key, value);
        setDosageUnit(dos);
    }

    // TODO: find way for errors to be displayed
    const checkErrors = () => {
        insertQuery();
    }

    const insertQuery = async () => {
        let results = await DosageUnitDao.insert(dosageUnit);
        if (results) {
            console.log('inserted: ', results);
            if (props.route.params.previousPage) {
                props.navigation.navigate(props.route.params.previousPage, {dosage_unit_id:results.insertId});
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
                            updateValue(DosageUnitDb.fields.name, value);
                        }}
                        value={dosageUnit.name} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Description</Text>
                    <TextInput
                        style={{ backgroundColor: 'lightgray', height: 100 }}
                        onChangeText={(value) => {
                            updateValue(DosageUnitDb.fields.description, value);
                        }}
                        value={dosageUnit.description}
                        multiline
                        numberOfLines={5} />
                </View>
            </View>
            <Button title="Save" onPress={() => checkErrors()} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
