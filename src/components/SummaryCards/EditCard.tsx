import React from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HistoryStyles from "../../styles/HistoryStyles";

type RenderProps = {
    title: string;
    onClick: (event?:GestureResponderEvent) => void;
    children: React.ReactNode;
}

export default function EditCard(props: RenderProps) {
    return (
        <View style={HistoryStyles.HistoryEventCard}>
            <Text style={HistoryStyles.HistoryCardTitle}>{props.title}</Text>
            <View style={{ display: 'flex', flexDirection: `row`, justifyContent: 'space-between' }}>
                <View>
                    {props.children}
                </View>
                <Pressable onPress={props.onClick}>
                    <MaterialCommunityIcons name="pencil" size={25} color={'#44C2B3'} />
                </Pressable>
            </View>
        </View>
    )
}
