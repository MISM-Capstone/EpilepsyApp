import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import {default as mainStyle} from "../styles/MainStyles";
import { TextInput } from 'react-native-gesture-handler';
import LoginStyles from '../styles/LoginStyles';
import NavigationButton from '../components/NavigationButton';
import User from '../models/User';
import { GetAuthContext } from '../_services/Providers/AuthProvider';
import { CopyAndSetKey } from '../functions';


export default function Register() {
    const [user, setUser] = useState(new User());
    const {register} = GetAuthContext();

    function updateValue(key:keyof User, value:any){
        const newUser = CopyAndSetKey(user, key, value);
        setUser(newUser);
    }

    return (
        <SafeAreaView style={mainStyle.container}>
            <StatusBar barStyle="dark-content" />
            
            <View style={LoginStyles.mainContainer}>
                <Text style={LoginStyles.titleText}>Welcome to EpiLog Seizure Tracker!</Text>
                <Text style={LoginStyles.noticeText}>To get started please tell us your name so we can personalize your experience within the app.</Text>
                <Text style={LoginStyles.noticeText}>Notice: We do not save any of your personal information. Any information you enter using this app will be kept on your phone only.</Text>
                <TextInput
                    placeholder="First Name"
                    value={user.first_name}
                    onChangeText={(value) => {
                        updateValue(user.db.fields.first_name, value);
                    }}
                    style={LoginStyles.input}
                />
                <TextInput
                    placeholder="Last Name"
                    value={user.last_name}
                    onChangeText={(value) => {
                        updateValue(user.db.fields.last_name, value);
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
