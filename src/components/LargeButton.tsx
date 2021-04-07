import React from "react";
import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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