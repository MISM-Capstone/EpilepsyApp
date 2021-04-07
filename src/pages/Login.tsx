import React from 'react';
import { Button, StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import {LoginStackParamList} from "../navigation/LoginNavigation";

import {default as mainStyle} from "../styles/MainStyles";
import AuthContext from '../_services/Authentication/AuthContext';
import { TextInput } from 'react-native-gesture-handler';
import LoginStyles from '../styles/LoginStyles';
import NavigationButton from '../components/NavigationButton';

type LoginScreenNavigationProp = StackNavigationProp<
  LoginStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function Login(props:Props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {signIn} = React.useContext(AuthContext)

    return (
        <SafeAreaView style={mainStyle.container}>
            <StatusBar barStyle="dark-content" />
            <View style={LoginStyles.mainContainer}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={LoginStyles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={LoginStyles.input}
                />
                <NavigationButton
                    title="Log In"
                    icon="login"
                    navigate={() => signIn({username, password})}
                />
            </View>
        </SafeAreaView>
    );
}
