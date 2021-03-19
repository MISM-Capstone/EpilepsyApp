import DosageUnit from "./DosageUnits";

export enum PossibleFrequencies {
    min = "min",
    hour = "hour",
    day = "day",
    week = "week",
}

export default class Medication {
    id?:number;
    name:string = "";
    description:string = "";
    dosage:number = 0;
    frequency: number = 12;
    frequency_unit: PossibleFrequencies = PossibleFrequencies.hour;
    should_receive_reminders:boolean = false;
    dosage_unit_id: number;
    constructor(dosageUnit:DosageUnit) {
        this.dosage_unit_id = dosageUnit.id!;
    }
}

export const SeizureDb = {
    table: "seizure_log",
    fields: {
        id:"id",
        name: "name",
        description: "description",
        dosage: "dosage",
        frequency: "frequency",
        frequency_unit: "frequency_unit",
        should_receive_reminders: "should_receive_reminders",
        dosage_unit_id: "dosage_unit_id",
    }
}
