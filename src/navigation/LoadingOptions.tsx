import React from "react";
import { View, Text } from "react-native";
import BottomTabs from "../components/BottomTabs";
import Register from "../pages/Register";
import { GetAuthContext } from "../_services/Providers/AuthProvider";

function SplashScreen() {
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

export default function LoadingOptions() {
    const {user, isLoading} = GetAuthContext()
    return (
        <>
            {isLoading ? (
                <SplashScreen />
            ) : (user ? (
                <BottomTabs />
            ) : (
                <Register />
            ))}
        </>
    );
}