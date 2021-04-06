import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SafeAreaView from 'react-native-safe-area-view';
import Survey from "../../models/Surveys/Survey";
import SurveyField from "../../models/Surveys/SurveyField";
import SurveyDao from "../../_services/database/dao/SurveyDao";
import SurveyFieldDao from "../../_services/database/dao/SurveyFieldDao";
import SurveyAnswerDao from "../../_services/database/dao/SurveyAnswerDao";
import SurveyAnswer from "../../models/Surveys/SurveyAnswer";
import Question from "../_Shared/Question";

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

    const insertQuery = async () => {
        let resultsArray: any[] = new Array<any>();
        surveyFields.forEach(async surveyField => {
            console.log('Survey Field to be saved: ', surveyField);
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
                                <Question 
                                    surveyField={surveyField}
                                    index={index}
                                />
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