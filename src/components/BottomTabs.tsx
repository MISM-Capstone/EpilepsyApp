import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

import HomeNavigation from "../navigation/HomeNavigation";
import TrendsNavigation from "../navigation/TrendsNavigation";
import ProfileNavigation from '../navigation/ProfileNavigation';
import { COLORS } from '../constants';

export default function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            // initialRouteName="Profile"
            tabBarOptions={{
                activeTintColor: COLORS.darkBlue,
                inactiveTintColor: "#333"
            }}
        >
            <Tab.Screen name="Home" component={HomeNavigation} options={{
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="home-outline" size={25} color={color}/>
                ) }} />
            <Tab.Screen name="Trends" component={TrendsNavigation} options={{
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="calendar-outline" size={25} color={color}/>
                ) }} />
            <Tab.Screen name="Profile" component={ProfileNavigation} options={{
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account-outline" size={25} color={color}/>
                ) }} />
        </Tab.Navigator>
    );
}