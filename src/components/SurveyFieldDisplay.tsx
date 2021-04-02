import React from "react";
import { View } from "react-native";
import SurveyField, { FIELD_TYPES, SurveyFieldDb } from "../models/Surveys/SurveyField";
import { SingleInput } from "./Inputs/Input";
import { InputContainer } from "./Inputs/InputComponents";
import ModalDropdown from 'react-native-modal-dropdown';

type SurveyFieldProps = {
    field:SurveyField;
    updateField:<Tkey extends keyof SurveyField>(field:SurveyField, key:Tkey, value: SurveyField[Tkey]) => void;
}

export default function SurveyFieldDisplay(props:SurveyFieldProps) {
    const options:string[] = [];
    let defaultIndex = 0;
    FIELD_TYPES.forEach((type, index) => {
        if (type.db === props.field.field_type) {
            defaultIndex = index;
        }
        options.push(type.display)
    })
    
    return (
        <View
            style={{
                borderTopColor:'black',
                borderBottomWidth: 1,
            }}
        >
            <SingleInput
                title=""
                onChange={(value) => {
                    props.updateField(props.field, SurveyFieldDb.fields.question, value);
                }}
                value={props.field.question}
            />
            <InputContainer title="">
            <ModalDropdown
                defaultIndex={defaultIndex}
                defaultValue={props.field.field_display}
                options={options}
                onSelect={(strIndex) => {
                    const index = parseInt(strIndex);
                    const selectedType = FIELD_TYPES[index];
                    props.updateField(props.field, SurveyFieldDb.fields.field_type, selectedType.db)
                }}
            />
                    
            </InputContainer>
        </View>
    );
}