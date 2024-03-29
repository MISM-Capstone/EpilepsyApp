import React from 'react';
import RNHTMLtoPDF, { Options } from "react-native-html-to-pdf";
import { renderToString } from 'react-dom/server';
import { RenderSeizure, RenderSurvey, RenderMedication } from "./RenderData";
import { CommonActions } from '@react-navigation/native';
import FileViewer from 'react-native-file-viewer';
import RNFS from "react-native-fs";
import { GenerateReportProps } from './GenerateReport';
import SurveyLogDao from '../../_services/database/dao/SurveyLogDao';
import MedicationLogDao from '../../_services/database/dao/MedicationLogDao';
import SeizureLogDao from '../../_services/database/dao/SeizureLogDao';
import LocationDao from '../../_services/database/dao/LocationDao';
import MedicationDao from '../../_services/database/dao/MedicationDao';
import DosageUnitDao from '../../_services/database/dao/DosageUnitDao';

export default class PDF {
    static displayPDF(wasShown: React.MutableRefObject<boolean>, pdfURI: string, props: GenerateReportProps) {
        if (!wasShown.current) {
            const options: FileViewer.RNFileViewerOptions = {
                displayName: "Report",
                showAppsSuggestions: true,
                onDismiss: () => {
                    RNFS.unlink(pdfURI)
                    .catch(error => {
                        console.warn("ERROR DELETING FILE:", error);
                    });
                }
            };
            FileViewer.open(pdfURI, options)
                .then(() => {
                    props.navigation.dispatch(state => {
                        const routes = state.routes.filter(r => r.name !== "GenerateReport");
                        return CommonActions.reset({
                            ...state,
                            routes,
                            index: routes.length - 1,
                        });
                    });
                })
                .catch(error => {
                    console.warn("ERROR:", error);
                });
            wasShown.current = true;
        }
    }

    static async generatePDF(startDate: Date, endDate: Date, imageLinks:string[]) {
        const dbSeizures = await SeizureLogDao.getInDateRange(startDate, endDate);
        const dbSurveys = await SurveyLogDao.getSurveysInDateRange(startDate, endDate);
        const dbMedication = await MedicationLogDao.getInDateRange(startDate, endDate);
        const locs = await LocationDao.getAll();
        const dbMeds = await MedicationDao.getAll();
        const dos = await DosageUnitDao.getAll();
        
        let html = "";
        imageLinks.forEach((image) => {
            html += `<img src="${image}" />`;
        });
        html += "<h2>Seizures</h2>";
        dbSeizures.forEach((seizure) => {
            let test = <RenderSeizure seizure={seizure} locations={locs} />;
            html += renderToString(test);
        });
        html += "<h2>Surveys</h2>";
        dbSurveys.forEach((survey) => {
            let test = <RenderSurvey log={survey} />;
            html += renderToString(test);
        });
        html += "<h2>Medication</h2>";
        dbMedication.forEach((medication) => {
            let test = <RenderMedication medLog={medication} medications={dbMeds} dosageUnits={dos} />;
            html += renderToString(test);
        });
        let today = new Date();
        let fileName = `Report_${this.dateAsString(today)}`;
        let reportTitle = `Report for ${this.dateAsString(startDate)} to ${this.dateAsString(endDate)}`;
        let options: Options = {
            html: `
                <div>
                    <h1 style="text-align:center;font-size:2.5rem;">${reportTitle}</h1>
                    ${html}
                </div>
            `,
            directory: "Documents",
            fileName: fileName,
        };
        let file = await RNHTMLtoPDF.convert(options);
        return file.filePath!;
    }
    private static dateAsString(date:Date) {
        const month = this.formatTwoDidgets(date.getMonth());
        const day = this.formatTwoDidgets(date.getDate());
        return `${month}-${day}-${date.getFullYear()}`
    }
    private static formatTwoDidgets(num:number) {
        let value = num.toString();
        return value.length>1?value:`0${value}`;
    }
}