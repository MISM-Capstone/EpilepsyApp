import { DbFields } from "./Db";
import EpilepsyType from "./EpilepsyType";
import User from "./User";

export default class EpilepsyTypeUser {
    is?:number;
    user_id: number;
    epilepsy_type_id: number;
    constructor(user:User, epilepsyType:EpilepsyType) {
        this.user_id = user.id!;
        this.epilepsy_type_id = epilepsyType.id!;
    }
}

export const EpilepsyTypeUserDb = {
    table: "epilepsy_type",
    fields: {
        ...DbFields,
        user_id: "user_id",
        epilepsy_type_id: "epilepsy_type_id",
    }
}