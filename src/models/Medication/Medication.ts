import Db, { DbFields } from "../AbstractClasses/Db";

export default class Medication extends Db {
    name:string = "";
    description:string = "";
    dosage:number = 0;
    dosage_unit_id: number;
    get db() {
        return MedicationDb;
    }

    constructor(dosageUnitId:number = 0) {
        super()
        this.dosage_unit_id = dosageUnitId;
    }
}

export const MedicationDb = {
    table: "medication",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
        dosage: "dosage",
        dosage_unit_id: "dosage_unit_id",
    }
} as const;
