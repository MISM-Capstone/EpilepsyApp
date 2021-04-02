import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SafeAreaView from 'react-native-safe-area-view';
import HistoryStyles from "../../styles/HistoryStyles";

export default function TakeSurvey() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={HistoryStyles.SectionHeader}>Suveys</Text>
            </ScrollView>
        </SafeAreaView>
    );
}