import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import {default as mainStyle} from "../styles/MainStyles";
import { TextInput } from 'react-native-gesture-handler';
import LoginStyles from '../styles/LoginStyles';
import NavigationButton from '../components/NavigationButton';
import User, { UserDb } from '../models/User';
import { GetAuthContext } from '../_services/Providers/AuthProvider';
import { CopyAndSetKey } from '../functions';


export default function Register() {
    const [user, setUser] = useState(new User());
    const {register} = GetAuthContext();

    function updateValue(key:keyof User, value:any){
        const newUser = CopyAndSetKey(user, key, value);
        setUser(newUser);
    }

    function setUserFirstName(name:string) {
        let newUser = user.copy() as User;
        newUser.first_name = name;
        setUser(newUser);
    }

    function setUserLastName(name:string) {
        let newUser = user.copy() as User;
        newUser.last_name = name;
        setUser(newUser);
    }

    return (
        <SafeAreaView style={mainStyle.container}>
            <StatusBar barStyle="dark-content" />
            <View style={LoginStyles.mainContainer}>
                <TextInput
                    placeholder="First Name"
                    value={user.first_name}
                    onChangeText={(value) => {
                        updateValue(UserDb.fields.first_name, value);
                    }}
                    style={LoginStyles.input}
                />
                <TextInput
                    placeholder="Last Name"
                    value={user.last_name}
                    onChangeText={(value) => {
                        updateValue(UserDb.fields.last_name, value);
                    }}
                    style={LoginStyles.input}
                />
                <NavigationButton
                    title="Register"
                    icon="login"
                    navigate={() => register(user)}
                />
            </View>
        </SafeAreaView>
    );
}
