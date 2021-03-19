import Db, { DbFields } from "./Db";
import DosageUnit from "./DosageUnits";

export default class Medication extends Db {
    name:string = "";
    description:string = "";
    dosage:number = 0;
    should_receive_reminders:boolean = false;
    dosage_unit_id: number;
    constructor(dosageUnit:DosageUnit) {
        super()
        this.dosage_unit_id = dosageUnit.id!;
    }
}

export const MedicationDb = {
    table: "seizure_log",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
        dosage: "dosage",
        should_receive_reminders: "should_receive_reminders",
        dosage_unit_id: "dosage_unit_id",
    }
}
