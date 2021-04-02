import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import AuthProvider from './src/_services/Providers/AuthProvider';
import LoadingOptions from './src/navigation/LoadingOptions';
import UpdateProvider from './src/_services/Providers/UpdateProvider';


const App = () => {
    return (
        <AuthProvider>
            <UpdateProvider>
                <SafeAreaProvider>
                    <StatusBar barStyle="dark-content" />
                    <NavigationContainer>
                        <LoadingOptions />
                    </NavigationContainer>
                </SafeAreaProvider>
            </UpdateProvider>
        </AuthProvider>
    );
};

export default App;
