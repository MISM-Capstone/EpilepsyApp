import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import styles from "../styles/HomeStyles";

interface ButtonProps {
    title:string
}

const SurveyButton = (props:ButtonProps) => {
    return (
        <Pressable
            style={styles.surveyButton}
            // onPress={() => navigate('HomeScreen')}
        >
            <Text style={styles.surveyButtonText}>{props.title}</Text>
        </Pressable>
    );
};

const Home = () => {
    return (
        <ScrollView>
            <Text style={styles.titleText}>Home</Text>
            <View style={styles.surveyButtonContainer}>
                <SurveyButton
                    title="Log a Seizure"
                />
                <SurveyButton
                    title="Take Daily Survey"
                />
                <SurveyButton
                    title="Record Medication"
                />
            </View>
        </ScrollView>
    );
}


export default Home;
