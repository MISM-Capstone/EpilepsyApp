import Db, { DbFields } from "./AbstractClasses/Db";

export default class DosageUnit extends Db {
    name:string = "";
    description:string = "";
    is_default:boolean = false;
    get db() {
        return DosageUnitDb;
    }
    
}

export const DosageUnitDb = {
    table: "dosage_unit",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
        is_default: "is_default",
    }
} as const;
