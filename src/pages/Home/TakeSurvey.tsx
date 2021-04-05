import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import SafeAreaView from 'react-native-safe-area-view';
import ButtonSet from "../../components/Inputs/ButtonSet";
import Survey from "../../models/Surveys/Survey";
import SurveyField from "../../models/Surveys/SurveyField";
import SurveyDao from "../../_services/database/dao/SurveyDao";
import SurveyFieldDao from "../../_services/database/dao/SurveyFieldDao";
import DateTimePicker from '@react-native-community/datetimepicker';
import SurveyAnswerDao from "../../_services/database/dao/SurveyAnswerDao";
import { CopyAndSetKey } from "../../functions";
import SurveyAnswer, { SurveyAnswerDb } from "../../models/Surveys/SurveyAnswer";
import { MultiInput } from "../../components/Inputs/Input";

type Props = {
    navigation: any;
    route: any;
};

export default function TakeSurvey(props: Props) {
    const [survey, setSurvey] = useState(new Survey());
    const [surveyFields, setSurveyFields] = useState<SurveyField[]>([]);
    const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswer[]>([]);

    useEffect(() => {
        (async () => {
            const surveyId = props.route.params.id;
            if (surveyId) {
                const surv = await SurveyDao.getById(surveyId);
                if (surv) {
                    setSurvey(surv);
                    let id: number = surv.id as number;
                    const survFields = await SurveyFieldDao.getBySurveyId(id);
                    
                    let survAnswers: SurveyAnswer[] = new Array<SurveyAnswer>();
                    survFields.forEach(survField => {
                        console.log('surv field in loop: ', survField)
                        survAnswers.push(new SurveyAnswer(undefined, survField.id as number));
                    });
                    setSurveyAnswers(survAnswers);
                    setSurveyFields(survFields);
                }
            }
        })();
    }, [props.route.params.id]);

    function updateValue(key:keyof SurveyAnswer, value:any, surveyFieldId:number){
        const surveyAnswer = surveyAnswers[surveyFieldId];
        const newAnswer = CopyAndSetKey(surveyAnswer, key, value);
        console.log('survey answer', surveyAnswer);
        console.log('newAnswer', newAnswer)
        surveyAnswers[surveyFieldId] = newAnswer;
        console.log('All answers: ', surveyAnswers);
        console.log('$$$$$$$$$$$$$$$')
        setSurveyAnswers(surveyAnswers);
        // TODO: find way to properly update the surveyAnswers array
    }

    const insertQuery = async () => {
        let resultsArray: any[] = new Array<any>();
        surveyFields.forEach(async surveyField => {
            let results = await SurveyAnswerDao.save(surveyField);
            resultsArray.push(results);
        });

        while(resultsArray.length === surveyFields.length) {
            props.navigation.goBack();
        }
        
    }

    return (
        <SafeAreaView>
            <ScrollView style={{ margin: 12 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{survey.name}</Text>
                <Text>{survey.description}</Text>
                {
                    surveyFields.map(function (surveyField,index) {                        
                        return (
                            <View
                                style={{ marginTop: 12 }}
                                key={surveyField.id}
                            >
                                <Text style={{ fontWeight: 'bold' }}>Question:</Text>
                                <Text>{surveyField.question}</Text>
                                {surveyField.field_display === "True/False" &&
                                    <>
                                        <Text>True/False</Text>
                                        <ButtonSet />
                                        {/* TODO: add the attributes for the Button Set */}
                                    </>
                                }
                                {surveyField.field_display === "Number" &&
                                    <>
                                        <Text>Number</Text>
                                        <TextInput
                                            style={{ height: 40, backgroundColor: 'lightgray' }}
                                            onChangeText={(value) => {
                                                updateValue(SurveyAnswerDb.fields.answer,value,index)
                                            }}
                                            value={surveyAnswers[index].answer}
                                            keyboardType="numeric"
                                        />
                                    </>
                                }
                                {surveyField.field_display === "Text" &&
                                    <>
                                        <Text>Text</Text>
                                        {/* <TextInput
                                            style={{ height: 40, backgroundColor: 'lightgray' }}
                                            onChangeText={(value) => {
                                                updateValue(SurveyAnswerDb.fields.answer,value,index)
                                            }}
                                            value={surveyAnswers[index].answer}
                                            keyboardType="numeric" /> */}
                                            <MultiInput
                                                title=""
                                                onChange={(value) => {
                                                    updateValue(SurveyAnswerDb.fields.answer,value,index);
                                                }}
                                                value={surveyAnswers[index].answer}
                                            />
                                    </>
                                }
                                {surveyField.field_display === "Date with Time" &&
                                    <>
                                        <Text>Date with Time</Text>
                                        <DateTimePicker
                                            testID="datePicker"
                                            mode="date"
                                            display="default"
                                            onChange={(value) => {
                                                updateValue(SurveyAnswerDb.fields.answer,value,index)
                                            }}
                                            value={surveyAnswers[index].answer as unknown as Date}
                                            maximumDate={new Date()} />
                                    </>
                                }
                            </View>
                        )
                    })
                }
                <Button title="Save" onPress={() => insertQuery()} />
                <Button title="Cancel" onPress={props.navigation.goBack} />
            </ScrollView>
        </SafeAreaView>
    );
}