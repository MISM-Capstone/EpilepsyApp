import React from "react";
import { Pressable, Text } from "react-native";
import ButtonStyles from "../styles/ButtonStyles";

interface ButtonProps {
    title: string;
    navigate: () => void;
}

const LargeButton = (props: ButtonProps) => {
    return (
        <Pressable
            style={ButtonStyles.largeButton}
            onPress={props.navigate}
        >
            <Text style={ButtonStyles.largeButtonText}>{props.title}</Text>
        </Pressable>
    );
};

export default LargeButton;