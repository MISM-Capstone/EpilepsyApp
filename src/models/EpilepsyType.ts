export default class EpilepsyType {
    id?:number;
    name: string = "";
    description: string = "";
}

export const EpilepsyTypeDb = {
    table: "epilepsy_type",
    fields: {
        id:"id",
        name: "name",
        description: "description",
    }
}