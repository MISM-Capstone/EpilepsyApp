import React from 'react';
import { Button, StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import {LoginStackParamList} from "../navigation/LoginNavigation";

import styles from "../styles/ButtonStyles";
import {default as mainStyle} from "../styles/MainStyles";
import AuthContext from '../Authentication/AuthContext';
import { TextInput } from 'react-native-gesture-handler';

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
            <View style={styles.surveyButtonContainer}>
                <Text>Login</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <Button title="Login" onPress={() => signIn({username, password})} />
            </View>
        </SafeAreaView>
    );
}
