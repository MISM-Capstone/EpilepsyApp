import React from "react";
import { Pressable, Text } from "react-native";
import ButtonStyles from "../styles/ButtonStyles";

interface ButtonProps {
    title:string;
    navigate:() => void;
}

const NavigationButton = (props:ButtonProps) => {
    return (
        <Pressable
            style={ButtonStyles.surveyButton}
            onPress={props.navigate}
        >
            <Text style={ButtonStyles.surveyButtonText}>{props.title}</Text>
        </Pressable>
    );
};

export default NavigationButton;
