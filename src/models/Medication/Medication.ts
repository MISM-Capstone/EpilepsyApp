import Db, { DbFields } from "../AbstractClasses/Db";
import DosageUnit from "../DosageUnits";

export default class Medication extends Db {
    name:string = "";
    description:string = "";
    dosage:number = 0;
    dosage_unit_id: number;
    constructor(dosageUnit:DosageUnit) {
        super()
        this.dosage_unit_id = dosageUnit.id!;
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
}
