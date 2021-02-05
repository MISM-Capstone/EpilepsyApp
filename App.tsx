import 'react-native-gesture-handler';

import React, { useReducer, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, Text, View } from 'react-native';


import BottomTabs from "./src/components/BottomTabs";
import LoginNavigation from './src/navigation/LoginNavigation';
import { CONTEXT_OPTIONS } from './src/constants';
import LoginReducer, { ReducerState } from './src/reducers/LoginReducer';
import AuthContext from './src/Authentication/AuthContext';
import { AddAuthToken, GetAuthToken, RemoveAuthToken } from './src/Authentication/AuthFunctions';


const initialReducerState:ReducerState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
}

function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

const App = () => {
    const [state, dispatch] = useReducer(LoginReducer, initialReducerState);

    useEffect(() => {
        GetAuthToken(dispatch);
    },[]);

    const authContext = useMemo(
        () => ({
            signIn: async (data:any) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token
                const token = "dummy-auth-token";
                AddAuthToken(token);
                dispatch({ type: CONTEXT_OPTIONS.login, token: token });
            },
            signOut: () => {
                RemoveAuthToken();
                dispatch({ type: CONTEXT_OPTIONS.logout })
            },
            signUp: async (data:any) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token
                const token = "dummy-auth-token";
                AddAuthToken(token);
                dispatch({ type: CONTEXT_OPTIONS.login, token: token });
            },
          }),
          []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <SafeAreaProvider>
                <StatusBar barStyle="dark-content" />
                <NavigationContainer>
                    {state.isLoading ? (
                        <SplashScreen />
                    ): state.userToken === null ? (
                        <LoginNavigation />
                    ) : (
                        <BottomTabs />
                    )}
                </NavigationContainer>
            </SafeAreaProvider>
        </AuthContext.Provider>
     );
 };

 export default App;
