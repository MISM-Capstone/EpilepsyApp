import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HomeNavigation from "../navigation/HomeNavigation";
import TrendsNavigation from "../navigation/TrendsNavigation";
import ProfileNavigation from '../navigation/ProfileNavigation';

export default function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeNavigation} />
        <Tab.Screen name="Trends" component={TrendsNavigation} />
        <Tab.Screen name="Profile" component={ProfileNavigation} />
      </Tab.Navigator>
    );
  }