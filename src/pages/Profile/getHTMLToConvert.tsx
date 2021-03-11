import React from 'react';
import RNHTMLtoPDF, { Options } from "react-native-html-to-pdf";
import { renderToString } from 'react-dom/server';
import ReportDao from '../../_services/database/dao/ReportDao';
import { RenderSeizure, RenderSurvey, RenderMedication } from "./RenderData";

export async function getHTMLToConvert(startDate: Date, endDate: Date, imageLinks:string[]) {
    const dbSeizures = await ReportDao.getSeizuresInDateRange(startDate, endDate);
    const dbSurveys = await ReportDao.getSurveysInDateRange(startDate, endDate);
    const dbMedication = await ReportDao.getMedicationInDateRange(startDate, endDate);
    let html = "";
    imageLinks.forEach((image) => {
        html += `<img src="${image}" />`;
    });
    html += "<h2>Seizures</h2>";
    dbSeizures.forEach((seizure) => {
        let test = <RenderSeizure log={seizure} />;
        html += renderToString(test);
    });
    html += "<h2>Surveys</h2>";
    dbSurveys.forEach((survey) => {
        let test = <RenderSurvey log={survey} />;
        html += renderToString(test);
    });
    html += "<h2>Medication</h2>";
    dbMedication.forEach((medication) => {
        let test = <RenderMedication log={medication} />;
        html += renderToString(test);
    });
    let options: Options = {
        html: `
            <div>
                <h1 style="text-align:center;font-size:2.5rem;">Report for ${startDate.toJSON().substring(0, 10)} to ${endDate.toJSON().substring(0, 10)}</h1>
                ${html}
            </div>
        `,
        directory: "pdf",
        fileName: "report"
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log("File:", file)
    const source = { uri: `${file.filePath}`, cache: false };
    return source;
}
