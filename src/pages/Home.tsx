import React from 'react';
import { StatusBar, Pressable, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import HeaderTitle from "../components/HeaderTitle";
import {RootStackParamList} from "../../App";

import styles from "../styles/HomeStyles";
import {default as mainStyle} from "../styles/MainStyles";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

interface ButtonProps {
    title:string;
    navigation:StackNavigationProp<RootStackParamList, "Home">;
}

const SurveyButton = (props:ButtonProps) => {
    return (
        <Pressable
            style={styles.surveyButton}
            onPress={() => props.navigation.navigate("Trends")}
        >
            <Text style={styles.surveyButtonText}>{props.title}</Text>
        </Pressable>
    );
};

const Home = (props:Props) => {
    return (
        <>
            <HeaderTitle title="Home" />
            <SafeAreaView style={mainStyle.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.surveyButtonContainer}>
                    <SurveyButton
                        title="Log a Seizure"
                        navigation={props.navigation}
                    />
                    <SurveyButton
                        title="Take Daily Survey"
                        navigation={props.navigation}
                    />
                    <SurveyButton
                        title="Record Medication"
                        navigation={props.navigation}
                    />
                </View>
            </SafeAreaView>
        </>
    );
}

export default Home;
