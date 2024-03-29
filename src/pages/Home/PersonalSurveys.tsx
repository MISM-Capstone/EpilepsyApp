import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SafeAreaView from 'react-native-safe-area-view';
import { TabOptions } from "../../components/TabOptions";
import SurveyCard from "../../components/SummaryCards/SurveyCard";
import Survey from "../../models/Surveys/Survey";
import { HomeOptions, HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import HistoryStyles from "../../styles/HistoryStyles";
import SurveyDao from "../../_services/database/dao/SurveyDao";
import { GetUpdateContext } from "../../_services/Providers/UpdateProvider";

type PersonalSurveyScreenNavigationProp = StackNavigationProp<HomeStackParamList, HomeOptions.PersonalSurveys>;
type PersonalSurveyScreenRouteProp = RouteProp<HomeStackParamList, HomeOptions.PersonalSurveys>;

type Props = {
    navigation: PersonalSurveyScreenNavigationProp;
    route: PersonalSurveyScreenRouteProp;
};

export default function PersonalSurveys(props:Props) {
    const updateContext = GetUpdateContext();
    const [surveys, setSurveys] = useState<Survey[]>([]);

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return <Button title="Add" onPress={() => {
                    updateContext.setPageToUpdate(props.route.name)
                    props.navigation.navigate(
                        HomeOptions.AddEditSurvey,
                        {
                            tab: TabOptions.home,
                        }
                    );
                }} />
            }
        });
    }), [props.navigation];

    async function getSurveys() {
        const dbSurveys = await SurveyDao.getAll();
        setSurveys(dbSurveys);
    }

    useEffect(() => {
        getSurveys();
    }, []);

    useEffect(() => {
        const updatedObj = updateContext.getUpdatedObjbyType(props.route.name, Survey);
        if (updatedObj) {
            const newSurveys = [...surveys];
            if (updatedObj.obj.id) {
                let index = newSurveys.findIndex((su) => {
                    return su.id === updatedObj.obj.id;
                });
                newSurveys[index] = updatedObj.obj;
                setSurveys(newSurveys);
            } else {
                getSurveys();
            }
        }
    }, [updateContext.hasObject]);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={HistoryStyles.SectionHeader}>Surveys</Text>
                {surveys.length > 0 ?
                    surveys.map(function (survey) {
                        return (
                            <SurveyCard
                                survey={survey}
                                key={survey.id}
                                onEdit={() => {
                                    updateContext.setPageToUpdate(props.route.name)
                                    props.navigation.navigate(
                                        HomeOptions.AddEditSurvey,
                                        {
                                            tab: TabOptions.home,
                                            id: survey.id!,
                                        }
                                    );
                                }}
                                onStartSurvey={() => {
                                    props.navigation.navigate(
                                        HomeOptions.TakeSurvey,
                                        {
                                            tab:TabOptions.home,
                                            surveyId: survey.id!,
                                        }
                                    );
                                }}
                            />
                        );
                    })
                    :
                    <Text style={HistoryStyles.HistoryAlternateText}>
                        No Surveys Built
                    </Text>
                }
            </ScrollView>
        </SafeAreaView>
    );
}