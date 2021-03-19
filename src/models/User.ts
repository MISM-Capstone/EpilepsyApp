export default class User {
    id?:number;
    first_name: string = "";
    last_name: string = "";
}

export const SeizureDb = {
    table: "user",
    fields: {
        id:"id",
        first_name: "first_name",
        last_name: "last_name",
    }
}