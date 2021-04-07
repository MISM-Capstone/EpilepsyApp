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
import Question from "../../components/Question";
import SurveyLog from "../../models/Surveys/SurveyLog";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/core';
import { HomeOptions, HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import { GetAuthContext } from "../../_services/Providers/AuthProvider";
import SurveyLogDao from "../../_services/database/dao/SurveyLogDao";
import { GetUpdateContext } from "../../_services/Providers/UpdateProvider";
import { returnToPreviousPage } from "../../functions";

type HomeNavProp = StackNavigationProp<HomeStackParamList,HomeOptions.TakeSurvey>;
type HomeRouteProp = RouteProp<HomeStackParamList,HomeOptions.TakeSurvey>;

type Props = {
  navigation: HomeNavProp;
  route:HomeRouteProp
};

export default function TakeSurvey(props: Props) {
    const surveyId = props.route.params.surveyId;
    const { user } = GetAuthContext();
    const updateContext = GetUpdateContext();
    const [survey, setSurvey] = useState(new Survey());
    const [surveyFields, setSurveyFields] = useState<SurveyField[]>([]);
    const [surveyLog, setSurveyLog] = useState(new SurveyLog(user!.id!, surveyId));
    const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswer[]>([]);

    useEffect(() => {
        (async () => {
            const logId = props.route.params.id;
            if (logId) {
                const log = await SurveyLogDao.getById(logId);
                if (log) {
                    setSurveyLog(log);
                }
            }
        })();
    }, [props.route.params.id]);

    useEffect(() => {
        (async () => {
            if (surveyLog.id) {
                const answers = await SurveyAnswerDao.getBySurveyLogId(surveyLog.id);
                setSurveyAnswers(answers);
            }
        })();
    }, [surveyLog.id]);

    useEffect(() => {
        (async () => {
            if (surveyId) {
                const surv = await SurveyDao.getById(surveyId);
                if (surv) {
                    setSurvey(surv);
                    const survFields = await SurveyFieldDao.getBySurveyId(surv.id!);
                    
                    let survAnswers: SurveyAnswer[] = new Array<SurveyAnswer>();
                    survFields.forEach(survField => {
                        survAnswers.push(new SurveyAnswer(undefined, survField));
                    });
                    setSurveyAnswers(survAnswers);
                    setSurveyFields(survFields);
                }
            }
        })();
    }, [surveyId]);

    const insertQuery = async () => {
        let surveyLogResult = await SurveyLogDao.save(surveyLog);
        if (surveyLogResult) {
            const surveyLogId = surveyLog.id ? surveyLog.id : surveyLogResult.insertId
            await Promise.all(surveyAnswers.map(async (answer) => {
                answer.survey_log_id = surveyLogId;
                await SurveyAnswerDao.save(answer);
            }));
            returnToPreviousPage(
                surveyLog,
                surveyLogResult,
                updateContext,
                props.navigation.goBack
            );
        }
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