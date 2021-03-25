import EpilepsyTypeUser, {EpilepsyTypeUserDb} from "../../../models/EpilepsyTypeUser";
import DAO from "./Dao"

export default class EpilepsyTypeDao extends DAO {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${EpilepsyTypeUserDb.table};
        `;
        const resultEpilepsyType = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultEpilepsyType, EpilepsyTypeUser)
    }
    static async insert(epilepsyTypeUser:EpilepsyTypeUser) {
        return await this.insertObject(epilepsyTypeUser, EpilepsyTypeUserDb);
    }
    static async update(epilepsyTypeUser:EpilepsyTypeUser) {
        return await this.updateObject(epilepsyTypeUser, EpilepsyTypeUserDb);
    }
}