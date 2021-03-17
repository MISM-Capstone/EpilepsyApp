import React from 'react';
import sleepDatesService from '../../_services/sleepDates.service';

type ListRenderProps ={
    logs:any[];
    jsxElement:React.ReactNode;
}

type RenderProps = {
    log: any;
};

// export function listToHTML(props:ListRenderProps) {
//     html += "<h2>Seizures</h2>";
//     dbSeizures.forEach((seizure) => {
//         let test = props.jsxElement() log={seizure} />;
//         html += renderToString(test);
//     });
// }

export function RenderSeizure(props: RenderProps) {
    return (
        <div>
            <p>ID: {props.log.seizure_id}</p>
            <p>Date: {props.log.date}</p>
            <p>Time: {props.log.time}</p>
            <p>Location: {props.log.location}</p>
            <p>Notes: {props.log.notes}</p>
            <p>------</p>
        </div>
    );
}

export function RenderSurvey(props: RenderProps) {
    const sleepTime = sleepDatesService.getSleepTime(props.log.sleep_start_date, props.log.sleep_end_date);
    return (
        <div>
            <p>ID: {props.log.survey_entry_id}</p>
            <p>Date: {props.log.date}</p>
            <p>Sleep Time: {sleepTime.hours} hours {sleepTime.minutes} minutes</p>
            <p>Stress Level: {props.log.stress_level}</p>
            <p>Illness: {props.log.illness}</p>
            <p>Fever: {props.log.fever}</p>
            <p>Missed Meal: {props.log.miss_meal}</p>
            <p>Medication: {props.log.medication}</p>
            <p>------</p>
        </div>
    );
}

export function RenderMedication(props: RenderProps) {
    return (
        <div>
            <p>ID: {props.log.medication_id}</p>
            <p>Time: {props.log.time}</p>
            <p>Medication: {props.log.medication}</p>
            <p>Dosage: {props.log.dosage}</p>
            <p>Notes: {props.log.notes}</p>
            <p>------</p>
        </div>
    );
}
