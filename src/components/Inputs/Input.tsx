import React from "react";
import { TextInput } from "react-native";
import { InputContainer } from "./InputComponents";

type InputProps = {
    title:string;
    onChange: (value:string) => void;
    value: string;
}

export function SingleInput(props:InputProps) {
    return (
        <InputContainer title={props.title}>
            <TextInput
                style={{ height: 40, backgroundColor: 'lightgray' }}
                onChangeText={props.onChange}
                value={props.value}
            />
        </InputContainer>
    );
}

export function MultiInput(props:InputProps) {
    return (
        <InputContainer title={props.title}>
            <TextInput
                style={{ height: 100, backgroundColor: 'lightgray' }}
                onChangeText={props.onChange}
                value={props.value}
                multiline
                numberOfLines={5}
            />
        </InputContainer>
    );
}
