import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';

import MainStyles from "../../styles/MainStyles";
import NavigationButton from '../../components/NavigationButton';
import AuthContext from '../../_services/Authentication/AuthContext';

type TrendsScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Profile"
>;

type Props = {
  navigation: TrendsScreenNavigationProp;
};

const Profile = (props:Props) => {
    const {signOut} = React.useContext(AuthContext)
    return (
        <SafeAreaView style={MainStyles.container}>
            <StatusBar barStyle="dark-content" />
            <View>
                {/* TODO: Change these button types or add mat icons */}
                <NavigationButton
                    title="Export Report"
                    icon="home"
                    navigate={() => props.navigation.navigate("ExportReport")}
                />
                <NavigationButton
                    title="Log Out"
                    icon="home"
                    navigate={signOut}
                />
            </View>
        </SafeAreaView>
    );
}

export default Profile;
