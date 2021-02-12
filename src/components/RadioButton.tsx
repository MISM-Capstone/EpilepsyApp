import React from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import { StyleProp, ViewStyle } from "react-native";
import RadioButtonStyles from "../styles/RadioButtonStyles";

export type TestProps = {
    buttonStyle?:StyleProp<ViewStyle>;
    label:string;
    selected:boolean;
    onPress:(event:GestureResponderEvent)=>void;
}

export default function RadioButton(props:TestProps) {
    return (
        <Pressable
             onPress={props.onPress}
        >
            <View style={RadioButtonStyles.container}>
                <View style={[RadioButtonStyles.button, props.buttonStyle]}>
                    {
                        props.selected ?
                        <View style={RadioButtonStyles.selected}/>
                        : null
                    }
                </View>
                <View>
                    <Text>{props.label}</Text>
                </View>
            </View>
        </Pressable>
    );
}