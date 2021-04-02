import React from 'react';
import DosageUnit from '../../models/DosageUnits';
import Location from '../../models/Location';
import Medication from '../../models/Medication/Medication';
import MedicationLog from '../../models/Medication/MedicationLog';
import SeizureLog from '../../models/SeizureLog';
import sleepDatesService from '../../_services/helpers/sleepDates.service';

type RenderProps = {
    log: any;
};

type RenderSeizureProps = {
    seizure:SeizureLog;
    locations:Location[];
}

export function RenderSeizure(props: RenderSeizureProps) {
    const currentLocation = props.locations.find((loc) => {
        return loc.id === props.seizure.location_id;
    });
    const location = currentLocation?currentLocation.name:"";
    return (
        <div>
            <p>ID: {props.seizure.id}</p>
            <p>Date: {props.seizure.date.toString()}</p>
            <p>Time: {props.seizure.time}</p>
            <p>Location: {location}</p>
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

type RenderMedicationProps = {
    medLog:MedicationLog;
    medications:Medication[];
    dosageUnits:DosageUnit[];
}

export function RenderMedication(props: RenderMedicationProps) {
    const currentMed = props.medications.find((med) => {
        return med.id === props.medLog.medication_id;
    });
    const medication = currentMed?currentMed.name:"";

    const currentDos = props.dosageUnits.find((dos) => {
        return dos.id === props.medLog.dosage_unit_id;
    });
    const dosageUnit = currentDos?currentDos.name:"";
    return (
        <div>
            <p>ID: {props.medLog.medication_id}</p>
            <p>Time: {props.medLog.time}</p>
            <p>Medication: {medication}</p>
            <p>Dosage: {props.medLog.dosage}</p>
            <p>Units: {dosageUnit}</p>
            <p>------</p>
        </div>
    );
}
