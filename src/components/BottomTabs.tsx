import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

import HomeNavigation from "../navigation/HomeNavigation";
import TrendsNavigation from "../navigation/TrendsNavigation";
import ProfileNavigation from '../navigation/ProfileNavigation';

export default function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            // initialRouteName="Profile"
        >
            <Tab.Screen name="Home" component={HomeNavigation} options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="home" size={25} color={'#2E4D9E'}/>
                ) }} />
            <Tab.Screen name="Trends" component={TrendsNavigation} options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="calendar" size={25} color={'#2E4D9E'}/>
                ) }} />
            <Tab.Screen name="Profile" component={ProfileNavigation} options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="account" size={25} color={'#2E4D9E'}/>
                ) }} />
        </Tab.Navigator>
    );
}