import React from "react";
import { Button, Text, View } from "react-native";
import Survey from "../../models/Surveys/Survey";
import HistoryStyles from "../../styles/HistoryStyles";

type RenderProps = {
    survey: Survey;
    onClick: any
}

export default function SurveyCard(props: RenderProps) {
    return (
        <View style={HistoryStyles.HistoryEventCard}>
            <Text style={HistoryStyles.HistoryCardTitle}>{props.survey.name}</Text>
            <View>
                <Text>{props.survey.description}</Text>
            </View>
            <Button title="Edit" onPress={props.onClick} />
        </View>
    )
}
