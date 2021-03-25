import Db, { DbFields, DBObj } from "./AbstractClasses/Db";

export default class DosageUnit extends Db {
    name:string = "";
    description:string = "";
    is_default:boolean = false;
}

export const DosageUnitDb:DBObj = {
    table: "dosage_unit",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
        is_default: "is_default",
    }
}
