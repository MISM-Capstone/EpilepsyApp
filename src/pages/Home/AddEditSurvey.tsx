import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { MultiInput, SingleInput } from "../../components/Inputs/Input";
import { CopyAndSetKey } from "../../functions";
import Survey, { SurveyDb } from "../../models/Surveys/Survey";
import SurveyField from "../../models/Surveys/SurveyField";
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SurveyStyles from "../../styles/SurveyStyles";
import SurveyDao from "../../_services/database/dao/SurveyDao";

type AddEditSurveyScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'AddEditSurvey'>;
type AddEditSurveyScreenRouteProp = RouteProp<HomeStackParamList, 'AddEditSurvey'>;

type Props = {
    navigation: AddEditSurveyScreenNavigationProp;
    route: AddEditSurveyScreenRouteProp;
};

export default function AddEditSurvey(props:Props) {
    const [survey, setSurvey] = useState(new Survey());
    const [fields, setFields] = useState<SurveyField[]>([]);

    function updateValue(key:keyof Survey, value:any){
        const sur = CopyAndSetKey(survey, key, value);
        setSurvey(sur);
    }

    useEffect(() => {
        (async () => {
            const surveyId = props.route.params.survey;
            if (surveyId) {
                const surv = await SurveyDao.getById(surveyId);
                if (surv) {
                    setSurvey(surv);
                }
            }
        })();
    },[props.route.params.survey]);

    return (
        <SafeAreaView>
            <ScrollView style={{ padding: 12 }}>
                <SingleInput
                    title="Name"
                    onChange={(value) => {
                        updateValue(SurveyDb.fields.name, value);
                    }}
                    value={survey.name}
                />
                <MultiInput
                    title="Description"
                    onChange={(value) => {
                        updateValue(SurveyDb.fields.description, value);
                    }}
                    value={survey.description}
                />
                <Button title="Cancel" onPress={props.navigation.goBack} />
            </ScrollView>
        </SafeAreaView>
    );
}