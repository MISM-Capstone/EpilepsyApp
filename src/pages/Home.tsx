import React from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import {RootStackParamList} from "../navigation/HomeNavigation"
import NavigationButton from "../components/NavigationButton";

import HomeStyles from "../styles/HomeStyles";
import {default as mainStyle} from "../styles/MainStyles";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};


const Home = (props:Props) => {
    let test = () => props.navigation.navigate("DailySurvey")
    return (
        <SafeAreaView style={mainStyle.container}>
            <View style={HomeStyles.HomeContainer}>
                <NavigationButton
                    title="Log a Seizure"
                    navigate={() => props.navigation.navigate("DailySurvey")}
                />
                <NavigationButton
                    title="Take Daily Survey"
                    navigate={() => props.navigation.navigate("DailySurvey")}
                />
                <NavigationButton
                    title="Record Medication"
                    navigate={() => props.navigation.navigate("DailySurvey")}
                />
            </View>

        </SafeAreaView>
    );
}

export default Home;
