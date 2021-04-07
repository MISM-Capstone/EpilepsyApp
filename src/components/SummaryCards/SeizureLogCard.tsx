import React from "react";
import { GestureResponderEvent, Text } from "react-native";
import Location from "../../models/Location";
import SeizureLog from "../../models/SeizureLog";
import EditCard from "./EditCard";

type RenderProps = {
    seizure: SeizureLog;
    locations:Location[];
    onClick: (event?:GestureResponderEvent) => void;
}

export default function SeizureLogCard(props: RenderProps) {
    const currentLocation = props.locations.find((loc) => {
        return loc.id === props.seizure.location_id;
    });
    const location = currentLocation?currentLocation.name:"";
    return (
        <EditCard onClick={props.onClick} title={props.seizure.date.toDateString()}>
            <Text>Time: {props.seizure.time}</Text>
            <Text>Location: {location}</Text>
            <Text>Notes: {props.seizure.notes}</Text>
        </EditCard>
    )
}
