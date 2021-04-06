import React from 'react';

import { Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeOptions, HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import NavigationButton from "../../components/NavigationButton";

import HomeStyles from "../../styles/HomeStyles";
import {default as mainStyle} from "../../styles/MainStyles";
import { GetAuthContext } from '../../_services/Providers/AuthProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { TabOptions } from "../../components/TabOptions";
import { RouteProp } from '@react-navigation/core';

type HomeNavProp = StackNavigationProp<HomeStackParamList,HomeOptions.Home>;
type HomeRouteProp = RouteProp<HomeStackParamList,HomeOptions.Home>;

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
                    navigate={() => props.navigation.navigate(HomeOptions.LogSeizure, {tab:TabOptions.home})}
                />
                <NavigationButton
                    title="Record Medication"
                    icon="pill"
                    navigate={() => props.navigation.navigate(HomeOptions.RecordMedication, {tab:TabOptions.home})}
                />
                <NavigationButton
                    title="My Surveys"
                    icon="file"
                    navigate={() => props.navigation.navigate(HomeOptions.PersonalSurveys, {tab:TabOptions.home})}
                />
                <NavigationButton
                    title="Your Survey History"
                    icon="archive"
                    navigate={() => props.navigation.navigate(HomeOptions.SurveyHistory, {tab:TabOptions.home})}
                />
                {/* <NavigationButton
                    title="Healthkit"
                    icon="hospital-box"
                    navigate={() => props.navigation.navigate(HomeOptions.HealthKitTest, {tab:TabOptions.home})}
                /> */}
            </ScrollView>

        </SafeAreaView>
    );
}
