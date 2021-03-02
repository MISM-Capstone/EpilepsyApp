import React from "react";
import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonStyles from "../styles/ButtonStyles";

interface ButtonProps {
    title: string;
    icon: string;
    navigate: () => void;
}

const NavigationButton = (props: ButtonProps) => {
    return (
        <Pressable
            style={ButtonStyles.surveyButton}
            onPress={props.navigate}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <Text style={ButtonStyles.surveyButtonText}>{props.title}</Text>
                <MaterialCommunityIcons name={props.icon} size={40} color={'#44C2B3'} />
            </View>
        </Pressable>
    );
};

export default NavigationButton;
