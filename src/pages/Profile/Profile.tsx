import React, { useState } from 'react';
import { StatusBar, Text, TextInput, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';

import MainStyles from "../../styles/MainStyles";
import NavigationButton from '../../components/NavigationButton';
import ProfileStyles from '../../styles/ProfileStyles';
import { GetAuthContext } from '../../_services/Providers/AuthProvider';
import User from '../../models/User';
import { CopyAndSetKey } from '../../functions';
import LoginStyles from '../../styles/LoginStyles';

type TrendsScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Profile"
>;

type Props = {
  navigation: TrendsScreenNavigationProp;
};

const Profile = (props:Props) => {
    const {user, update} = GetAuthContext();
    const [updateUser, setUpdateUser] = useState(user!);

    function updateValue(key:keyof User, value:any){
        const newUser = CopyAndSetKey(updateUser, key, value);
        setUpdateUser(newUser);
    }

    return (
        <SafeAreaView style={MainStyles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={ProfileStyles.ProfileContainer}>
                <Text style={LoginStyles.nameHeader}>First Name:</Text>
                <TextInput
                    value={updateUser.first_name}
                    onChangeText={(value) => {
                        updateValue(updateUser.db.fields.first_name, value);
                    }}
                    style={LoginStyles.input}
                />
                <Text style={LoginStyles.nameHeader}>Last Name:</Text>
                <TextInput
                    value={updateUser.last_name}
                    onChangeText={(value) => {
                        updateValue(updateUser.db.fields.last_name, value);
                    }}
                    style={LoginStyles.input}
                />
                <NavigationButton
                    title="Update Info"
                    icon="content-save-outline"
                    navigate={() => update(updateUser)}
                />
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
