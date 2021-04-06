import React, { useEffect, useState } from 'react';
import { Text, TextInput } from 'react-native';
import ButtonSet from '../../components/Inputs/ButtonSet';
import { MultiInput } from '../../components/Inputs/Input';
import SurveyAnswer, { SurveyAnswerDb } from "../../models/Surveys/SurveyAnswer";
import SurveyField from '../../models/Surveys/SurveyField';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CopyAndSetKey } from '../../functions';

type Props = {
    surveyField: SurveyField,
    index: number
};

function Question(props: Props) {
    const [surveyAnswer, setSurveyAnswer] = useState<SurveyAnswer>(new SurveyAnswer());
    const [surveyField, setSurveyFieldn] = useState<SurveyField>();

    useEffect(() => {
        setSurveyFieldn(props.surveyField);
    }, []);

    function updateValue(key: keyof SurveyAnswer, value: any) {
        const ans = CopyAndSetKey(surveyAnswer, key, value);
        setSurveyAnswer(ans);
    }

    return (
        <>
            <Text><Text style={{ fontWeight: 'bold' }}>Question: </Text>{surveyField?.question}</Text>
            {surveyField?.field_display === "True/False" &&
                <>
                    <Text>True/False</Text>
                    <ButtonSet />
                    {/* TODO: add the attributes for the Button Set */}
                </>
            }
            {surveyField?.field_display === "Number" &&
                <>
                    <Text>Number</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={(value) => {
                            updateValue(SurveyAnswerDb.fields.answer, value)
                        }}
                        value={surveyAnswer.answer}
                        keyboardType="numeric"
                    />
                </>
            }
            {surveyField?.field_display === "Text" &&
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
                            updateValue(SurveyAnswerDb.fields.answer, value);
                        }}
                        value={surveyAnswer.answer}
                    />
                </>
            }
            {surveyField?.field_display === "Date with Time" &&
                <>
                    <Text>Date with Time</Text>
                    <DateTimePicker
                        testID="datePicker"
                        mode="date"
                        display="default"
                        onChange={(value) => {
                            updateValue(SurveyAnswerDb.fields.answer, value)
                        }}
                        value={surveyAnswer.answer as unknown as Date}
                        maximumDate={new Date()} />
                </>
            }
        </>
    )
}

export default Question;