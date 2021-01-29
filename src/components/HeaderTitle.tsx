import React from 'react';
import { Text, View } from 'react-native';

import styles from "../styles/MainStyles";

interface HeaderProps {
    title: string
}

const HeaderTitle = (props:HeaderProps) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{props.title}</Text>
        </View>
    );
}

export default HeaderTitle;
