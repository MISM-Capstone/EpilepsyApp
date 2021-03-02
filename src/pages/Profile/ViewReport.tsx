import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import RNHTMLtoPDF, {Options} from "react-native-html-to-pdf";
import Pdf from 'react-native-pdf';
import { renderToString } from 'react-dom/server'

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';
import ReportDao from '../../_services/database/dao/ReportDao';

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


type RenderProps = {
    log: any;
}

function RenderSeizure(props:RenderProps) {
    return (
        <div>
            <p>ID: {props.log.seizure_id}</p>
            <p>Date: {props.log.date}</p>
            <p>Time: {props.log.time}</p>
            <p>Location: {props.log.location}</p>
            <p>Notes: {props.log.notes}</p>
            <p>------</p>
        </div>
    )
}

function RenderSurvey(props:RenderProps) {
    return (
        <div>
            <p>ID: {props.log.survey_entry_id}</p>
            <p>Date: {props.log.date}</p>
            <p>Sleep: {props.log.sleep}</p>
            <p>Stress Level: {props.log.stress_level}</p>
            <p>Illness: {props.log.illness}</p>
            <p>Fever: {props.log.fever}</p>
            <p>Missed Meal: {props.log.miss_meal}</p>
            <p>Medication: {props.log.medication}</p>
            <p>------</p>
        </div>
    )
}

function RenderMedication(props:RenderProps) {
    return (
        <div>
            <p>ID: {props.log.medication_id}</p>
            <p>------</p>
        </div>
    )
}

const ViewReport = (props:Props) => {
    console.log("View the report ------------------------")
    const [pdf, setPDF] = useState<any>();
    const startDate = new Date(props.route.params.start);
    const endDate = new Date(props.route.params.end);
    useEffect(() => {
        (async () => {
            const dbSeizures = await ReportDao.getSeizuresInDateRange(startDate, endDate);
            const dbSurveys = await ReportDao.getSurveysInDateRange(startDate, endDate);
            const dbMedication = await ReportDao.getMedicationInDateRange(startDate, endDate);
            let html = "<h2>Seizures</h2>";
            dbSeizures.forEach((seizure) => {
                let test = <RenderSeizure log={seizure} />
                html += renderToString(test);
            });
            html += "<h2>Surveys</h2>";
            dbSurveys.forEach((survey) => {
                let test = <RenderSurvey log={survey} />
                html += renderToString(test);
            });
            html += "<h2>Medication</h2>";
            dbMedication.forEach((medication) => {
                let test = <RenderMedication log={medication} />
                html += renderToString(test);
            });
            console.log()
            let options:Options = {
                html: `
                        <div>
                            <h1 style="text-align:center;font-size:2.5rem;">Report for ${startDate.toJSON().substring(0,10)} to ${endDate.toJSON().substring(0,10)}</h1>
                            ${html}
                        </div>
                `,
                directory: "pdf",
                fileName: "report"
            };
            let file = await RNHTMLtoPDF.convert(options);
            console.log(file.filePath)
            const source = {uri:`${file.filePath}`,cache:false};
            setPDF(source);
        })();
    
    },[props.route.params.start, props.route.params.end]);

    return (
        <View style={styles.container}>
            {pdf?
            <Pdf
                source={pdf}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                onPressLink={(uri)=>{
                    console.log(`Link presse: ${uri}`)
                }}
                style={styles.pdf}
            />:
            <Text>Loading</Text>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
export default ViewReport;
