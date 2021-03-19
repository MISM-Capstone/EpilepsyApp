export default class DosageUnit {
    id?:number;
    name:string = "";
    description:string = "";
    is_default:boolean = false;
}

export const DosageUnitDb = {
    table: "dosage_unit",
    fields: {
        id:"id",
        name: "name",
        description: "description",
        is_default: "is_default",
    }
}
