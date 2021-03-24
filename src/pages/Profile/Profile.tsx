import React from 'react';
import { StatusBar, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';

import MainStyles from "../../styles/MainStyles";
import NavigationButton from '../../components/NavigationButton';
import ProfileStyles from '../../styles/ProfileStyles';

type TrendsScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Profile"
>;

type Props = {
  navigation: TrendsScreenNavigationProp;
};

const Profile = (props:Props) => {
    return (
        <SafeAreaView style={MainStyles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={ProfileStyles.ProfileContainer}>
                <NavigationButton
                    title="Export Report"
                    icon="file-pdf"
                    navigate={() => props.navigation.navigate("ExportReport")}
                />
            </View>
        </SafeAreaView>
    );
}

export default Profile;
