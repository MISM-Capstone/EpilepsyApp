import React, { useRef, useState } from 'react';
import { StatusBar, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import {default as mainStyle} from "../styles/MainStyles";
import AuthContext from '../_services/Authentication/AuthContext';
import { TextInput } from 'react-native-gesture-handler';
import LoginStyles from '../styles/LoginStyles';
import NavigationButton from '../components/NavigationButton';
import User from '../models/User';


export default function Register() {
    const user = useRef(new User());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const {register} = React.useContext(AuthContext);

    function setUserFirstName(name:string) {
        user.current.first_name = name;
        setFirstName(name);
    }

    function setUserLastName(name:string) {
        user.current.last_name = name;
        setLastName(name);
    }

    return (
        <SafeAreaView style={mainStyle.container}>
            <StatusBar barStyle="dark-content" />
            <View style={LoginStyles.mainContainer}>
                <TextInput
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setUserFirstName}
                    style={LoginStyles.input}
                />
                <TextInput
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setUserLastName}
                    style={LoginStyles.input}
                />
                <NavigationButton
                    title="Register"
                    icon="login"
                    navigate={() => register(user.current)}
                />
            </View>
        </SafeAreaView>
    );
}
