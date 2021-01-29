import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from "./src/pages/Home";
import Trends from "./src/pages/Trends";

export type RootStackParamList = {
    Home: undefined;
    Trends: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" headerMode="none">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />
                    <Stack.Screen
                        name="Trends"
                        component={Trends}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
     );
 };

 export default App;
