import React from 'react';

import { Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import {HomeStackParamList} from "../../navigation/HomeNavigation"
import NavigationButton from "../../components/NavigationButton";

import HomeStyles from "../../styles/HomeStyles";
import {default as mainStyle} from "../../styles/MainStyles";

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList,'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};


const Home = (props:Props) => {
    return (
        <SafeAreaView style={mainStyle.container}>
            <View style={HomeStyles.HomeContainer}>
                <View style={HomeStyles.welcomeMessageContainer}>
                <Text style={HomeStyles.welcomeMessageText}>Hi, Username!</Text>
                </View>
                <NavigationButton
                    title="Log a Seizure"
                    icon="clipboard-pulse"
                    navigate={() => props.navigation.navigate("LogSeizure")}
                />
                <NavigationButton
                    title="Take Daily Survey"
                    icon="comment"
                    navigate={() => props.navigation.navigate("DailySurvey")}
                />
                <NavigationButton
                    title="Record Medication"
                    icon="pill"
                    navigate={() => props.navigation.navigate("RecordMedication")}
                />
                <NavigationButton
                    title="Survey History"
                    icon="archive"
                    navigate={() => props.navigation.navigate("SurveyHistory")}
                />
                {/* <NavigationButton
                    title="Healthkit"
                    icon="hospital-box"
                    navigate={() => props.navigation.navigate("HealthKitTest")}
                /> */}
            </View>

        </SafeAreaView>
    );
}

export default Home;
