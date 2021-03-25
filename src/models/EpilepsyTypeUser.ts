import Db, { DbFields, DBObj } from "./AbstractClasses/Db";

export default class EpilepsyTypeUser extends Db {
    user_id: number;
    epilepsy_type_id: number;
    constructor(userId:number = 0, epilepsyTypeId:number = 0) {
        super()
        this.user_id = userId;
        this.epilepsy_type_id = epilepsyTypeId;
    }
}

export const EpilepsyTypeUserDb = {
    table: "epilepsy_type_user",
    fields: {
        ...DbFields,
        user_id: "user_id",
        epilepsy_type_id: "epilepsy_type_id",
    }
}