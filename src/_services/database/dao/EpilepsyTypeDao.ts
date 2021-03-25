import EpilepsyType, {EpilepsyTypeDb} from "../../../models/EpilepsyType";
import DAO from "./Dao"

export default class EpilepsyTypeDao extends DAO {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${EpilepsyTypeDb.table};
        `;
        const resultEpilepsyType = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultEpilepsyType, EpilepsyType);
    }
    static async insert(epilepsyType:EpilepsyType) {
        return await this.insertObject(epilepsyType, EpilepsyTypeDb);
    }
    static async update(epilepsyType:EpilepsyType) {
        return await this.updateObject(epilepsyType, EpilepsyTypeDb);
    }
}