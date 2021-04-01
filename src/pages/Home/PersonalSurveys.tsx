import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SafeAreaView from 'react-native-safe-area-view';
import { TabOptions } from "../../components/TabOptions";
import SurveyCard from "../../components/SummaryCards/SurveyCard";
import Survey from "../../models/Surveys/Survey";
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import HistoryStyles from "../../styles/HistoryStyles";
import SurveyDao from "../../_services/database/dao/SurveyDao";

type PersonalSurveyScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'PersonalSurveys'>;
type PersonalSurveyScreenRouteProp = RouteProp<HomeStackParamList, 'PersonalSurveys'>;

type Props = {
    navigation: PersonalSurveyScreenNavigationProp;
    route: PersonalSurveyScreenRouteProp;
};

export default function PersonalSurveys(props:Props) {
    const [surveys, setSurveys] = useState<Survey[]>([]);

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return <Button title="Add" onPress={() => {
                    props.navigation.navigate(
                        "AddEditSurvey",
                        {
                            tab: TabOptions.home,
                            previousPage: "PersonalSurveys",
                        }
                    );
                }} />
            }
        });
    }), [props.navigation];

    useEffect(() => {
        (async () => {
            const dbSurveys = await SurveyDao.getAll();
            setSurveys(dbSurveys);
        })();
    }, [props.route.params.survey_id]);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={HistoryStyles.SectionHeader}>Suveys</Text>
                {surveys.length > 0 ?
                    surveys.map(function (survey) {
                        return (
                            <SurveyCard
                                survey={survey}
                                key={survey.id}
                                onClick={() => {
                                    props.navigation.navigate(
                                        "AddEditSurvey",
                                        {
                                            tab: TabOptions.home,
                                            previousPage: "PersonalSurveys",
                                            survey: survey.id!,
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