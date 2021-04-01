import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, View, Text } from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { MultiInput, SingleInput } from "../../components/Inputs/Input";
import { CopyAndSetKey } from "../../functions";
import Survey, { SurveyDb } from "../../models/Surveys/Survey";
import SurveyField from "../../models/Surveys/SurveyField";
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SurveyDao from "../../_services/database/dao/SurveyDao";
import SurveyFieldDao from "../../_services/database/dao/SurveyFieldDao";
import SurveyFieldDisplay from "../../components/SurveyFieldDisplay";
import { TabOptions } from "../../components/TabOptions";

type AddEditSurveyScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'AddEditSurvey'>;
type AddEditSurveyScreenRouteProp = RouteProp<HomeStackParamList, 'AddEditSurvey'>;

type Props = {
    navigation: AddEditSurveyScreenNavigationProp;
    route: AddEditSurveyScreenRouteProp;
};

export default function AddEditSurvey(props:Props) {
    // TODO - Maybe use reducer instead of use state for the fields
    const [survey, setSurvey] = useState(new Survey());
    const [fields, setFields] = useState<SurveyField[]>([]);

    function updateValue(key:keyof Survey, value:any){
        const sur = CopyAndSetKey(survey, key, value);
        setSurvey(sur);
    }

    function updateField<Tkey extends keyof SurveyField>(field:SurveyField, key:Tkey, value: SurveyField[Tkey]) {
        const newFields = fields.map((oldField) => {
            if (oldField.id === field.id) {
                const newField = CopyAndSetKey(field, key, value);
                return newField;
            }
            return oldField;
        });
        setFields(newFields);
    }

    function addField() {
        const newFields = Array.from(fields);
        newFields.push(new SurveyField(survey.id?survey.id:undefined));
        setFields(newFields);
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

    useEffect(() => {
        (async () => {
            if (survey.id) {
                const survFields = await SurveyFieldDao.getBySurveyId(survey.id);
                setFields(survFields);
            }
        })();
    },[survey.id]);

    const insertQuery = async () => {
        let surveyResult = await SurveyDao.save(survey);
        if (surveyResult) {
            const surveyId = survey.id?survey.id:surveyResult.insertId
            await Promise.all(fields.map(async (field) => {
                field.survey_id = surveyId;
                await SurveyFieldDao.save(field);
            }));
            if (props.route.params.previousPage) {
                console.log("Curr ID:", surveyId)
                props.navigation.navigate(props.route.params.previousPage, {tab:TabOptions.home, survey_id:surveyId});
            } else {
                props.navigation.goBack();
            }
        }
    }

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
                <View
                    style={{
                        borderTopColor:'black',
                        borderBottomWidth: 1,
                    }}
                >
                    <Text style={{fontSize: 25, color: `#333`}}>
                        Fields
                        <Button title="Add" onPress={addField} />
                    </Text>
                </View>
                {
                    fields.map((field) => {
                        return (
                            <SurveyFieldDisplay
                                key={field.id}
                                field={field}
                                updateField={updateField}
                            />
                        );
                    })
                }

                <Button title="Save" onPress={insertQuery} />
                <Button title="Cancel" onPress={props.navigation.goBack} />
                <View style={{height:12}}></View>
            </ScrollView>
        </SafeAreaView>
    );
}