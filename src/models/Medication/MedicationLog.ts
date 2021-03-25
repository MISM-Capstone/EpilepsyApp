import { DBObj } from "../AbstractClasses/Db";
import Log, { LogFields } from "../AbstractClasses/Log";
import Medication from "./Medication";

export default class MedicationLog extends Log {
    time: string = "";
    dosage: number = 0;
    dosage_unit_id: number = 0;
    medication_id: number = 0;
    constructor(userId: number = 0, medication?:Medication) {
        super(userId);
        if (medication) {
            this.medication_id = medication.id!;
            this.dosage = medication.dosage;
            this.dosage_unit_id = medication.dosage_unit_id;
        }
    }
}

export const MedicationLogDb = {
    table: "medication_log",
    fields: {
        ...LogFields,
        time: "time",
        dosage: "dosage",
        dosage_unit_id: "dosage_unit_id",
        medication_id: "medication_id",
    }
}
