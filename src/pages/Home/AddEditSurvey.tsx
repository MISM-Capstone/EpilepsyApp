import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, View, Text } from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { MultiInput, SingleInput } from "../../components/Inputs/Input";
import { CopyAndSetKey, returnToPreviousPage } from "../../functions";
import Survey from "../../models/Surveys/Survey";
import SurveyField from "../../models/Surveys/SurveyField";
import { HomeOptions, HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import SurveyDao from "../../_services/database/dao/SurveyDao";
import SurveyFieldDao from "../../_services/database/dao/SurveyFieldDao";
import SurveyFieldDisplay from "../../components/SurveyFieldDisplay";
import { GetUpdateContext } from "../../_services/Providers/UpdateProvider";

type AddEditSurveyScreenNavigationProp = StackNavigationProp<HomeStackParamList, HomeOptions.AddEditSurvey>;
type AddEditSurveyScreenRouteProp = RouteProp<HomeStackParamList, HomeOptions.AddEditSurvey>;

type Props = {
    navigation: AddEditSurveyScreenNavigationProp;
    route: AddEditSurveyScreenRouteProp;
};

export default function AddEditSurvey(props: Props) {
    // TODO - Maybe use reducer instead of use state for the fields
    const updateContext = GetUpdateContext();
    const [survey, setSurvey] = useState(new Survey());
    const [fields, setFields] = useState<SurveyField[]>([]);

    function updateValue(key: keyof Survey, value: any) {
        const sur = CopyAndSetKey(survey, key, value);
        setSurvey(sur);
    }

    function updateField<Tkey extends keyof SurveyField>(field: SurveyField, key: Tkey, value: SurveyField[Tkey]) {
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
        newFields.push(new SurveyField(survey.id ? survey.id : undefined));
        setFields(newFields);
    }

    useEffect(() => {
        (async () => {
            const surveyId = props.route.params.id;
            if (surveyId) {
                const surv = await SurveyDao.getById(surveyId);
                if (surv) {
                    setSurvey(surv);
                }
            }
        })();
    }, [props.route.params.id]);

    useEffect(() => {
        (async () => {
            if (survey.id) {
                const surveyFields = await SurveyFieldDao.getBySurveyId(survey.id);
                setFields(surveyFields);
            }
        })();
    }, [survey.id]);

    const insertQuery = async () => {
        let surveyResult = await SurveyDao.save(survey);
        if (surveyResult) {
            const surveyId = survey.id ? survey.id : surveyResult.insertId
            await Promise.all(fields.map(async (field) => {
                field.survey_id = surveyId;
                await SurveyFieldDao.save(field);
            }));
            returnToPreviousPage(
                survey,
                surveyResult,
                updateContext,
                props.navigation.goBack
            );
        }
    }

    return (
        <SafeAreaView>
            <ScrollView style={{ padding: 12 }}>
                <Text style={{ fontStyle: 'italic', color: '#555' }}>Create a survey with custom fields to track, such as your stress levels, sleep patterns, or exercise habits.</Text>
                <SingleInput
                    title="Name"
                    onChange={(value) => {
                        updateValue(survey.db.fields.name, value);
                    }}
                    value={survey.name}
                />
                <MultiInput
                    title="Description"
                    onChange={(value) => {
                        updateValue(survey.db.fields.description, value);
                    }}
                    value={survey.description}
                />
                <View
                    style={{
                        borderTopColor: 'black',
                        borderBottomWidth: 1,
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 25, color: `#333` }}>Fields</Text>
                        <Button title="Add" onPress={addField} />
                    </View>
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
                <View style={{ height: 12 }}></View>
            </ScrollView>
        </SafeAreaView>
    );
}