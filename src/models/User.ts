export default class User {
    id?:number;
    email: string = "";
    passwordHash?: string = "";
}

export const SeizureDb = {
    table: "user",
    fields: {
        id:"id",
        email: "email",
        passwordHash: "passwordHash",
    }
}