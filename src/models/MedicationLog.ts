import Medication from "./Medication";
import User from "./User";

export default class MedicationLog {
    id?:number;
    date_recorded: Date = new Date();
    date_modified: Date = new Date();
    date_taken: Date = new Date();
    dosage: number;
    dosage_unit_id: number;
    medication_id: number;
    user_id: number;
    constructor(user: User,medication:Medication) {
        this.user_id = user.id!;
        this.medication_id = medication.id!;
        this.dosage = medication.dosage;
        this.dosage_unit_id = medication.dosage_unit_id;
    }
}

export const MedicationLogDb = {
    table: "medication_log",
    fields: {
        id:"id",
        date_recorded: "date_recorded",
        date_modified: "date_modified",
        date_taken: "date_taken",
        dosage: "dosage",
        dosage_unit_id: "dosage_unit_id",
        medication_id: "medication_id",
        user_id: "user_id",
    }
}
