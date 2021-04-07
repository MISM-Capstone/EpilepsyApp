import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import ButtonSet from './Inputs/ButtonSet';
import { MultiInput } from './Inputs/Input';
import SurveyAnswer, { SurveyAnswerDb } from "../models/Surveys/SurveyAnswer";
import SurveyField, { SURVEY_FIELD_TYPE } from '../models/Surveys/SurveyField';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CopyAndSetKey } from '../functions';

type Props = {
    surveyField: SurveyField,
    index: number
};

function Question(props: Props) {
    const [surveyAnswer, setSurveyAnswer] = useState<SurveyAnswer>(new SurveyAnswer(undefined, props.surveyField.id!));

    function updateValue(key: keyof SurveyAnswer, value: any) {
        const ans = CopyAndSetKey(surveyAnswer, key, value);
        setSurveyAnswer(ans);
    }

    return (
        <>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>
                    Question: 
                </Text>
                {props.surveyField.question}
            </Text>
            {props.surveyField.field_type === SURVEY_FIELD_TYPE.bool &&
                <>
                    <ButtonSet 
                        onChange={()=> console.log('changed')}
                    />
                    {/* TODO: add the attributes for the Button Set */}
                </>
            }
            {props.surveyField.field_type === SURVEY_FIELD_TYPE.num &&
                <>
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
            {props.surveyField.field_type === SURVEY_FIELD_TYPE.str &&
                <>
                    <MultiInput
                        title=""
                        onChange={(value) => {
                            updateValue(SurveyAnswerDb.fields.answer, value);
                        }}
                        value={surveyAnswer.answer}
                    />
                </>
            }
            {props.surveyField.field_type === SURVEY_FIELD_TYPE.datetime &&
                <>
                    <DateTimePicker
                        testID="datePicker"
                        mode="date"
                        display="default"
                        onChange={(value) => {
                            updateValue(SurveyAnswerDb.fields.answer, value)
                        }}
                        value={new Date()}
                        maximumDate={new Date()}
                        style={{ marginBottom: 6}} />
                    
                    <DateTimePicker
                        testID="datePicker"
                        mode="time"
                        display="default"
                        onChange={(value) => {
                            updateValue(SurveyAnswerDb.fields.answer, value)
                        }}
                        value={new Date()}
                        maximumDate={new Date()} />
                
                </>
            }
        </>
    )
}

export default Question;