import Db, { DbFields } from "./AbstractClasses/Db";
import EpilepsyType from "./EpilepsyType";
import User from "./User";

export default class EpilepsyTypeUser extends Db {
    user_id: number;
    epilepsy_type_id: number;
    constructor(user:User, epilepsyType:EpilepsyType) {
        super()
        this.user_id = user.id!;
        this.epilepsy_type_id = epilepsyType.id!;
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