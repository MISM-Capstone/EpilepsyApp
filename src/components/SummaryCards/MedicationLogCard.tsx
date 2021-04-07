import React from "react";
import { GestureResponderEvent, Text } from "react-native";
import DosageUnit from "../../models/DosageUnits";
import Medication from "../../models/Medication/Medication";
import MedicationLog from "../../models/Medication/MedicationLog";
import EditCard from "./EditCard";

type RenderProps = {
    medicationLog: MedicationLog;
    medications:Medication[];
    dosageUnits:DosageUnit[];
    onClick: (event?:GestureResponderEvent) => void;
}

export default function MedicationLogCard(props: RenderProps) {
    const currentMed = props.medications.find((med) => {
        return med.id === props.medicationLog.medication_id;
    });
    const medication = currentMed?currentMed.name:"";

    const currentDos = props.dosageUnits.find((dos) => {
        return dos.id === props.medicationLog.dosage_unit_id;
    });
    const dosageUnit = currentDos?currentDos.name:"";
    return (
        <EditCard onClick={props.onClick} title={props.medicationLog.date.toDateString()}>
        <Text>Time: {props.medicationLog.time}</Text>
        <Text>Medication: {medication}</Text>
        <Text>Dosage: {props.medicationLog.dosage} {dosageUnit}</Text>
        </EditCard>
    )
}
