import React from 'react';

import { Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import NavigationButton from "../../components/NavigationButton";

import HomeStyles from "../../styles/HomeStyles";
import {default as mainStyle} from "../../styles/MainStyles";
import { GetAuthContext } from '../../_services/Providers/AuthProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { TabOptions } from "../../components/TabOptions";
import { RouteProp } from '@react-navigation/core';

type HomeNavProp = StackNavigationProp<HomeStackParamList,'Home'>;
type HomeRouteProp = RouteProp<HomeStackParamList,'Home'>;

type Props = {
  navigation: HomeNavProp;
  route:HomeRouteProp
};


export default function Home(props:Props) {
    const {user} = GetAuthContext();
    return (
        <SafeAreaView style={mainStyle.container}>
            <ScrollView style={HomeStyles.HomeContainer}>
                <View style={HomeStyles.welcomeMessageContainer}>
                <Text style={HomeStyles.welcomeMessageText}>Hi, {user!.first_name}!</Text>
                </View>
                <NavigationButton
                    title="Log a Seizure"
                    icon="clipboard-pulse"
                    navigate={() => props.navigation.navigate("LogSeizure", {tab:TabOptions.home})}
                />
                <NavigationButton
                    title="Take Daily Survey"
                    icon="comment"
                    navigate={() => props.navigation.navigate("DailySurvey", {tab:TabOptions.home})}
                />
                <NavigationButton
                    title="Record Medication"
                    icon="pill"
                    navigate={() => props.navigation.navigate("RecordMedication", {tab:TabOptions.home})}
                />
                <NavigationButton
                    title="My Surveys"
                    icon="file"
                    navigate={() => props.navigation.navigate("PersonalSurveys", {tab:TabOptions.home})}
                />
                <NavigationButton
                    title="Survey History"
                    icon="archive"
                    navigate={() => props.navigation.navigate("SurveyHistory", {tab:TabOptions.home})}
                />
                <NavigationButton
                    title="Healthkit"
                    icon="hospital-box"
                    navigate={() => props.navigation.navigate("HealthKitTest", {tab:TabOptions.home})}
                />
            </ScrollView>

        </SafeAreaView>
    );
}
