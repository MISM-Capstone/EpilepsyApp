import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions, RouteProp } from '@react-navigation/native';
import Pdf from 'react-native-pdf';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';
import { ScrollView } from 'react-native-gesture-handler';
import PdfStyles from '../../styles/PdfStyles';

type ViewReportScreenNavigationProp = StackNavigationProp<
    ProfileStackParamList,
    "ViewReport"
>;

type ViewReportScreenRouteProp = RouteProp<
    ProfileStackParamList,
    "ViewReport"
>;

type Props = {
    route: ViewReportScreenRouteProp;
    navigation: ViewReportScreenNavigationProp;
};

const ViewReport = (props:Props) => {
    useEffect(() => {
        const unsubscribe = props.navigation.addListener("transitionEnd", () => {
            props.navigation.dispatch(state => {
                const routes = state.routes.filter(r => r.name !== "GenerateReport");
                return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                });
            });
        });
        return unsubscribe
    },[]);
    return (
        <ScrollView>
            <Button title="Print" onPress={() => {}}/>
            <View style={PdfStyles.container}>
                <Pdf
                    style={PdfStyles.pdf}
                    source={props.route.params.pdf}
                    // onLoadComplete={(numberOfPages,filePath)=>{
                    //     console.log(`number of pages: ${numberOfPages}`);
                    // }}
                    // onPageChanged={(page,numberOfPages)=>{
                    //     console.log(`current page: ${page}`);
                    // }}
                    // onError={(error)=>{
                    //     console.log(error);
                    // }}
                    // onPressLink={(uri)=>{
                    //     console.log(`Link press: ${uri}`)
                    // }}
                />
            </View>
        </ScrollView>
    );
}

export default ViewReport;
