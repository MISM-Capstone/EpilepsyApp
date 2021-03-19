import DosageUnit from "./DosageUnits";

export default class Medication {
    id?:number;
    name:string = "";
    description:string = "";
    dosage:number = 0;
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
        should_receive_reminders: "should_receive_reminders",
        dosage_unit_id: "dosage_unit_id",
    }
}
