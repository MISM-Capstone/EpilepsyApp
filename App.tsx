import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import AuthProvider from './src/_services/Providers/AuthProvider';
import LoadingOptions from './src/navigation/LoadingOptions';


const App = () => {
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <StatusBar barStyle="dark-content" />
                <NavigationContainer>
                    <LoadingOptions />
                </NavigationContainer>
            </SafeAreaProvider>
        </AuthProvider>
    );
};

export default App;
