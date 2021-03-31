import React from 'react';
import SeizureLog from '../../models/SeizureLog';
import sleepDatesService from '../../_services/helpers/sleepDates.service';

type ListRenderProps ={
    logs:any[];
    jsxElement:React.ReactNode;
}

type RenderProps = {
    log: any;
};

type RenderSeizureProps = {
    seizure:SeizureLog;
}

export function RenderSeizure(props: RenderSeizureProps) {
    return (
        <div>
            <p>ID: {props.seizure.id}</p>
            <p>Date: {props.seizure.date.toString()}</p>
            <p>Time: {props.seizure.time}</p>
            <p>Location: {props.seizure.location_id}</p>
            <p>Notes: {props.seizure.notes}</p>
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
