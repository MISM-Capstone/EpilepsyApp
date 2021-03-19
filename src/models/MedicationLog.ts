import Log, { LogFields } from "./Log";
import Medication from "./Medication";
import User from "./User";

export default class MedicationLog extends Log {
    dosage: number;
    dosage_unit_id: number;
    medication_id: number;
    constructor(user: User, medication:Medication) {
        super(user);
        this.medication_id = medication.id!;
        this.dosage = medication.dosage;
        this.dosage_unit_id = medication.dosage_unit_id;
    }
}

export const MedicationLogDb = {
    table: "medication_log",
    fields: {
        ...LogFields,
        dosage: "dosage",
        dosage_unit_id: "dosage_unit_id",
        medication_id: "medication_id",
    }
}
