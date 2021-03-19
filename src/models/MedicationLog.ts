import Medication from "./Medication";

export default class MedicationLog {
    id?:number;
    date: Date = new Date();
    dosage: number;
    dosage_unit_id: number;
    medication_id: number;
    constructor(medication:Medication) {
        this.medication_id = medication.id!;
        this.dosage = medication.dosage;
        this.dosage_unit_id = medication.dosage_unit_id;
    }
}

export const MedicationLogDb = {
    table: "medication_log",
    fields: {
        id:"id",
        date: "date",
        dosage: "dosage",
        dosage_unit_id: "dosage_unit_id",
        medication_id: "medication_id",
    }
}
